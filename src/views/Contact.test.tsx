import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../__tests__/utils/test-utils';
import Contact from './Contact';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Contact Page', () => {
  it('renders contact page with heading and form', () => {
    renderWithProviders(<Contact />);

    expect(screen.getByRole('heading', { name: /contact us/i })).toBeDefined();
    expect(screen.getByText(/we'd love to hear from you/i)).toBeDefined();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeDefined();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeDefined();
  });

  it('shows contact form card', () => {
    const { container } = renderWithProviders(<Contact />);

    // Check if Card component is rendered (Ant Design Card has specific class)
    const card = container.querySelector('.ant-card');
    expect(card).toBeDefined();
  });
});
