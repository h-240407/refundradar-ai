import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { StatusDistribution } from '../../types';

interface StatusDistributionChartProps {
  data: StatusDistribution[];
}

const COLORS: Record<string, string> = {
  requested: '#3b82f6',
  processing: '#f59e0b',
  approved: '#10b981',
  issued: '#8b5cf6',
  completed: '#059669',
  delayed: '#ef4444',
  action_required: '#ea580c',
};

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({
  data,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900">Pipeline Status Breakdown</h3>
        <p className="text-xs text-slate-500">Distribution of claims across lifecycle stages</p>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="count"
              nameKey="status"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status] || '#94a3b8'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value, name) => [`${value} refunds`, String(name).replace('_', ' ')]}
            />
            <Legend
              formatter={(value) => (
                <span className="text-xs capitalize text-slate-600">
                  {String(value).replace('_', ' ')}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

