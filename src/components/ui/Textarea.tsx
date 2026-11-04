import React from 'react';
import clsx from 'clsx';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      className,
      id,
      rows = 4,
      ...rest
    },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-navy-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={clsx(
            'block w-full rounded-md border border-navy-300 bg-white text-sm text-navy-900 placeholder:text-navy-400',
            'px-3 py-2',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'focus:border-brand-500 focus:ring-brand-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-y',
            error &&
              'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
                ? `${textareaId}-helper`
                : undefined
          }
          {...rest}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs text-danger-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${textareaId}-helper`}
            className="mt-1.5 text-xs text-navy-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
