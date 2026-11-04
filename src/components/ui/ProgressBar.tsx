import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  value: number; // 0-100
  color?: 'brand' | 'success' | 'warning' | 'danger' | 'accent';
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'accent';
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const colorStyles: Record<NonNullable<ProgressBarProps['color']>, string> = {
  brand: 'bg-brand-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  accent: 'bg-accent-500',
};

const trackSizes: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'brand',
  variant,
  label,
  showPercentage = false,
  size = 'md',
  className,
}) => {
  const chosenColor = variant || color;
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-navy-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs font-medium text-navy-500">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        className={clsx(
          'w-full rounded-full bg-navy-100 overflow-hidden',
          trackSizes[size],
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorStyles[chosenColor],
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
export default ProgressBar;
