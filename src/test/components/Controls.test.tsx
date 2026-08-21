import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controls } from '../../components/Controls';
import { SplitterType } from '../../types';

describe('Controls', () => {
  const mockProps = {
    splitter: 'Recursive Character Splitter' as SplitterType,
    onSplitterChange: vi.fn(),
    chunkSize: 25,
    onChunkSizeChange: vi.fn(),
    chunkOverlap: 0,
    onChunkOverlapChange: vi.fn(),
  };

  it('should render all splitter options', () => {
    render(<Controls {...mockProps} />);
    expect(screen.getByText('Recursive Character')).toBeInTheDocument();
    expect(screen.getByText('Character Splitter')).toBeInTheDocument();
    expect(screen.getByText('Sentence Splitter')).toBeInTheDocument();
    expect(screen.getByText('Token-based')).toBeInTheDocument();
    expect(screen.getByText('Markdown / Structure')).toBeInTheDocument();
    expect(screen.getByText('Document Structure')).toBeInTheDocument();
  });

  it('should call onSplitterChange when splitter is clicked', () => {
    render(<Controls {...mockProps} />);
    const sentenceSplitter = screen.getByText('Sentence Splitter');
    fireEvent.click(sentenceSplitter);
    expect(mockProps.onSplitterChange).toHaveBeenCalledWith('Sentence Splitter');
  });

  it('should display current chunk size', () => {
    render(<Controls {...mockProps} />);
    const chunkSizeInput = screen.getAllByDisplayValue('25');
    expect(chunkSizeInput.length).toBeGreaterThan(0);
  });

  it('should call onChunkSizeChange when input changes', () => {
    render(<Controls {...mockProps} />);
    const chunkSizeInputs = screen.getAllByDisplayValue('25');
    const numberInput = chunkSizeInputs.find((el) => el.getAttribute('type') === 'number');
    if (numberInput) {
      fireEvent.change(numberInput, { target: { value: '50' } });
      expect(mockProps.onChunkSizeChange).toHaveBeenCalledWith(50);
    }
  });

  it('should display current chunk overlap', () => {
    const props = { ...mockProps, chunkOverlap: 5 };
    render(<Controls {...props} />);
    const overlapInputs = screen.getAllByDisplayValue('5');
    const numberInput = overlapInputs.find((el) => el.getAttribute('type') === 'number');
    expect(numberInput).toBeInTheDocument();
  });

  it('should call onChunkOverlapChange when input changes', () => {
    const props = { ...mockProps, chunkOverlap: 5 };
    render(<Controls {...props} />);
    const overlapInputs = screen.getAllByDisplayValue('5');
    const numberInput = overlapInputs.find((el) => el.getAttribute('type') === 'number');
    if (numberInput) {
      fireEvent.change(numberInput, { target: { value: '10' } });
      expect(props.onChunkOverlapChange).toHaveBeenCalledWith(10);
    }
  });

  it('should render preset size buttons', () => {
    render(<Controls {...mockProps} />);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('should call onChunkSizeChange when preset is clicked', () => {
    render(<Controls {...mockProps} />);
    const preset100 = screen.getByText('100');
    fireEvent.click(preset100);
    expect(mockProps.onChunkSizeChange).toHaveBeenCalledWith(100);
  });

  it('should display overlap percentage', () => {
    const props = { ...mockProps, chunkSize: 100, chunkOverlap: 25 };
    render(<Controls {...props} />);
    expect(screen.getByText(/25%/i)).toBeInTheDocument();
  });

  it('should show LangChain Docs link', () => {
    render(<Controls {...mockProps} />);
    const link = screen.getByText('LangChain Docs');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://python.langchain.com/docs/concepts/text_splitters/');
  });
});
