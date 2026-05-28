import type { GuideSectionData } from '../guideTypes';

export const selfHosting: GuideSectionData = {
  id: 'self-hosting',
  title: 'Self-Hosting & Production',
  icon: 'Server',
  description: 'Deploy to production with Docker, configure SSL, backups, and monitoring.',
  readTime: '10 min',
  content: [
    { type: 'heading', text: 'Deployment Options', level: 2, id: 'deployment-options' },
    { type: 'table', text: '', headers: ['Method', 'Best For', 'Requirements'], rows: [
      ['Docker Compose', 'Most users, VPS/cloud', 'Docker 24.0+, 2GB RAM'],
      ['Standalone Docker', 'Single container, quick test', 'Docker 24.0+'],
      ['pip install', 'Development, custom integrations', 'Python 3.11+'],
      ['One-line script', 'Fast Linux/Mac setup', 'curl, Docker'],
    ]},
    { type: 'heading', text: 'Docker Compose (Recommended)', level: 2, id: 'docker-compose' },
    { type: 'code', text: '', code: 'git clone https://github.com/SufZen/RealizeOS-5.git && cd RealizeOS-5\ncp .env.example .env\n# Edit .env with your API keys\ndocker compose up --build -d', language: 'bash' },
    { type: 'heading', text: 'Standalone Docker', level: 2, id: 'standalone-docker' },
    { type: 'code', text: '', code: 'docker run -d -p 8080:8080 \\\n  -v realizeos-data:/app/data \\\n  ghcr.io/sufzen/realizeos-5:latest', language: 'bash' },
    { type: 'heading', text: 'One-Line Install', level: 2, id: 'one-line' },
    { type: 'code', text: '', code: '# Linux / macOS:\ncurl -fsSL https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.sh | bash\n\n# Windows (PowerShell):\nirm https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.ps1 | iex', language: 'bash' },
    { type: 'heading', text: 'Production Checklist', level: 2, id: 'production-checklist' },
    { type: 'list', text: '', items: [
      'Set REALIZE_ENV=production in .env',
      'Enable JWT auth: REALIZE_JWT_ENABLED=true with a 32+ char REALIZE_JWT_SECRET',
      'Set a strong REALIZE_API_KEY',
      'Use docker-compose.prod.yml for production Docker config',
      'Configure reverse proxy (nginx/Caddy) with SSL',
      'Set up automated backups for the data volume',
      'Monitor logs: docker compose logs -f',
      'Enable rate limiting in security settings',
    ]},
    { type: 'callout', text: 'In production mode, enabling MCP admin tools requires JWT authentication with a 32+ character secret. The server refuses to start otherwise.', calloutType: 'warning' },
    { type: 'heading', text: 'Requirements', level: 2, id: 'requirements' },
    { type: 'list', text: '', items: [
      'Python 3.11+ (3.12+ recommended)',
      'At least one LLM API key (Anthropic, Google, OpenAI, or Ollama)',
      'Docker 24.0+ (for containerized deployment)',
      'Node.js 20+ (optional, for dashboard development)',
    ]},
  ],
};
