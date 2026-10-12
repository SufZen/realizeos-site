import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.14.0 — docs/PRODUCTION.md, docs/self-hosting-guide.md,
// docker-compose.prod.yml, realize_api/main.py (production validator), Dockerfile.
export const selfHosting: GuideSectionData = {
  id: 'self-hosting',
  title: 'Self-Hosting & Production',
  icon: 'Server',
  description: 'Run RealizeOS on your own server: production settings, users, HTTPS, reverse proxy and checks.',
  readTime: '10 min',
  content: [
    { type: 'heading', text: 'Deployment options', level: 2, id: 'deployment-options' },
    { type: 'table', text: '', headers: ['Method', 'Best for', 'Requirements'], rows: [
      ['Docker Compose (production file)', 'A VPS or office server', 'Docker 24.0+, Compose v2.20+'],
      ['Docker Compose (default file)', 'Trying it out', 'Docker 24.0+'],
      ['Python (realize-os serve)', 'Development, custom setups', 'Python 3.11+'],
      ['One-line install script', 'Quick Linux/macOS/Windows setup', 'Docker'],
    ]},
    { type: 'code', text: '', code: 'git clone https://github.com/SufZen/RealizeOS-5.git && cd RealizeOS-5\ncp .env.example .env          # fill in the production block below\ndocker compose -f docker-compose.prod.yml up -d', language: 'bash', title: 'Production with Docker Compose' },
    { type: 'paragraph', text: 'The production compose file runs the ghcr.io/sufzen/realizeos-5 image read-only with resource limits, and mounts realize-os.yaml, your systems folder and .credentials.' },

    { type: 'heading', text: 'Production settings', level: 2, id: 'production-env' },
    { type: 'paragraph', text: 'With REALIZE_ENV=production, RealizeOS refuses to start unless all of these are set, and lists every problem at once:' },
    { type: 'code', text: '', code: 'REALIZE_ENV=production\nREALIZE_API_KEY=<32+ random characters>\nREALIZE_JWT_ENABLED=true\nREALIZE_JWT_SECRET=<32+ random characters>\nCORS_ORIGINS=https://realizeos.example.com', language: 'bash', title: '.env' },
    { type: 'code', text: '', code: 'python -c "import secrets; print(secrets.token_urlsafe(48))"', language: 'bash', title: 'Generate a secret' },
    { type: 'paragraph', text: 'Secure cookies are used only in production mode. Enabling MCP admin tools in production also requires JWT with a 32+ character secret.' },

    { type: 'heading', text: 'Add your people', level: 2, id: 'users' },
    { type: 'paragraph', text: 'Create users.yaml with each person\'s email, role, optional ventures and a password hash from python scripts/hash_password.py (run it on the host). See Users, Roles & Ventures.' },
    { type: 'callout', text: 'The compose files don\'t mount users.yaml. Add ./users.yaml:/app/users.yaml:ro under the RealizeOS service\'s volumes, or the container won\'t see it.', calloutType: 'warning' },

    { type: 'heading', text: 'HTTPS and the reverse proxy', level: 2, id: 'proxy' },
    { type: 'paragraph', text: 'Never expose port 8080 directly to the internet. Put nginx or Caddy in front with a TLS certificate:' },
    { type: 'code', text: '', code: 'server {\n    listen 443 ssl http2;\n    server_name realizeos.example.com;\n\n    ssl_certificate /etc/letsencrypt/live/realizeos.example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/realizeos.example.com/privkey.pem;\n\n    location / {\n        proxy_pass http://127.0.0.1:8080;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        # Streaming (SSE)\n        proxy_buffering off;\n        proxy_cache off;\n        proxy_read_timeout 86400s;\n    }\n}', language: 'nginx', title: 'nginx' },
    { type: 'code', text: '', code: 'realizeos.example.com {\n    reverse_proxy localhost:8080\n}', language: 'text', title: 'Caddy' },
    { type: 'paragraph', text: 'Connecting Claude.ai? You also need MCP_PUBLIC_URL and OAuth turned on, and uvicorn started with --proxy-headers --forwarded-allow-ips=<proxy ip> so sign-in limits see real client IPs. Step by step: Connect Your Agent → Behind a reverse proxy.' },

    { type: 'heading', text: 'Check it', level: 2, id: 'verify' },
    { type: 'list', text: '', ordered: true, items: [
      'GET /api/health returns 200 ({"status":"ok"}).',
      'GET /api/dashboard without signing in returns 401.',
      'GET /.env returns 404.',
      'Opening the site in a browser lands on the sign-in page.',
      'GET /api/status shows the version, ventures, LLM providers and tools.',
    ]},
    { type: 'heading', text: 'Common issues', level: 3, id: 'issues' },
    { type: 'list', text: '', items: [
      'Container on a random host port: pass --env-file .env so the port from .env is used.',
      'Browser errors on API calls: CORS_ORIGINS must list the exact address people use.',
      'Signed in but bounced back to sign-in: the proxy is stripping cookies — check that realize_session reaches the server.',
    ]},

    { type: 'heading', text: 'Backups and updates', level: 2, id: 'backups' },
    { type: 'list', text: '', items: [
      'Back up the data volume, your systems folder (the FABRIC files of each venture), realize-os.yaml, users.yaml and .credentials.',
      'Your company brain is plain files: you can copy it, version it and take it with you.',
      'Update by pulling the new image or code and restarting. Read the CHANGELOG first: github.com/SufZen/RealizeOS-5/blob/main/CHANGELOG.md',
    ]},
  ],
};
