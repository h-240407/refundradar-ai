import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  placeholder = 'Search…',
  debounceMs = 300,
  className,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(controlledValue ?? '');
  const [prevControlled, setPrevControlled] = useState(controlledValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync controlled value → internal during render
  if (isControlled && controlledValue !== prevControlled) {
    setPrevControlled(controlledValue);
    setInternal(controlledValue);
  }

  const debouncedOnChange = useCallback(
    (val: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(val), debounceMs);
    },
    [onChange, debounceMs],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternal(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    setInternal('');
    onChange('');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className={clsx('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-navy-400">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="search"
        value={internal}
        onChange={handleChange}
        placeholder={placeholder}
        className={clsx(
          'block w-full rounded-md border border-navy-300 bg-white text-sm text-navy-900 placeholder:text-navy-400',
          'pl-10 pr-9 py-2',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500',
        )}
        aria-label="Search"
      />
      {internal && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-navy-400 hover:text-navy-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export { SearchInput };
export default SearchInput;
