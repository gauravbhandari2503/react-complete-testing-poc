/**
 * Validation utility functions for form inputs
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Validates phone numbers: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1234567890
  const phoneRegex = /^\+?[()]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/;
  return phoneRegex.test(phone);
};

export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const minLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

export const maxLength = (value: string, max: number): boolean => {
  return value.trim().length <= max;
};

export const validateName = (name: string): string | true => {
  if (!isRequired(name)) {
    return 'Name is required';
  }
  if (!minLength(name, 2)) {
    return 'Name must be at least 2 characters';
  }
  if (!maxLength(name, 50)) {
    return 'Name must be less than 50 characters';
  }
  return true;
};

export const validateEmail = (email: string): string | true => {
  if (!isRequired(email)) {
    return 'Email is required';
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return true;
};

export const validatePhone = (phone: string): string | true => {
  if (!isRequired(phone)) {
    return 'Phone number is required';
  }
  if (!isValidPhone(phone)) {
    return 'Please enter a valid phone number';
  }
  return true;
};

export const validateMessage = (message: string): string | true => {
  if (!isRequired(message)) {
    return 'Message is required';
  }
  if (!minLength(message, 10)) {
    return 'Message must be at least 10 characters';
  }
  if (!maxLength(message, 500)) {
    return 'Message must be less than 500 characters';
  }
  return true;
};
