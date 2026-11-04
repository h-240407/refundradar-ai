import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 max-w-xl mr-auto animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-3.5 flex items-center gap-1.5 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
        <span className="text-xs text-slate-400 font-medium pl-2">AI Copilot is analyzing...</span>
      </div>
    </div>
  );
};

