import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { Refund, RefundStatus } from '../../types';

interface RefundCardProps {
  refund: Refund;
}

export const RefundCard: React.FC<RefundCardProps> = ({ refund }) => {
  const navigate = useNavigate();

  // Progress percentage calculation based on status
  const getProgressPercentage = (status: RefundStatus) => {
    switch (status) {
      case 'requested':
        return 20;
      case 'processing':
        return 40;
      case 'approved':
        return 65;
      case 'issued':
        return 85;
      case 'completed':
        return 100;
      case 'delayed':
        return 45;
      case 'action_required':
        return 35;
      default:
        return 10;
    }
  };

  const progress = getProgressPercentage(refund.status);

  return (
    <div
      onClick={() => navigate(`/app/refunds/${refund.id}`)}
      className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top: Merchant & Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-base border border-slate-200/80 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
              {refund.merchant.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {refund.merchant}
              </h3>
              <p className="text-xs font-mono text-slate-600 mt-0.5">
                {refund.orderReference}
              </p>
            </div>
          </div>
          <Badge status={refund.status} size="sm" withDot />
        </div>

        {/* Reason / Notes preview */}
        {refund.reason && (
          <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
            {refund.reason}
          </p>
        )}

        {/* Amount & Progress */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-600">Refund Amount</span>
            <span className="text-xl font-black text-slate-900">
              ${refund.refundAmount.toFixed(2)}
            </span>
          </div>

          <div className="mt-2.5">
            <ProgressBar
              value={progress}
              size="sm"
              variant={
                refund.status === 'delayed'
                  ? 'danger'
                  : refund.status === 'action_required'
                  ? 'warning'
                  : refund.status === 'completed'
                  ? 'success'
                  : 'brand'
              }
            />
          </div>
        </div>
      </div>

      {/* Footer: Timeline dates & Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-600" />
          <span>Requested {refund.requestDate}</span>
        </div>

        <div className="flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

