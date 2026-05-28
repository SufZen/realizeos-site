import { useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { GuideRenderer } from '@/components/guide/GuideRenderer';
import { GuideSidebar } from '@/components/guide/GuideSidebar';
import { GuideBreadcrumb, GuidePrevNext } from '@/components/guide/GuideNav';
import { getSection, getAdjacentSections } from '@/data/guideContent';

export default function GuideSectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionId ? getSection(sectionId) : undefined;
  const adjacent = sectionId ? getAdjacentSections(sectionId) : { prev: null, next: null };

  const tocItems = useMemo(() => {
    if (!section) return [];
    return section.content
      .filter(b => b.type === 'heading' && b.id)
      .map(b => ({
        id: b.id!,
        title: b.text,
        level: b.level || 2,
      }));
  }, [section]);

  if (!section) return <Navigate to="/guide" replace />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        {/* Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-site px-5 py-8">
            <GuideBreadcrumb sectionTitle={section.title} />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{section.title}</h1>
            <p className="text-muted-foreground">{section.description}</p>
            <span className="inline-block mt-3 text-xs font-mono text-brand-yellow bg-brand-yellow/10 px-2.5 py-1 rounded-full">
              {section.readTime} read
            </span>
          </div>
        </section>

        {/* Content + Sidebar */}
        <div className="mx-auto max-w-site px-5 py-8 flex gap-8">
          {/* Main content */}
          <article className="min-w-0 flex-1 max-w-3xl">
            <GuideRenderer blocks={section.content} />
            <GuidePrevNext prev={adjacent.prev} next={adjacent.next} />
          </article>

          {/* Right sidebar */}
          <GuideSidebar items={tocItems} />
        </div>
      </main>
      <Footer />
    </>
  );
}
