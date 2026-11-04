import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { Order } from '../../types';

interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onRequestRefund: (order: Order) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onViewDetails,
  onRequestRefund,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Merchant & Order</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Items</th>
              <th className="py-3.5 px-4">Total Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">PayPal Linked</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-800 border border-slate-200 shrink-0">
                      {order.merchant.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {order.merchant}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px]">
                        {order.orderReference}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-medium text-slate-700">
                  {order.purchaseDate}
                </td>

                <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                  {order.items.map((i) => i.name).join(', ')}
                </td>

                <td className="py-3.5 px-4 font-black text-slate-900">
                  ${order.amount.toFixed(2)}
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      order.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : order.status === 'refunded'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  {order.paypalTransactionId ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Sandbox Sync</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-600">Manual Entry</span>
                  )}
                </td>

                <td className="py-3.5 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      Receipt
                    </button>
                    {!order.hasRefund ? (
                      <button
                        onClick={() => onRequestRefund(order)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                      >
                        Track Refund
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        In Progress
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

