import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Statistics } from '../../components/Statistics';
import { ChunkStats } from '../../types';

describe('Statistics', () => {
  const mockStats: ChunkStats = {
    totalChars: 150,
    numChunks: 5,
    avgChunkSize: 30,
  };

  it('should render statistics correctly', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should display total characters', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByText('Total Chars')).toBeInTheDocument();
    const totalChars = screen.getAllByText('150');
    expect(totalChars.length).toBeGreaterThan(0);
  });

  it('should display number of chunks', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByText('Total Chunks')).toBeInTheDocument();
    const numChunks = screen.getAllByText('5');
    expect(numChunks.length).toBeGreaterThan(0);
  });

  it('should display average chunk size', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByText('Avg Chunk Size')).toBeInTheDocument();
    const avgChunkSize = screen.getAllByText('30');
    expect(avgChunkSize.length).toBeGreaterThan(0);
  });

  it('should handle NaN average chunk size', () => {
    const statsWithNaN: ChunkStats = {
      totalChars: 0,
      numChunks: 0,
      avgChunkSize: 'NaN',
    };
    render(<Statistics stats={statsWithNaN} />);
    expect(screen.getByText(/NaN/i)).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    const zeroStats: ChunkStats = {
      totalChars: 0,
      numChunks: 0,
      avgChunkSize: 0,
    };
    render(<Statistics stats={zeroStats} />);
    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });
});
