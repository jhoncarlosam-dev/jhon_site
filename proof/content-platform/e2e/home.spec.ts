import { expect, test } from "@playwright/test";
import { homeEntry } from "../content/entries";

function heroTitle(variant: "A" | "B", segment: "visitor" | "subscriber") {
  const hero = homeEntry.blocks.find((block) => block.type === "hero");
  if (!hero || hero.type !== "hero") throw new Error("missing hero");
  return hero.variants[variant][segment].title;
}

test("keeps a hero version and switches to the subscriber segment", async ({
  page,
}) => {
  await page.goto("/");
  const variantLabel = page.getByTestId("hero-variant");
  await expect(variantLabel).toHaveText(/Version [AB]/);
  const assigned = (await variantLabel.textContent()) ?? "";
  const variant = assigned.includes("B") ? "B" : "A";

  await page.reload();
  await expect(variantLabel).toHaveText(assigned);
  await expect(page.getByTestId("hero-title")).toHaveText(
    heroTitle(variant, "visitor"),
  );

  await page.getByLabel("Work email").fill("ada@portico.test");
  await page.getByLabel("Company").fill("Portico");
  await page.getByLabel("Interest").selectOption("Testing");
  await page.getByRole("button", { name: "Request a walkthrough" }).click();

  await expect(page.getByRole("status")).toHaveText(/subscriber segment/i);
  await expect(page.getByTestId("hero-segment")).toHaveText("subscriber");
  await expect(page.getByTestId("hero-title")).toHaveText(
    heroTitle(variant, "subscriber"),
  );
  await expect(variantLabel).toHaveText(assigned);
});

test("previews version B and opens a static story", async ({ page }) => {
  await page.goto("/?variant=B");
  await expect(page.getByTestId("hero-variant")).toHaveText("Version B");
  await expect(page.getByTestId("hero-title")).toHaveText(
    heroTitle("B", "visitor"),
  );

  await page.goto("/stories/schema-change");
  await expect(
    page.getByRole("heading", { name: "How a schema change ships" }),
  ).toBeVisible();
  await expect(page.getByText("Portico desk")).toBeVisible();
});
