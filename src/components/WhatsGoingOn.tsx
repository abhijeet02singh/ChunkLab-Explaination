import { HelpCircle, Sparkles, Database, Cpu, Compass } from 'lucide-react';

export function WhatsGoingOn() {
  return (
    <div className="mt-8 w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 flex flex-col gap-4 text-left transition-all">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-base sm:text-lg text-slate-900">
            What's going on here?
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Core principles behind document chunking in modern AI & RAG pipelines
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        Large documents are often split into smaller chunks before being embedded and queried in language models. Chunking helps retrieve smaller, highly relevant pieces of information instead of overwhelming models with entire documents at once.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>Vector Search</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Smaller chunks improve semantic precision when computing embeddings and similarity rankings.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Context Efficiency</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Keeps token counts focused on answering the query directly without extraneous document noise.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Boundary Continuity</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Chunk overlap ensures sentences split across limits don't lose their critical meaning.
          </p>
        </div>
      </div>
    </div>
  );
}
