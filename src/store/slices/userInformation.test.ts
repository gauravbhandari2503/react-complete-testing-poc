import { describe, it, expect } from 'vitest';
import userInformationReducer, {
  addContact,
  deleteContact,
  updateContact,
  clearContacts,
  setLoading,
  setError,
} from './userInformation';
import type { UserContact } from './userInformation';

const mockContact: Omit<UserContact, 'id' | 'createdAt'> = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  message: 'Test message',
};

const mockContactFull: UserContact = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  message: 'Test message',
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('userInformation Slice', () => {
  it('should return the initial state', () => {
    expect(userInformationReducer(undefined, { type: 'unknown' })).toEqual({
      contacts: [],
      loading: false,
      error: null,
    });
  });

  describe('addContact', () => {
    it('should add a new contact', () => {
      const initialState = {
        contacts: [],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, addContact(mockContact));

      expect(actual.contacts).toHaveLength(1);
      expect(actual.contacts[0]).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'Test message',
      });
      expect(actual.contacts[0].id).toBeDefined();
      expect(actual.contacts[0].createdAt).toBeDefined();
      expect(actual.error).toBeNull();
    });

    it('should add multiple contacts', () => {
      let state = {
        contacts: [],
        loading: false,
        error: null,
      };

      state = userInformationReducer(state, addContact(mockContact));
      state = userInformationReducer(
        state,
        addContact({ ...mockContact, name: 'Jane Doe', email: 'jane@example.com' })
      );

      expect(state.contacts).toHaveLength(2);
      expect(state.contacts[0].name).toBe('John Doe');
      expect(state.contacts[1].name).toBe('Jane Doe');
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact by id', () => {
      const initialState = {
        contacts: [mockContactFull],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, deleteContact('1'));

      expect(actual.contacts).toHaveLength(0);
    });

    it('should not delete if id does not exist', () => {
      const initialState = {
        contacts: [mockContactFull],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, deleteContact('non-existent'));

      expect(actual.contacts).toHaveLength(1);
    });
  });

  describe('updateContact', () => {
    it('should update an existing contact', () => {
      const initialState = {
        contacts: [mockContactFull],
        loading: false,
        error: null,
      };

      const updatedContact: UserContact = {
        ...mockContactFull,
        name: 'John Smith',
        email: 'johnsmith@example.com',
      };

      const actual = userInformationReducer(initialState, updateContact(updatedContact));

      expect(actual.contacts[0].name).toBe('John Smith');
      expect(actual.contacts[0].email).toBe('johnsmith@example.com');
    });

    it('should not update if id does not exist', () => {
      const initialState = {
        contacts: [mockContactFull],
        loading: false,
        error: null,
      };

      const nonExistentContact: UserContact = {
        id: 'non-existent',
        name: 'Non Existent',
        email: 'nonexistent@example.com',
        phone: '9999999999',
        message: 'Test',
        createdAt: '2024-01-01T00:00:00.000Z',
      };

      const actual = userInformationReducer(initialState, updateContact(nonExistentContact));

      expect(actual.contacts).toHaveLength(1);
      expect(actual.contacts[0].name).toBe('John Doe');
    });
  });

  describe('clearContacts', () => {
    it('should clear all contacts', () => {
      const initialState = {
        contacts: [mockContactFull, { ...mockContactFull, id: '2' }],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, clearContacts());

      expect(actual.contacts).toHaveLength(0);
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const initialState = {
        contacts: [],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, setLoading(true));

      expect(actual.loading).toBe(true);
    });

    it('should set loading to false', () => {
      const initialState = {
        contacts: [],
        loading: true,
        error: null,
      };

      const actual = userInformationReducer(initialState, setLoading(false));

      expect(actual.loading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should set an error message', () => {
      const initialState = {
        contacts: [],
        loading: false,
        error: null,
      };

      const actual = userInformationReducer(initialState, setError('An error occurred'));

      expect(actual.error).toBe('An error occurred');
    });

    it('should clear error message', () => {
      const initialState = {
        contacts: [],
        loading: false,
        error: 'Previous error',
      };

      const actual = userInformationReducer(initialState, setError(null));

      expect(actual.error).toBeNull();
    });
  });
});