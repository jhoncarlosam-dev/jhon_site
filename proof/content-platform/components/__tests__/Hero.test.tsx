import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

test("shows the assigned version and segment", () => {
  render(
    <Hero
      block={{
        type: "hero",
        experimentId: "home-hero",
        variant: "B",
        segment: "subscriber",
        title: "Subscriber path, version B.",
        subtitle: "The version stayed on B.",
      }}
    />,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Subscriber path, version B.",
  );
  expect(screen.getByTestId("hero-variant")).toHaveTextContent("Version B");
  expect(screen.getByTestId("hero-segment")).toHaveTextContent("subscriber");
});
