import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../__tests__/utils/test-utils';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByRole('textbox', { name: /name/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /submit contact/i })).toBeDefined();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit contact/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeDefined();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });

    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeDefined();
    });
  });

  it('submits form with valid data and updates Redux store', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const { store } = renderWithProviders(<ContactForm onSuccess={onSuccess} />);

    // Fill out the form
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '1234567890');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'This is a test message with enough characters');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit contact/i }));

    await waitFor(() => {
      const state = store.getState();
      expect(state.userInformation.contacts.length).toBeGreaterThan(0);
      expect(state.userInformation.contacts[0].name).toBe('John Doe');
      expect(state.userInformation.contacts[0].email).toBe('john@example.com');
    });
  });
});
