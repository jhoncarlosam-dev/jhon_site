import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fallbackSpeechLang } from "./speech-lang.ts";

describe("fallbackSpeechLang", () => {
  it("empieza por español de Colombia y sigue con variantes de Chrome", () => {
    assert.equal(fallbackSpeechLang("es-CO"), "es-419");
    assert.equal(fallbackSpeechLang("es-419"), "es-MX");
    assert.equal(fallbackSpeechLang("es-MX"), "es-ES");
    assert.equal(fallbackSpeechLang("es-ES"), null);
  });

  it("vuelve a es-CO si el idioma no está en la lista", () => {
    assert.equal(fallbackSpeechLang("en-US"), "es-CO");
  });
});
