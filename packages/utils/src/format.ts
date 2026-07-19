export type FormatDateStyle = 'short' | 'medium' | 'long' | 'relative';

/**
 * Formats a date using `Intl.DateTimeFormat`, with a `'relative'` style
 * ("3 minutes ago", "in 2 days") powered by `Intl.RelativeTimeFormat` for
 * the common dashboard case of timestamps and activity feeds.
 *
 * @param date - A `Date`, epoch millis, or ISO date string.
 * @param style - `'short'` (1/5/26), `'medium'` (Jan 5, 2026), `'long'`
 *   (January 5, 2026), or `'relative'` (3 hours ago).
 * @param locale - BCP 47 locale tag. Defaults to the runtime's locale.
 *
 * @example
 * formatDate('2026-01-05') // "Jan 5, 2026"
 * formatDate(Date.now() - 60_000, 'relative') // "1 minute ago"
 */
export function formatDate(
  date: Date | number | string,
  style: FormatDateStyle = 'medium',
  locale?: string,
): string {
  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new TypeError(`formatDate: "${String(date)}" is not a valid date`);
  }

  if (style === 'relative') {
    return formatRelativeTime(d, locale);
  }

  const dateStyle: Intl.DateTimeFormatOptions['dateStyle'] =
    style === 'short' ? 'short' : style === 'long' ? 'long' : 'medium';

  return new Intl.DateTimeFormat(locale, { dateStyle }).format(d);
}

function formatRelativeTime(date: Date, locale?: string): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsInUnit] of divisions) {
    if (Math.abs(diffSeconds) >= secondsInUnit || unit === 'second') {
      return rtf.format(Math.round(diffSeconds / secondsInUnit), unit);
    }
  }
  return rtf.format(0, 'second');
}

/**
 * Formats a number as currency using `Intl.NumberFormat`.
 *
 * @param value - The numeric amount.
 * @param currency - ISO 4217 currency code, e.g. `'USD'`, `'EUR'`, `'INR'`.
 * @param locale - BCP 47 locale tag. Defaults to the runtime's locale.
 *
 * @example
 * formatCurrency(1999.9, 'USD') // "$1,999.90"
 * formatCurrency(45000, 'INR', 'en-IN') // "₹45,000.00"
 */
export function formatCurrency(value: number, currency = 'USD', locale?: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export type FormatNumberStyle = 'standard' | 'compact' | 'percent';

/**
 * Formats a plain number, optionally in compact notation (1.2K, 3.4M) —
 * the form KPI cards and stat widgets need for large metrics.
 *
 * @example
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234567, 'compact') // "1.2M"
 * formatNumber(0.42, 'percent') // "42%"
 */
export function formatNumber(
  value: number,
  style: FormatNumberStyle = 'standard',
  locale?: string,
): string {
  if (style === 'compact') {
    return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(
      value,
    );
  }
  if (style === 'percent') {
    return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(
      value,
    );
  }
  return new Intl.NumberFormat(locale).format(value);
}
