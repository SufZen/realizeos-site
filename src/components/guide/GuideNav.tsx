import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface GuideNavProps {
  sectionTitle: string;
  prev?: { id: string; title: string } | null;
  next?: { id: string; title: string } | null;
}

export function GuideBreadcrumb({ sectionTitle }: { sectionTitle: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/guide" className="hover:text-foreground transition-colors">Guide</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-foreground font-medium truncate">{sectionTitle}</span>
    </nav>
  );
}

export function GuidePrevNext({ prev, next }: Omit<GuideNavProps, 'sectionTitle'>) {
  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
      {prev ? (
        <Link
          to={`/guide/${prev.id}`}
          className="group flex-1 flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-brand-yellow hover:bg-card"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-brand-yellow transition-colors flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Previous</p>
            <p className="text-sm font-medium text-foreground truncate">{prev.title}</p>
          </div>
        </Link>
      ) : <div className="flex-1" />}
      {next ? (
        <Link
          to={`/guide/${next.id}`}
          className="group flex-1 flex items-center justify-end gap-3 rounded-xl border border-border p-4 text-right transition-all hover:border-brand-yellow hover:bg-card"
        >
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Next</p>
            <p className="text-sm font-medium text-foreground truncate">{next.title}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand-yellow transition-colors flex-shrink-0" />
        </Link>
      ) : <div className="flex-1" />}
    </div>
  );
}
