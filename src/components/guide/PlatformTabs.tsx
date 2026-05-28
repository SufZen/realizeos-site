import { useState } from 'react';

interface PlatformTabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
}

export function PlatformTabs({ tabs }: PlatformTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');

  return (
    <div className="my-5">
      <div className="flex gap-1 border-b border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
              active === tab.id
                ? 'bg-brand-yellow text-background border-b-2 border-brand-yellow'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) =>
        tab.id === active ? <div key={tab.id}>{tab.content}</div> : null
      )}
    </div>
  );
}
