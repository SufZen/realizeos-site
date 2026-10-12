import type { GuideSectionData } from '../guideTypes';

export const connectors: GuideSectionData = {
  id: 'connectors',
  title: 'Connectors Setup',
  icon: 'Plug',
  description: 'Connect via CLI, MCP Server (including Claude.ai connectors), or REST API — detailed setup for each.',
  readTime: '15 min',
  content: [
    { type: 'heading', text: 'Overview', level: 2, id: 'connectors-overview' },
    { type: 'paragraph', text: 'RealizeOS offers three primary connectors: the Operator CLI for terminal usage, the MCP Server for AI-tool integration, and the REST API for programmatic access. All three share the same authentication and audit system.' },

    // === CLI ===
    { type: 'heading', text: 'Operator CLI', level: 2, id: 'cli' },
    { type: 'paragraph', text: 'The realize-os CLI is a first-class operator interface. Install via pip or use the source checkout.' },
    { type: 'code', text: '', code: 'pip install realize-os\n# or from source:\npython cli.py --help', language: 'bash' },
    { type: 'heading', text: 'Command Tree', level: 3, id: 'cli-commands' },
    { type: 'code', text: '', code: 'realize-os\n├── init [--template NAME] [--setup PATH]       Deploy & initialize\n├── serve [--port PORT] [--reload]              Start API + dashboard\n├── bot                                          Start Telegram bot\n├── status                                       Show system status\n├── doctor                                       Diagnose issues\n├── chat MESSAGE [--system KEY] [--agent KEY]    One-shot chat\n├── ask QUERY                                    Smart-routed question\n├── repl [--system KEY]                          Interactive REPL\n├── venture\n│   ├── list / create / delete\n├── kb\n│   ├── search / get / reindex\n├── skill\n│   ├── list / trigger\n├── mcp\n│   ├── serve / status / token\n└── config\n    ├── show / set / profile', language: 'text', title: 'Command Tree' },
    { type: 'heading', text: 'Common Commands', level: 3, id: 'cli-examples' },
    { type: 'code', text: '', code: '# Start the server\nrealize-os serve\nrealize-os serve --port 9090 --reload\n\n# Chat\nrealize-os chat "What\'s my pipeline status?"\nrealize-os chat "Draft an email" --system arena --agent writer\n\n# Interactive REPL\nrealize-os repl --system consulting\n\n# Knowledge base search\nrealize-os kb search "investment thesis"\n\n# Multi-instance profiles\nrealize-os config profile add prod --endpoint https://my-vps:8080\nrealize-os --profile prod status', language: 'bash' },
    { type: 'heading', text: 'Output Formats', level: 3, id: 'cli-output' },
    { type: 'code', text: '', code: 'realize-os venture list                    # Pretty table (default)\nrealize-os --format json venture list      # JSON (pipe to jq)\nrealize-os --format yaml evolution suggestions  # YAML', language: 'bash' },

    // === MCP ===
    { type: 'heading', text: 'MCP Server', level: 2, id: 'mcp' },
    { type: 'paragraph', text: 'MCP (Model Context Protocol) is the open standard AI agents use to call outside tools. RealizeOS has a built-in MCP server, so Claude.ai, Claude Desktop, Claude Code, Cursor, n8n or your own scripts can work with your company brain, under the same roles, approvals and audit log as the dashboard. It has 28 tools in four families; 24 are on by default, because the admin family is off.' },
    { type: 'heading', text: 'Enable MCP', level: 3, id: 'mcp-enable' },
    { type: 'code', text: '', code: '# In .env:\nMCP_ENABLED=true\n\n# Or in realize-os.yaml:\nmcp:\n  enabled: true\n  expose_kb: true\n  expose_ops: true\n  allow_admin: false        # off by default\n  streamable_http: true     # serve /mcp next to /mcp/sse (default on)\n  public_url: ""            # https://your-host, needed for OAuth\n  oauth:\n    enabled: false          # Claude.ai custom connectors\n    redirect_hosts: []      # empty = claude.ai, claude.com and loopback', language: 'yaml' },
    { type: 'heading', text: 'MCP Endpoints', level: 3, id: 'mcp-endpoints' },
    { type: 'table', text: '', headers: ['Method', 'Path', 'Description'], rows: [
      ['POST', '/mcp', 'Streamable HTTP transport. Use this for new clients.'],
      ['GET', '/mcp/sse', 'HTTP+SSE handshake. Deprecated; kept for existing clients.'],
      ['POST', '/mcp/messages/?session_id=', 'SSE clients post JSON-RPC payloads here.'],
      ['GET', '/mcp/health', 'Liveness probe: returns { ok, name, tools, families }.'],
    ]},
    { type: 'paragraph', text: 'Auth is the same as the REST API: Authorization: Bearer <jwt> (from POST /api/auth/token), X-API-Key: <key>, or an OAuth access token.' },
    { type: 'heading', text: 'Tool Families', level: 3, id: 'mcp-families' },
    { type: 'table', text: '', headers: ['Family', 'Gating', 'Tools'], rows: [
      ['chat (10)', 'Always on', 'realize_chat, realize_health, realize_status, list_systems, get_system, list_agents, list_skills, get_history, clear_history, get_session'],
      ['kb (4)', 'expose_kb (default: on)', 'kb_search, venture_kb_search, kb_get_document, list_ventures'],
      ['ops (10)', 'expose_ops (default: on)', 'list_workflows, run_workflow, trigger_skill, run_evolution, list_suggestions, approve_suggestion, dismiss_suggestion, list_approvals, approve_request, reject_request'],
      ['admin (4)', 'allow_admin + role=owner (+ JWT in production)', 'create_venture, delete_venture, update_setting, reload_agents'],
    ]},
    { type: 'heading', text: 'Claude.ai and Claude Desktop (custom connector)', level: 3, id: 'mcp-claude' },
    { type: 'paragraph', text: 'Claude.ai custom connectors (web and desktop) sign in with OAuth 2.1 instead of a fixed header. RealizeOS must be served over HTTPS on a public host.' },
    { type: 'code', text: '', code: '# In .env:\nMCP_ENABLED=true\nMCP_OAUTH_ENABLED=true\nMCP_PUBLIC_URL=https://realizeos.example.com\nREALIZE_API_KEY=...        # auth must be on, or /mcp would be open', language: 'bash' },
    { type: 'list', text: '', ordered: true, items: [
      'Make sure the person who connects has an entry in users.yaml (email + password hash). Their role and ventures decide what the connector can do.',
      'In Claude.ai, open Settings → Connectors → Add custom connector, and enter https://realizeos.example.com/mcp.',
      'Claude opens a RealizeOS sign-in page. Sign in and click "Sign in and allow".',
    ]},
    { type: 'callout', text: 'A connector acts exactly as the user who signed in: same role, same ventures. Remove the user from users.yaml and the connector stops working at once. Only redirect hosts on the allowlist (default: claude.ai, claude.com and loopback) can receive sign-in codes, and failed sign-ins are rate-limited and audit-logged.', calloutType: 'info' },
    { type: 'heading', text: 'Claude Code and other header-based clients', level: 3, id: 'mcp-claude-code' },
    { type: 'code', text: '', code: '{\n  "mcpServers": {\n    "realize-os": {\n      "type": "http",\n      "url": "http://localhost:8080/mcp",\n      "headers": { "Authorization": "Bearer <your jwt or API key>" }\n    }\n  }\n}', language: 'json' },
    { type: 'paragraph', text: 'Clients that only speak HTTP+SSE can keep using http://localhost:8080/mcp/sse for now. API keys and JWTs keep working on both transports for service integrations such as n8n, cron jobs and bots.' },

    // === REST API ===
    { type: 'heading', text: 'REST API', level: 2, id: 'api' },
    { type: 'paragraph', text: 'Full REST API at http://localhost:8080. Three auth methods: API Key, JWT (multi-user), or open mode (development).' },
    { type: 'heading', text: 'Authentication', level: 3, id: 'api-auth' },
    { type: 'code', text: '', code: '# API Key (simple)\ncurl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:8080/api/systems\n\n# JWT (multi-user)\ncurl -X POST http://localhost:8080/api/auth/token \\\n  -H "Content-Type: application/json" \\\n  -d \'{"username": "admin", "password": "your-password"}\'', language: 'bash' },
    { type: 'heading', text: 'Core Endpoints', level: 3, id: 'api-endpoints' },
    { type: 'table', text: '', headers: ['Endpoint', 'Method', 'Description'], rows: [
      ['/api/chat', 'POST', 'Send a message, get AI response'],
      ['/api/systems', 'GET', 'List all configured systems'],
      ['/api/systems/reload', 'POST', 'Hot-reload configs from YAML'],
      ['/api/ventures', 'GET/POST', 'List or create ventures'],
      ['/api/ventures/{key}/agents', 'GET/POST', 'List or create agents'],
      ['/api/ventures/{key}/kb', 'GET', 'Browse FABRIC directory'],
      ['/api/workflows', 'GET/POST', 'List or create workflows'],
      ['/api/approvals', 'GET', 'List pending approvals'],
      ['/api/settings', 'GET/PUT', 'System settings'],
      ['/api/evolution/suggestions', 'GET', 'Self-improvement suggestions'],
      ['/status', 'GET', 'Detailed system status'],
    ]},
    { type: 'heading', text: 'Chat Request Example', level: 3, id: 'api-chat' },
    { type: 'code', text: '', code: 'curl -X POST http://localhost:8080/api/chat \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d \'{\n    "message": "Help me draft a strategy for Q2",\n    "system_key": "consulting",\n    "user_id": "user-123",\n    "agent_key": "analyst"\n  }\'', language: 'bash' },
  ],
};
