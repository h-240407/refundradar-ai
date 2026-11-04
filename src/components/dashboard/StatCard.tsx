import React from 'react';
import clsx from 'clsx';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtitle?: string;
  variant?: 'brand' | 'amber' | 'emerald' | 'rose' | 'default';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDirection = 'up',
  subtitle,
  variant = 'default',
  onClick,
}) => {
  const iconVariants = {
    brand: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    default: 'bg-slate-100 text-slate-700',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-all duration-200',
        onClick && 'cursor-pointer hover:border-slate-300 hover:shadow-md'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', iconVariants[variant])}>
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </h3>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs">
        {trend && (
          <div
            className={clsx(
              'inline-flex items-center gap-1 font-semibold',
              trendDirection === 'up' ? 'text-emerald-600' : 'text-rose-600'
            )}
          >
            {trendDirection === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{trend}</span>
          </div>
        )}
        {subtitle && <span className="text-slate-600 font-medium">{subtitle}</span>}
      </div>
    </div>
  );
};

