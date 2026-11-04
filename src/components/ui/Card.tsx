import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-white border border-navy-200 shadow-sm',
  elevated: 'bg-white border border-navy-100 shadow-md',
  outline: 'bg-transparent border border-navy-300',
  glass: 'bg-white/70 backdrop-blur-lg border border-white/20 shadow-sm',
};

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-navy-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-navy-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      className,
      onClick,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        className={clsx(
          'rounded-lg',
          'transition-all duration-200',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
          onClick && 'cursor-pointer',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export { Card };
export default Card;
