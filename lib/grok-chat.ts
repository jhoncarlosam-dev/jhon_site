export const GROK_MODEL = "grok-4.3";
export const GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions";

const SYSTEM_PROMPT = [
  "Eres un asistente de conversación por voz y texto.",
  "Te escriben desde un celular.",
  "Responde siempre en español, con frases cortas y naturales, como si estuvieras hablando.",
  "Usa como máximo cuatro frases.",
  "No uses markdown, viñetas, títulos ni emojis.",
  "Si falta un dato, dilo en una frase y pregunta solo lo necesario.",
  "No inventes que puedes ver la pantalla, archivos ni una sesión de programación.",
].join(" ");

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type GrokFailureCode =
  | "missing_key"
  | "unauthorized"
  | "rate_limit"
  | "payment"
  | "unavailable"
  | "bad_response";

export class GrokError extends Error {
  readonly code: GrokFailureCode;

  constructor(message: string, code: GrokFailureCode) {
    super(message);
    this.name = "GrokError";
    this.code = code;
  }
}

const KEY_MESSAGE =
  "La clave no sirve. Revisa que sea una clave de xAI, activa, y vuelve a guardarla.";

export function normalizeApiKey(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "").trim();
}

export function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { role?: unknown; content?: unknown };
  const roleOk = candidate.role === "user" || candidate.role === "assistant";
  return roleOk && typeof candidate.content === "string" && candidate.content.trim().length > 0;
}

export function buildChatRequest(history: ChatMessage[]) {
  const turns = history
    .filter((message) => message.content.trim().length > 0)
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 4000),
    }));

  return {
    model: GROK_MODEL,
    reasoning_effort: "none" as const,
    temperature: 0.7,
    max_completion_tokens: 450,
    messages: [{ role: "system" as const, content: SYSTEM_PROMPT }, ...turns],
  };
}

export function readReply(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    throw new GrokError("La respuesta llegó incompleta. Intenta otra vez.", "bad_response");
  }

  const choices = (payload as { choices?: unknown }).choices;
  const first = Array.isArray(choices) ? choices[0] : undefined;
  const message =
    first && typeof first === "object"
      ? (first as { message?: unknown }).message
      : undefined;

  if (!message || typeof message !== "object") {
    throw new GrokError("La respuesta llegó incompleta. Intenta otra vez.", "bad_response");
  }

  const content = (message as { content?: unknown }).content;
  if (typeof content === "string" && content.trim()) return content.trim();

  const refusal = (message as { refusal?: unknown }).refusal;
  if (typeof refusal === "string" && refusal.trim()) return refusal.trim();

  throw new GrokError("Llegó una respuesta vacía. Intenta otra vez.", "bad_response");
}

function errorText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const error = (payload as { error?: unknown }).error;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "";
}

export function messageForFailure(status: number, payload: unknown): GrokError {
  const upstream = errorText(payload);
  if (status === 401 || status === 403 || /api key/i.test(upstream)) {
    return new GrokError(KEY_MESSAGE, "unauthorized");
  }
  if (status === 402) {
    return new GrokError(
      "La cuenta de xAI no tiene crédito disponible.",
      "payment",
    );
  }
  if (status === 429) {
    return new GrokError(
      "Hay demasiadas peticiones ahora. Espera un momento e intenta otra vez.",
      "rate_limit",
    );
  }
  if (status === 400) {
    return new GrokError(
      "No pude enviar ese mensaje. Prueba con uno más corto.",
      "bad_response",
    );
  }
  return new GrokError(
    "No pude obtener respuesta. Revisa tu conexión e intenta de nuevo.",
    "unavailable",
  );
}

export async function requestReply(
  apiKey: string,
  history: ChatMessage[],
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const key = normalizeApiKey(apiKey);
  if (!key) {
    throw new GrokError(
      "Primero guarda tu clave de xAI en ajustes.",
      "missing_key",
    );
  }

  let response: Response;
  try {
    response = await fetchImpl(GROK_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildChatRequest(history)),
    });
  } catch {
    throw new GrokError(
      "Sin conexión. Revisa internet e intenta otra vez.",
      "unavailable",
    );
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) throw messageForFailure(response.status, payload);

  return readReply(payload);
}

export function speakableText(text: string): string {
  return text
    .replace(/[`*_#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
