import { useEffect, useState, useRef } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface GuideSidebarProps {
  items: TocItem[];
}

export function GuideSidebar({ items }: GuideSidebarProps) {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first visible heading
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.1,
    });

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          On this page
        </p>
        <nav className="flex flex-col gap-0.5 border-l border-border">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`block py-1 text-sm transition-colors border-l-2 -ml-px ${
                item.level > 2 ? 'pl-6' : 'pl-4'
              } ${
                activeId === item.id
                  ? 'border-brand-yellow text-brand-yellow font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
