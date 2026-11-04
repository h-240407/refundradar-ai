import React from 'react';
import clsx from 'clsx';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const [imgError, setImgError] = React.useState(false);

  const showFallback = !src || imgError;

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden',
        showFallback && 'bg-brand-100 text-brand-700 font-semibold',
        sizeStyles[size],
        className,
      )}
      aria-label={name}
      role="img"
    >
      {!showFallback ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export { Avatar };
export default Avatar;
