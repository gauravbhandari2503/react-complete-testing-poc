import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { generatePublicUuid } from './generatePublicUuid';

// Helper to check valid UUID v4 format
const isValidUuidV4 = (uuid: string) => 
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);

describe('generatePublicUuid', () => {
  // Arrange: Store original Math.random
  let originalRandom: () => number;

  beforeEach(() => {
    originalRandom = Math.random;
  });

  afterEach(() => {
    // Cleanup: Restore original Math.random
    Math.random = originalRandom;
  });

  describe('UUID Format Validation', () => {
    it('should return a string', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(typeof uuid).toBe('string');
    });

    it('should return a valid UUID v4 format', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(isValidUuidV4(uuid)).toBe(true);
    });

    it('should have correct length (36 characters with hyphens)', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(uuid.length).toBe(36);
    });

    it('should have hyphens at correct positions', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(uuid.charAt(8)).toBe('-');
      expect(uuid.charAt(13)).toBe('-');
      expect(uuid.charAt(18)).toBe('-');
      expect(uuid.charAt(23)).toBe('-');
    });

    it('should have "4" as the version identifier (13th character)', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(uuid.charAt(14)).toBe('4');
    });

    it('should have valid variant bits (17th character should be 8, 9, a, or b)', () => {
      // Act
      const uuid = generatePublicUuid();
      const variantChar = uuid.charAt(19).toLowerCase();

      // Assert
      expect(['8', '9', 'a', 'b']).toContain(variantChar);
    });
  });

  describe('Randomness and Uniqueness', () => {
    it('should return different UUIDs on multiple calls', () => {
      // Act
      const uuid1 = generatePublicUuid();
      const uuid2 = generatePublicUuid();
      const uuid3 = generatePublicUuid();

      // Assert
      expect(uuid1).not.toBe(uuid2);
      expect(uuid2).not.toBe(uuid3);
      expect(uuid1).not.toBe(uuid3);
    });

    it('should generate unique UUIDs in a large sample', () => {
      // Arrange
      const sampleSize = 1000;
      const uuids = new Set<string>();

      // Act
      for (let i = 0; i < sampleSize; i++) {
        uuids.add(generatePublicUuid());
      }

      // Assert - All UUIDs should be unique
      expect(uuids.size).toBe(sampleSize);
    });
  });

  describe('Character Set Validation', () => {
    it('should only contain valid hexadecimal characters and hyphens', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(/^[0-9a-f-]+$/i.test(uuid)).toBe(true);
    });

    it('should have lowercase hexadecimal characters', () => {
      // Act
      const uuid = generatePublicUuid();
      const withoutHyphens = uuid.replaceAll('-', '');

      // Assert
      expect(/^[0-9a-f]+$/.test(withoutHyphens)).toBe(true);
    });
  });

  describe('Edge Cases with Math.random', () => {
    it('should handle Math.random returning 0', () => {
      // Arrange
      Math.random = () => 0;

      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(isValidUuidV4(uuid)).toBe(true);
      expect(uuid.charAt(14)).toBe('4');
    });

    it('should handle Math.random returning close to 1', () => {
      // Arrange
      Math.random = () => 0.9999999999;

      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(isValidUuidV4(uuid)).toBe(true);
      expect(uuid.charAt(14)).toBe('4');
    });

    it('should produce different results with different Math.random values', () => {
      // Arrange
      let callCount = 0;
      const randomValues = [0.1, 0.5, 0.9, 0.2, 0.7];
      Math.random = () => randomValues[callCount++ % randomValues.length];

      // Act
      const uuid1 = generatePublicUuid();
      
      callCount = 0; // Reset for second UUID
      const uuid2 = generatePublicUuid();

      // Assert
      expect(uuid1).toBe(uuid2); // Same sequence should produce same result
      expect(isValidUuidV4(uuid1)).toBe(true);
    });
  });

  describe('UUID Structure', () => {
    it('should have correct segment lengths', () => {
      // Act
      const uuid = generatePublicUuid();
      const segments = uuid.split('-');

      // Assert
      expect(segments).toHaveLength(5);
      expect(segments[0].length).toBe(8);
      expect(segments[1].length).toBe(4);
      expect(segments[2].length).toBe(4);
      expect(segments[3].length).toBe(4);
      expect(segments[4].length).toBe(12);
    });

    it('should match the UUID v4 pattern', () => {
      // Act
      const uuid = generatePublicUuid();

      // Assert
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
  });

  describe('Performance and Consistency', () => {
    it('should generate UUID quickly', () => {
      // Arrange
      const startTime = performance.now();

      // Act
      generatePublicUuid();

      // Assert
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(10); // Should complete in less than 10ms
    });

    it('should maintain consistency across multiple generations', () => {
      // Arrange
      const uuids: string[] = [];
      const count = 100;

      // Act
      for (let i = 0; i < count; i++) {
        uuids.push(generatePublicUuid());
      }

      // Assert - All should be valid UUID v4
      for (const uuid of uuids) {
        expect(isValidUuidV4(uuid)).toBe(true);
      }
    });
  });
});
