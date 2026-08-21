import { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface TreeNodeProps {
  label: string;
  count: number | string;
  type: 'root' | 'sentence' | 'token' | 'partial' | 'final';
  isInvalid?: boolean;
}

const TYPE_STYLES = {
  root: {
    bg: 'bg-blue-50/90 hover:bg-blue-100',
    border: 'border-blue-400',
    text: 'text-blue-950',
    count: 'text-blue-700 font-bold',
  },
  sentence: {
    bg: 'bg-emerald-50/90 hover:bg-emerald-100',
    border: 'border-emerald-400',
    text: 'text-emerald-950',
    count: 'text-emerald-700 font-bold',
  },
  token: {
    bg: 'bg-amber-50/90 hover:bg-amber-100',
    border: 'border-amber-400',
    text: 'text-amber-950',
    count: 'text-amber-700 font-bold',
  },
  partial: {
    bg: 'bg-purple-50/90 hover:bg-purple-100',
    border: 'border-purple-400',
    text: 'text-purple-950',
    count: 'text-purple-700 font-bold',
  },
  final: {
    bg: 'bg-pink-50/90 hover:bg-pink-100',
    border: 'border-pink-400',
    text: 'text-pink-950',
    count: 'text-pink-700 font-bold',
  },
};

function Box({ label, count, type, isInvalid }: TreeNodeProps) {
  const style = TYPE_STYLES[type];
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl border text-center transition-all duration-150 shadow-2xs ${style.bg} ${style.border}`}
    >
      <span className={`text-[11px] sm:text-xs font-semibold leading-tight ${style.text}`}>
        {label}
      </span>
      <span className={`text-[10px] font-mono mt-0.5 ${style.count}`}>
        ({count})
      </span>
      {isInvalid && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold shadow-xs">
          ✕
        </span>
      )}
    </div>
  );
}

export function HierarchicalTreeDiagram() {
  const [scale, setScale] = useState(1);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-3 sm:p-4 overflow-x-auto">
      {/* Zoom Toolbar */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Network className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Hierarchy Flow</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.75, s - 0.1))}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-mono text-slate-500 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(1.3, s + 0.1))}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer ml-1"
            title="Reset zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Tree Canvas */}
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        className="min-w-[680px] flex flex-col items-center gap-6 py-2 transition-transform duration-150"
      >
        {/* Row 1: Root / Combined (Exceeds limits) */}
        <div className="flex justify-center gap-12 w-full">
          <div className="flex flex-col items-center">
            <Box
              label="My name is Nitish (17) / I am 35 years old (17)"
              count="34"
              type="root"
              isInvalid
            />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>

          <div className="flex flex-col items-center">
            <Box
              label="I live in Gurgaon (17) / How are you (11)"
              count="28"
              type="root"
              isInvalid
            />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>
        </div>

        {/* Row 2: Sentences (Top Level) */}
        <div className="grid grid-cols-4 gap-4 w-full text-center">
          <div className="flex flex-col items-center">
            <Box label="My name is Nitish (17)" count="17" type="sentence" />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>
          <div className="flex flex-col items-center">
            <Box label="I am 35 years old (17)" count="17" type="sentence" />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>
          <div className="flex flex-col items-center">
            <Box label="I live in Gurgaon (17)" count="17" type="sentence" />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>
          <div className="flex flex-col items-center">
            <Box label="How are you (11)" count="11" type="sentence" />
            <div className="w-0.5 h-4 bg-slate-300 my-1" />
          </div>
        </div>

        {/* Row 3: Words & Tokens (Split) */}
        <div className="grid grid-cols-4 gap-3 w-full">
          {/* S1 tokens */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <Box label="My" count="2" type="token" />
            <Box label="name" count="4" type="token" />
            <Box label="is" count="2" type="token" />
            <Box label="Nitish" count="6" type="token" />
          </div>
          {/* S2 tokens */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <Box label="I" count="1" type="token" />
            <Box label="am" count="2" type="token" />
            <Box label="35" count="2" type="token" />
            <Box label="years" count="5" type="token" />
            <Box label="old" count="3" type="token" />
          </div>
          {/* S3 tokens */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <Box label="I" count="1" type="token" />
            <Box label="live" count="2" type="token" />
            <Box label="in" count="2" type="token" />
            <Box label="Gurgaon" count="12" type="token" />
          </div>
          {/* S4 tokens */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <Box label="How" count="2" type="token" />
            <Box label="are" count="2" type="token" />
            <Box label="you" count="7" type="token" />
          </div>
        </div>

        {/* Row 4: Partial Intermediate Phrases */}
        <div className="grid grid-cols-4 gap-3 w-full">
          <div className="flex flex-wrap justify-center gap-2">
            <Box label="My name" count="7" type="partial" />
            <Box label="Nitish" count="6" type="partial" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Box label="I am" count="3" type="partial" />
            <Box label="35 years old" count="10" type="partial" />
          </div>
          <div className="flex justify-center">
            <Box label="I live in Gurgaon" count="17" type="partial" />
          </div>
          <div className="flex justify-center">
            <Box label="How are you" count="11" type="partial" />
          </div>
        </div>

        {/* Row 5: Final Phrases (Complete Chunks) */}
        <div className="grid grid-cols-4 gap-3 w-full">
          <div className="flex justify-center">
            <Box label="My name is Nitish" count="17" type="final" />
          </div>
          <div className="flex justify-center">
            <Box label="I am 35 years old" count="17" type="final" />
          </div>
          <div className="flex justify-center">
            <span className="text-[11px] text-slate-400 italic py-1">Ready Chunk (17)</span>
          </div>
          <div className="flex justify-center">
            <span className="text-[11px] text-slate-400 italic py-1">Ready Chunk (11)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
