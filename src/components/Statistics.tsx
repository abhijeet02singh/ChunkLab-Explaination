import { ChunkStats } from '../types';
import { Hash, Layers, PieChart, Cpu } from 'lucide-react';

interface StatisticsProps {
  stats: ChunkStats;
}

export function Statistics({ stats }: StatisticsProps) {
  const estTokens = Math.ceil(stats.totalChars / 4);

  return (
    <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {/* 1. Total Characters */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-1 transition-all hover:border-slate-300">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <Hash className="w-3.5 h-3.5 text-blue-500" />
          <span>Total Chars</span>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
          {stats.totalChars.toLocaleString()}
        </div>
      </div>

      {/* 2. Number of Chunks */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-1 transition-all hover:border-slate-300">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <Layers className="w-3.5 h-3.5 text-indigo-500" />
          <span>Total Chunks</span>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
          {stats.numChunks}
        </div>
      </div>

      {/* 3. Average Chunk Size */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-1 transition-all hover:border-slate-300">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <PieChart className="w-3.5 h-3.5 text-emerald-500" />
          <span>Avg Chunk Size</span>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
          {stats.avgChunkSize} <span className="text-xs font-normal text-slate-400">chars</span>
        </div>
      </div>

      {/* 4. Approx Tokens */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col gap-1 transition-all hover:border-slate-300">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
          <Cpu className="w-3.5 h-3.5 text-amber-500" />
          <span>Est. Tokens</span>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
          ~{estTokens.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
