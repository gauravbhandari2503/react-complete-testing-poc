import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../__tests__/utils/test-utils';
import { ContactForm } from './ContactForm';
import Contact from '../../views/Contact';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ContactForm Integration Tests', () => {
  it('completes full form submission workflow', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<Contact />);

    // Verify initial state
    expect(store.getState().userInformation.contacts).toHaveLength(0);

    // Fill out the form
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Jane Smith');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'jane.smith@example.com');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '9876543210');
    await user.type(
      screen.getByRole('textbox', { name: /message/i }),
      'This is an integration test message to verify the complete workflow'
    );

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit contact/i }));

    // Verify Redux store was updated
    await waitFor(() => {
      const state = store.getState();
      expect(state.userInformation.contacts.length).toBeGreaterThan(0);

      const contact = state.userInformation.contacts[0];
      expect(contact.name).toBe('Jane Smith');
      expect(contact.email).toBe('jane.smith@example.com');
      expect(contact.phone).toBe('9876543210');
      expect(contact.message).toContain('integration test');
      expect(contact.id).toBeDefined();
      expect(contact.createdAt).toBeDefined();
    });
  });

  it('handles multiple form submissions', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ContactForm />);

    // First submission
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'User One');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'user1@example.com');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '1111111111');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'First message from user one');
    await user.click(screen.getByRole('button', { name: /submit contact/i }));

    await waitFor(() => {
      expect(store.getState().userInformation.contacts).toHaveLength(1);
    });

    // Second submission
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'User Two');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'user2@example.com');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '2222222222');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Second message from user two');
    await user.click(screen.getByRole('button', { name: /submit contact/i }));

    await waitFor(() => {
      const contacts = store.getState().userInformation.contacts;
      expect(contacts).toHaveLength(2);
      expect(contacts[0].name).toBe('User One');
      expect(contacts[1].name).toBe('User Two');
    });
  });

  it('validates all fields before submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    // Try to submit without filling any fields
    await user.click(screen.getByRole('button', { name: /submit contact/i }));

    // All required field errors should appear
    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeDefined();
      expect(screen.getByText(/please enter your email/i)).toBeDefined();
      expect(screen.getByText(/please enter your phone number/i)).toBeDefined();
      expect(screen.getByText(/please enter your message/i)).toBeDefined();
    });
  });
});
