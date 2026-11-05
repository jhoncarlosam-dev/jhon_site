"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormBlock } from "@/content/types";
import { validateLead } from "@/content/validate-lead";

export function LeadForm({ block }: { block: FormBlock }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateLead(block.fields, values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("");
      return;
    }

    setPending(true);
    setErrors({});
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const payload = (await response.json()) as {
        errors?: Record<string, string>;
      };
      if (!response.ok) {
        setErrors(payload.errors ?? { form: "Could not save the form." });
        setStatus("");
        return;
      }
      setStatus(block.successMessage);
      router.refresh();
    } catch {
      setErrors({ form: "The content service did not respond." });
      setStatus("");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <h2>{block.title}</h2>
      {block.fields.map((field) => {
        const error = errors[field.name];
        const errorId = error ? `${field.name}-error` : undefined;
        return (
          <label key={field.name}>
            {field.label}
            {field.fieldType === "select" ? (
              <select
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={errorId}
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.fieldType}
                value={values[field.name] ?? ""}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={errorId}
                autoComplete={
                  field.fieldType === "email" ? "email" : "organization"
                }
              />
            )}
            {error ? (
              <span id={errorId} role="alert">
                {error}
              </span>
            ) : null}
          </label>
        );
      })}
      {errors.form ? <p role="alert">{errors.form}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Sending…" : block.submitLabel}
      </button>
      {status ? <p role="status">{status}</p> : null}
    </form>
  );
}
