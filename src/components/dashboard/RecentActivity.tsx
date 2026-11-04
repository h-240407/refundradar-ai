import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Refund } from '../../types';

interface RecentActivityProps {
  refunds: Refund[];
  limit?: number;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ refunds, limit = 5 }) => {
  const displayRefunds = refunds.slice(0, limit);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Refund Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">Live tracking updates</p>
          </div>
          <Link
            to="/app/refunds"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {displayRefunds.map((refund) => (
            <Link
              key={refund.id}
              to={`/app/refunds/${refund.id}`}
              className="py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/60 -mx-3 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm shrink-0 border border-slate-200/60">
                  {refund.merchant.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {refund.merchant}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono hidden sm:inline">
                      {refund.orderReference}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span>Updated {refund.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-sm font-bold text-slate-900">
                  ${refund.refundAmount.toFixed(2)}
                </span>
                <Badge status={refund.status} size="sm" withDot />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
        <Link
          to="/app/refunds"
          className="text-xs text-slate-600 hover:text-slate-800 font-medium"
        >
          Managing {refunds.length} active refund requests
        </Link>
      </div>
    </div>
  );
};

