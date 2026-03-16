/* ─────────────────────────────────────────────
 * WizardExport — Enhanced file generation & download
 * ───────────────────────────────────────────── */
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, FileText, Package, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BrandFieldValues, AnalysisResult } from '@/types/wizard';
import {
  generateIdentityMd,
  generateBrandIdentityMd,
  generateBrandVoiceMd,
  type WizardState,
} from '@/lib/generate-markdown';

interface WizardExportProps {
  fields: BrandFieldValues;
  analysisResult: AnalysisResult | null;
  onReset: () => void;
  onBack: () => void;
  userEmail?: string;
}

interface ExportableFile {
  label: string;
  sublabel: string;
  filename: string;
  path: string;
  content: string;
  isNew?: boolean;
}

function generateBrandStrategyMd(result: AnalysisResult | null): string | null {
  if (!result || !result.bonusInsights.competitors.length) return null;
  const { competitors, marketClues } = result.bonusInsights;
  return `# Venture Strategy — Competitive Landscape

This file was auto-generated from your uploaded materials. Review and update as your market evolves.

## Competitors Identified
${competitors.map((c) => `- ${c}`).join('\n')}

## Market Positioning Insights
${marketClues || '[No market clues extracted]'}

## Writing Patterns Detected
- **Tone**: ${result.bonusInsights.writingPatterns.toneProfile || 'Not detected'}
- **Frequently used words**: ${result.bonusInsights.writingPatterns.vocabularyFrequent.join(', ') || 'None detected'}
- **Words avoided**: ${result.bonusInsights.writingPatterns.vocabularyAvoided.join(', ') || 'None detected'}
`;
}

function CopyDownloadButton({ text, filename }: { text: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={handleCopy} className="flex-1 gap-1.5">
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <Button size="sm" variant="outline" onClick={handleDownload} className="gap-1.5">
        <Download className="h-3 w-3" /> Download
      </Button>
    </div>
  );
}

export function WizardExport({ fields, analysisResult, onReset, onBack, userEmail }: WizardExportProps) {
  const [downloadedAll, setDownloadedAll] = useState(false);

  // Generate file contents — reuse existing markdown generators
  const wizardState: WizardState = fields;
  const identityMd = useMemo(() => generateIdentityMd(wizardState), [wizardState]);
  const brandIdentityMd = useMemo(() => generateBrandIdentityMd(wizardState), [wizardState]);
  const brandVoiceMd = useMemo(() => generateBrandVoiceMd(wizardState), [wizardState]);
  const brandStrategyMd = useMemo(() => generateBrandStrategyMd(analysisResult), [analysisResult]);

  const files: ExportableFile[] = useMemo(() => {
    const base: ExportableFile[] = [
      {
        label: 'identity.md',
        sublabel: 'Who you are — goes in shared/',
        filename: 'identity.md',
        path: 'shared/identity.md',
        content: identityMd,
      },
      {
        label: 'venture-identity.md',
        sublabel: 'Your business positioning — goes in F-foundations/',
        filename: 'venture-identity.md',
        path: 'systems/my-business-1/F-foundations/venture-identity.md',
        content: brandIdentityMd,
      },
      {
        label: 'venture-voice.md',
        sublabel: 'How your content sounds — goes in F-foundations/',
        filename: 'venture-voice.md',
        path: 'systems/my-business-1/F-foundations/venture-voice.md',
        content: brandVoiceMd,
      },
    ];
    if (brandStrategyMd) {
      base.push({
        label: 'venture-strategy.md',
        sublabel: 'Competitive insights — auto-generated from your docs',
        filename: 'venture-strategy.md',
        path: 'systems/my-business-1/F-foundations/venture-strategy.md',
        content: brandStrategyMd,
        isNew: true,
      });
    }
    return base;
  }, [identityMd, brandIdentityMd, brandVoiceMd, brandStrategyMd]);

  function handleDownloadAll() {
    files.forEach((f) => {
      const blob = new Blob([f.content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = f.filename; a.click();
      URL.revokeObjectURL(url);
    });
    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 3000);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 p-6 text-center"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow/10">
          <Sparkles className="h-6 w-6 text-brand-yellow" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Your Venture Files Are Ready</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {files.length} file{files.length > 1 ? 's' : ''} generated.{' '}
          {userEmail
            ? <>We'll also send them to <strong className="text-brand-yellow">{userEmail}</strong>.</>
            : 'Download and place them in your RealizeOS vault.'
          }
        </p>
      </motion.div>

      {/* File cards */}
      <div className="space-y-3">
        {files.map((file, i) => (
          <motion.div
            key={file.filename}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card/30 p-4"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand-yellow" />
                <div>
                  <p className="flex items-center gap-2 font-mono text-xs font-medium text-brand-yellow">
                    {file.path}
                    {file.isNew && (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                        NEW
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{file.sublabel}</p>
                </div>
              </div>
            </div>
            <CopyDownloadButton text={file.content} filename={file.filename} />
          </motion.div>
        ))}
      </div>

      {/* Bulk download */}
      <Button onClick={handleDownloadAll} className="gap-2">
        <Package className="h-4 w-4" />
        {downloadedAll ? '✓ Downloaded!' : `Download All ${files.length} Files`}
      </Button>

      {/* Next steps */}
      <div className="rounded-xl border border-border bg-card/30 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Place these files in your RealizeOS vault, then ask your AI:
        </p>
        <p className="mt-2 font-mono text-sm text-brand-yellow italic">
          "Help me write a LinkedIn post"
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          — and watch it work in <strong>your</strong> voice.
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Edit Fields
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground">
          Start Over
        </Button>
      </div>
    </div>
  );
}
