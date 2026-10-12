import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.14.0 — QUICKSTART.md, README.md (Quick Start), .env.example,
// realize-os-cli/package.json (@realize-os/cli), cli.py.
export const gettingStarted: GuideSectionData = {
  id: 'getting-started',
  title: 'Getting Started',
  icon: 'Rocket',
  description: 'From zero to a running RealizeOS in about 10 minutes — Docker, Python, npx or Windows.',
  readTime: '8 min',
  content: [
    { type: 'heading', text: 'What you need', level: 2, id: 'prerequisites' },
    { type: 'list', text: '', items: [
      'At least one LLM API key: ANTHROPIC_API_KEY (Claude) or GOOGLE_AI_API_KEY (Gemini). OpenAI and local Ollama models are also supported. Agents use tools only on Claude.',
      'Docker with Docker Compose (recommended), or Python 3.11+ (3.12+ recommended), or Node.js 18+ with Docker for the npx installer.',
      'Git, to clone the repository.',
    ]},

    { type: 'heading', text: 'Install', level: 2, id: 'install' },
    { type: 'tabs', text: '', tabs: [
      { id: 'docker', label: 'Docker', blocks: [
        { type: 'code', text: '', code: 'git clone https://github.com/SufZen/RealizeOS-5.git\ncd RealizeOS-5\ncp .env.example .env        # add your API key(s)\ndocker compose up --build', language: 'bash' },
        { type: 'paragraph', text: 'Wait for "Uvicorn running on http://0.0.0.0:8080", then open http://localhost:8080.' },
      ]},
      { id: 'python', label: 'Python', blocks: [
        { type: 'code', text: '', code: 'git clone https://github.com/SufZen/RealizeOS-5.git\ncd RealizeOS-5\npython -m venv venv\nsource venv/bin/activate    # macOS/Linux\nvenv\\Scripts\\activate       # Windows\npip install -r requirements.txt\ncp .env.example .env        # add your API key(s)\nrealize-os serve', language: 'bash' },
        { type: 'paragraph', text: 'realize-os serve listens on 127.0.0.1:8080 by default (change with --host / --port, or REALIZE_HOST / REALIZE_PORT).' },
      ]},
      { id: 'npx', label: 'npx', blocks: [
        { type: 'code', text: '', code: 'npx @realize-os/cli init my-business\ncd my-business && npx @realize-os/cli start', language: 'bash' },
        { type: 'paragraph', text: 'Requires Node.js 18+ and Docker.' },
      ]},
      { id: 'windows', label: 'Windows', blocks: [
        { type: 'code', text: '', code: 'irm https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.ps1 | iex', language: 'powershell' },
        { type: 'paragraph', text: 'Runs in PowerShell and installs into .\\realizeos (options: -Dir, -Port, -Version). On Linux or macOS use: curl -fsSL https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.sh | bash. A clone of the repository also includes Install-RealizeOS.bat and start-realizeos.bat.' },
      ]},
    ]},
    { type: 'callout', text: 'Out of the box, auth is off (REALIZE_API_KEY empty) so you can try it on your own machine. Before anyone else can reach it, turn auth on and add users — see Users, Roles & Ventures and Self-Hosting & Production.', calloutType: 'warning' },

    { type: 'heading', text: 'Send your first message', level: 2, id: 'first-message' },
    { type: 'code', text: '', code: 'curl -X POST http://localhost:8080/api/chat \\\n  -H "Content-Type: application/json" \\\n  -d \'{"message": "Help me plan Q2 strategy", "system_key": "consulting"}\'', language: 'bash' },
    { type: 'paragraph', text: 'Or open http://localhost:8080 and use Chat. Each answer shows a "What I used" panel with its sources and tools.' },

    { type: 'heading', text: 'Choose a template', level: 2, id: 'templates' },
    { type: 'code', text: '', code: 'realize-os init --template real-estate-developer', language: 'bash' },
    { type: 'table', text: '', headers: ['Template', 'For'], rows: [
      ['real-estate-developer', 'Developers: tender register, payment check and investor report skills (see Field Packs)'],
      ['real-estate', 'Real-estate firms (general)'],
      ['architecture-firm', 'Architecture and planning firms (general)'],
      ['property-management', 'Property and asset managers (general)'],
      ['consulting, agency, portfolio, saas, ecommerce, accounting, coaching, freelance', 'Generic business templates (available, not under active development)'],
    ]},
    { type: 'callout', text: 'realize-os setup runs an interactive wizard for configuration and template choice. realize-os doctor diagnoses installation issues.', calloutType: 'tip' },

    { type: 'heading', text: 'Next steps', level: 2, id: 'next-steps' },
    { type: 'list', text: '', items: [
      'Connect your agent — Claude.ai, Claude Desktop, Claude Code or n8n.',
      'Approvals & the Trail — decide what waits for a person.',
      'Users, Roles & Ventures — add your team.',
      'Field Packs — try the real-estate developer pack on demo data.',
    ]},

    { type: 'heading', text: 'Build your firm\'s profile', level: 2, id: 'venture-profile' },
    { type: 'paragraph', text: 'The free Venture Wizard (on this site, or as a Google Gem or Custom GPT) turns your firm\'s identity, services and way of working into FABRIC files you can import — the starting point of your company brain.' },
  ],
};
