/* ─────────────────────────────────────────────
 * WizardReview — Review & edit all fields
 * ───────────────────────────────────────────── */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Edit3, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND_FIELDS, type BrandFieldValues, type Confidence } from '@/types/wizard';

interface WizardReviewProps {
  fields: BrandFieldValues;
  fieldConfidence: Partial<Record<keyof BrandFieldValues, Confidence>>;
  onFieldChange: (key: keyof BrandFieldValues, value: string) => void;
  onFinalize: () => void;
  onBack: () => void;
}

const SECTION_META = {
  identity: { label: 'Who You Are', icon: '👤', color: 'text-indigo-400', bgColor: 'bg-indigo-400/10' },
  business: { label: 'Your Business', icon: '🏢', color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  voice: { label: 'Your Voice', icon: '🎙️', color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  examples: { label: 'Voice Examples', icon: '✍️', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
} as const;

function confidenceStyle(c: Confidence | undefined) {
  switch (c) {
    case 'HIGH': return { icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />, label: 'Auto-filled', bg: 'bg-green-400/10' };
    case 'MEDIUM': return { icon: <Sparkles className="h-3.5 w-3.5 text-brand-yellow" />, label: 'Needs review', bg: 'bg-brand-yellow/10' };
    case 'LOW': return { icon: <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />, label: 'Low confidence', bg: 'bg-orange-400/10' };
    case 'NOT_FOUND': return { icon: <Edit3 className="h-3.5 w-3.5 text-red-400" />, label: 'Manual entry', bg: 'bg-red-400/10' };
    default: return { icon: <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />, label: 'Manual', bg: 'bg-muted/30' };
  }
}

export function WizardReview({ fields, fieldConfidence, onFieldChange, onFinalize, onBack }: WizardReviewProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['identity', 'business', 'voice', 'examples'])
  );
  const [editingField, setEditingField] = useState<keyof BrandFieldValues | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const sections = ['identity', 'business', 'voice', 'examples'] as const;

  // Count completion
  const filledCount = BRAND_FIELDS.filter((f) => fields[f.key].trim().length > 0).length;
  const totalCount = BRAND_FIELDS.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Summary header */}
      <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-brand-yellow">{filledCount}</strong> of {totalCount} fields filled
        </p>
        <div className="mx-auto mt-2 h-1.5 max-w-xs overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-brand-yellow transition-all duration-500"
            style={{ width: `${(filledCount / totalCount) * 100}%` }}
          />
        </div>
        {filledCount < totalCount && (
          <p className="mt-2 text-xs text-muted-foreground">
            Empty fields will show <code className="rounded bg-muted px-1 text-[10px]">[Not filled in]</code> in the output files
          </p>
        )}
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const meta = SECTION_META[section];
        const sectionFields = BRAND_FIELDS.filter((f) => f.section === section);
        const isExpanded = expandedSections.has(section);
        const sectionFilled = sectionFields.filter((f) => fields[f.key].trim().length > 0).length;

        return (
          <div key={section} className="rounded-xl border border-border bg-card/30 overflow-hidden">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/20"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${meta.bgColor}`}>
                {meta.icon}
              </span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${meta.color}`}>{meta.label}</p>
                <p className="text-xs text-muted-foreground">{sectionFilled}/{sectionFields.length} fields</p>
              </div>
              {isExpanded
                ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                : <ChevronRight className="h-4 w-4 text-muted-foreground" />
              }
            </button>

            {/* Section fields */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-1 px-5 pb-4">
                    {sectionFields.map((field) => {
                      const value = fields[field.key];
                      const conf = fieldConfidence[field.key];
                      const cs = confidenceStyle(conf);
                      const isEditing = editingField === field.key;
                      const isEmpty = !value.trim();

                      return (
                        <div
                          key={field.key}
                          className="group rounded-lg border border-border/50 bg-background/20 p-3 transition-colors hover:border-border"
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">{field.label}</p>
                              {conf && (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cs.bg}`}>
                                  {cs.icon} {cs.label}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => setEditingField(isEditing ? null : field.key)}
                              className="rounded p-1 text-muted-foreground opacity-0 transition-all hover:text-foreground group-hover:opacity-100"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {isEditing ? (
                            <textarea
                              autoFocus
                              value={value}
                              onChange={(e) => onFieldChange(field.key, e.target.value)}
                              onBlur={() => setEditingField(null)}
                              placeholder={field.placeholder}
                              rows={3}
                              className="mt-1 w-full resize-y rounded-md border border-border bg-background/40 p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-yellow/60 focus:outline-none focus:ring-1 focus:ring-brand-yellow/30"
                            />
                          ) : (
                            <p className={`text-sm leading-relaxed ${isEmpty ? 'italic text-muted-foreground/50' : 'text-muted-foreground'}`}>
                              {isEmpty ? 'Not filled in — click edit to add' : value}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onFinalize} className="flex-1">
          Generate Files →
        </Button>
      </div>
    </div>
  );
}
