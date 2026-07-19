import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@nova-ui/utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  /** A single focusable/hoverable element — Tooltip clones it to attach handlers and aria-describedby, so it doesn't add an extra wrapping DOM node around your trigger. */
  children: ReactElement;
  placement?: TooltipPlacement;
  /** Delay before showing, in ms. Default `300` — long enough to avoid flashing on incidental mouse-overs, short enough to feel responsive. */
  delayMs?: number;
  disabled?: boolean;
}

const placementStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 mr-0 ml-2 -translate-y-1/2',
};

const motionOrigin: Record<TooltipPlacement, { x?: number; y?: number }> = {
  top: { y: 4 },
  bottom: { y: -4 },
  left: { x: 4 },
  right: { x: -4 },
};

/**
 * A lightweight hover/focus tooltip, positioned relative to its trigger
 * with plain CSS (no viewport collision detection) — appropriate for the
 * common case of a tooltip near the center of the screen. For a trigger
 * that can sit at a viewport edge (e.g. inside a scrolling data grid),
 * pair this pattern with a floating-ui-based positioner instead; that's
 * intentionally not a Nova UI dependency yet, see ROADMAP.
 *
 * a11y: shows on both `mouseenter`/`mouseleave` *and* `focus`/`blur`, so
 * keyboard users see it too, not just mouse users. The trigger gets
 * `aria-describedby` pointing at the tooltip content, and the tooltip
 * itself is `role="tooltip"`.
 *
 * @example
 * <Tooltip content="Copy to clipboard">
 *   <IconButton aria-label="Copy" icon={<Copy />} />
 * </Tooltip>
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  delayMs = 300,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipId = useId();

  if (!isValidElement<Record<string, unknown>>(children)) return children;

  const show = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const trigger = cloneElement(children, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    'aria-describedby': visible ? tooltipId : undefined,
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      <AnimatePresence>
        {visible && !disabled && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, ...motionOrigin[placement] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...motionOrigin[placement] }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={cn(
              'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-caption text-white shadow-md dark:bg-neutral-50 dark:text-neutral-900',
              placementStyles[placement],
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
