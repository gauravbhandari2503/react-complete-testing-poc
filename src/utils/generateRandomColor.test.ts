import { describe, it, expect } from 'vitest';
import { generateRandomColor } from './generateRandomColor';

// Helper to check valid hex color
const isValidHexColor = (color: string) => /^#[0-9A-Fa-f]{6}$/.test(color);

describe('generateRandomColor', () => {
  it('should return a string', () => {
    const color = generateRandomColor();
    expect(typeof color).toBe('string');
  });

  it('should return a valid hex color', () => {
    const color = generateRandomColor();
    expect(isValidHexColor(color)).toBe(true);
  });

  it('should return different colors on multiple calls', () => {
    const color1 = generateRandomColor();
    const color2 = generateRandomColor();
    // Not guaranteed, but highly likely
    expect(color1).not.toBe(color2);
  });

  it('should always start with #', () => {
    const color = generateRandomColor();
    expect(color.startsWith('#')).toBe(true);
  });
});
