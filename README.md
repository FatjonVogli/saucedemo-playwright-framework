# Playwright + TypeScript – E2E & API Framework

UI tests against [saucedemo.com](https://www.saucedemo.com/) and API tests against [jsonplaceholder](https://jsonplaceholder.typicode.com/).

## Architecture
```
UI:   Test (tests/ui) → Page (src/pages) → Locators (src/locators) → BasePage (src/base)
API:  Test (tests/api) → API client (src/api) → BaseApi (src/base)
Auth: setup project (tests/setup) logs in once per user → storageState in playwright/.auth/
```
Pages and API clients are injected into tests through custom fixtures (`src/fixtures/index.ts`).

## Install
```bash
npm run setup          # npm install + Chromium
cp .env.example .env   # URLs, users and password for the targets
```

## Run
| Command | Purpose |
|---|---|
| `npm test` | Full suite (setup + UI + API) |
| `npm run test:ui` / `npm run test:api` | One layer |
| `npm run test:smoke` / `npm run test:regression` | By tag |
| `npx playwright test tests/ui/checkout.spec.ts` | Single file |
| `npx playwright test tests/ui/checkout.spec.ts:7` | Single test by line |
| `npx playwright test -g "user matches the user contract"` | Single test by title |
| `npm run test:headed` / `npm run test:debug` | See the browser / Inspector |
| `npm run check` | TypeScript check |

## Report
```bash
npm run report         # opens playwright-report/index.html
```
Traces, screenshots and videos are kept for failed tests and open from the report.

## Test coverage
| Area | Tests |
|---|---|
| Checkout (`standard_user`) | Two items to overview; item prices, item total, 8% tax and total are calculated from the item prices shown on the overview |
| Checkout (`problem_user`) | Same test, marked as a known defect (expected failure) |
| `GET /users/{id}` | Response validated against a JSON schema (Ajv); 404 for unknown id; schema rejects a broken payload |
| `POST /posts` + `GET` | Create returns 201 and echoes the payload with a new id; created post is not persisted (404); existing post reads back |

## Design decisions
- **Layered POM**: locators, user actions and tests are separated; tests never contain selectors, URLs or `request.get()` calls. The API layer is typed (`User`, `Post`, `ApiResult<T>`).
- **Auth once**: a `setup` project logs in `standard_user` and `problem_user` and saves the browser state (cookies, local storage) to a storageState file per user. The UI tests load that file and start already logged in, so no login steps are inside the test; login is a precondition, not what the checkout test checks.
- **Calculated totals**: prices are read from the UI and totals computed in cents, so no expected amount is hard coded; only the 8% tax rate is static data.
- **problem_user** runs the same test wrapped in `test.fail()` with a description of the defect. It stays visible in the report as an expected failure, does not break the build, and turns red the moment the bug is fixed, so the marker cannot silently go stale (`skip`/`fixme` would hide both the bug and its fix).
- **Non-persisting POST**: jsonplaceholder answers `201` with `id: 101` but `GET /posts/101` returns `404`. The test asserts what the service guarantees: the POST echoes the payload with a new id, and the read-back returns 404. Both are documented in the test (annotation). Against a real backend the read-back would assert equality with the created post.
- **Deliberately skipped**: separate login tests (login runs only in the setup project), completing the order, cross-browser projects and the optional extras.
- **At 500 tests / five engineers**: split fixtures per domain, give each test its own seeded user/data through the API instead of shared accounts, run sharded in CI with blob reports merged into one HTML report, add lint/format rules and code owners per folder, track known defects by ticket ID in the annotation, and generate API types/schemas from an OpenAPI spec instead of writing them by hand.

## Assumptions
- Saucedemo tax rate is 8% of the item total, rounded to cents.
- The two products used (Backpack, Bike Light) stay in the catalogue.
- `problem_user`'s checkout failure is a known, accepted defect, not a test bug.
- jsonplaceholder is a read-only fake; its 404 on read-back is expected behavior, not a defect.
- Public demo credentials live in `.env.example` for convenience; real credentials would only be in `.env` or CI secrets.
