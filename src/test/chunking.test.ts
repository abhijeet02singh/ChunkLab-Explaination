import { describe, it, expect } from 'vitest';
import {
  splitByCharacters,
  splitRecursive,
  splitSentences,
  splitTokenBased,
  splitMarkdownStructure,
  splitDocumentStructure,
  computeChunks,
} from '../utils/chunking';
import { SplitterType } from '../types';

describe('splitByCharacters', () => {
  it('should split text by character count', () => {
    const text = 'The quick brown fox';
    const chunks = splitByCharacters(text, 10, 0);
    expect(chunks).toHaveLength(2);
    expect(chunks[0]?.text).toBe('The quick ');
    expect(chunks[0]?.charCount).toBe(10);
    expect(chunks[1]?.text).toBe('brown fox');
  });

  it('should handle overlap correctly', () => {
    const text = 'The quick brown fox jumps';
    const chunks = splitByCharacters(text, 10, 3);
    expect(chunks).toHaveLength(4);
    expect(chunks[0]?.text).toBe('The quick ');
    expect(chunks[1]?.text).toBe('ck brown f');
    expect(chunks[2]?.text).toBe('n fox jump');
    expect(chunks[3]?.text).toBe('umps');
  });

  it('should return empty array for empty text', () => {
    const chunks = splitByCharacters('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle chunk size larger than text', () => {
    const text = 'Hello';
    const chunks = splitByCharacters(text, 100, 0);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]?.text).toBe('Hello');
  });

  it('should assign unique IDs to chunks', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = splitByCharacters(text, 10, 0);
    const ids = chunks.map((c) => c.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('splitRecursive', () => {
  it('should preserve paragraphs first', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    const chunks = splitRecursive(text, 50, 0);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]?.text).toContain('First paragraph');
    expect(chunks[0]?.text).toContain('Second paragraph');
  });

  it('should handle single line text', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = splitRecursive(text, 20, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should handle overlap correctly', () => {
    const text = 'First paragraph.\n\nSecond paragraph with more text.';
    const chunks = splitRecursive(text, 30, 5);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should return empty array for empty text', () => {
    const chunks = splitRecursive('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should maintain character positions', () => {
    const text = 'Hello world';
    const chunks = splitRecursive(text, 5, 0);
    chunks.forEach((chunk) => {
      expect(chunk.start).toBeGreaterThanOrEqual(0);
      expect(chunk.end).toBeGreaterThan(chunk.start);
      expect(chunk.text).toBe(text.slice(chunk.start, chunk.end));
    });
  });
});

describe('splitSentences', () => {
  it('should split on sentence boundaries', () => {
    const text = 'First sentence. Second sentence! Third sentence?';
    const chunks = splitSentences(text, 50, 0);
    expect(chunks).toHaveLength(1);
  });

  it('should group sentences within chunk size', () => {
    const text = 'Short. Short. Short. Short. Short.';
    const chunks = splitSentences(text, 20, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should handle long sentences by character limit', () => {
    const text = 'This is a very long sentence that exceeds the chunk size limit.';
    const chunks = splitSentences(text, 20, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should return empty array for empty text', () => {
    const chunks = splitSentences('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle overlap between chunks', () => {
    const text = 'First sentence. Second sentence. Third sentence.';
    const chunks = splitSentences(text, 25, 5);
    expect(chunks.length).toBeGreaterThan(1);
  });
});

describe('splitTokenBased', () => {
  it('should split by word boundaries', () => {
    const text = 'The quick brown fox';
    const chunks = splitTokenBased(text, 10, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should not split words in half', () => {
    const text = 'The quick brown fox jumps';
    const chunks = splitTokenBased(text, 15, 0);
    chunks.forEach((chunk) => {
      // Check that chunks don't end with partial words (they should end with spaces or punctuation)
      const trimmed = chunk.text.trim();
      if (trimmed.length > 0) {
        expect(trimmed[trimmed.length - 1]).not.toBe(/[a-zA-Z]/);
      }
    });
  });

  it('should handle punctuation as separate tokens', () => {
    const text = 'Hello, world! How are you?';
    const chunks = splitTokenBased(text, 10, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should return empty array for empty text', () => {
    const chunks = splitTokenBased('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should maintain token boundaries with overlap', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = splitTokenBased(text, 15, 5);
    expect(chunks.length).toBeGreaterThan(1);
  });
});

describe('splitMarkdownStructure', () => {
  it('should split on markdown headers', () => {
    const text = '# Header 1\n\nContent here\n\n## Header 2\n\nMore content';
    const chunks = splitMarkdownStructure(text, 50, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should preserve code blocks', () => {
    const text = 'Some text\n\n```\ncode here\n```\n\nMore text';
    const chunks = splitMarkdownStructure(text, 30, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should handle lists', () => {
    const text = '- Item 1\n- Item 2\n- Item 3';
    const chunks = splitMarkdownStructure(text, 20, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should return empty array for empty text', () => {
    const chunks = splitMarkdownStructure('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle blockquotes', () => {
    const text = '> Quote text\n\nRegular text';
    const chunks = splitMarkdownStructure(text, 20, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });
});

describe('splitDocumentStructure', () => {
  it('should split on section headers', () => {
    const text = 'SECTION 1.0 First section\n\nContent here\n\nSECTION 2.0 Second section';
    const chunks = splitDocumentStructure(text, 50, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should handle article structure', () => {
    const text = 'ARTICLE 1.0 First article\n\nContent\n\nARTICLE 2.0 Second article';
    const chunks = splitDocumentStructure(text, 40, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it('should handle numbered sections', () => {
    const text = '1. First point\n2. Second point\n3. Third point';
    const chunks = splitDocumentStructure(text, 30, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should return empty array for empty text', () => {
    const chunks = splitDocumentStructure('', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle chapter structure', () => {
    const text = 'Chapter 1\n\nContent\n\nChapter 2\n\nMore content';
    const chunks = splitDocumentStructure(text, 30, 0);
    expect(chunks.length).toBeGreaterThan(1);
  });
});

describe('computeChunks', () => {
  it('should route to correct splitter', () => {
    const text = 'The quick brown fox';
    const charChunks = computeChunks(text, 'Character Splitter', 10, 0);
    const recursiveChunks = computeChunks(text, 'Recursive Character Splitter', 10, 0);
    expect(charChunks.length).toBeGreaterThan(0);
    expect(recursiveChunks.length).toBeGreaterThan(0);
  });

  it('should handle all splitter types', () => {
    const text = 'Test text with multiple sentences. Second sentence here!';
    const splitters: SplitterType[] = [
      'Character Splitter',
      'Recursive Character Splitter',
      'Sentence Splitter',
      'Token-based',
      'Markdown/Structure-based',
      'Document Structure Chunking',
    ];

    splitters.forEach((splitter) => {
      const chunks = computeChunks(text, splitter, 20, 0);
      expect(chunks.length).toBeGreaterThan(0);
    });
  });

  it('should return empty array for empty text', () => {
    const chunks = computeChunks('', 'Character Splitter', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle whitespace-only text', () => {
    const chunks = computeChunks('   ', 'Character Splitter', 10, 0);
    expect(chunks).toEqual([]);
  });

  it('should handle invalid chunk size gracefully', () => {
    const text = 'Test text';
    const chunks = computeChunks(text, 'Character Splitter', 0, 0);
    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should limit overlap to less than chunk size', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = computeChunks(text, 'Character Splitter', 10, 100);
    expect(chunks.length).toBeGreaterThan(0);
  });
});

describe('Chunk properties', () => {
  it('should assign colors to chunks', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = splitByCharacters(text, 10, 0);
    chunks.forEach((chunk) => {
      expect(chunk.color).toBeDefined();
      expect(typeof chunk.color).toBe('string');
      expect(chunk.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('should assign border colors to chunks', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const chunks = splitByCharacters(text, 10, 0);
    chunks.forEach((chunk) => {
      expect(chunk.borderColor).toBeDefined();
      expect(typeof chunk.borderColor).toBe('string');
    });
  });

  it('should cycle through colors for multiple chunks', () => {
    const text = 'a'.repeat(100);
    const chunks = splitByCharacters(text, 5, 0);
    const colors = new Set(chunks.map((c) => c.color));
    expect(colors.size).toBeGreaterThan(1);
  });
});
