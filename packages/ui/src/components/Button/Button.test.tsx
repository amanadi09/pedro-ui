import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('renders as a native <button type="button"> by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('forwards the ref to the underlying <button> element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is activatable via keyboard (Enter and Space)', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('is disabled and unclickable when disabled is passed', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets aria-busy and disables the button while isLoading', () => {
    render(<Button isLoading>Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('announces loadingText to screen readers via an aria-live region while loading', () => {
    render(
      <Button isLoading loadingText="Saving changes">
        Save
      </Button>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Saving changes');
  });

  it('renders left and right icon slots', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        Continue
      </Button>,
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth as w-full', () => {
    render(<Button fullWidth>Submit</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('merges a custom className without dropping the base styles', () => {
    render(<Button className="mt-4">Save</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('mt-4');
    expect(button).toHaveClass('inline-flex');
  });

  it.each(['solid', 'outline', 'ghost', 'link'] as const)(
    'renders the %s variant without throwing',
    (variant) => {
      render(<Button variant={variant}>Action</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );

  it.each(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const)(
    'renders the %s colorScheme without throwing',
    (colorScheme) => {
      render(<Button colorScheme={colorScheme}>Action</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    },
  );
});
