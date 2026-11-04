import React from 'react';
import { Sparkles, User } from 'lucide-react';
import clsx from 'clsx';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={clsx(
        'flex gap-3 max-w-3xl animate-fade-in',
        isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
      )}
    >
      {/* Avatar Icon */}
      <div
        className={clsx(
          'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs',
          isAssistant
            ? 'bg-purple-600 text-white shadow-purple-500/20'
            : 'bg-blue-600 text-white shadow-blue-500/20'
        )}
      >
        {isAssistant ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div className="space-y-1">
        <div
          className={clsx(
            'p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs',
            isAssistant
              ? 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs'
              : 'bg-blue-600 text-white rounded-tr-xs'
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>

        <p
          className={clsx(
            'text-[10px] text-slate-400 px-1',
            !isAssistant && 'text-right'
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

