# KRAMP Playwright Test Automation Framework

Automated end-to-end tests for the KRAMP demo application using Playwright Test and TypeScript. Tests follow the Page Object Model (POM), use custom Playwright fixtures for consistent setup, and produce artifact reports for debugging.

## Quick start

Prerequisites:

- Node.js (>= 18) and npm (>= 9)
- Git
- Docker (optional for containerized runs)

Local setup:

```bash
git clone <your-repo-url>
cd kramp-playwright
npm ci
npx playwright install --with-deps
```

Create a `.env` file in the project root and add credentials (do not commit `.env`):

```env
UI_USER=your_ui_username
UI_PASS=your_ui_password
BASIC_AUTH_USER=your_basic_auth_user
BASIC_AUTH_PASS=your_basic_auth_pass
```

Run tests:

```bash
# Run all tests
npx playwright test

# Run Chromium only
npx playwright test --project=chromium

# Run a single spec
npx playwright test ui-tests/specs/search.spec.ts

# Headed mode for debugging
npx playwright test --headed

# Show the latest HTML report
npx playwright show-report
```

## Project layout

```
ui-tests/
  specs/            # test suites (auth, search, product)
  pages/            # Page objects (Home, Login, etc.)
  fixtures/         # baseTest, authTest fixtures
  utils/            # helpers (cookie, localization)
  data/             # testData.json
playwright.config.ts
package.json
Jenkinsfile
Dockerfile
.dockerignore
```

## What this repo provides

- Page Object Model: separates page actions and selectors from test logic.
- Fixtures: `baseTest` and `authTest` centralize context/page creation and authenticated contexts.
- Robust waits & patterns: `Promise.all([waitForURL, click])`, `Promise.race`, explicit `expect` timeouts.
- Artifacts: traces, screenshots, videos, and an HTML report for failure triage.

## CI & Docker notes

- `playwright.config.ts` reacts to `process.env.CI` (forbidOnly, retries, workers) to enable CI behavior.
- A `Dockerfile` is included for running tests in a reproducible container. The `Jenkinsfile` demonstrates a pipeline that builds the image and runs tests.
- In CI don’t use `.env` files; provide credentials via the CI secret store (Jenkins credentials, GitHub Actions secrets, etc.).

## Debugging tips

- Use `--headed` and `--debug` modes for step debugging.
- Use `npx playwright show-report` to open the HTML report and inspect traces/screenshots/videos.

## Contributing notes

- (`baseTest` + `authTest`), the POM structure, and anti‑flakiness patterns (explicit waits and Promise patterns).
- Small known issues: a removed duplicate fixture file, a non‑standard `pressSequentially` call in `homePage.ts` (replace with `locator.type()`), and a silent catch in cookie helper (consider logging).

---
