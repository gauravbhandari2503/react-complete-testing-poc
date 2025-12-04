---
agent: 'agent'
model: Claude Sonnet 4.5 (copilot)
argument-hint: 'Generate test cases for the provided file as per project conventions'
tools: ['search/codebase', 'edit']
description: 'Generate or update test cases for a given file as per project testing strategy'
---

Your goal is to generate or update test cases for a given file in this project, following our established testing strategy and patterns.

## Instructions
- For any provided file (component, hook, utility, etc.), generate test cases that match our project's conventions and best practices.
- Always refer to the documentation in [docs/testing-strategy.md](../docs/testing-strategy.md) for:
	- Test file placement and naming
	- Use of Vitest and React Testing Library
	- AAA pattern (Arrange, Act, Assert)
	- Coverage goals and what to test
	- Use of custom test utilities (e.g., `renderWithProviders`)
	- Mocking browser APIs and global objects as needed
- Ensure new tests are consistent with existing examples (see `src/components/Button/Button.test.tsx`, `src/components/Form/ContactForm.test.tsx`, etc.).
- Target at least 70% coverage for statements, branches, functions, and lines.
- Avoid testing implementation details, third-party internals, or trivial code.

## Context
The full testing strategy is available in [docs/testing-strategy.md](../docs/testing-strategy.md). Always use this as your reference for writing or updating test cases.
