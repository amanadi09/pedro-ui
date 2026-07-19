/**
 * Copies text to the clipboard. Uses the async Clipboard API when
 * available (secure contexts) and transparently falls back to a hidden
 * `<textarea>` + `document.execCommand('copy')` for older or non-secure
 * contexts. Resolves `true`/`false` rather than throwing, so callers can
 * drive UI state (e.g. a "Copied!" toast) without a try/catch.
 *
 * Prefer the `useClipboard` hook in `@nova-ui/hooks` inside components —
 * it wraps this with "copied" state and auto-reset already handled.
 *
 * @example
 * const ok = await copyToClipboard(shareUrl);
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const succeeded = document.execCommand('copy');
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}

/**
 * Serializes an array of flat objects to CSV and triggers a browser
 * download. Handles quoting for values containing commas, quotes, or
 * newlines per RFC 4180.
 *
 * @param rows - Array of plain objects; keys become the header row.
 * @param filename - Downloaded file name, `.csv` appended if missing.
 *
 * @example
 * downloadCSV(orders, 'orders-export');
 */
export function downloadCSV<T extends Record<string, unknown>>(rows: T[], filename: string): void {
  if (rows.length === 0) {
    throw new Error('downloadCSV: cannot export an empty array — nothing to write.');
  }

  const headers = Object.keys(rows[0] as object);
  const escapeCell = (value: unknown): string => {
    const str = value === null || value === undefined ? '' : String(value);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const csv = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => headers.map((key) => escapeCell(row[key])).join(',')),
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
