import React from 'react';
import clsx from 'clsx';

interface Tab {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, className }) => {
  return (
    <div
      className={clsx('border-b border-navy-200', className)}
      role="tablist"
    >
      <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.value)}
              className={clsx(
                'whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-t-sm',
                isActive
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-navy-500 hover:text-navy-700 hover:border-navy-300',
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    'ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium',
                    isActive
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-navy-100 text-navy-600',
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export { Tabs };
export default Tabs;
