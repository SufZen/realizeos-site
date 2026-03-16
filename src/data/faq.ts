export interface FaqItem {
  question: string;
  answer: string; // Can contain HTML for links
}

export const faqItems: FaqItem[] = [
  {
    question: 'What do I need to get started?',
    answer: '<p><strong>Lite:</strong> Obsidian (free) and a Claude Pro subscription ($20/mo from Anthropic). No coding required.</p><p><strong>Full:</strong> Python 3.11+, Docker (optional), and API keys for your chosen LLM providers (Anthropic and/or Google AI).</p>',
  },
  {
    question: 'Can I host it on my own server?',
    answer: '<p>Yes. The Full edition is designed for self-hosting. Deploy with Docker on any VPS, cloud instance, or local machine. Your data stays on your infrastructure.</p>',
  },
  {
    question: 'Which AI models does it support?',
    answer: '<p>The Full edition routes between Gemini Flash (fast/cheap), Claude Sonnet (balanced), and Claude Opus (powerful) — automatically selecting the best model for each task. The Lite edition works with any Claude model through Claude Code.</p>',
  },
  {
    question: 'Is my data private?',
    answer: '<p>Completely. RealizeOS runs on your machine or server. Your knowledge base, conversations, and business data never leave your infrastructure. The only external calls are to the LLM APIs you configure.</p>',
  },
  {
    question: 'What if I need help setting up?',
    answer: '<p>The Setup Assistance package ($499) includes a 1-hour call where we configure your system together — venture voice, agents, first workflow, everything. After purchase, you\'ll receive a detailed prep checklist. You can also reach out via email at any time.</p>',
  },
  {
    question: 'Do I get updates?',
    answer: '<p>Yes. As an owner of the system, you get access to all updates via the GitHub repository. Pull the latest changes whenever you want — on your schedule, not ours.</p>',
  },
  {
    question: 'Can I manage multiple businesses with one system?',
    answer: '<p>Absolutely. RealizeOS is built for multi-venture operators. Each business gets its own system with isolated agents, knowledge base, and venture voice. One engine, as many ventures as you need.</p>',
  },
  {
    question: 'What happens after I purchase?',
    answer: '<p>Immediately: you\'ll get access to download your package (Lite) or the GitHub repo (Full). You\'ll also receive a welcome email with your setup guide and a video walkthrough.</p><p>Join the community: Telegram Builders Group &amp; WhatsApp Community</p><p>Over the next week, you\'ll get onboarding emails with tips for defining your venture, customizing agents, and building your first workflow.</p>',
  },
  {
    question: 'Is there a refund policy?',
    answer: '<p>If you\'re not satisfied within 14 days of purchase, reach out and we\'ll make it right. We want you to succeed with RealizeOS, not feel trapped.</p>',
  },
];
