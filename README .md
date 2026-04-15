# KRAMP Playwright Test Automation Framework

This project contains automated end-to-end tests for the KRAMP web application using Playwright with TypeScript. It follows the Page Object Model (POM) design pattern and supports UI, search, and product detail validations.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv (environment variables)

## Project Structure

```text
ui-tests/
│
├── specs/                 # Test files (auth, search, product)
│   ├── auth.spec.ts
│   ├── search.spec.ts
│   └── product.spec.ts
│
├── pages/                 # Page Object Model (POM)
│   ├── homePage.ts
│   ├── loginPage.ts
│   ├── productPage.ts
│   └── pageManager.ts
│
├── fixtures/              # Custom Playwright fixtures
│   └── authTest.ts
│
├── data/                  # Test data (JSON)
│   └── testData.json
│
├── playwright.config.ts
├── package.json
└── .env.example
```

## Prerequisites

Before running tests, ensure you have installed:

- Node.js (>= 18)
- npm (>= 9)
- Git
- Access credentials for:
  - UI Login
  - HTTP Basic Authentication (if applicable)

## Environment Setup

Create a `.env` file in the project root:

```bash
touch .env
```

Add following variables to the .env file

UI_USER=your_ui_username
UI_PASS=your_ui_password

HTTP_USER=your_http_username
HTTP_PASS=your_http_password

## Installation

Install project dependencies:

```bash
npm install
```

```Install playwright
npx playwright install
```

##Key Features
Page Object Model POM for modular, maintainable page logic.

Data Driven Testing DDT using testData.json for reusable test inputs.

Localization Support via localization.json and localizationHelper.ts.

Reusable Fixtures (baseTest.ts, authTest.ts) for consistent setup and authenticated flows.

Stable Selectors using data-testid and user-facing locators (getByRole, getByText) where appropriate.

Cookie Management utilities to accept and persist cookies across tests.

Headed and Headless Modes and Debug support.

CI/CD Integration with GitHub Actions to build images, run smoke tests, and upload artifacts.

```Prerequisites
Node.js v18 or later
```

npm v9 or later

```
Git
```

```Installation
Clone repository
```

git clone <your-repo-url>
cd kramp-playwright
Install dependencies

```npm install
Install Playwright browsers
```

```npx playwright install
Install dotenv
```

```npm install dotenv
Environment Setup
Create a .env file in the project root and add credentials and configuration:
```

```env
UI_USER=your_ui_username
UI_PASS=your_ui_password
HTTP_USER=your_http_username
HTTP_PASS=your_http_password
```

```Run All Tests
npx playwright test
```

```Run a specific test file
npx playwright test ui-tests/specs/product.spec.ts
```

```Run tests in Chromium only
npx playwright test --project=chromium
```

```Run tests in headed mode
npx playwright test --headed
```

```Show last HTML report
npx playwright show-report
```
