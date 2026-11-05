# Portico — content platform slice

Portfolio project by Jhon Acevedo. This is not a client engagement, and it does not use a paid Contentstack space. The content types follow the same shapes you would create in Contentstack, Contentful, or Strapi.

It is a small marketing page with a Node service behind it:

- The browser requests the home page from Next.js.
- The server component calls `GET /v1/pages/home` with the visitor id and segment.
- Express loads the page entry, migrates it to schema version 2, assigns hero version A or B, and caches the result for 30 seconds.
- The same page is available over GraphQL at `POST /graphql`.
- A dynamic form posts to Next.js, which calls `POST /v1/leads`. A valid lead sets a subscriber cookie, and the hero copy changes.
- Story pages are statically generated from the content module so `next build` does not need the API process. The API also serves those stories at `GET /v1/stories/:slug`.

## Run

```bash
cd proof/content-platform
npm install
npm test
npm run test:e2e
npm run dev
```

Open http://127.0.0.1:3001. The API listens on http://127.0.0.1:4000.

```bash
curl -s http://127.0.0.1:4000/v1/pages/home \
  -H 'x-visitor-id: demo' \
  -H 'x-variant: A'
```

## Where each part lives

| Piece                            | Path                                                      |
| -------------------------------- | --------------------------------------------------------- |
| Content types                    | `content/model.ts`, page `/model`                         |
| Entries and schema migration     | `content/entries.ts`, `content/migrate.ts`                |
| A/B assignment and segment       | `content/personalize.ts`                                  |
| REST, GraphQL, leads             | `src/server/app.ts`                                       |
| Server-rendered page             | `app/page.tsx`                                            |
| Static stories                   | `app/stories/[slug]/page.tsx`                             |
| Reusable blocks and dynamic form | `components/`                                             |
| Open-Meteo and OpenStreetMap     | `content/weather.ts`, `content/map.ts`                    |
| TTL cache                        | `content/cache.ts`                                        |
| Jest and Testing Library         | `__tests__/`, `components/__tests__/`                     |
| Playwright                       | `e2e/home.spec.ts`                                        |
| ESLint, Prettier, CI             | config files and `.github/workflows/content-platform.yml` |

Preview links `/?variant=A` and `/?variant=B` force a version so both copies can be read. A normal visit uses the visitor id cookie and keeps that version.
