import { Sparkles, Github, BookOpen, Layers } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mt-2 flex flex-col items-center gap-3 w-full">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-medium shadow-xs">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        <span>Interactive RAG Playground</span>
      </div>

      {/* Main Title */}
      <div className="flex items-center justify-center gap-2.5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm flex items-center justify-center">
          <Layers className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          ChunkLab
        </h1>
      </div>

      {/* Subtitle & Socials */}
      <p className="text-sm text-slate-600 max-w-xl text-center flex flex-wrap items-center justify-center gap-1.5 leading-relaxed">
        <span>Visualize, compare, and optimize your RAG text chunks.</span>
        <span className="inline-flex items-center gap-2 ml-1">
          <a
            href="https://github.com/abhijeet02singh/ChunkLab-Explaination.git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <Github className="w-3 h-3 text-slate-800" />
            <span>GitHub</span>
          </a>
          <a
            href="https://docs.langchain.com/oss/python/langchain/overview"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <BookOpen className="w-3 h-3 text-amber-600" />
            <span>Detail</span>
          </a>
        </span>
      </p>
    </header>
  );
}

