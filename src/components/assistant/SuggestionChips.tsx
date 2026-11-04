import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestionChipsProps {
  suggestions: { id: string; text: string }[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
        <Sparkles className="w-3 h-3 text-purple-500" />
        Prompts:
      </span>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion.text)}
          className="text-xs bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200/90 hover:border-purple-200 px-3 py-1.5 rounded-full font-medium transition-all shadow-2xs shrink-0 disabled:opacity-50 disabled:pointer-events-none"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

