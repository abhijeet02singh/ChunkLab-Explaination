import { ChunkItem, SplitterType } from '../types';

export interface ChunkColorDef {
  bg: string;
  border: string;
}

export const PASTEL_COLOR_DEFS: ChunkColorDef[] = [
  { bg: '#dbeafe', border: '#93c5fd' }, // blue-100 / blue-300
  { bg: '#dcfce7', border: '#86efac' }, // green-100 / green-300
  { bg: '#fef9c3', border: '#fde047' }, // yellow-100 / yellow-300
  { bg: '#fee2e2', border: '#fca5a5' }, // red-100 / red-300
  { bg: '#f3e8ff', border: '#d8b4fe' }, // purple-100 / purple-300
  { bg: '#fce7f3', border: '#f9a8d4' }, // pink-100 / pink-300
  { bg: '#ffedd5', border: '#fdba74' }, // orange-100 / orange-300
  { bg: '#ccfbf1', border: '#5eead4' }, // teal-100 / teal-300
  { bg: '#e0e7ff', border: '#a5b4fc' }, // indigo-100 / indigo-300
  { bg: '#e2e8f0', border: '#94a3b8' }, // slate-200 / slate-400
  { bg: '#d1fae5', border: '#6ee7b7' }, // emerald-100 / emerald-300
  { bg: '#cffafe', border: '#67e8f9' }, // cyan-100 / cyan-300
  { bg: '#ffe4e6', border: '#fda4af' }, // rose-100 / rose-300
  { bg: '#fef3c7', border: '#fcd34d' }, // amber-100 / amber-300
  { bg: '#ecfccb', border: '#bef264' }, // lime-100 / lime-300
];

export function getChunkColorDef(index: number): ChunkColorDef {
  return PASTEL_COLOR_DEFS[index % PASTEL_COLOR_DEFS.length];
}

export function getChunkColor(index: number): string {
  return getChunkColorDef(index).bg;
}


/**
 * 1. Character Splitter
 * Splits strictly based on character count with overlap.
 */
export function splitByCharacters(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const chunks: ChunkItem[] = [];
  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);
  const step = Math.max(1, chunkSize - safeOverlap);

  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    const end = Math.min(text.length, start + chunkSize);
    const chunkText = text.slice(start, end);

    const colorDef = getChunkColorDef(chunkIndex);
    chunks.push({
      id: chunkIndex + 1,
      text: chunkText,
      start,
      end,
      charCount: chunkText.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    });

    if (end >= text.length) break;
    start += step;
    chunkIndex++;
  }

  return chunks;
}

/**
 * 2. Recursive Character Splitter
 * Recursively splits by ['\n\n', '\n', ' ', ''] and merges pieces up to chunkSize with chunkOverlap.
 */
export function splitRecursive(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);
  const separators = ['\n\n', '\n', ' ', ''];

  function splitText(content: string, currentSeparators: string[]): string[] {
    const finalChunks: string[] = [];
    let separator = currentSeparators[currentSeparators.length - 1];
    let newSeparators: string[] = [];

    for (let i = 0; i < currentSeparators.length; i++) {
      const sep = currentSeparators[i];
      if (sep === '') {
        separator = sep;
        break;
      }
      if (content.includes(sep)) {
        separator = sep;
        newSeparators = currentSeparators.slice(i + 1);
        break;
      }
    }

    const splits = separator === '' ? content.split('') : content.split(separator);

    const goodSplits: string[] = [];
    for (const s of splits) {
      if (s.length < chunkSize) {
        goodSplits.push(s);
      } else {
        if (goodSplits.length > 0) {
          const merged = mergeSplits(goodSplits, separator);
          finalChunks.push(...merged);
          goodSplits.length = 0;
        }
        if (newSeparators.length === 0) {
          // If no more separators, split by characters
          finalChunks.push(s);
        } else {
          const otherInfo = splitText(s, newSeparators);
          finalChunks.push(...otherInfo);
        }
      }
    }

    if (goodSplits.length > 0) {
      const merged = mergeSplits(goodSplits, separator);
      finalChunks.push(...merged);
    }

    return finalChunks;
  }

  function mergeSplits(splits: string[], separator: string): string[] {
    const docs: string[] = [];
    const currentDoc: string[] = [];
    let total = 0;

    for (const d of splits) {
      const len = d.length;
      const separatorLen = currentDoc.length > 0 ? separator.length : 0;

      if (total + len + separatorLen > chunkSize) {
        if (currentDoc.length > 0) {
          const doc = currentDoc.join(separator);
          if (doc) docs.push(doc);

          // Pop items while total is greater than safeOverlap
          while (
            total > safeOverlap ||
            (total + len + (currentDoc.length > 0 ? separator.length : 0) > chunkSize && total > 0)
          ) {
            const popped = currentDoc.shift();
            if (popped !== undefined) {
              total -= popped.length + (currentDoc.length > 0 ? separator.length : 0);
            } else {
              break;
            }
          }
        }
      }
      currentDoc.push(d);
      total += len + (currentDoc.length > 1 ? separator.length : 0);
    }

    if (currentDoc.length > 0) {
      const doc = currentDoc.join(separator);
      if (doc) docs.push(doc);
    }

    return docs;
  }

  const rawChunks = splitText(text, separators);

  // Map raw chunk strings back to character index positions in the original text
  const chunks: ChunkItem[] = [];
  let searchIndex = 0;

  for (let i = 0; i < rawChunks.length; i++) {
    const chunkContent = rawChunks[i];
    if (!chunkContent) continue;

    let start = text.indexOf(chunkContent, Math.max(0, searchIndex - safeOverlap - 50));
    if (start === -1) {
      start = text.indexOf(chunkContent, 0);
    }
    if (start === -1) {
      start = searchIndex;
    }
    const end = Math.min(text.length, start + chunkContent.length);
    searchIndex = start + 1;

    const colorDef = getChunkColorDef(chunks.length);
    chunks.push({
      id: chunks.length + 1,
      text: chunkContent,
      start,
      end,
      charCount: chunkContent.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    });
  }

  return chunks;
}

/**
 * 3. Sentence Splitter
 * Splits by sentence boundaries (. ! ?) and groups up to chunkSize with chunkOverlap.
 */
export function splitSentences(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);

  // Match sentences ending in ., !, or ? (preserving sentence terminators)
  const sentenceRegex = /[^.!?\n]+(?:[.!?]+|\n+|$)/g;
  const matches = text.match(sentenceRegex) || [text];

  const sentences = matches
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (sentences.length === 0) return [];

  const rawChunks: string[] = [];
  let currentGroup: string[] = [];
  let currentLength = 0;

  for (const sentence of sentences) {
    // If a single sentence is larger than chunkSize, break it down by character limit
    if (sentence.length > chunkSize) {
      if (currentGroup.length > 0) {
        rawChunks.push(currentGroup.join(' '));
        currentGroup = [];
        currentLength = 0;
      }
      // Subdivide long sentence
      for (let j = 0; j < sentence.length; j += Math.max(1, chunkSize - safeOverlap)) {
        rawChunks.push(sentence.slice(j, j + chunkSize));
      }
      continue;
    }

    const addedLen = currentGroup.length > 0 ? 1 + sentence.length : sentence.length;

    if (currentLength + addedLen > chunkSize && currentGroup.length > 0) {
      rawChunks.push(currentGroup.join(' '));

      // Overlap handling for sentences
      const nextGroup: string[] = [];
      let nextLen = 0;
      for (let k = currentGroup.length - 1; k >= 0; k--) {
        const candidate = currentGroup[k];
        if (nextLen + candidate.length + 1 <= safeOverlap) {
          nextGroup.unshift(candidate);
          nextLen += candidate.length + 1;
        } else {
          break;
        }
      }
      currentGroup = nextGroup;
      currentLength = currentGroup.join(' ').length;
    }

    currentGroup.push(sentence);
    currentLength = currentGroup.join(' ').length;
  }

  if (currentGroup.length > 0) {
    rawChunks.push(currentGroup.join(' '));
  }

  const chunks: ChunkItem[] = [];
  let searchIndex = 0;

  for (let i = 0; i < rawChunks.length; i++) {
    const chunkContent = rawChunks[i];
    if (!chunkContent) continue;

    let start = text.indexOf(chunkContent, Math.max(0, searchIndex - safeOverlap - 50));
    if (start === -1) {
      start = text.indexOf(chunkContent, 0);
    }
    if (start === -1) {
      start = searchIndex;
    }
    const end = Math.min(text.length, start + chunkContent.length);
    searchIndex = start + 1;

    const colorDef = getChunkColorDef(chunks.length);
    chunks.push({
      id: chunks.length + 1,
      text: chunkContent,
      start,
      end,
      charCount: chunkContent.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    });
  }

  return chunks;
}

/**
 * 4. Token-based Splitter
 * Splits text by linguistic tokens (words, sub-words, punctuation) rather than arbitrary characters.
 * Guarantees that words/tokens are never cut in half, grouping tokens to fit within the target size.
 */
export function splitTokenBased(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);

  // Tokenize preserving whitespace and punctuation
  const tokenRegex = /(\s+|[^\s\w]+|\w+)/g;
  const rawTokens: { text: string; start: number; end: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    rawTokens.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  if (rawTokens.length === 0) return [];

  const rawChunks: { text: string; start: number; end: number }[] = [];
  let currentTokens: { text: string; start: number; end: number }[] = [];
  let currentLength = 0;

  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i];

    if (token.text.length > chunkSize && currentTokens.length === 0) {
      rawChunks.push({
        text: token.text,
        start: token.start,
        end: token.end,
      });
      continue;
    }

    if (currentLength + token.text.length > chunkSize && currentTokens.length > 0) {
      const chunkStart = currentTokens[0].start;
      const chunkEnd = currentTokens[currentTokens.length - 1].end;
      const chunkText = text.slice(chunkStart, chunkEnd);

      rawChunks.push({
        text: chunkText,
        start: chunkStart,
        end: chunkEnd,
      });

      // Calculate overlap tokens
      const overlapTokens: { text: string; start: number; end: number }[] = [];
      let overlapLen = 0;
      for (let k = currentTokens.length - 1; k >= 0; k--) {
        const candidate = currentTokens[k];
        if (overlapLen + candidate.text.length <= safeOverlap) {
          overlapTokens.unshift(candidate);
          overlapLen += candidate.text.length;
        } else {
          break;
        }
      }

      currentTokens = [...overlapTokens];
      currentLength = currentTokens.reduce((acc, t) => acc + t.text.length, 0);
    }

    currentTokens.push(token);
    currentLength += token.text.length;
  }

  if (currentTokens.length > 0) {
    const chunkStart = currentTokens[0].start;
    const chunkEnd = currentTokens[currentTokens.length - 1].end;
    const chunkText = text.slice(chunkStart, chunkEnd);
    rawChunks.push({
      text: chunkText,
      start: chunkStart,
      end: chunkEnd,
    });
  }

  return rawChunks.map((c, idx) => {
    const colorDef = getChunkColorDef(idx);
    return {
      id: idx + 1,
      text: c.text,
      start: c.start,
      end: c.end,
      charCount: c.text.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    };
  });
}

/**
 * 5. Markdown/Structure-based Splitter
 * Splits on Markdown structural boundaries (H1 #, H2 ##, H3 ###, code blocks ```, lists -, blockquotes >, horizontal rules ---).
 * Keeps Markdown blocks and sections together whenever possible.
 */
export function splitMarkdownStructure(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);
  const markdownSeparators = [
    '\n# ',
    '\n## ',
    '\n### ',
    '\n#### ',
    '\n```',
    '\n---\n',
    '\n\n',
    '\n- ',
    '\n* ',
    '\n1. ',
    '\n> ',
    '\n',
    ' ',
    '',
  ];

  function splitText(content: string, currentSeparators: string[]): string[] {
    const finalChunks: string[] = [];
    let separator = currentSeparators[currentSeparators.length - 1];
    let newSeparators: string[] = [];

    for (let i = 0; i < currentSeparators.length; i++) {
      const sep = currentSeparators[i];
      if (sep === '') {
        separator = sep;
        break;
      }
      if (content.includes(sep)) {
        separator = sep;
        newSeparators = currentSeparators.slice(i + 1);
        break;
      }
    }

    const splits = separator === '' ? content.split('') : content.split(separator);
    const goodSplits: string[] = [];

    for (let idx = 0; idx < splits.length; idx++) {
      let s = splits[idx];
      if (idx > 0 && separator.startsWith('\n') && separator.trim().length > 0) {
        s = separator.trimStart() + s;
      }

      if (s.length < chunkSize) {
        goodSplits.push(s);
      } else {
        if (goodSplits.length > 0) {
          const merged = mergeSplits(goodSplits, separator);
          finalChunks.push(...merged);
          goodSplits.length = 0;
        }
        if (newSeparators.length === 0) {
          finalChunks.push(s);
        } else {
          const otherInfo = splitText(s, newSeparators);
          finalChunks.push(...otherInfo);
        }
      }
    }

    if (goodSplits.length > 0) {
      const merged = mergeSplits(goodSplits, separator);
      finalChunks.push(...merged);
    }

    return finalChunks;
  }

  function mergeSplits(splits: string[], separator: string): string[] {
    const docs: string[] = [];
    const currentDoc: string[] = [];
    let total = 0;
    const sep = separator.startsWith('\n') ? '\n' : separator;

    for (const d of splits) {
      const len = d.length;
      const separatorLen = currentDoc.length > 0 ? sep.length : 0;

      if (total + len + separatorLen > chunkSize) {
        if (currentDoc.length > 0) {
          const doc = currentDoc.join(sep);
          if (doc) docs.push(doc);

          while (
            total > safeOverlap ||
            (total + len + (currentDoc.length > 0 ? sep.length : 0) > chunkSize && total > 0)
          ) {
            const popped = currentDoc.shift();
            if (popped !== undefined) {
              total -= popped.length + (currentDoc.length > 0 ? sep.length : 0);
            } else {
              break;
            }
          }
        }
      }
      currentDoc.push(d);
      total += len + (currentDoc.length > 1 ? sep.length : 0);
    }

    if (currentDoc.length > 0) {
      const doc = currentDoc.join(sep);
      if (doc) docs.push(doc);
    }

    return docs;
  }

  const rawChunks = splitText(text, markdownSeparators);
  const chunks: ChunkItem[] = [];
  let searchIndex = 0;

  for (let i = 0; i < rawChunks.length; i++) {
    const chunkContent = rawChunks[i];
    if (!chunkContent) continue;

    let start = text.indexOf(chunkContent, Math.max(0, searchIndex - safeOverlap - 50));
    if (start === -1) {
      start = text.indexOf(chunkContent, 0);
    }
    if (start === -1) {
      start = searchIndex;
    }
    const end = Math.min(text.length, start + chunkContent.length);
    searchIndex = start + 1;

    const colorDef = getChunkColorDef(chunks.length);
    chunks.push({
      id: chunks.length + 1,
      text: chunkContent,
      start,
      end,
      charCount: chunkContent.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    });
  }

  return chunks;
}

/**
 * 6. Document Structure Chunking
 * Identifies document architecture: Title, Section Headers (e.g. 1.0, Section 2, Chapter, Article),
 * Tables, Lists, and Paragraphs. Preserves hierarchical document integrity.
 */
export function splitDocumentStructure(
  text: string,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || chunkSize <= 0) return [];

  const safeOverlap = Math.min(Math.max(0, chunkOverlap), chunkSize - 1);
  const docSeparators = [
    '\n\nSECTION ',
    '\n\nSection ',
    '\n\nArticle ',
    '\n\nARTICLE ',
    '\n\nChapter ',
    '\n\n',
    '\n---\n',
    '\n|',
    '\n• ',
    '\n- ',
    '\n',
    '. ',
    ' ',
    '',
  ];

  function splitText(content: string, currentSeparators: string[]): string[] {
    const finalChunks: string[] = [];
    let separator = currentSeparators[currentSeparators.length - 1];
    let newSeparators: string[] = [];

    for (let i = 0; i < currentSeparators.length; i++) {
      const sep = currentSeparators[i];
      if (sep === '') {
        separator = sep;
        break;
      }
      if (content.includes(sep)) {
        separator = sep;
        newSeparators = currentSeparators.slice(i + 1);
        break;
      }
    }

    const splits = separator === '' ? content.split('') : content.split(separator);
    const goodSplits: string[] = [];

    for (let idx = 0; idx < splits.length; idx++) {
      let s = splits[idx];
      if (idx > 0 && separator.startsWith('\n') && separator.trim().length > 0) {
        s = separator.trimStart() + s;
      }

      if (s.length < chunkSize) {
        goodSplits.push(s);
      } else {
        if (goodSplits.length > 0) {
          const merged = mergeSplits(goodSplits, separator);
          finalChunks.push(...merged);
          goodSplits.length = 0;
        }
        if (newSeparators.length === 0) {
          finalChunks.push(s);
        } else {
          const otherInfo = splitText(s, newSeparators);
          finalChunks.push(...otherInfo);
        }
      }
    }

    if (goodSplits.length > 0) {
      const merged = mergeSplits(goodSplits, separator);
      finalChunks.push(...merged);
    }

    return finalChunks;
  }

  function mergeSplits(splits: string[], separator: string): string[] {
    const docs: string[] = [];
    const currentDoc: string[] = [];
    let total = 0;
    const sep = separator.startsWith('\n') ? '\n\n' : separator;

    for (const d of splits) {
      const len = d.length;
      const separatorLen = currentDoc.length > 0 ? sep.length : 0;

      if (total + len + separatorLen > chunkSize) {
        if (currentDoc.length > 0) {
          const doc = currentDoc.join(sep);
          if (doc) docs.push(doc);

          while (
            total > safeOverlap ||
            (total + len + (currentDoc.length > 0 ? sep.length : 0) > chunkSize && total > 0)
          ) {
            const popped = currentDoc.shift();
            if (popped !== undefined) {
              total -= popped.length + (currentDoc.length > 0 ? sep.length : 0);
            } else {
              break;
            }
          }
        }
      }
      currentDoc.push(d);
      total += len + (currentDoc.length > 1 ? sep.length : 0);
    }

    if (currentDoc.length > 0) {
      const doc = currentDoc.join(sep);
      if (doc) docs.push(doc);
    }

    return docs;
  }

  const rawChunks = splitText(text, docSeparators);
  const chunks: ChunkItem[] = [];
  let searchIndex = 0;

  for (let i = 0; i < rawChunks.length; i++) {
    const chunkContent = rawChunks[i];
    if (!chunkContent) continue;

    let start = text.indexOf(chunkContent, Math.max(0, searchIndex - safeOverlap - 50));
    if (start === -1) {
      start = text.indexOf(chunkContent, 0);
    }
    if (start === -1) {
      start = searchIndex;
    }
    const end = Math.min(text.length, start + chunkContent.length);
    searchIndex = start + 1;

    const colorDef = getChunkColorDef(chunks.length);
    chunks.push({
      id: chunks.length + 1,
      text: chunkContent,
      start,
      end,
      charCount: chunkContent.length,
      color: colorDef.bg,
      borderColor: colorDef.border,
    });
  }

  return chunks;
}

export function computeChunks(
  text: string,
  splitter: SplitterType,
  chunkSize: number,
  chunkOverlap: number
): ChunkItem[] {
  if (!text || text.trim() === '') return [];

  const size = Math.max(1, Number(chunkSize) || 25);
  const overlap = Math.max(0, Math.min(size - 1, Number(chunkOverlap) || 0));

  switch (splitter) {
    case 'Recursive Character Splitter':
      return splitRecursive(text, size, overlap);
    case 'Sentence Splitter':
      return splitSentences(text, size, overlap);
    case 'Token-based':
      return splitTokenBased(text, size, overlap);
    case 'Markdown/Structure-based':
      return splitMarkdownStructure(text, size, overlap);
    case 'Document Structure Chunking':
      return splitDocumentStructure(text, size, overlap);
    case 'Character Splitter':
    default:
      return splitByCharacters(text, size, overlap);
  }
}
