import React from 'react';
import clsx from 'clsx';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  action,
  className,
}) => {
  const finalLabel = action?.label || actionLabel;
  const finalAction = action?.onClick || onAction;

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className,
      )}
    >
      {icon && (
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 text-slate-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-slate-500 max-w-sm">{description}</p>
      )}
      {finalLabel && finalAction && (
        <div className="mt-6">
          <Button variant="primary" onClick={finalAction}>
            {finalLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmptyState };
export default EmptyState;
