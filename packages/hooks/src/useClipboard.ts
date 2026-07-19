import { useCallback, useRef, useState } from 'react';
import { copyToClipboard } from '@nova-ui/utils';

export type UseClipboardResult = {
  /** Whether the most recent copy succeeded and hasn't yet timed out. */
  copied: boolean;
  /** Copy `text` to the clipboard; resolves the same boolean it sets `copied` to. */
  copy: (text: string) => Promise<boolean>;
};

/**
 * Copies text to the clipboard and tracks a `copied` flag that auto-resets
 * after `resetAfterMs` — exactly the state a "Copy" button with a
 * "Copied!" tooltip needs, with no `setTimeout` bookkeeping in the
 * component itself.
 *
 * @example
 * const { copy, copied } = useClipboard();
 * <Button onClick={() => copy(apiKey)}>{copied ? 'Copied!' : 'Copy'}</Button>
 */
export function useClipboard(resetAfterMs = 2000): UseClipboardResult {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text);
      setCopied(success);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (success) {
        timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
      }
      return success;
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
