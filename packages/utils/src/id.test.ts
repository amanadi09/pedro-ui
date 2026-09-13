import { describe, it, expect } from 'vitest';
import { generateId } from './id';

describe('generateId', () => {
  it('defaults to the "pedro" prefix', () => {
    expect(generateId()).toMatch(/^pedro-\d+$/);
  });

  it('accepts a custom prefix', () => {
    expect(generateId('input')).toMatch(/^input-\d+$/);
  });

  it('never returns the same id twice', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateId()));
    expect(ids.size).toBe(50);
  });
});
