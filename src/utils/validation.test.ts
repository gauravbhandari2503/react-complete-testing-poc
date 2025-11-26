import { describe, it, expect } from 'vitest';
import {
	isValidEmail,
	isValidPhone,
	isRequired,
	minLength,
	maxLength,
	validateName,
	validateEmail,
	validatePhone,
	validateMessage
} from './validation';

describe('Validation Utilities', () => {
	describe('isValidEmail', () => {
		it('should validate correct email', () => {
			expect(isValidEmail('test@example.com')).toBe(true);
			expect(isValidEmail('user.name+tag@domain.co')).toBe(true);
		});
		it('should invalidate incorrect email', () => {
			expect(isValidEmail('test@')).toBe(false);
			expect(isValidEmail('test@.com')).toBe(false);
			expect(isValidEmail('test.com')).toBe(false);
			expect(isValidEmail('')).toBe(false);
		});
	});

	describe('isValidPhone', () => {
		it('should validate correct phone numbers', () => {
			expect(isValidPhone('1234567890')).toBe(true);
			expect(isValidPhone('(123) 456-7890')).toBe(true);
			expect(isValidPhone('123-456-7890')).toBe(true);
			expect(isValidPhone('123.456.7890')).toBe(true);
			expect(isValidPhone('+1234567890')).toBe(true);
		});
		it('should invalidate incorrect phone numbers', () => {
			expect(isValidPhone('123')).toBe(false);
			expect(isValidPhone('phone')).toBe(false);
			expect(isValidPhone('')).toBe(false);
		});
	});

	describe('isRequired', () => {
		it('should return true for non-empty strings', () => {
			expect(isRequired('hello')).toBe(true);
			expect(isRequired('  world  ')).toBe(true);
		});
		it('should return false for empty or whitespace strings', () => {
			expect(isRequired('')).toBe(false);
			expect(isRequired('   ')).toBe(false);
		});
	});

	describe('minLength', () => {
		it('should return true if string meets minimum length', () => {
			expect(minLength('hello', 3)).toBe(true);
			expect(minLength('world', 5)).toBe(true);
		});
		it('should return false if string is shorter than minimum', () => {
			expect(minLength('hi', 3)).toBe(false);
			expect(minLength('', 1)).toBe(false);
		});
	});

	describe('maxLength', () => {
		it('should return true if string is within maximum length', () => {
			expect(maxLength('hello', 10)).toBe(true);
			expect(maxLength('world', 5)).toBe(true);
		});
		it('should return false if string exceeds maximum', () => {
			expect(maxLength('hello world', 5)).toBe(false);
			expect(maxLength('toolong', 3)).toBe(false);
		});
	});

	describe('validateName', () => {
		it('should return error for empty name', () => {
			expect(validateName('')).toBe('Name is required');
		});
		it('should return error for short name', () => {
			expect(validateName('A')).toBe('Name must be at least 2 characters');
		});
		it('should return error for long name', () => {
			expect(validateName('A'.repeat(51))).toBe('Name must be less than 50 characters');
		});
		it('should return true for valid name', () => {
			expect(validateName('John Doe')).toBe(true);
		});
	});

	describe('validateEmail', () => {
		it('should return error for empty email', () => {
			expect(validateEmail('')).toBe('Email is required');
		});
		it('should return error for invalid email', () => {
			expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
		});
		it('should return true for valid email', () => {
			expect(validateEmail('test@example.com')).toBe(true);
		});
	});

	describe('validatePhone', () => {
		it('should return error for empty phone', () => {
			expect(validatePhone('')).toBe('Phone number is required');
		});
		it('should return error for invalid phone', () => {
			expect(validatePhone('abc')).toBe('Please enter a valid phone number');
		});
		it('should return true for valid phone', () => {
			expect(validatePhone('123-456-7890')).toBe(true);
		});
	});

	describe('validateMessage', () => {
		it('should return error for empty message', () => {
			expect(validateMessage('')).toBe('Message is required');
		});
		it('should return error for short message', () => {
			expect(validateMessage('short')).toBe('Message must be at least 10 characters');
		});
		it('should return error for long message', () => {
			expect(validateMessage('A'.repeat(501))).toBe('Message must be less than 500 characters');
		});
		it('should return true for valid message', () => {
			expect(validateMessage('This is a valid message.')).toBe(true);
		});
	});
});
