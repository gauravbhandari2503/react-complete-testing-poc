import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../__tests__/utils/test-utils';
import Users from './Users';
import { addContact } from '../store/slices/userInformation';
import type { UserContact } from '../store/slices/userInformation';

describe('Users Page', () => {
  it('renders empty state when no contacts', () => {
    renderWithProviders(<Users />);

    expect(screen.getByText(/no contacts found/i)).toBeDefined();
    expect(screen.getByText(/add your first contact/i)).toBeDefined();
  });

  it('renders contacts table with data', async () => {
    const mockContact: Omit<UserContact, 'id' | 'createdAt'> = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'Test message',
    };

    const { store } = renderWithProviders(<Users />);

    // Add a contact to the store
    store.dispatch(addContact(mockContact));

    // Wait for the contact to appear in the table
    expect(await screen.findByText('John Doe')).toBeDefined();
    expect(screen.getByText('john@example.com')).toBeDefined();
    expect(screen.getByText('1234567890')).toBeDefined();
  });

  it('displays total contact count', async () => {
    const { store } = renderWithProviders(<Users />);

    // Add multiple contacts
    store.dispatch(addContact({
      name: 'User 1',
      email: 'user1@example.com',
      phone: '1111111111',
      message: 'Message 1',
    }));

    store.dispatch(addContact({
      name: 'User 2',
      email: 'user2@example.com',
      phone: '2222222222',
      message: 'Message 2',
    }));

    // Wait for the UI to update with the new store state
    expect(await screen.findByText(/total contacts:/i)).toBeDefined();
    expect(screen.getByText('2')).toBeDefined();
  });

  it('renders page heading', () => {
    renderWithProviders(<Users />);

    expect(screen.getByRole('heading', { name: /user contacts/i })).toBeDefined();
  });
});
