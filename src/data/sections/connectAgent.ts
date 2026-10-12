import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.14.0 — docs/mcp-server.md, realize_core/mcp_server/config.py,
// realize_api/routes/mcp_oauth.py. Keep commands and env vars in sync with the product repo.
export const connectAgent: GuideSectionData = {
  id: 'connect-your-agent',
  title: 'Connect Your Agent',
  icon: 'Bot',
  description: 'Connect Claude.ai, Claude Desktop, Claude Code, n8n or any MCP client to your RealizeOS — with sign-in, roles and approvals.',
  readTime: '12 min',
  content: [
    { type: 'heading', text: 'How it works', level: 2, id: 'how-it-works' },
    { type: 'paragraph', text: 'MCP (Model Context Protocol) is the open standard AI agents use to call outside tools. RealizeOS has a built-in MCP server. An agent that connects to it can search your company brain, chat with your RealizeOS agents, run skills and work with the approval queue — always as a specific user, with that user\'s role and ventures.' },
    { type: 'table', text: '', headers: ['Client', 'How it connects', 'Endpoint'], rows: [
      ['Claude.ai (web) and Claude Desktop', 'Custom connector, OAuth sign-in', 'https://<your-host>/mcp'],
      ['Claude Code, Cursor, scripts', 'API key or JWT in a header', 'http(s)://<host>/mcp'],
      ['n8n, cron jobs, bots', 'API key or JWT (REST or MCP)', '/mcp or /api/*'],
      ['Older SSE-only clients', 'API key or JWT (deprecated transport)', '/mcp/sse'],
    ]},
    { type: 'callout', text: 'MCP is off by default. Nothing below works until you set MCP_ENABLED=true and turn auth on (REALIZE_API_KEY, or JWT). With auth off, /mcp would be open to anyone who can reach it.', calloutType: 'warning' },

    { type: 'heading', text: 'Connect Claude.ai or Claude Desktop', level: 2, id: 'claude-ai' },
    { type: 'paragraph', text: 'Claude.ai custom connectors (on the web and in Claude Desktop) can\'t send a fixed Authorization header, so they sign in with OAuth 2.1. RealizeOS includes a small authorization server for this.' },
    { type: 'heading', text: '1. Serve RealizeOS over HTTPS', level: 3, id: 'claude-https' },
    { type: 'paragraph', text: 'Claude.ai must reach your instance on a public HTTPS address, for example https://realizeos.example.com. Put a reverse proxy with a TLS certificate in front of port 8080 (see "Behind a reverse proxy" below). Plain http:// is accepted only for localhost.' },
    { type: 'heading', text: '2. Set the environment', level: 3, id: 'claude-env' },
    { type: 'code', text: '', code: '# .env\nMCP_ENABLED=true\nMCP_OAUTH_ENABLED=true\nMCP_PUBLIC_URL=https://realizeos.example.com\nREALIZE_API_KEY=<32+ random characters>   # auth must be on, or /mcp would be open', language: 'bash', title: '.env' },
    { type: 'paragraph', text: 'OAuth stays off unless MCP_PUBLIC_URL is set and auth is on. Generate a random key with: python -c "import secrets; print(secrets.token_urlsafe(48))". Restart RealizeOS after changing .env.' },
    { type: 'heading', text: '3. Make sure the person has an account', level: 3, id: 'claude-account' },
    { type: 'paragraph', text: 'The person who connects signs in with their users.yaml account (email and password). Their role and ventures decide what the connector can do. See Users, Roles & Ventures.' },
    { type: 'code', text: '', code: 'users:\n  - email: dana@example.com\n    role: operator\n    ventures: [tower-b]\n    password_hash: $2b$12$...   # python scripts/hash_password.py', language: 'yaml', title: 'users.yaml' },
    { type: 'heading', text: '4. Add the connector in Claude', level: 3, id: 'claude-add' },
    { type: 'list', text: '', ordered: true, items: [
      'In Claude.ai, open Settings → Connectors → Add custom connector.',
      'Enter the URL https://realizeos.example.com/mcp.',
      'Claude opens the RealizeOS sign-in page. It shows which app is asking and where it will send you back.',
      'Sign in with your RealizeOS account and click "Sign in and allow".',
    ]},
    { type: 'heading', text: 'What the connector can do', level: 3, id: 'claude-access' },
    { type: 'list', text: '', items: [
      'It acts exactly as the person who signed in: same role, same ventures. The token carries no role of its own; RealizeOS looks the user up on every request.',
      'Remove the user from users.yaml, or change their role, and it applies on the next request. No restart needed.',
      'Access tokens last 1 hour and refresh tokens 30 days. Sign-in codes are single-use and last 5 minutes. All are stored only as SHA-256 hashes.',
      'A viewer can read but not chat. A user can chat but not approve. An operator can also approve held actions.',
      'Admin tools (create or delete ventures, change settings) stay off unless mcp.allow_admin is true, and then only for the owner.',
    ]},

    { type: 'heading', text: 'Connect Claude Code or another header-based client', level: 2, id: 'claude-code' },
    { type: 'paragraph', text: 'Clients that can send headers use Streamable HTTP on /mcp with an API key or a JWT. Get a JWT from POST /api/auth/token, or use REALIZE_API_KEY directly.' },
    { type: 'code', text: '', code: '{\n  "mcpServers": {\n    "realize-os": {\n      "type": "http",\n      "url": "http://localhost:8080/mcp",\n      "headers": { "Authorization": "Bearer <your jwt or API key>" }\n    }\n  }\n}', language: 'json', title: 'MCP client config' },
    { type: 'callout', text: 'An API key acts as a service identity with full access, unless the JWT you mint from it carries venture:<key> scopes. Give each integration the narrowest access you can, and keep keys out of shared files.', calloutType: 'tip' },
    { type: 'heading', text: 'n8n and automations', level: 3, id: 'n8n' },
    { type: 'paragraph', text: 'n8n can use the MCP client node pointed at /mcp with an Authorization header, or call the REST API directly (POST /api/chat). API keys and JWTs keep working on both MCP transports.' },

    { type: 'heading', text: 'The SSE transport (legacy)', level: 2, id: 'sse' },
    { type: 'paragraph', text: 'GET /mcp/sse with POST /mcp/messages/?session_id= is the older HTTP+SSE transport. It is deprecated in the MCP spec and kept only for existing clients and mcp-remote bridges. New setups should use /mcp. It will be removed after a deprecation window.' },

    { type: 'heading', text: 'Behind a reverse proxy', level: 2, id: 'reverse-proxy' },
    { type: 'paragraph', text: 'The proxy must pass these paths through to RealizeOS unchanged: /mcp, /.well-known/oauth-protected-resource/mcp, /.well-known/oauth-authorization-server, /authorize, /token, /register, /revoke and /oauth/login. A single location / block that proxies everything (as below) covers them all.' },
    { type: 'code', text: '', code: 'server {\n    listen 443 ssl http2;\n    server_name realizeos.example.com;\n\n    ssl_certificate /etc/letsencrypt/live/realizeos.example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/realizeos.example.com/privkey.pem;\n\n    location / {\n        proxy_pass http://127.0.0.1:8080;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        # Streaming (SSE)\n        proxy_buffering off;\n        proxy_cache off;\n        proxy_read_timeout 86400s;\n    }\n}', language: 'nginx', title: 'nginx' },
    { type: 'code', text: '', code: 'realizeos.example.com {\n    reverse_proxy localhost:8080\n}', language: 'text', title: 'Caddy' },
    { type: 'paragraph', text: 'Sign-in limits count failures per client IP. Behind a proxy, start uvicorn so it trusts the proxy\'s forwarded headers; otherwise every request looks like it comes from the proxy:' },
    { type: 'code', text: '', code: 'python -m uvicorn realize_api.main:app --host 0.0.0.0 --port 8080 \\\n  --proxy-headers --forwarded-allow-ips=<proxy ip>', language: 'bash' },
    { type: 'paragraph', text: 'With Docker Compose, put the same command in a command: override for the RealizeOS service. realize-os serve does not take these flags.' },
    { type: 'heading', text: 'Allowed redirect hosts', level: 3, id: 'redirect-hosts' },
    { type: 'paragraph', text: 'Only trusted clients may receive sign-in codes. By default these are claude.ai, claude.com and loopback (localhost, 127.0.0.1, [::1]). To add another client you trust, set MCP_OAUTH_REDIRECT_HOSTS (comma-separated). Setting it replaces the defaults, so list them too. Non-loopback hosts must use https.' },
    { type: 'code', text: '', code: 'MCP_OAUTH_REDIRECT_HOSTS=claude.ai,claude.com,localhost,127.0.0.1', language: 'bash' },

    { type: 'heading', text: 'Troubleshooting', level: 2, id: 'troubleshooting' },
    { type: 'table', text: '', headers: ['Symptom', 'Likely cause', 'Fix'], rows: [
      ['Claude gets 401 and never shows a sign-in page', 'OAuth is off: MCP_OAUTH_ENABLED not true, MCP_PUBLIC_URL not set, or auth off', 'Set all three env vars from step 2 and restart'],
      ['Sign-in page says the redirect is not allowed', 'The client\'s redirect host is not on the allowlist', 'Add it to MCP_OAUTH_REDIRECT_HOSTS (keep the defaults in the list)'],
      ['Sign-in refused after several attempts', 'Rate limit: 10 failures per IP or 30 per account within 15 minutes', 'Wait 15 minutes; behind a proxy, add --proxy-headers so limits see real IPs'],
      ['Connector works but a tool says "spans every venture"', 'The user is limited to some ventures', 'Expected. Ask an owner or admin, or name an allowed venture'],
      ['MCP_INSUFFICIENT_SCOPE', 'The user\'s role can\'t run that tool (e.g. a viewer chatting)', 'Change the role in users.yaml'],
      ['MCP_ADMIN_DISABLED', 'Admin tools are off', 'Set mcp.allow_admin: true (owner only; JWT required in production)'],
    ]},
    { type: 'paragraph', text: 'Check the server is up with GET /mcp/health — it returns { ok, name, tools, families }. Every sign-in, failure, lockout and denial is written to the audit log (channel mcp).' },

    { type: 'heading', text: 'Tool families', level: 2, id: 'tool-families' },
    { type: 'table', text: '', headers: ['Family', 'Default', 'Tools'], rows: [
      ['chat (10)', 'On', 'realize_chat, realize_health, realize_status, list_systems, get_system, list_agents, list_skills, get_history, clear_history, get_session'],
      ['kb (4)', 'On (mcp.expose_kb)', 'kb_search, venture_kb_search, kb_get_document, list_ventures'],
      ['ops (10)', 'On (mcp.expose_ops)', 'list_workflows, run_workflow, trigger_skill, run_evolution, list_suggestions, approve_suggestion, dismiss_suggestion, list_approvals, approve_request, reject_request'],
      ['admin (4)', 'Off (mcp.allow_admin)', 'create_venture, delete_venture, update_setting, reload_agents'],
    ]},
    { type: 'paragraph', text: 'realize_chat returns the answer plus a short trail: the knowledge-base sources it used and which tools ran. Tool inputs and outputs are not sent back to MCP clients, because they can contain third-party text such as email bodies.' },
  ],
};
