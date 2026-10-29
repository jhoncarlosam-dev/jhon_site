export const SPEECH_LANGS = ["es-CO", "es-419", "es-MX", "es-ES"] as const;

export type SpeechLang = (typeof SPEECH_LANGS)[number];

export function fallbackSpeechLang(current: string): SpeechLang | null {
  const index = SPEECH_LANGS.indexOf(current as SpeechLang);
  if (index === -1) return SPEECH_LANGS[0];
  return SPEECH_LANGS[index + 1] ?? null;
}
