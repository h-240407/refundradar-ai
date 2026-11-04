import React from 'react';
import { Calendar } from 'lucide-react';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onRequestRefund: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onViewDetails,
  onRequestRefund,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-sm border border-slate-200">
            {order.merchant.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">{order.merchant}</h3>
            <p className="text-xs font-mono text-slate-600">{order.orderReference}</p>
          </div>
        </div>

        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
            order.status === 'completed'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : order.status === 'refunded'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-600" />
          <span>{order.purchaseDate}</span>
        </div>
        <span className="text-base font-black text-slate-900">
          ${order.amount.toFixed(2)}
        </span>
      </div>

      <div className="text-xs text-slate-600">
        <span className="font-medium text-slate-700">{order.items.length} item(s): </span>
        <span className="text-slate-600">
          {order.items.map((i) => i.name).join(', ')}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onViewDetails(order)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
        >
          View Receipt
        </button>

        {!order.hasRefund ? (
          <button
            onClick={() => onRequestRefund(order)}
            className="flex-1 py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-700 transition-colors"
          >
            Track Refund
          </button>
        ) : (
          <span className="flex-1 text-center py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg">
            Refund Active
          </span>
        )}
      </div>
    </div>
  );
};

