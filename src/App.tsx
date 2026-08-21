import { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Explanation } from './components/Explanation';
import { TextArea } from './components/TextArea';
import { Controls } from './components/Controls';
import { Statistics } from './components/Statistics';
import { ChunkVisualization } from './components/ChunkVisualization';
import { WhatsGoingOn } from './components/WhatsGoingOn';
import { SplitterType, ChunkStats } from './types';
import { computeChunks } from './utils/chunking';
import { debounce } from './utils/debounce';

const DEFAULT_SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. Chunking is a process of splitting large text into smaller, meaningful pieces. This helps LLMs process information within context windows efficiently. Modern RAG systems rely heavily on finding the right chunking strategy to balance context and relevance. If chunks are too small, they lose meaning. If they are too large, they might introduce noise or exceed limits.`;

export default function App() {
  const [text, setText] = useState<string>(DEFAULT_SAMPLE_TEXT);
  const [debouncedText, setDebouncedText] = useState<string>(DEFAULT_SAMPLE_TEXT);
  const [splitter, setSplitter] = useState<SplitterType>('Recursive Character Splitter');
  const [chunkSize, setChunkSize] = useState<number>(25);
  const [chunkOverlap, setChunkOverlap] = useState<number>(0);

  // Debounced text update for performance
  const debouncedSetText = useCallback(
    debounce((value: string) => setDebouncedText(value), 300),
    []
  );

  // Update debounced text when text changes
  useEffect(() => {
    debouncedSetText(text);
  }, [text, debouncedSetText]);

  // Compute chunks reactively using debounced text
  const chunks = useMemo(() => {
    return computeChunks(debouncedText, splitter, chunkSize, chunkOverlap);
  }, [debouncedText, splitter, chunkSize, chunkOverlap]);

  // Compute statistics
  const stats: ChunkStats = useMemo(() => {
    const totalChars = text.length;
    const numChunks = chunks.length;
    let avgChunkSize: number | string = 'NaN';

    if (numChunks > 0) {
      const sum = chunks.reduce((acc, c) => acc + c.charCount, 0);
      avgChunkSize = Math.round(sum / numChunks);
    }

    return {
      totalChars,
      numChunks,
      avgChunkSize,
    };
  }, [text, chunks]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[350px] h-[350px] bg-gradient-to-r from-indigo-100/30 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-2/3 -right-32 w-[350px] h-[350px] bg-gradient-to-l from-amber-100/30 to-transparent blur-3xl rounded-full" />
      </div>

      <main className="max-w-[880px] w-full flex flex-col items-center gap-3 relative z-10">
        {/* 1. Header */}
        <Header />

        {/* 2. Introduction */}
        <Intro />

        {/* 3. Explain Like I'm 5 Accordion */}
        <Explanation />

        {/* 4. Main Textarea & Upload */}
        <TextArea
          value={text}
          onChange={setText}
          onResetSample={() => setText(DEFAULT_SAMPLE_TEXT)}
        />

        {/* 5. Controls */}
        <Controls
          splitter={splitter}
          onSplitterChange={setSplitter}
          chunkSize={chunkSize}
          onChunkSizeChange={(val) => {
            setChunkSize(val);
            const maxOverlap = Math.max(0, Math.floor((val - 1) * 0.49));
            if (chunkOverlap > maxOverlap) {
              setChunkOverlap(maxOverlap);
            }
          }}
          chunkOverlap={chunkOverlap}
          onChunkOverlapChange={setChunkOverlap}
        />

        {/* 6. Statistics */}
        <Statistics stats={stats} />

        {/* 7. Chunk Visualization */}
        <ChunkVisualization chunks={chunks} rawText={text} />

        {/* 8. What's going on here? */}
        <WhatsGoingOn />

        {/* Modern Minimal Footer */}
        <footer className="mt-10 mb-4 text-center text-xs text-slate-400">
          <p>ChunkLab • Built for AI engineers and RAG practitioners</p>
        </footer>
      </main>
    </div>
  );
}
