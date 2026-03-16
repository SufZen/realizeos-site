export interface CaseStudy {
    title: string;
    industry: string;
    metric: string;
    quote: string;
    technical: string;
}

export const caseStudies: CaseStudy[] = [
    {
        title: 'BOA Architects',
        industry: 'Architecture & Design',
        metric: '40 hrs/week saved',
        quote:
            'We stopped drowning in compliance paperwork. Now the system drafts, reviews, and files — while we focus on designing spaces people actually want to live in.',
        technical:
            'Multi-agent workflow: a Researcher agent scans updated building codes per municipality, a Writer agent drafts compliance documents, a Reviewer agent flags inconsistencies against the project spec, and a Tools agent auto-files via Google Drive integration. The knowledge base stores 200+ regulatory templates across Portugal, Spain, and Israel.',
    },
    {
        title: 'Burtucala Real Estate',
        industry: 'Real Estate Investment',
        metric: '3× faster deal flow',
        quote:
            'Every market opportunity is surfaced, analyzed, and briefed before we even finish our morning coffee. We went from reactive to proactive overnight.',
        technical:
            'Scheduled intelligence routines run at 06:00 daily: an Analyst agent pulls market data from idealista, INE, and Banco de Portugal APIs. A Writer agent packages findings into a structured brief. A Knowledge agent cross-references against portfolio parameters stored in the vault. Alerts are pushed to Telegram with one-click approval for deeper analysis.',
    },
    {
        title: 'Realization Group',
        industry: 'Venture Consulting',
        metric: '5 ventures, 1 operator',
        quote:
            'I run architecture, real estate, consulting, content, and a SaaS product — all from one control room. The system doesn\'t just assist, it operates.',
        technical:
            'Full FABRIC stack deployment: Foundations layer holds identity, venture voice, and strategy documents. The Agent layer coordinates 6 specialized agents across all ventures. Brain layer ensures consistent voice across 4 different ventures. Routines layer automates weekly reports, LinkedIn posts, and investor updates. Insights layer tracks cross-venture KPIs. Creations layer outputs client proposals, blog posts, and pitch decks.',
    },
];
