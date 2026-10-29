import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GROK_ENDPOINT,
  GROK_MODEL,
  buildChatRequest,
  messageForFailure,
  normalizeApiKey,
  readReply,
  requestReply,
  speakableText,
} from "./grok-chat.ts";

describe("normalizeApiKey", () => {
  it("recorta espacios y comillas", () => {
    assert.equal(normalizeApiKey('  "xai-abc"  '), "xai-abc");
  });
});

describe("buildChatRequest", () => {
  it("arma una petición corta y sin la clave", () => {
    const body = buildChatRequest([
      { role: "user", content: "  hola  " },
      { role: "assistant", content: "qué tal" },
      { role: "user", content: "   " },
    ]);

    assert.equal(body.model, GROK_MODEL);
    assert.equal(body.reasoning_effort, "none");
    assert.equal("search_parameters" in body, false);
    assert.equal(body.messages[0]?.role, "system");
    assert.deepEqual(body.messages.slice(1), [
      { role: "user", content: "hola" },
      { role: "assistant", content: "qué tal" },
    ]);
    assert.equal(JSON.stringify(body).includes("xai-"), false);
  });

  it("se queda con los últimos 12 turnos", () => {
    const history = Array.from({ length: 20 }, (_, index) => ({
      role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: `m${index}`,
    }));
    const body = buildChatRequest(history);
    const contents = body.messages.slice(1).map((message) => message.content);
    assert.deepEqual(contents, Array.from({ length: 12 }, (_, index) => `m${index + 8}`));
  });
});

describe("readReply", () => {
  it("lee el texto del asistente", () => {
    assert.equal(
      readReply({ choices: [{ message: { content: "  Hola  " } }] }),
      "Hola",
    );
  });

  it("usa la negativa cuando no hay texto", () => {
    assert.equal(
      readReply({ choices: [{ message: { content: null, refusal: "No puedo." } }] }),
      "No puedo.",
    );
  });
});

describe("messageForFailure", () => {
  it("traduce una clave rechazada", () => {
    const error = messageForFailure(400, {
      error: "Incorrect API key provided. You can obtain an API key from https://console.x.ai.",
    });
    assert.equal(error.code, "unauthorized");
    assert.match(error.message, /clave/i);
  });

  it("traduce el límite de peticiones", () => {
    assert.equal(messageForFailure(429, {}).code, "rate_limit");
  });
});

describe("requestReply", () => {
  it("envía la clave solo en el encabezado", async () => {
    let seenAuth = "";
    let seenUrl = "";
    const fetchImpl: typeof fetch = async (input, init) => {
      seenUrl = String(input);
      seenAuth = new Headers(init?.headers).get("Authorization") ?? "";
      assert.equal(String(init?.body).includes("xai-secreta"), false);
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "Listo" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    };

    const reply = await requestReply("xai-secreta", [{ role: "user", content: "hola" }], fetchImpl);
    assert.equal(reply, "Listo");
    assert.equal(seenUrl, GROK_ENDPOINT);
    assert.equal(seenAuth, "Bearer xai-secreta");
  });
});

describe("speakableText", () => {
  it("quita marcas que la voz leería mal", () => {
    assert.equal(speakableText("**Hola**\n`amigo`"), "Hola amigo");
  });
});
