import { leadForm } from "../content/entries";
import { validateLead } from "../content/validate-lead";

const fields = leadForm().fields;

test("rejects a bad email and an empty company", () => {
  const result = validateLead(fields, {
    email: "not-an-email",
    company: "  ",
    interest: "Testing",
  });
  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.errors.email).toMatch(/valid email/i);
    expect(result.errors.company).toBeTruthy();
  }
});

test("accepts a complete lead", () => {
  const result = validateLead(fields, {
    email: "ada@portico.test",
    company: "Portico",
    interest: "Content model",
  });
  expect(result).toEqual({
    ok: true,
    value: {
      email: "ada@portico.test",
      company: "Portico",
      interest: "Content model",
    },
  });
});
