"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  FaCog,
  FaMicrophone,
  FaPaperPlane,
  FaStop,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import {
  getChatState,
  getServerChatState,
  saveApiKey,
  saveMessages,
  saveVoice,
  subscribeChat,
} from "@/lib/chat-store";
import {
  GrokError,
  normalizeApiKey,
  requestReply,
  speakableText,
} from "@/lib/grok-chat";
import { fallbackSpeechLang, SPEECH_LANGS } from "@/lib/speech-lang";

type SpeechResult = {
  readonly 0?: { readonly transcript?: string };
};

type SpeechResultEvent = {
  readonly results: ArrayLike<SpeechResult>;
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function recognitionCtor(): (new () => BrowserSpeechRecognition) | null {
  const host = window as Window & {
    SpeechRecognition?: new () => BrowserSpeechRecognition;
    webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
  };
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null;
}

function speechError(code: string): string | null {
  if (code === "aborted" || code === "no-speech") return null;
  if (code === "not-allowed" || code === "service-not-allowed") {
    return "Chrome bloqueó el micrófono. Toca el candado de la barra y permite el micrófono.";
  }
  if (code === "language-not-supported") {
    return "Este Chrome no transcribe español. Puedes escribir.";
  }
  if (code === "audio-capture") return "No encontré un micrófono en este celular.";
  if (code === "network") return "El reconocimiento de voz necesita conexión.";
  return "No pude usar el micrófono. Puedes escribir el mensaje.";
}

function pickSpanishVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es-co")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es-419")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es-mx")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es-")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es")) ??
    null
  );
}

const sideInset = {
  paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
  paddingRight: "max(1.5rem, env(safe-area-inset-right))",
};

let speechKeepAlive = 0;

function stopSpeechKeepAlive() {
  if (!speechKeepAlive) return;
  window.clearInterval(speechKeepAlive);
  speechKeepAlive = 0;
}

function primeSpeech() {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const primer = new SpeechSynthesisUtterance(" ");
  primer.volume = 0;
  primer.lang = "es-CO";
  synth.speak(primer);
}

export function PhoneChat() {
  const store = useSyncExternalStore(subscribeChat, getChatState, getServerChatState);
  const [draft, setDraft] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [setupDismissed, setSetupDismissed] = useState(false);
  const [keyDraft, setKeyDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [formNotice, setFormNotice] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const keyInputRef = useRef<HTMLInputElement>(null);
  const draftRef = useRef("");
  const sendingRef = useRef(false);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const sendOnEndRef = useRef(false);
  const mountedRef = useRef(true);
  const historyMarker = useRef(false);
  const closeSettingsRef = useRef<() => void>(() => {});

  const showSettings = settingsOpen || (store.ready && store.apiKey === "" && !setupDismissed);

  useEffect(() => {
    mountedRef.current = true;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/hablar-sw.js").catch(() => {});
    }
    window.speechSynthesis?.getVoices();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      mountedRef.current = false;
      document.body.style.overflow = previousOverflow;
      recognitionRef.current?.abort();
      stopSpeechKeepAlive();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!showSettings || historyMarker.current) return;
    history.pushState({ hablarAjustes: true }, "");
    historyMarker.current = true;
  }, [showSettings]);

  useEffect(() => {
    const onPop = () => {
      historyMarker.current = false;
      setSettingsOpen(false);
      setSetupDismissed(true);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = window.visualViewport;
    if (!root || !viewport) return;

    const sync = () => {
      root.style.height = `${viewport.height}px`;
      root.style.top = `${viewport.offsetTop}px`;
    };
    sync();
    viewport.addEventListener("resize", sync);
    viewport.addEventListener("scroll", sync);
    return () => {
      viewport.removeEventListener("resize", sync);
      viewport.removeEventListener("scroll", sync);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [store.messages, sending, error, listening]);

  useEffect(() => {
    if (!showSettings) return;
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    if (!narrow) keyInputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettingsRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  function updateDraft(value: string) {
    draftRef.current = value;
    setDraft(value);
  }

  function closeSettings() {
    setSettingsOpen(false);
    setSetupDismissed(true);
    if (!historyMarker.current) return;
    historyMarker.current = false;
    history.back();
  }

  closeSettingsRef.current = closeSettings;

  function speak(text: string) {
    const synth = window.speechSynthesis;
    if (!getChatState().voiceOn || !synth) return;
    const spoken = speakableText(text);
    if (!spoken) return;
    stopSpeechKeepAlive();
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.lang = "es-CO";
    const voice = pickSpanishVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => stopSpeechKeepAlive();
    utterance.onerror = () => stopSpeechKeepAlive();
    synth.speak(utterance);
    speechKeepAlive = window.setInterval(() => {
      if (!synth.speaking) {
        stopSpeechKeepAlive();
        return;
      }
      synth.pause();
      synth.resume();
    }, 8000);
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || sendingRef.current) return;

    const { apiKey, messages } = getChatState();
    if (!apiKey.trim()) {
      setSetupDismissed(false);
      setSettingsOpen(true);
      setError("Primero guarda tu clave de xAI.");
      return;
    }

    window.speechSynthesis?.cancel();
    primeSpeech();
    sendingRef.current = true;
    setSending(true);
    setError(null);
    setNotice(null);
    updateDraft("");

    const next = [...messages, { role: "user" as const, content }];
    saveMessages(next);

    try {
      const reply = await requestReply(apiKey, next);
      if (!mountedRef.current) return;
      saveMessages([...next, { role: "assistant", content: reply }]);
      speak(reply);
    } catch (caught) {
      if (!mountedRef.current) return;
      setError(
        caught instanceof GrokError
          ? caught.message
          : "No pude responder. Intenta otra vez.",
      );
    } finally {
      sendingRef.current = false;
      if (mountedRef.current) setSending(false);
    }
  }

  function stopListening() {
    sendOnEndRef.current = true;
    recognitionRef.current?.stop();
  }

  function startListening(lang: string = SPEECH_LANGS[0]) {
    const Ctor = recognitionCtor();
    if (!Ctor || sendingRef.current) return;

    window.speechSynthesis?.cancel();
    primeSpeech();
    setError(null);
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let text = "";
      for (let index = 0; index < event.results.length; index += 1) {
        text += event.results[index]?.[0]?.transcript ?? "";
      }
      updateDraft(text.trim());
    };
    recognition.onerror = (event) => {
      if (event.error === "language-not-supported") {
        const nextLang = fallbackSpeechLang(lang);
        sendOnEndRef.current = false;
        if (nextLang) {
          window.setTimeout(() => startListening(nextLang), 0);
          return;
        }
      }
      sendOnEndRef.current = false;
      const message = speechError(event.error);
      if (message) setError(message);
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      if (!sendOnEndRef.current) return;
      sendOnEndRef.current = false;
      const heard = draftRef.current.trim();
      if (heard) void send(heard);
    };

    recognitionRef.current = recognition;
    sendOnEndRef.current = true;
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
      sendOnEndRef.current = false;
      setError("No pude abrir el micrófono. Puedes escribir el mensaje.");
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (listening) {
      stopListening();
      return;
    }
    void send(draftRef.current);
  }

  function saveKey() {
    const next = normalizeApiKey(keyDraft);
    if (!next) {
      setFormNotice("Pega la clave antes de guardar.");
      return;
    }
    const saved = saveApiKey(next);
    setFormNotice(null);
    setNotice(
      saved
        ? "Clave guardada en este celular."
        : "No pude guardarla en el celular. Servirá hasta que cierres la página.",
    );
    setError(null);
    closeSettings();
  }

  function forgetKey() {
    saveApiKey("");
    setKeyDraft("");
    setFormNotice("Quité la clave de este celular.");
    setSetupDismissed(false);
  }

  function toggleVoice() {
    const next = !getChatState().voiceOn;
    saveVoice(next);
    if (!next) window.speechSynthesis?.cancel();
  }

  function clearChat() {
    window.speechSynthesis?.cancel();
    saveMessages([]);
    setError(null);
    setFormNotice("Conversación borrada.");
  }

  return (
    <div ref={rootRef} className="fixed inset-x-0 top-0 z-10 flex h-dvh touch-manipulation flex-col overscroll-none bg-sand text-ink [color-scheme:light]">
      <header
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center bg-navy text-white"
        style={{
          ...sideInset,
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          paddingBottom: "0.5rem",
        }}
      >
        <Link href="/" className="inline-flex h-12 items-center text-sm font-medium text-white/80">
          Inicio
        </Link>
        <h1 className="truncate text-center font-display text-2xl font-bold uppercase leading-none tracking-[0.14em]">
          Hablar
        </h1>
        <div className="flex justify-end">
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full text-white/90"
            aria-pressed={store.voiceOn}
            aria-label={store.voiceOn ? "Silenciar respuestas" : "Escuchar respuestas"}
            onClick={toggleVoice}
          >
            {store.voiceOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full text-white/90"
            aria-label="Ajustes"
            onClick={() => {
              setKeyDraft(getChatState().apiKey);
              setSettingsOpen(true);
            }}
          >
            <FaCog />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain py-4" style={sideInset}>
        {store.ready && store.messages.length === 0 ? (
          <div className="mx-auto max-w-sm pt-10 text-center">
            <p className="font-display text-4xl font-bold uppercase tracking-[0.08em] text-navy">
              Hola
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Escribe o toca el micrófono. Te respondo en el chat
              {store.voiceOn ? " y también en voz." : "."}
            </p>
          </div>
        ) : null}

        {store.messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-sm leading-6 text-white"
                : "mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-2.5 text-sm leading-6 text-ink"
            }
          >
            {message.content}
          </p>
        ))}

        {sending ? (
          <p className="mr-auto flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-card px-3.5 py-3">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:240ms]" />
          </p>
        ) : null}
        <div ref={endRef} />
      </div>

      {notice ? (
        <p className="mb-2 rounded-xl border border-line bg-card px-3 py-2 text-sm text-muted" style={sideInset}>
          {notice}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mb-2 rounded-xl bg-[#f8ebe6] px-3 py-2 text-sm text-[#6e332c]" style={sideInset}>
          {error}
        </p>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="border-t border-line bg-card pt-3"
        style={{
          ...sideInset,
          paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        {listening ? (
          <p className="mb-2 text-center text-sm font-medium text-brand">Te escucho…</p>
        ) : null}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-white ${
              listening ? "bg-[#8c3a32]" : "bg-navy"
            } disabled:opacity-40`}
            aria-label={listening ? "Detener y enviar" : "Hablar"}
            aria-pressed={listening}
            disabled={!store.speechSupported || sending}
            onClick={listening ? stopListening : () => startListening()}
          >
            {listening ? <FaStop /> : <FaMicrophone />}
          </button>
          <label htmlFor="mensaje" className="sr-only">
            Mensaje
          </label>
          <input
            id="mensaje"
            value={draft}
            onChange={(event) => updateDraft(event.target.value)}
            placeholder={listening ? "Escuchando" : "Escribe un mensaje"}
            enterKeyHint="send"
            autoComplete="off"
            autoCapitalize="sentences"
            className="h-12 min-w-0 flex-1 rounded-full bg-sand px-4 text-base outline-none ring-brand focus:ring-2"
          />
          <button
            type="submit"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white disabled:opacity-40"
            aria-label="Enviar"
            disabled={sending || (!listening && draft.trim() === "")}
          >
            <FaPaperPlane />
          </button>
        </div>
        {store.ready && !store.speechSupported ? (
          <p className="mt-2 text-center text-xs text-muted">
            Este navegador no transcribe voz. Puedes escribir.
          </p>
        ) : null}
      </form>

      {showSettings
        ? createPortal(
        <div className="fixed inset-0 z-[80] bg-navy-deep/50" onClick={closeSettings}>
          <div className="flex h-full items-end justify-center sm:items-center sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ajustes-titulo"
            className="max-h-full min-h-0 w-full max-w-md overflow-y-auto rounded-t-3xl bg-card py-5 sm:rounded-3xl"
            style={{
              ...sideInset,
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="ajustes-titulo"
              className="font-display text-3xl font-bold uppercase tracking-[0.12em] text-navy"
            >
              Ajustes
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pega una clave de{" "}
              <a
                className="font-medium text-brand underline"
                href="https://console.x.ai"
                target="_blank"
                rel="noreferrer"
              >
                console.x.ai
              </a>
              . Se guarda solo en este celular. Las respuestas salen de Grok y no ven tu sesión de Cursor.
            </p>
            <label htmlFor="clave" className="mt-4 block text-sm font-medium text-ink">
              Clave de xAI
            </label>
            <input
              ref={keyInputRef}
              id="clave"
              type="password"
              value={keyDraft}
              autoComplete="off"
              spellCheck={false}
              placeholder="xai-..."
              onChange={(event) => {
                setKeyDraft(event.target.value);
                setFormNotice(null);
              }}
              className="mt-1 h-12 w-full rounded-xl border border-line bg-sand px-3 text-base outline-none ring-brand focus:ring-2"
            />
            {formNotice ? <p className="mt-2 text-sm text-[#6e332c]">{formNotice}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="h-12 rounded-full bg-navy px-4 text-sm font-semibold text-white"
                onClick={saveKey}
              >
                Guardar
              </button>
              <button
                type="button"
                className="h-12 rounded-full border border-line px-4 text-sm font-semibold text-ink"
                onClick={forgetKey}
              >
                Quitar clave
              </button>
              <button
                type="button"
                className="h-12 rounded-full border border-line px-4 text-sm font-semibold text-ink"
                onClick={clearChat}
              >
                Borrar chat
              </button>
            </div>
            <button
              type="button"
              className="mt-4 h-12 w-full rounded-full border border-line text-sm font-semibold text-ink"
              onClick={closeSettings}
            >
              Cerrar
            </button>
          </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
