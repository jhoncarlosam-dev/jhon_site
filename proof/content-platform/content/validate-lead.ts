import type { FormField } from "./types";

export type LeadResult =
  | { ok: true; value: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLead(fields: FormField[], body: unknown): LeadResult {
  if (!isRecord(body)) {
    return { ok: false, errors: { form: "Send the form as JSON." } };
  }

  const errors: Record<string, string> = {};
  const value: Record<string, string> = {};

  for (const field of fields) {
    const raw = body[field.name];
    const text = typeof raw === "string" ? raw.trim() : "";
    if (field.required && text === "") {
      errors[field.name] = `Enter ${field.label.toLowerCase()}.`;
      continue;
    }
    if (text === "") continue;
    if (field.fieldType === "email" && !isEmail(text)) {
      errors[field.name] = "Enter a valid email.";
      continue;
    }
    if (field.fieldType === "select" && !field.options.includes(text)) {
      errors[field.name] = "Choose one of the listed options.";
      continue;
    }
    value[field.name] = text;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value };
}
