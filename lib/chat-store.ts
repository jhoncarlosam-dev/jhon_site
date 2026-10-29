import { type ChatMessage, isChatMessage } from "@/lib/grok-chat";

const KEY_STORAGE = "hablar.apiKey";
const MESSAGES_STORAGE = "hablar.messages";
const VOICE_STORAGE = "hablar.voice";

export type ChatState = {
  ready: boolean;
  apiKey: string;
  messages: ChatMessage[];
  voiceOn: boolean;
  speechSupported: boolean;
};

const SERVER_STATE: ChatState = {
  ready: false,
  apiKey: "",
  messages: [],
  voiceOn: true,
  speechSupported: false,
};

let state = SERVER_STATE;
const listeners = new Set<() => void>();

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function loadMessages(): ChatMessage[] {
  const raw = readStorage(MESSAGES_STORAGE);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isChatMessage).slice(-40);
  } catch {
    return [];
  }
}

function speechRecognitionAvailable(): boolean {
  const host = window as Window & {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return typeof host.SpeechRecognition === "function" || typeof host.webkitSpeechRecognition === "function";
}

function publish(next: ChatState) {
  state = next;
  for (const listener of listeners) listener();
}

function clientState(): ChatState {
  if (typeof window === "undefined") return SERVER_STATE;
  if (state.ready) return state;
  state = {
    ready: true,
    apiKey: readStorage(KEY_STORAGE) ?? "",
    messages: loadMessages(),
    voiceOn: readStorage(VOICE_STORAGE) !== "off",
    speechSupported: speechRecognitionAvailable(),
  };
  return state;
}

export function subscribeChat(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getChatState(): ChatState {
  return clientState();
}

export function getServerChatState(): ChatState {
  return SERVER_STATE;
}

export function saveApiKey(value: string): boolean {
  const saved = value ? writeStorage(KEY_STORAGE, value) : removeStorage(KEY_STORAGE);
  publish({ ...clientState(), apiKey: value });
  return saved;
}

export function saveMessages(messages: ChatMessage[]) {
  const trimmed = messages.slice(-40);
  writeStorage(MESSAGES_STORAGE, JSON.stringify(trimmed));
  publish({ ...clientState(), messages: trimmed });
}

export function saveVoice(voiceOn: boolean) {
  writeStorage(VOICE_STORAGE, voiceOn ? "on" : "off");
  publish({ ...clientState(), voiceOn });
}
