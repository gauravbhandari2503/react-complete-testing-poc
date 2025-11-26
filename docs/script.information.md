# 🧪 Vitest Test Commands Guide

This document explains the available test commands in the project and when to use each one.

## 📌 Available Commands

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:watch": "vitest --watch",
  "test:ci": "vitest run --coverage --reporter=json --reporter=html"
}
```

## 📖 Command Breakdown

### ✅ `npm test` or `npm run test`
Runs Vitest in the default mode.
- **Ideal for:** Local development
- Executes tests and shows results in the terminal
- May use watch mode depending on config

### 🖥️ `npm run test:ui`
Starts Vitest with an interactive UI dashboard in the browser.
- **Helpful for:** Debugging tests visually
- Allows filtering tests, viewing logs, snapshots, failures, etc.
- Great for complex components and visual workflows

### 🚀 `npm run test:run`
Runs all tests once in headless mode.
- **Does not watch** for changes
- Usually used when verifying before a commit
- Faster and cleaner than watch mode

### 📊 `npm run test:coverage`
Runs test suite and generates a coverage report.
- **Includes:**
  - Console summary
  - HTML report (`/coverage/index.html`)
  - JSON + lcov report (for integration tools like Codecov/SonarQube)
- **Useful when:** You want to check how much of the codebase is tested.

### 🔁 `npm run test:watch`
Runs tests in watch mode, automatically rerunning relevant tests when files change.
- **Best for:** Daily development workflow
- Fast feedback loop

### 🏗️ `npm run test:ci`
Runs tests in CI mode.

| Feature | Enabled |
| :--- | :---: |
| Headless mode | ✔ |
| Coverage report | ✔ |
| JSON report for automation | ✔ |
| HTML report for download/viewing | ✔ |
| Used by CI/CD pipelines | ✔ |

This command is intended for:
- GitHub Actions
- Azure Pipelines
- GitLab CI
- Jenkins
- Bitbucket Pipelines

It ensures test results are consistent and fail the pipeline if coverage or tests break.

## 🧠 Summary Table

| Command | Use Case | Mode |
| :--- | :--- | :--- |
| `test` | Normal testing | Dev |
| `test:ui` | Visual debugging | Dev |
| `test:run` | One-time execution (no watch) | Dev/CI |
| `test:coverage` | Generate coverage report | Dev/CI |
| `test:watch` | Continuous testing while coding | Dev |
| `test:ci` | Full reporting for CI pipelines | CI/CD |

## 📎 Notes
- The `coverage/` folder is generated automatically and should not be committed to Git.
- CI systems can upload reports as artifacts for later review.
- Threshold enforcement ensures code quality remains consistent.

## 📌 Recommendation
Use:
- `npm run test:watch` while developing
- `npm run test:coverage` before committing
- `npm run test:ci` during automation and pull requests