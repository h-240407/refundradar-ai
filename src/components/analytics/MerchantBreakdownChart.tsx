import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MerchantBreakdown } from '../../types';

interface MerchantBreakdownChartProps {
  data: MerchantBreakdown[];
}

export const MerchantBreakdownChart: React.FC<MerchantBreakdownChartProps> = ({
  data,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Total Claim Value by Retailer</h3>
        <p className="text-xs text-slate-500">Merchants with highest aggregate refund volume</p>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="category"
              dataKey="merchant"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#0f172a', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value) => [`$${value}`, 'Refund Total']}
            />
            <Bar dataKey="totalAmount" fill="#2563eb" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

