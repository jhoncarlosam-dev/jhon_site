import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { leadForm } from "../../content/entries";
import { LeadForm } from "../LeadForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));

test("shows a validation error before calling the API", async () => {
  const fetchMock = jest.fn();
  global.fetch = fetchMock as typeof fetch;
  const user = userEvent.setup();

  render(<LeadForm block={leadForm()} />);
  await user.type(screen.getByLabelText(/work email/i), "not-an-email");
  await user.click(screen.getByRole("button", { name: /walkthrough/i }));

  const alerts = await screen.findAllByRole("alert");
  expect(
    alerts.some((alert) => /valid email/i.test(alert.textContent ?? "")),
  ).toBe(true);
  expect(fetchMock).not.toHaveBeenCalled();
});

test("posts a valid lead", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: "lead_1", segment: "subscriber" }),
  }) as typeof fetch;
  const user = userEvent.setup();

  render(<LeadForm block={leadForm()} />);
  await user.type(screen.getByLabelText(/work email/i), "ada@portico.test");
  await user.type(screen.getByLabelText(/company/i), "Portico");
  await user.selectOptions(screen.getByLabelText(/interest/i), "Testing");
  await user.click(screen.getByRole("button", { name: /walkthrough/i }));

  expect(await screen.findByRole("status")).toHaveTextContent(
    /subscriber segment/i,
  );
  expect(global.fetch).toHaveBeenCalledWith(
    "/api/leads",
    expect.objectContaining({ method: "POST" }),
  );
});
