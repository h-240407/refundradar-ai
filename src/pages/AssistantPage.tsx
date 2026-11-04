import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SendHorizontal, Bot, ShieldCheck, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../components/assistant/ChatMessage';
import { TypingIndicator } from '../components/assistant/TypingIndicator';
import { SuggestionChips } from '../components/assistant/SuggestionChips';
import { assistantService } from '../services/assistantService';
import { demoAssistantSuggestions, demoChatMessages } from '../data/mockData';
import type { ChatMessage as ChatMessageType } from '../types';

export const AssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<ChatMessageType[]>(demoChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = useCallback(async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessageType = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Fetch AI response via assistant service
      const botResponse = await assistantService.sendMessage(textToSend);
      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered an issue processing your refund inquiry. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [isTyping]);

  // Handle query from URL parameter if passed
  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      handleSendMessage(query);
    }
  }, [searchParams, handleSendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Assistant Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">
                RefundRadar AI Copilot
              </h2>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Online Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Trained on e-commerce return policies, bank settlement delays & PayPal disputes.
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(demoChatMessages)}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset chat session"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & Suggestions Footer */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-3">
        <SuggestionChips
          suggestions={demoAssistantSuggestions}
          onSelect={(text) => handleSendMessage(text)}
          disabled={isTyping}
        />

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about refund delays, merchant terms, or bank clearance times..."
            disabled={isTyping}
            className="flex-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-hidden disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-purple-600/20 disabled:pointer-events-none"
            aria-label="Send message"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive AI engine simulation — backend LLM ready</span>
          </div>
          <span>Shift+Enter for newline</span>
        </div>
      </div>
    </div>
  );
};

