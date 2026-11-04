import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { MonthlyTrend } from '../../types';

interface MonthlyTrendsChartProps {
  data: MonthlyTrend[];
}

export const MonthlyTrendsChart: React.FC<MonthlyTrendsChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Volume vs Recovery Value</h3>
        <p className="text-xs text-slate-500">Monthly count of refunds and total recovered sum</p>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="refunds" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Refund Count" />
            <Bar yAxisId="right" dataKey="amount" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Value ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

