import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface UserContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface UserInformationState {
  contacts: UserContact[];
  loading: boolean;
  error: string | null;
}

const initialState: UserInformationState = {
  contacts: [],
  loading: false,
  error: null,
};

const userInformationSlice = createSlice({
  name: 'userInformation',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<UserContact, 'id' | 'createdAt'>>) => {
      const newContact: UserContact = {
        ...action.payload,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      };
      state.contacts.push(newContact);
      state.error = null;
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateContact: (state, action: PayloadAction<UserContact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    clearContacts: (state) => {
      state.contacts = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  updateContact,
  clearContacts,
  setLoading,
  setError,
} = userInformationSlice.actions;

export default userInformationSlice.reducer;
