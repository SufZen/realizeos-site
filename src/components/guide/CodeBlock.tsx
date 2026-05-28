import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="guide-code-block group relative my-4 rounded-lg border border-border bg-card overflow-hidden">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-elevated/50">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {title || language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-mono text-muted-foreground opacity-0 transition-all duration-200 hover:border-brand-yellow hover:text-brand-yellow group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-success">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
