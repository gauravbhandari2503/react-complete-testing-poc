# GitHub Copilot Project Instructions

## Project Overview
This is a React-based proof-of-concept (POC) project focused on demonstrating automated test case writing, structuring, and execution using Vitest in a modern React environment. The project does **not** include any authentication system and is intended for internal demonstration and learning purposes.

## Tech Stack
- **React** (v19)
- **React Router DOM** (v7)
- **Tailwind CSS** for styling
- **Vite** for development and build
- **Vitest** for testing (to be installed and configured)
- **ESLint** for linting
- **TypeScript** for type safety

## Project Structure
```
src/
  assets/      # Static files, images, etc.
  components/  # Reusable React components
  layouts/     # Layout components (e.g., Header, Footer)
  views/       # Page-level components (e.g., Home, About)
  routes/      # Route definitions and logic
```
Other root files:
- `index.html` – Main HTML entry point
- `vite.config.ts` – Vite configuration
- `tsconfig*.json` – TypeScript configuration
- `eslint.config.js` – ESLint configuration
- `package.json` – Project metadata and dependencies

## Testing Guidelines
- All test cases should be written using **Vitest**.
- Store test files alongside their respective components or in a dedicated `__tests__` folder within `src`.
- Follow best practices for test naming, structure, and coverage.
- Use React Testing Library for component testing (recommended).

## Styling Guidelines
- Use **Tailwind CSS** utility classes for all styling.
- Avoid custom CSS unless necessary.

## Future Updates
This file should be updated as the project evolves, especially when new technologies, folders, or major features are introduced.

---
_Last updated: 26 November 2025_
