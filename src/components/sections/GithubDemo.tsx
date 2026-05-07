import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Terminal, Github, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INSTALL_METHODS = [
  {
    id: 'npx',
    name: 'NPX',
    command: 'npx @realize-os/cli init my-business\ncd my-business\nnpx @realize-os/cli start',
    reqs: 'Node.js 18+ & Docker',
    tag: 'Recommended'
  },
  {
    id: 'docker',
    name: 'Docker',
    command: 'docker run -d -p 8080:8080 -v realizeos-data:/app/data ghcr.io/sufzen/realizeos:latest',
    reqs: 'Docker',
    tag: 'One-liner'
  },
  {
    id: 'pip',
    name: 'Python',
    command: 'pip install realize-os\nrealize-os init --template consulting\nrealize-os serve',
    reqs: 'Python 3.11+'
  },
  {
    id: 'curl',
    name: 'Linux/Mac',
    command: 'curl -fsSL https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.sh | bash',
    reqs: 'bash + Docker'
  },
  {
    id: 'ps',
    name: 'Windows',
    command: 'irm https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.ps1 | iex',
    reqs: 'PowerShell + Docker'
  }
];

export function GithubDemo() {
  const { t } = useTranslation();
  const [activeMethod, setActiveMethod] = useState(INSTALL_METHODS[0]);
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(activeMethod.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="quickstart" className="bg-muted/30">
      <SectionHeader
        title={t('quickstart.title', 'Zero to Running in 10 Minutes')}
        subtitle={t('quickstart.subtitle', 'Fully open source. Deploy locally or on your own server. You own the data.')}
      />
      <AnimateOnScroll>
        <div className="mx-auto max-w-4xl grid md:grid-cols-12 gap-6 items-start">
          
          <div className="md:col-span-4 flex flex-col gap-2">
            <a 
              href="https://github.com/SufZen/RealizeOS-5" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-4 mb-4 rounded-xl glass-card border-brand-yellow/30 hover:border-brand-yellow/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Github size={24} className="text-foreground" />
                <div className="text-left">
                  <div className="font-semibold text-sm">RealizeOS V5</div>
                  <div className="text-xs text-muted-foreground group-hover:text-brand-yellow transition-colors">View Repository →</div>
                </div>
              </div>
            </a>

            <div className="text-sm font-medium mb-2 text-muted-foreground px-1 uppercase tracking-wider">
              {t('quickstart.install_methods', 'Install Options')}
            </div>
            
            {INSTALL_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method)}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  activeMethod.id === method.id 
                    ? 'bg-primary/10 border-primary/30 border text-primary font-medium' 
                    : 'bg-card border-border border hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{method.name}</span>
                {method.tag && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeMethod.id === method.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {method.tag}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="md:col-span-8 glass-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-card/60 border-b border-border/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                <Terminal size={14} />
                Terminal
              </div>
            </div>
            <div className="p-6 bg-[#0E1117] min-h-[180px] relative group">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {activeMethod.command}
              </pre>
              
              <Button 
                variant="secondary" 
                size="sm" 
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={copyCommand}
              >
                {copied ? <Check size={14} className="mr-1.5" /> : <Copy size={14} className="mr-1.5" />}
                {copied ? t('quickstart.copied', 'Copied') : t('quickstart.copy', 'Copy')}
              </Button>
            </div>
            <div className="bg-card/40 px-6 py-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t('quickstart.requires', 'Requires:')} <strong className="text-foreground font-medium">{activeMethod.reqs}</strong>
              </span>
              <a href="https://github.com/SufZen/RealizeOS-5/blob/main/QUICKSTART.md" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                {t('quickstart.view_full_guide', 'View Full Guide →')}
              </a>
            </div>
          </div>

        </div>
      </AnimateOnScroll>
    </Section>
  );
}
