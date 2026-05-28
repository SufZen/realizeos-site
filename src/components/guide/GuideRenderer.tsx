import type { GuideBlock } from '@/data/guideTypes';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function RenderTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-elevated/50">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-brand-yellow">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-muted-foreground ${j === 0 ? 'font-medium text-foreground' : ''}`}>
                  <code className={cell.includes('/') || cell.includes('_') ? 'text-xs bg-surface px-1.5 py-0.5 rounded font-mono' : ''}>{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideRenderer({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="guide-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const id = block.id || slugify(block.text);
            const Tag = block.level === 3 ? 'h3' : 'h2';
            const cls = block.level === 3
              ? 'text-lg font-semibold text-brand-yellow mt-8 mb-3'
              : 'text-2xl font-bold text-foreground mt-12 mb-4 pb-3 border-b border-border first:mt-0';
            return <Tag key={i} id={id} className={cls}>{block.text}</Tag>;
          }
          case 'paragraph':
            return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
          case 'code':
            return <CodeBlock key={i} code={block.code || ''} language={block.language} title={block.title} />;
          case 'callout':
            return <Callout key={i} type={block.calloutType || 'info'}>{block.text}</Callout>;
          case 'table':
            return <RenderTable key={i} headers={block.headers || []} rows={block.rows || []} />;
          case 'list':
            if (block.ordered) {
              return (
                <ol key={i} className="my-4 list-decimal pl-6 space-y-2 text-muted-foreground">
                  {(block.items || []).map((item, j) => <li key={j} className="leading-relaxed">{item}</li>)}
                </ol>
              );
            }
            return (
              <ul key={i} className="my-4 list-disc pl-6 space-y-2 text-muted-foreground">
                {(block.items || []).map((item, j) => <li key={j} className="leading-relaxed">{item}</li>)}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
