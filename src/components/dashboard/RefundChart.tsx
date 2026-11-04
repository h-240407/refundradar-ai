import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyTrend } from '../../types';

interface RefundChartProps {
  data: MonthlyTrend[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
        <p className="font-semibold text-slate-300">{label} 2026</p>
        <p className="text-blue-400 font-bold text-sm">
          ${payload[0].value.toFixed(2)} refunded
        </p>
        <p className="text-slate-400 text-[11px]">
          {payload[0].payload.completed} refunds completed
        </p>
      </div>
    );
  }
  return null;
};

export const RefundChart: React.FC<RefundChartProps> = ({ data }) => {
  const [period, setPeriod] = useState<'6m' | '1y' | 'ytd'>('6m');

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Refund Recovery Trends</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical refund volume and successful dollar returns
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-medium text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setPeriod('6m')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              period === '6m' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => setPeriod('1y')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              period === '1y' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Past Year
          </button>
          <button
            onClick={() => setPeriod('ytd')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              period === 'ytd' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            YTD
          </button>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="refundColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#refundColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

