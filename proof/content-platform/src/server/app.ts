import { randomUUID } from "node:crypto";
import express, { type Express, type Request } from "express";
import { graphql } from "graphql";
import { contentTypes } from "../../content/model";
import { parseSegment, parseVariant } from "../../content/personalize";
import {
  createRepository,
  type ContentRepository,
} from "../../content/repository";
import { leadForm } from "../../content/entries";
import { validateLead } from "../../content/validate-lead";
import type { WeatherClient } from "../../content/weather";
import { buildContentSchema } from "./graphql";

export type AppOptions = {
  weather?: WeatherClient;
  now?: () => number;
  repository?: ContentRepository;
};

function param(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function audienceFrom(request: Request) {
  return {
    visitorId: request.get("x-visitor-id")?.trim() || "anonymous",
    segment: parseSegment(request.get("x-segment")),
    variant: parseVariant(request.get("x-variant")),
  };
}

export function createApp(options: AppOptions = {}): Express {
  const repository =
    options.repository ??
    createRepository({ weather: options.weather, now: options.now });
  const schema = buildContentSchema();
  const app = express();

  app.use((request, response, next) => {
    const origin = request.get("origin");
    if (
      origin === "http://127.0.0.1:3001" ||
      origin === "http://localhost:3001"
    ) {
      response.setHeader("access-control-allow-origin", origin);
    }
    response.setHeader(
      "access-control-allow-headers",
      "content-type, x-visitor-id, x-segment, x-variant",
    );
    response.setHeader("access-control-allow-methods", "GET, POST, OPTIONS");
    if (request.method === "OPTIONS") {
      response.status(204).end();
      return;
    }
    next();
  });

  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.get("/v1/content-types", (_request, response) => {
    response.set("Cache-Control", "public, max-age=60");
    response.json({ contentTypes });
  });

  app.get("/v1/pages/:slug", async (request, response) => {
    const page = await repository.getPersonalizedPage(
      param(request.params.slug),
      audienceFrom(request),
    );
    if (!page) {
      response.status(404).json({ error: "not_found" });
      return;
    }
    response.set("Cache-Control", "private, max-age=0");
    response.json(page);
  });

  app.get("/v1/stories/:slug", (request, response) => {
    const story = repository.getStory(param(request.params.slug));
    if (!story) {
      response.status(404).json({ error: "not_found" });
      return;
    }
    response.set("Cache-Control", "public, max-age=60");
    response.json(story);
  });

  app.post("/v1/leads", (request, response) => {
    const result = validateLead(leadForm().fields, request.body);
    if (!result.ok) {
      response.status(400).json({ errors: result.errors });
      return;
    }
    response
      .status(201)
      .json({ id: `lead_${randomUUID()}`, segment: "subscriber" });
  });

  app.post("/graphql", async (request, response) => {
    const query =
      typeof request.body?.query === "string" ? request.body.query : "";
    if (!query) {
      response.status(400).json({ errors: [{ message: "query is required" }] });
      return;
    }
    const result = await graphql({
      schema,
      source: query,
      variableValues: request.body?.variables,
      contextValue: { repository },
    });
    response.status(200).json(result);
  });

  return app;
}

export function start(port = Number(process.env.PORT ?? 4000)): void {
  const app = createApp();
  app.listen(port, "127.0.0.1", () => {
    console.log(`content api http://127.0.0.1:${port}`);
  });
}
