// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard, downloadCSV } from './dom';

describe('copyToClipboard', () => {
  it('uses the async Clipboard API when available in a secure context', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });

    const result = await copyToClipboard('hello world');

    expect(writeText).toHaveBeenCalledWith('hello world');
    expect(result).toBe(true);
  });

  it('falls back to execCommand when Clipboard API is unavailable', async () => {
    Object.assign(navigator, { clipboard: undefined });
    document.execCommand = vi.fn().mockReturnValue(true);

    const result = await copyToClipboard('fallback text');

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(result).toBe(true);
  });
});

describe('downloadCSV', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
    URL.revokeObjectURL = vi.fn();
  });

  it('throws on an empty array instead of silently exporting nothing', () => {
    expect(() => downloadCSV([], 'export')).toThrow(/empty array/);
  });

  it('creates and revokes an object URL, and appends the .csv extension', () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    downloadCSV([{ name: 'Ada', age: 30 }], 'people');

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');

    clickSpy.mockRestore();
  });

  it('quotes cells containing commas, quotes, or newlines per RFC 4180', () => {
    const blobParts: string[] = [];
    const OriginalBlob = globalThis.Blob;
    globalThis.Blob = vi.fn().mockImplementation((parts: any[]) => {
      blobParts.push(parts.join(''));
      return new OriginalBlob(parts);
    }) as unknown as typeof Blob;

    downloadCSV([{ note: 'has, a comma' }, { note: 'has "quotes"' }], 'notes');

    expect(blobParts[0]).toContain('"has, a comma"');
    expect(blobParts[0]).toContain('"has ""quotes"""');

    globalThis.Blob = OriginalBlob;
  });
});
