import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Bot, Brain, ShieldCheck, FileSearch, Plug } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

// Clients with a documented setup in the product docs (docs/mcp-server.md).
// Anything else is covered by "any MCP client" — don't add names that haven't been tested.
const AGENTS = ['Claude.ai', 'Claude Desktop', 'Claude Code', 'n8n'];
// Tools registered in the product's tool registry (CHANGELOG 5.7.0).
const TOOLS = ['Gmail', 'Google Calendar', 'Google Drive', 'Google Sheets', 'ClickUp'];

/** Arrow between diagram columns: points down when stacked, along reading direction when side by side. */
function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-2 text-brand-yellow md:px-2 md:py-0" aria-hidden>
      {label && <span className="font-mono text-xs font-semibold tracking-widest">{label}</span>}
      <ArrowRight size={22} className="rotate-90 md:rotate-0 md:rtl:rotate-180" />
    </div>
  );
}

function Column({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof Bot }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon size={16} className="text-brand-yellow" />
        {title}
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function BringAnyAgent() {
  const { t } = useTranslation();
  const points = t('agents.points', { returnObjects: true }) as { t: string; b: string }[];

  return (
    <Section id="agents" className="bg-card/30">
      <SectionHeader title={t('agents.title')} subtitle={t('agents.subtitle')} />

      <AnimateOnScroll>
        <figure
          className="mx-auto flex max-w-5xl flex-col items-stretch md:flex-row"
          aria-label={`${t('agents.diagram.agentsLabel')} → MCP → RealizeOS → ${t('agents.diagram.toolsLabel')}`}
        >
          <Column
            title={t('agents.diagram.agentsLabel')}
            icon={Bot}
            items={[...AGENTS, t('agents.diagram.anyClient')]}
          />
          <FlowArrow label={t('agents.diagram.mcp')} />
          <div className="fx-animated-border flex-[1.2] rounded-xl bg-background p-5">
            <p className="mb-4 text-center text-lg font-bold">
              Realize<span className="text-brand-yellow">OS</span>
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { icon: Brain, label: t('agents.diagram.brain') },
                { icon: ShieldCheck, label: t('agents.diagram.approvals') },
                { icon: FileSearch, label: t('agents.diagram.trail') },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-lg bg-brand-yellow/10 px-3 py-2">
                  <Icon size={16} className="shrink-0 text-brand-yellow" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <FlowArrow />
          <Column
            title={t('agents.diagram.toolsLabel')}
            icon={Plug}
            items={[...TOOLS, t('agents.diagram.mcpServers')]}
          />
        </figure>
      </AnimateOnScroll>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {points.map((p, i) => (
          <AnimateOnScroll key={p.t} delay={i * 0.08}>
            <h3 className="mb-2 font-semibold">{p.t}</h3>
            <p className="text-sm text-muted-foreground">{p.b}</p>
          </AnimateOnScroll>
        ))}
      </div>

      <p className="mt-10 text-center">
        <Link to="/guide/connectors" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-yellow hover:underline">
          {t('agents.link')}
          <ArrowRight size={14} className="rtl:rotate-180" />
        </Link>
      </p>
    </Section>
  );
}
