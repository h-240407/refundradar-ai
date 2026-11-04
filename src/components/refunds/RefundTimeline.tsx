import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import clsx from 'clsx';
import type { RefundTimeline as TimelineItem, RefundStatus } from '../../types';

interface RefundTimelineProps {
  timeline: TimelineItem[];
  currentStatus?: RefundStatus;
}

export const RefundTimeline: React.FC<RefundTimelineProps> = ({
  timeline,
}) => {
  const getIconForStatus = (status: RefundStatus, isCurrent: boolean) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
    if (status === 'delayed' || status === 'action_required') {
      return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    }
    if (isCurrent) {
      return (
        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
      );
    }
    return <Clock className="w-4 h-4 text-blue-600" />;
  };

  const getBadgeColor = (status: RefundStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'delayed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'action_required':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'approved':
      case 'issued':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {timeline.map((item, index) => {
        const isCurrent = index === timeline.length - 1;

        return (
          <div key={index} className="relative group">
            {/* Timeline node bullet */}
            <div
              className={clsx(
                'absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all bg-white',
                isCurrent
                  ? 'border-blue-600 shadow-sm shadow-blue-500/30 scale-110'
                  : 'border-slate-300'
              )}
            >
              {getIconForStatus(item.status, isCurrent)}
            </div>

            {/* Timeline Content Card */}
            <div
              className={clsx(
                'p-4 rounded-xl border transition-all duration-200',
                isCurrent
                  ? 'bg-blue-50/40 border-blue-200 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                      getBadgeColor(item.status)
                    )}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded-full">
                      Latest Stage
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-600">
                  {item.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

