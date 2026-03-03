export interface Testimonial {
  text: string;
  authorName: string;
  authorRole: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    text: 'The FABRIC system gave my consulting practice a real structure for AI. Instead of ad-hoc ChatGPT conversations, I now have agents that know my clients and methodology. Setup took 20 minutes.',
    authorName: 'Yonatan Levi',
    authorRole: 'Management Consultant, Tel Aviv',
    initials: 'YL',
  },
  {
    text: 'We were spending $97/month on an AI community and still building everything ourselves. RealizeOS gave us the finished system for a one-time payment. The multi-LLM routing alone is worth it.',
    authorName: 'James Mitchell',
    authorRole: 'Agency Founder, Austin TX',
    initials: 'JM',
  },
  {
    text: 'I run 3 ventures and each one has its own voice. Before RealizeOS, I was switching between 5 different AI tools. Now one system handles all of them with proper brand isolation.',
    authorName: 'Ricardo Santos',
    authorRole: 'Portfolio Operator, Lisbon',
    initials: 'RS',
  },
];

export const testimonialsNote = 'Built from a production system powering 4 AI bots across 3 real businesses.';
