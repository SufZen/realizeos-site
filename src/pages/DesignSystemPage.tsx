import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const tokenGroups = [
  {
    title: 'Brand Colors',
    tokens: [
      { name: '--rz-brand-yellow', sample: 'bg-brand-yellow' },
      { name: '--rz-bg', sample: 'bg-background' },
      { name: '--rz-surface', sample: 'bg-card' },
      { name: '--rz-text', sample: 'text-foreground' },
      { name: '--rz-text-muted', sample: 'text-muted-foreground' },
    ],
  },
  {
    title: 'Semantic Colors',
    tokens: [
      { name: '--rz-success', sample: 'bg-success' },
      { name: '--rz-warning', sample: 'bg-warning' },
      { name: '--rz-danger', sample: 'bg-danger' },
      { name: '--rz-info', sample: 'bg-primary' },
    ],
  },
];

const effectClasses = [
  'fx-glass-card',
  'fx-gradient-text',
  'fx-text-glow',
  'fx-glow',
  'fx-dot-grid',
  'fx-radial-halo',
  'fx-animated-border',
  'fx-illustration-glow',
];

export default function DesignSystemPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-site px-5">
          <h1 className="text-4xl font-bold mb-2 fx-gradient-text">
            {t('design.title', 'RealizeOS Design System')}
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            {t('design.subtitle', 'Canonical tokens, effects, and components that power the RealizeOS site. Built on @realizeos/design-system with --rz-* CSS custom properties.')}
          </p>

          {/* Tokens */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Design Tokens</h2>
            {tokenGroups.map((group) => (
              <div key={group.title} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-brand-yellow">{group.title}</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tokens.map((token) => (
                    <div key={token.name} className="fx-glass-card rounded-lg p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${token.sample} border border-border/50`} />
                      <code className="text-xs text-muted-foreground font-mono">{token.name}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Effects */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Effect Classes (.fx-*)</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {effectClasses.map((cls) => (
                <div key={cls} className="fx-glass-card rounded-xl p-5">
                  <code className="text-sm text-brand-yellow font-mono mb-3 block">.{cls}</code>
                  <div className={`${cls} rounded-lg p-4 min-h-[60px] flex items-center justify-center text-sm`}>
                    {cls === 'fx-gradient-text' ? (
                      <span className={cls}>Gradient Text</span>
                    ) : cls === 'fx-text-glow' ? (
                      <span className={cls}>Glowing Text</span>
                    ) : (
                      <span className="text-muted-foreground">Preview</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Components */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Components</h2>

            <div className="space-y-8">
              {/* Buttons */}
              <div className="fx-glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="fx-glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-brand-yellow text-primary-foreground">Brand</Badge>
                </div>
              </div>

              {/* Input */}
              <div className="fx-glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Inputs</h3>
                <div className="max-w-sm space-y-3">
                  <Input placeholder="Default input" />
                  <Input type="email" placeholder="Email input" />
                  <Input disabled placeholder="Disabled input" />
                </div>
              </div>

              {/* Accordion */}
              <div className="fx-glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Accordion</h3>
                <Accordion type="single" collapsible className="max-w-lg">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Accordion Item 1</AccordionTrigger>
                    <AccordionContent>Content for the first item. This demonstrates the accordion pattern used throughout the site.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Accordion Item 2</AccordionTrigger>
                    <AccordionContent>Content for the second item.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Glass Card */}
              <div className="fx-glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Glass Card</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="fx-glass-card rounded-xl p-4 text-center">
                    <p className="text-sm">Standard Glass</p>
                  </div>
                  <div className="fx-glass-card fx-animated-border rounded-xl p-4 text-center">
                    <p className="text-sm">Animated Border</p>
                  </div>
                  <div className="fx-glass-card rounded-xl p-4 text-center hover:-translate-y-0.5 transition-transform">
                    <p className="text-sm">Hover Lift</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Typography</h2>
            <div className="fx-glass-card rounded-xl p-6 space-y-4">
              <h1 className="text-4xl font-bold">Heading 1 (Poppins Bold)</h1>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-semibold">Heading 4</h4>
              <p className="text-base">Body text (Poppins Regular)</p>
              <p className="text-sm text-muted-foreground">Muted body text</p>
              <p className="font-mono text-sm">Monospace (JetBrains Mono)</p>
              <p className="fx-gradient-text text-2xl font-bold">Gradient Text Effect</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
