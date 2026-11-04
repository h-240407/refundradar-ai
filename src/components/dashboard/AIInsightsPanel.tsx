import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import type { AIInsight } from '../../types';

interface AIInsightsPanelProps {
  insights: AIInsight[];
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights }) => {
  const getIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBorderColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'warning':
        return 'border-l-rose-500 bg-rose-50/20';
      case 'tip':
        return 'border-l-amber-500 bg-amber-50/20';
      case 'success':
        return 'border-l-emerald-500 bg-emerald-50/20';
      default:
        return 'border-l-blue-500 bg-blue-50/20';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">AI Intelligence Radar</h2>
            <p className="text-xs text-slate-500">Autonomous pattern detection & next steps</p>
          </div>
        </div>

        <Link
          to="/app/assistant"
          className="text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <span>Copilot Chat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={clsx(
              'p-4 rounded-xl border border-slate-200/90 border-l-4 transition-all duration-200 hover:shadow-xs flex flex-col justify-between',
              getBorderColor(insight.type)
            )}
          >
            <div>
              <div className="flex items-center gap-2">
                {getIcon(insight.type)}
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  {insight.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {insight.description}
              </p>
            </div>

            {insight.actionText && insight.actionUrl && (
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <Link
                  to={insight.actionUrl}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                >
                  <span>{insight.actionText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

