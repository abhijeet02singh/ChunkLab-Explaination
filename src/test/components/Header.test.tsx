import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header', () => {
  it('should render the header', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should display the title', () => {
    render(<Header />);
    expect(screen.getByText(/ChunkLab/i)).toBeInTheDocument();
  });

  it('should display the subtitle', () => {
    render(<Header />);
    expect(screen.getByText(/Visualize, compare, and optimize your RAG text chunks/i)).toBeInTheDocument();
  });
});
