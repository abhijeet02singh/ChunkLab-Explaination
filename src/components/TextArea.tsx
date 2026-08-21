import React, { useRef } from 'react';
import { Upload, RotateCcw, Trash2, FileText, Sparkles } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/samples';

interface TextAreaProps {
  value: string;
  onChange: (val: string) => void;
  onResetSample: () => void;
}

export function TextArea({ value, onChange, onResetSample }: TextAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        onChange(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="w-full mt-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-500" />
          <span className="text-xs sm:text-sm font-semibold text-slate-800">Source Document</span>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="px-2 py-0.5 text-[11px] font-mono bg-slate-200/70 text-slate-700 rounded-full font-medium">
              {charCount} chars
            </span>
            <span className="px-2 py-0.5 text-[11px] font-mono bg-slate-200/70 text-slate-700 rounded-full font-medium">
              {wordCount} words
            </span>
          </div>
        </div>

        {/* Quick Sample Presets & Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="hidden sm:flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg mr-1">
            <span className="text-[10px] text-slate-500 font-medium px-1.5">Samples:</span>
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange(preset.text)}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
                title={preset.desc}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onResetSample}
            className="sm:hidden inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Load default sample text"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>Sample</span>
          </button>

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Clear text"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 text-xs font-medium rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Upload className="w-3 h-3 text-slate-300" />
            <span>Upload .txt</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or type your document text here..."
          className="w-full min-h-[140px] p-3 text-xs sm:text-sm font-mono text-slate-800 bg-slate-50/40 rounded-xl border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white placeholder:text-slate-400 resize-y leading-relaxed transition-all"
          rows={6}
        />
      </div>
    </div>
  );
}

