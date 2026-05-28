import { Link } from 'react-router-dom';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { GuideSearch } from '@/components/guide/GuideSearch';
import { guideSections } from '@/data/guideContent';
import {
  Rocket, Layers, Plug, Settings, Wand2, Link2, Server, Award,
} from 'lucide-react';

const iconMap: Record<string, typeof Rocket> = {
  Rocket, Layers, Plug, Settings, Wand2, Link2, Server, Award,
};

export default function GuideHub() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-yellow/5 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-site px-5 py-16 text-center relative">
            <p className="text-sm font-mono text-brand-yellow uppercase tracking-widest mb-3">Documentation</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              User's <span className="text-brand-yellow">Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to install, configure, and master RealizeOS — from your first command to production deployment.
            </p>
            <div className="max-w-xl mx-auto">
              <GuideSearch />
            </div>
          </div>
        </section>

        {/* Section Grid */}
        <section className="mx-auto max-w-site px-5 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guideSections.map((section) => {
              const Icon = iconMap[section.icon] || Rocket;
              return (
                <Link
                  key={section.id}
                  to={`/guide/${section.id}`}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-brand-yellow/50 hover:shadow-lg hover:shadow-brand-yellow/5 hover:-translate-y-0.5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow/10 text-brand-yellow transition-colors group-hover:bg-brand-yellow group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{section.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{section.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{section.description}</p>
                  <div className="mt-3 text-xs font-medium text-brand-yellow opacity-0 transition-opacity group-hover:opacity-100">
                    Read guide →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-site px-5 py-8">
          <div className="rounded-2xl border border-brand-yellow/30 bg-gradient-to-r from-brand-yellow/5 to-transparent p-8 text-center">
            <h2 className="text-xl font-bold text-foreground mb-2">Not sure where to start?</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
              Use the Venture Wizard to generate your complete AI operations profile in 10 minutes — then import it directly into RealizeOS.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://gemini.google.com/gem/1mEuuDUxPVlwV_I-ctKqKMI0hZL3GLO0-?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                🔮 Try Google Gem Wizard
              </a>
              <a
                href="https://chatgpt.com/g/g-6a17e2ad77988191a471b1bbdef534e1-realizeos-venture-intelligence-builder"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-brand-yellow"
              >
                🤖 Try Custom GPT Wizard
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
