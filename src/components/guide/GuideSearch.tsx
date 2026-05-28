import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { guideSections } from '@/data/guideContent';

interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  heading: string;
  snippet: string;
  score: number;
}

function buildIndex(): { sectionId: string; sectionTitle: string; heading: string; text: string }[] {
  const entries: { sectionId: string; sectionTitle: string; heading: string; text: string }[] = [];
  for (const section of guideSections) {
    let currentHeading = section.title;
    for (const block of section.content) {
      if (block.type === 'heading') {
        currentHeading = block.text;
      }
      if (block.type === 'paragraph' || block.type === 'heading') {
        entries.push({
          sectionId: section.id,
          sectionTitle: section.title,
          heading: currentHeading,
          text: block.text,
        });
      }
      if (block.type === 'list') {
        entries.push({
          sectionId: section.id,
          sectionTitle: section.title,
          heading: currentHeading,
          text: (block.items || []).join(' '),
        });
      }
    }
  }
  return entries;
}

function fuzzySearch(query: string, entries: ReturnType<typeof buildIndex>): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const words = q.split(/\s+/);
  const results: SearchResult[] = [];

  for (const entry of entries) {
    const text = entry.text.toLowerCase();
    const heading = entry.heading.toLowerCase();
    let score = 0;

    for (const word of words) {
      if (heading.includes(word)) score += 10;
      if (text.includes(word)) score += 5;
    }
    if (text.includes(q)) score += 20;
    if (heading.includes(q)) score += 30;

    if (score > 0) {
      const idx = text.indexOf(words[0]);
      const start = Math.max(0, idx - 40);
      const snippet = (start > 0 ? '…' : '') + entry.text.slice(start, start + 120) + (start + 120 < entry.text.length ? '…' : '');
      results.push({ sectionId: entry.sectionId, sectionTitle: entry.sectionTitle, heading: entry.heading, snippet, score });
    }
  }

  // Dedupe by heading, keep highest score
  const seen = new Map<string, SearchResult>();
  for (const r of results) {
    const key = `${r.sectionId}::${r.heading}`;
    const existing = seen.get(key);
    if (!existing || r.score > existing.score) seen.set(key, r);
  }

  return Array.from(seen.values()).sort((a, b) => b.score - a.score).slice(0, 12);
}

export function GuideSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setSelectedIdx(0);
    setResults(fuzzySearch(q, index));
  }, [index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[selectedIdx]) { setOpen(false); }
  };

  // Inline trigger for the hub page
  const InlineTrigger = (
    <button
      onClick={() => setOpen(true)}
      className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-brand-yellow/50 hover:shadow-lg hover:shadow-brand-yellow/5 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
    >
      <Search className="h-5 w-5 text-muted-foreground group-hover:text-brand-yellow transition-colors" />
      <span className="flex-1 text-muted-foreground text-sm">Search the guide…</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-border bg-surface px-2 py-0.5 text-xs font-mono text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );

  if (!open) return InlineTrigger;

  return (
    <>
      {InlineTrigger}
      {/* Modal overlay */}
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={() => setOpen(false)}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <div
          className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {query && results.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">No results found for "{query}"</p>
            )}
            {results.map((r, i) => (
              <Link
                key={`${r.sectionId}-${r.heading}-${i}`}
                to={`/guide/${r.sectionId}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 rounded-lg px-4 py-3 transition-colors ${
                  i === selectedIdx ? 'bg-brand-yellow/10 text-foreground' : 'text-muted-foreground hover:bg-surface'
                }`}
              >
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-yellow" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.heading}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.sectionTitle}</p>
                  {r.snippet && <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">{r.snippet}</p>}
                </div>
              </Link>
            ))}
            {!query && (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">Start typing to search all guide sections</p>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span><kbd className="font-mono">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono">↵</kbd> select</span>
            <span><kbd className="font-mono">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </>
  );
}
