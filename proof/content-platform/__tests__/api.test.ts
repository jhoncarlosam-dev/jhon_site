import request from "supertest";
import { createApp } from "../src/server/app";

const pageQuery = `
  query Page($slug: String!, $visitorId: String!, $segment: String, $variant: String) {
    page(slug: $slug, visitorId: $visitorId, segment: $segment, variant: $variant) {
      segment
      experiment { id variant }
      blocks {
        __typename
        ... on HeroBlock { title variant segment }
        ... on LocationBlock { temperatureC windKph }
      }
    }
  }
`;

function app() {
  return createApp({
    weather: {
      async get() {
        return { temperatureC: 21, windKph: 9 };
      },
    },
  });
}

test("serves the same hero over REST and GraphQL", async () => {
  const server = app();
  const rest = await request(server)
    .get("/v1/pages/home")
    .set("x-visitor-id", "demo")
    .set("x-variant", "B");
  const gql = await request(server)
    .post("/graphql")
    .send({
      query: pageQuery,
      variables: {
        slug: "home",
        visitorId: "demo",
        segment: "visitor",
        variant: "B",
      },
    });

  expect(rest.status).toBe(200);
  expect(rest.body.experiment).toEqual({ id: "home-hero", variant: "B" });
  expect(gql.status).toBe(200);
  expect(gql.body.data.page.blocks[0].title).toBe(rest.body.blocks[0].title);
  expect(gql.body.data.page.blocks[2].temperatureC).toBe(21);
});

test("returns 404 for an unknown page and 400 for a bad lead", async () => {
  const server = app();
  const missing = await request(server).get("/v1/pages/missing");
  expect(missing.status).toBe(404);

  const lead = await request(server).post("/v1/leads").send({ email: "ada" });
  expect(lead.status).toBe(400);
  expect(lead.body.errors.email).toMatch(/valid email/i);
});

test("saves a lead and lists content types", async () => {
  const server = app();
  const lead = await request(server).post("/v1/leads").send({
    email: "ada@portico.test",
    company: "Portico",
    interest: "Testing",
  });
  expect(lead.status).toBe(201);
  expect(lead.body.segment).toBe("subscriber");

  const types = await request(server).get("/v1/content-types");
  expect(types.status).toBe(200);
  expect(
    types.body.contentTypes.map((item: { uid: string }) => item.uid),
  ).toEqual(expect.arrayContaining(["page", "story", "author", "form"]));

  const story = await request(server).get("/v1/stories/experiments");
  expect(story.status).toBe(200);
  expect(story.body.author.name).toBe("Portico desk");
});
