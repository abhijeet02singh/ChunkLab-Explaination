import React from 'react';
import { SplitterType } from '../types';
import {
  Sliders,
  Scissors,
  Layers,
  ExternalLink,
  AlignLeft,
  Type,
  Pilcrow,
  Binary,
  FileCode,
  FolderTree,
} from 'lucide-react';

interface ControlsProps {
  splitter: SplitterType;
  onSplitterChange: (val: SplitterType) => void;
  chunkSize: number;
  onChunkSizeChange: (val: number) => void;
  chunkOverlap: number;
  onChunkOverlapChange: (val: number) => void;
}

interface SplitterOption {
  id: SplitterType;
  label: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
}

const SPLITTER_OPTIONS: SplitterOption[] = [
  {
    id: 'Recursive Character Splitter',
    label: 'Recursive Character',
    desc: 'Preserves paragraphs & lines first',
    tag: 'General / RAG',
    icon: AlignLeft,
  },
  {
    id: 'Character Splitter',
    label: 'Character Splitter',
    desc: 'Exact character boundary',
    tag: 'Basic',
    icon: Type,
  },
  {
    id: 'Sentence Splitter',
    label: 'Sentence Splitter',
    desc: 'Splits on punctuation (. ? !)',
    tag: 'Linguistic',
    icon: Pilcrow,
  },
  {
    id: 'Token-based',
    label: 'Token-based',
    desc: 'Splits by word & token units',
    tag: 'LLM Native',
    icon: Binary,
  },
  {
    id: 'Markdown/Structure-based',
    label: 'Markdown / Structure',
    desc: 'Headers (#), code & lists',
    tag: 'Syntax-aware',
    icon: FileCode,
  },
  {
    id: 'Document Structure Chunking',
    label: 'Document Structure',
    desc: 'Sections, clauses & tables',
    tag: 'Hierarchical',
    icon: FolderTree,
  },
];

const PRESET_SIZES = [25, 50, 100, 200, 500];

export function Controls({
  splitter,
  onSplitterChange,
  chunkSize,
  onChunkSizeChange,
  chunkOverlap,
  onChunkOverlapChange,
}: ControlsProps) {
  const maxOverlap = Math.max(0, Math.floor((chunkSize - 1) * 0.49));
  const overlapPercent = chunkSize > 0 ? Math.round((chunkOverlap / chunkSize) * 100) : 0;

  return (
    <div className="w-full mt-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col gap-4.5 transition-all">
      {/* 1. Splitter Selection Header & Buttons */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Scissors className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-900">Chunking Strategy</span>
            <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium ml-1">
              6 strategies
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://python.langchain.com/docs/concepts/text_splitters/"
              target="_blank"
              rel="noreferrer"
              title="LangChain Text Splitters Reference"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span>LangChain Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modern Segmented Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200/60">
          {SPLITTER_OPTIONS.map((opt) => {
            const isSelected = splitter === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSplitterChange(opt.id)}
                className={`flex flex-col items-start p-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-medium ring-1 ring-black/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs font-bold leading-tight">{opt.label}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'bg-slate-200/60 text-slate-500'
                    }`}
                  >
                    {opt.tag}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-normal truncate w-full leading-tight">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
        {/* Chunk Size Control */}
        <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
          <div className="flex items-center justify-between">
            <label
              htmlFor="chunk-size-input"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              <span>Chunk Size</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                id="chunk-size-input"
                type="number"
                min={1}
                max={2000}
                value={chunkSize}
                onChange={(e) => {
                  const val = Math.max(1, parseInt(e.target.value, 10) || 1);
                  onChunkSizeChange(val);
                }}
                className="w-16 px-2 py-0.5 text-xs font-mono font-bold text-center text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
              />
              <span className="text-xs text-slate-500 font-medium">chars</span>
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={500}
            value={Math.min(chunkSize, 500)}
            onChange={(e) => onChunkSizeChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[11px] text-slate-400 font-medium mr-0.5">Presets:</span>
            {PRESET_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChunkSizeChange(size)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  chunkSize === size
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Chunk Overlap Control */}
        <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70">
          <div className="flex items-center justify-between">
            <label
              htmlFor="chunk-overlap-input"
              className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Chunk Overlap</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                id="chunk-overlap-input"
                type="number"
                min={0}
                max={maxOverlap}
                value={chunkOverlap}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(maxOverlap, parseInt(e.target.value, 10) || 0));
                  onChunkOverlapChange(val);
                }}
                className="w-16 px-2 py-0.5 text-xs font-mono font-bold text-center text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
              />
              <span className="text-xs text-slate-500 font-medium">chars</span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={Math.max(1, maxOverlap)}
            value={chunkOverlap}
            onChange={(e) => onChunkOverlapChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: chunkOverlap > 0 ? '#ea580c' : '#94a3b8' }}
              />
              <span className="font-medium text-slate-700">{overlapPercent}% of chunk size</span>
            </span>
            <span className="text-slate-400 font-mono">Max: {maxOverlap} (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
