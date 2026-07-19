import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';

function Consumer() {
  const { mode, resolvedMode, setMode, toggleMode, highContrast, setHighContrast } = useTheme();
  return (
    <div>
      <p data-testid="mode">{mode}</p>
      <p data-testid="resolved">{resolvedMode}</p>
      <p data-testid="hc">{String(highContrast)}</p>
      <button onClick={() => setMode('dark')}>Set dark</button>
      <button onClick={toggleMode}>Toggle</button>
      <button onClick={() => setHighContrast(!highContrast)}>Toggle HC</button>
    </div>
  );
}

describe('ThemeProvider / useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark', 'hc');
  });

  it('throws a descriptive error when useTheme is called outside a provider', () => {
    // Swallow the expected React error boundary console output for this one assertion.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/outside of a <ThemeProvider>/);
    spy.mockRestore();
  });

  it('defaults to the mode passed as defaultMode', () => {
    render(
      <ThemeProvider defaultMode="dark">
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('setMode updates both mode and resolvedMode, and applies the .dark class', async () => {
    render(
      <ThemeProvider defaultMode="light">
        <Consumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByText('Set dark'));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleMode flips resolvedMode', async () => {
    render(
      <ThemeProvider defaultMode="light">
        <Consumer />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('setHighContrast toggles the .hc class on <html> and updates context', async () => {
    render(
      <ThemeProvider defaultMode="light">
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('hc')).toHaveTextContent('false');
    await userEvent.click(screen.getByText('Toggle HC'));
    expect(screen.getByTestId('hc')).toHaveTextContent('true');
    expect(document.documentElement.classList.contains('hc')).toBe(true);
  });
});
