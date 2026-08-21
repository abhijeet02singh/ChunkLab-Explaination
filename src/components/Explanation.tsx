import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Sliders,
  Scissors,
  Layers,
  CheckCircle2,
  Network,
  Maximize2,
  Info,
  Image as ImageIcon,
  Workflow,
} from 'lucide-react';
import diagramImg from '../assets/images/chunking_tree_diagram_1787313080440.jpg';
import { HierarchicalTreeDiagram } from './HierarchicalTreeDiagram';

export function Explanation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [diagramTab, setDiagramTab] = useState<'image' | 'interactive'>('image');

  return (
    <div className="text-center w-full my-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium transition-all duration-150 border border-slate-200/80 cursor-pointer shadow-2xs group"
      >
        <BookOpen className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
        <span>{isOpen ? "Hide beginner explanation" : "Explain like I'm 5..."}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 p-5 text-left max-w-[850px] w-full mx-auto text-sm text-slate-800 space-y-5 border border-slate-200/90 bg-white rounded-2xl shadow-sm leading-relaxed transition-all animate-in fade-in duration-200">
          {/* ELI5 Core Story */}
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 space-y-2 text-slate-800">
            <div className="flex items-center gap-2 font-semibold text-blue-900 text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>The Big Book Analogy</span>
            </div>
            <p>Imagine you have a very big book.</p>
            <p>
              Instead of giving the entire book to a language model, we cut the book into smaller pieces.
            </p>
            <p>Each piece is called a chunk.</p>
            <p>
              <strong>Chunk Size</strong> tells us how big each piece should be.
            </p>
            <p>
              <strong>Chunk Overlap</strong> means that the end of one piece can be repeated at the beginning of the next piece.
            </p>
            <p className="text-blue-950 font-medium pt-1">
              This tool lets you see exactly how your text gets divided.
            </p>
          </div>

          {/* 1. Hierarchical Tree Visual Breakdown */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <Network className="w-4 h-4 text-indigo-600" />
                <span>Hierarchical Chunking & Token Parsing Tree</span>
              </div>

              {/* View Switcher: Diagram Image vs Interactive */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setDiagramTab('image')}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      diagramTab === 'image'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Diagram</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagramTab('interactive')}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      diagramTab === 'interactive'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Workflow className="w-3 h-3" />
                    <span>Interactive</span>
                  </button>
                </div>

                {diagramTab === 'image' && (
                  <button
                    type="button"
                    onClick={() => setIsImageZoomed(!isImageZoomed)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{isImageZoomed ? 'Shrink' : 'Zoom'}</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              How text is decomposed from root combined blocks into sentences, sub-tokens, and aggregated semantic phrases to fit target chunk limits:
            </p>

            {/* View Content */}
            {diagramTab === 'image' ? (
              <div
                className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white p-2 transition-all ${
                  isImageZoomed ? 'scale-100 shadow-lg' : 'shadow-2xs'
                }`}
              >
                <img
                  src={diagramImg}
                  alt="Hierarchical Chunking and Token Parsing Tree Diagram"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-lg object-contain bg-white max-h-[500px] mx-auto"
                />
              </div>
            ) : (
              <HierarchicalTreeDiagram />
            )}

            {/* Tree Levels Legend & Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-blue-50/80 border border-blue-200/70">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-200 border border-blue-400 shrink-0" />
                <span className="font-medium text-blue-950 truncate">1. Root / Combined</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/70">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-200 border border-emerald-400 shrink-0" />
                <span className="font-medium text-emerald-950 truncate">2. Sentences</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/70">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-200 border border-amber-400 shrink-0" />
                <span className="font-medium text-amber-950 truncate">3. Tokens / Words</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-purple-50/80 border border-purple-200/70">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-200 border border-purple-400 shrink-0" />
                <span className="font-medium text-purple-950 truncate">4. Partial Phrases</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-pink-50/80 border border-pink-200/70 col-span-2 sm:col-span-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-pink-200 border border-pink-400 shrink-0" />
                <span className="font-medium text-pink-950 truncate">5. Final Phrases</span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 bg-white/80 p-2 rounded-lg border border-slate-200/60">
              <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                <strong>(n) = Character / Token Count Score:</strong> Highlights how oversized combined root phrases (e.g. 34 &gt; limit) are divided and re-assembled into valid chunk envelopes.
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base text-slate-900 mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-700" />
              What is Text Chunking and Why is it Useful?
            </h3>
            <p className="text-slate-600">
              Language models have a limited amount of text they can process at one time, which is called a <strong className="text-slate-800 font-semibold">context window</strong>. Even though context windows are getting larger, models usually perform much better and provide more accurate answers when they receive smaller, highly relevant information instead of an entire large document at once.
            </p>
            <p className="text-slate-600 mt-2">
              Picking the most relevant information from a large document is easy for a human reader, but difficult for a computer. A common solution is <strong className="text-slate-800 font-semibold">chunking</strong>: breaking a large document into smaller pieces called <strong className="text-slate-800 font-semibold">chunks</strong>. Each chunk can then be processed, searched, or provided to a language model separately.
            </p>
          </div>

          <hr className="border-t border-slate-100" />

          <div>
            <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              How to Use This Visualizer
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              You can choose different chunking or splitting strategies in the dropdown and paste your own text (or upload a <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-800 border border-slate-200">.txt</code> file) to see how each strategy divides the document in real time:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 text-xs sm:text-sm">
              <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">🎨 Different Colors</span>
                <span className="text-slate-600">Represent distinct chunks of segmented text.</span>
              </li>
              <li className="p-2.5 rounded-lg bg-orange-50/70 border border-orange-200/60">
                <span className="font-semibold text-orange-950 block mb-0.5">🟧 Orange Highlights</span>
                <span className="text-orange-900">Represent text shared between overlapping chunks.</span>
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">✂️ Sentence Boundaries</span>
                <span className="text-slate-600">Sometimes a chunk ends mid-sentence; splitters handle this differently.</span>
              </li>
              <li className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-0.5">⚡ Text Movement</span>
                <span className="text-slate-600">Some splitters remove extra spaces or line breaks during grouping.</span>
              </li>
            </ul>
          </div>

          <hr className="border-t border-slate-100" />

          <div>
            <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              Key Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-semibold text-slate-900 block mb-1">Chunk Size</span>
                <p className="text-slate-600">
                  Represents the approximate number of characters in each chunk. Larger values create broader context, while smaller values create focused chunks.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-semibold text-slate-900 block mb-1">Chunk Overlap</span>
                <p className="text-slate-600">
                  Amount of text shared between consecutive chunks to prevent lost thoughts at boundaries. Limited to &lt;50% of Chunk Size in this app.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-100" />

          <div>
            <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-emerald-500" />
              Splitting Strategies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Recursive Character: </span>
                <span className="text-slate-600">The industry default for RAG. Tries to preserve paragraphs and newlines first before subdividing into sentences or characters.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Character Splitter: </span>
                <span className="text-slate-600">Divides text strictly by character count, regardless of word or sentence boundaries.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Sentence Splitter: </span>
                <span className="text-slate-600">Keeps complete grammatical sentences intact by splitting on punctuation (<code className="bg-slate-200 px-1 py-0.2 rounded font-mono">.</code>, <code className="bg-slate-200 px-1 py-0.2 rounded font-mono">?</code>, <code className="bg-slate-200 px-1 py-0.2 rounded font-mono">!</code>).</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Token-based: </span>
                <span className="text-slate-600">Splits along natural token/word units, preventing mid-word cuts and matching how LLMs process embeddings.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Markdown / Structure-based: </span>
                <span className="text-slate-600">Understands headers (<code className="bg-slate-200 px-1 py-0.2 rounded font-mono">#</code>), fenced code blocks (<code className="bg-slate-200 px-1 py-0.2 rounded font-mono">```</code>), blockquotes, and lists to preserve syntax hierarchy.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="font-semibold text-slate-900">Document Structure: </span>
                <span className="text-slate-600">Respects high-level document sections, articles, numbered clauses, tables, and chapters for structured documents.</span>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-100" />

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <p className="font-semibold text-slate-900">
                No single chunk size is perfect for every document.
              </p>
              <p className="mt-0.5 text-slate-600">
                Experiment with splitters, chunk sizes, and overlaps to visually tune your RAG pipeline.
              </p>
              <p className="text-slate-500 text-xs mt-2 italic">
                <strong>Summary:</strong> Chunking breaks large documents into smaller, useful pieces so language models work with the most relevant information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
