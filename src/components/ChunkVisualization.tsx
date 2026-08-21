import { useState } from 'react';
import { ChunkItem } from '../types';
import { Layers, Copy, Check, Eye, Code, ArrowRight } from 'lucide-react';

interface ChunkVisualizationProps {
  chunks: ChunkItem[];
  rawText: string;
}

export function ChunkVisualization({ chunks, rawText }: ChunkVisualizationProps) {
  const [activeChunkId, setActiveChunkId] = useState<number | null>(null);
  const [copiedChunkId, setCopiedChunkId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyChunk = (chunk: ChunkItem) => {
    navigator.clipboard.writeText(chunk.text);
    setCopiedChunkId(chunk.id);
    setTimeout(() => setCopiedChunkId(null), 1500);
  };

  const handleCopyAllJSON = () => {
    const jsonStr = JSON.stringify(
      chunks.map((c) => ({
        id: c.id,
        text: c.text,
        charCount: c.charCount,
        start: c.start,
        end: c.end,
      })),
      null,
      2
    );
    navigator.clipboard.writeText(jsonStr);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  if (!rawText || chunks.length === 0) {
    return (
      <div className="w-full h-[140px] bg-white rounded-2xl border border-dashed border-slate-300 p-6 font-mono text-xs text-slate-400 italic flex flex-col items-center justify-center gap-2 shadow-xs">
        <Layers className="w-6 h-6 text-slate-300" />
        <span>No text to visualize. Enter text or load sample above to see chunks.</span>
      </div>
    );
  }

  return (
    <div className="w-full my-3 flex flex-col gap-6">
      {/* 1. Interactive Flow Map Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
        {/* Visual Map Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-50/90 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              Interactive Chunk Map
            </span>
            <span className="text-[11px] text-slate-500 font-normal hidden sm:inline-block">
              (Hover or click chunks to highlight)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAllJSON}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-all cursor-pointer"
              title="Copy all chunks as JSON"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Copied JSON!</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Chunk Flow Canvas */}
        <div className="p-4 sm:p-5 bg-slate-50/30 min-h-[140px] font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words select-text">
          {chunks.map((chunk, index) => {
            const isActive = activeChunkId === chunk.id;
            const prevChunk = index > 0 ? chunks[index - 1] : null;
            const overlapChars =
              prevChunk && chunk.start < prevChunk.end
                ? Math.max(0, Math.min(chunk.text.length, prevChunk.end - chunk.start))
                : 0;

            return (
              <span
                key={chunk.id}
                onClick={() => {
                  const element = document.getElementById(`chunk-card-${chunk.id}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setActiveChunkId(isActive ? null : chunk.id);
                }}
                onMouseEnter={() => setActiveChunkId(chunk.id)}
                onMouseLeave={() => setActiveChunkId(null)}
                title={`Chunk ${chunk.id} • ${chunk.charCount} chars [${chunk.start}:${chunk.end}]${
                  overlapChars > 0 ? ` (${overlapChars} chars overlap)` : ''
                }`}
                style={{
                  backgroundColor: chunk.color,
                  borderBottomColor: chunk.borderColor || '#94a3b8',
                  boxShadow: isActive ? '0 0 0 2px #0f172a, 0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                }}
                className={`px-1 py-0.5 border-b-2 cursor-pointer transition-all duration-100 select-text inline text-slate-900 rounded-sm mx-0.5 my-0.5 font-mono ${
                  isActive ? 'scale-105 z-10 relative' : ''
                }`}
              >
                {overlapChars > 0 ? (
                  <>
                    <span
                      style={{
                        backgroundColor: '#fed7aa',
                        borderBottom: '2px solid #ea580c',
                      }}
                      title={`Overlapping text shared with Chunk ${chunk.id - 1} (${overlapChars} chars)`}
                      className="font-semibold text-amber-950 px-0.5 rounded-2xs"
                    >
                      {chunk.text.slice(0, overlapChars)}
                    </span>
                    <span>{chunk.text.slice(overlapChars)}</span>
                  </>
                ) : (
                  chunk.text
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* 2. Detailed Chunk List Breakdown */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Chunk Breakdown & Inspector
            </h3>
            <span className="px-2 py-0.5 text-[11px] font-mono bg-slate-200 text-slate-700 rounded-full font-medium">
              {chunks.length} total
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {chunks.map((chunk, index) => {
            const isActive = activeChunkId === chunk.id;
            const prevChunk = index > 0 ? chunks[index - 1] : null;
            const overlapChars =
              prevChunk && chunk.start < prevChunk.end
                ? Math.max(0, Math.min(chunk.text.length, prevChunk.end - chunk.start))
                : 0;

            return (
              <div
                key={chunk.id}
                id={`chunk-card-${chunk.id}`}
                onMouseEnter={() => setActiveChunkId(chunk.id)}
                onMouseLeave={() => setActiveChunkId(null)}
                className={`bg-white rounded-xl border p-4 transition-all duration-150 ${
                  isActive
                    ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-md'
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Chunk Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: chunk.color }}
                    />
                    <span className="font-bold text-xs sm:text-sm text-slate-900 font-mono">
                      Chunk #{chunk.id}
                    </span>

                    <div className="flex items-center gap-1.5 ml-1">
                      <span className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-600 rounded-md font-medium border border-slate-200/60">
                        {chunk.charCount} chars
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-mono bg-slate-100 text-slate-500 rounded-md">
                        [{chunk.start} → {chunk.end}]
                      </span>
                    </div>

                    {overlapChars > 0 && (
                      <span className="text-[11px] font-medium text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/80 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {overlapChars} chars overlap w/ #{chunk.id - 1}
                      </span>
                    )}
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyChunk(chunk)}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer"
                    title="Copy this chunk text"
                  >
                    {copiedChunkId === chunk.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Chunk Text Container */}
                <div
                  className="mt-3 p-3 rounded-lg text-xs sm:text-sm font-mono whitespace-pre-wrap break-words border leading-relaxed"
                  style={{
                    backgroundColor: chunk.color,
                    borderColor: chunk.borderColor || '#cbd5e1',
                  }}
                >
                  {overlapChars > 0 ? (
                    <>
                      <span
                        style={{
                          backgroundColor: '#fed7aa',
                          borderBottom: '2px solid #ea580c',
                        }}
                        title={`Overlapping text shared with Chunk ${chunk.id - 1}`}
                        className="px-0.5 rounded-2xs font-medium text-amber-950"
                      >
                        {chunk.text.slice(0, overlapChars)}
                      </span>
                      <span className="text-slate-900">{chunk.text.slice(overlapChars)}</span>
                    </>
                  ) : (
                    <span className="text-slate-900">{chunk.text}</span>
                  )}
                </div>

                {/* Chunk Index Footer */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-3">
                    <span>Index range: [{chunk.start}..{chunk.end}]</span>
                    <span>Length: {chunk.charCount} characters</span>
                  </div>
                  {overlapChars > 0 && (
                    <span className="text-orange-700 font-sans">
                      Orange segment repeats from previous chunk
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
