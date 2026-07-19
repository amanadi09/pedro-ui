import { describe, it, expect, vi, afterEach } from 'vitest';
import { sleep, debounce, throttle } from './timing';

afterEach(() => {
  vi.useRealTimers();
});

describe('sleep', () => {
  it('resolves after the given delay', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    sleep(1000).then(spy);
    await vi.advanceTimersByTimeAsync(999);
    expect(spy).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('debounce', () => {
  it('only calls fn once after rapid-fire calls settle', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced('a');
    debounced('b');
    debounced('c');
    vi.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('c');
  });

  it('cancel() prevents a pending call from firing', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    debounced('a');
    debounced.cancel();
    vi.advanceTimersByTime(400);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('throttle', () => {
  it('fires immediately on the leading edge', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 200);
    throttled('first');
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith('first');
  });

  it('drops calls inside the cooldown but fires a trailing call with the latest args', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled('first');
    throttled('second');
    throttled('third');
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('third');
  });
});
