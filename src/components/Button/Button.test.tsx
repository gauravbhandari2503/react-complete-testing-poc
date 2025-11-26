import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/__tests__/utils/test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(Click me);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(Click me);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(Click me);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(Primary);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
    
    rerender(Secondary);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});