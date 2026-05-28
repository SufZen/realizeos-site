import type { GuideSectionData } from '../guideTypes';

export const configuration: GuideSectionData = {
  id: 'configuration',
  title: 'Configuration',
  icon: 'Settings',
  description: 'Environment variables, YAML config, templates, and LLM provider setup.',
  readTime: '8 min',
  content: [
    { type: 'heading', text: 'Configuration Files', level: 2, id: 'config-files' },
    { type: 'table', text: '', headers: ['File', 'Purpose'], rows: [
      ['.env', 'API keys, secrets, environment flags'],
      ['realize-os.yaml', 'System config — features, routing, LLM settings'],
      ['setup.yaml', 'One-file bootstrap: keys + template + brand info'],
    ]},
    { type: 'heading', text: 'Environment Variables', level: 2, id: 'env-vars' },
    { type: 'code', text: '', code: '# Required — at least one LLM provider\nANTHROPIC_API_KEY=sk-ant-...\nGOOGLE_AI_API_KEY=...\nOPENAI_API_KEY=sk-...\n\n# Optional — features\nTELEGRAM_BOT_TOKEN=...         # Enable Telegram channel\nBRAVE_API_KEY=...              # Enable web search\nREALIZE_API_KEY=...            # Simple API auth\nREALIZE_JWT_ENABLED=true       # Multi-user JWT auth\nREALIZE_JWT_SECRET=...         # 32+ char secret\nMCP_ENABLED=true               # Enable MCP server\nREALIZE_ENV=production         # Production mode', language: 'bash', title: '.env' },
    { type: 'callout', text: 'No spaces around = signs, no quotes around values, no inline comments. Docker cannot parse them.', calloutType: 'warning' },
    { type: 'heading', text: 'realize-os.yaml', level: 2, id: 'yaml-config' },
    { type: 'code', text: '', code: 'features:\n  cross_system: true\n  evolution: true\n\nmcp:\n  enabled: true\n  expose_kb: true\n  expose_ops: true\n  allow_admin: false\n\nllm:\n  default_provider: anthropic\n  routing:\n    simple: gemini-flash\n    content: claude-sonnet\n    complex: claude-opus', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'heading', text: 'Business Templates', level: 2, id: 'templates' },
    { type: 'paragraph', text: 'Templates pre-configure agents, skills, and FABRIC structure for your business type.' },
    { type: 'code', text: '', code: 'realize-os init --template consulting', language: 'bash' },
    { type: 'paragraph', text: 'Available: consulting, agency, portfolio, saas, ecommerce, accounting, coaching, freelance.' },
    { type: 'heading', text: 'Setup File (One-File Bootstrap)', level: 2, id: 'setup-file' },
    { type: 'code', text: '', code: 'cp setup.yaml.example setup.yaml\n# Edit setup.yaml with your API keys + business info\npython cli.py init --setup setup.yaml', language: 'bash' },
    { type: 'paragraph', text: 'The setup file creates your .env, copies the template config, builds the FABRIC structure, and pre-populates brand files — all from one command.' },
  ],
};
