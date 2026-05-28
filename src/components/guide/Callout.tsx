import { Info, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; border: string; bg: string; title: string; iconColor: string }> = {
  info:    { icon: Info,          border: 'border-info',    bg: 'bg-info-soft',    title: 'Note',    iconColor: 'text-info' },
  warning: { icon: AlertTriangle, border: 'border-warning', bg: 'bg-warning-soft', title: 'Warning', iconColor: 'text-warning' },
  tip:     { icon: Lightbulb,     border: 'border-success', bg: 'bg-success-soft', title: 'Tip',     iconColor: 'text-success' },
  danger:  { icon: ShieldAlert,   border: 'border-danger',  bg: 'bg-danger-soft',  title: 'Caution', iconColor: 'text-danger' },
};

export function Callout({ type, title, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className={`my-5 flex gap-3 rounded-lg border-l-4 ${c.border} ${c.bg} p-4`}>
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${c.iconColor}`} />
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${c.iconColor} mb-1`}>{title || c.title}</p>
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
