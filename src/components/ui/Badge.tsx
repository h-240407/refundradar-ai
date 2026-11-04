import React from 'react';
import clsx from 'clsx';
import type { RefundStatus } from '@/types';

interface BadgeProps {
  status: RefundStatus;
  size?: 'sm' | 'md';
  dot?: boolean;
  withDot?: boolean;
  className?: string;
}

const statusConfig: Record<
  RefundStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  requested: {
    label: 'Requested',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  processing: {
    label: 'Processing',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'Approved',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  issued: {
    label: 'Issued',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  delayed: {
    label: 'Delayed',
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  action_required: {
    label: 'Action Required',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

const Badge: React.FC<BadgeProps> = ({
  status,
  size = 'md',
  dot = false,
  withDot = false,
  className,
}) => {
  const showDot = dot || withDot;
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        config.text,
        sizeStyles[size],
        className,
      )}
    >
      {showDot && (
        <span
          className={clsx('h-1.5 w-1.5 rounded-full', config.dot)}
          aria-hidden="true"
        />
      )}
      {config.label}
    </span>
  );
};

export { Badge };
export default Badge;
