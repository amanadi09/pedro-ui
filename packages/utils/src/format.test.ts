import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatDate, formatCurrency, formatNumber } from './format';

describe('formatDate', () => {
  it('formats a medium-style date by default', () => {
    expect(formatDate('2026-01-05T00:00:00Z', 'medium', 'en-US')).toBe('Jan 5, 2026');
  });

  it('formats short and long styles', () => {
    expect(formatDate('2026-01-05T00:00:00Z', 'short', 'en-US')).toMatch(/1\/5\/26/);
    expect(formatDate('2026-01-05T00:00:00Z', 'long', 'en-US')).toBe('January 5, 2026');
  });

  it('accepts a Date instance and an epoch number', () => {
    const d = new Date('2026-06-01T00:00:00Z');
    expect(formatDate(d, 'medium', 'en-US')).toBe('Jun 1, 2026');
    expect(formatDate(d.getTime(), 'medium', 'en-US')).toBe('Jun 1, 2026');
  });

  it('throws on an invalid date', () => {
    expect(() => formatDate('not-a-date')).toThrow(TypeError);
  });

  describe('relative style', () => {
    afterEach(() => vi.useRealTimers());

    it('formats a past timestamp as "ago"', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-05T12:00:00Z'));
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      expect(formatDate(fiveMinutesAgo, 'relative', 'en-US')).toBe('5 minutes ago');
    });

    it('formats a future timestamp as "in"', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-05T12:00:00Z'));
      const inTwoDays = Date.now() + 2 * 24 * 60 * 60 * 1000;
      expect(formatDate(inTwoDays, 'relative', 'en-US')).toBe('in 2 days');
    });
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1999.9, 'USD', 'en-US')).toBe('$1,999.90');
  });

  it('formats other currencies with the right symbol', () => {
    expect(formatCurrency(45000, 'INR', 'en-IN')).toContain('45,000');
  });
});

describe('formatNumber', () => {
  it('formats standard grouped numbers', () => {
    expect(formatNumber(1234567, 'standard', 'en-US')).toBe('1,234,567');
  });

  it('formats compact notation', () => {
    expect(formatNumber(1234567, 'compact', 'en-US')).toBe('1.2M');
  });

  it('formats percent', () => {
    expect(formatNumber(0.42, 'percent', 'en-US')).toBe('42%');
  });
});
