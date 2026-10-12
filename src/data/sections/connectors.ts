import type { GuideSectionData } from '../guideTypes';

export const connectors: GuideSectionData = {
  id: 'connectors',
  title: 'CLI & REST API',
  icon: 'Plug',
  description: 'The operator CLI and the REST API. For MCP and Claude.ai, see Connect Your Agent.',
  readTime: '15 min',
  content: [
    { type: 'heading', text: 'Overview', level: 2, id: 'connectors-overview' },
    { type: 'paragraph', text: 'RealizeOS has three ways in: the operator CLI in your terminal, the REST API for programs and automations, and the MCP server for AI agents (see Connect Your Agent). All three share the same authentication, roles and audit log.' },

    // === CLI ===
    { type: 'heading', text: 'Operator CLI', level: 2, id: 'cli' },
    { type: 'paragraph', text: 'The realize-os CLI is a first-class operator interface. Install via pip or use the source checkout.' },
    { type: 'code', text: '', code: 'pip install realize-os\n# or from source:\npython cli.py --help', language: 'bash' },
    { type: 'heading', text: 'Command Tree', level: 3, id: 'cli-commands' },
    { type: 'code', text: '', code: 'realize-os\n├── init [--template NAME] [--setup PATH]       Deploy & initialize\n├── serve [--port PORT] [--reload]              Start API + dashboard\n├── bot                                          Start Telegram bot (not under active development)\n├── status                                       Show system status\n├── doctor                                       Diagnose issues\n├── chat MESSAGE [--system KEY] [--agent KEY]    One-shot chat\n├── ask QUERY                                    Smart-routed question\n├── repl [--system KEY]                          Interactive REPL\n├── venture\n│   ├── list / create / delete\n├── kb\n│   ├── search / get / reindex\n├── skill\n│   ├── list / trigger\n├── mcp\n│   ├── serve / status / token\n└── config\n    ├── show / set / profile', language: 'text', title: 'Command Tree' },
    { type: 'heading', text: 'Common Commands', level: 3, id: 'cli-examples' },
    { type: 'code', text: '', code: '# Start the server\nrealize-os serve\nrealize-os serve --port 9090 --reload\n\n# Chat\nrealize-os chat "What\'s my pipeline status?"\nrealize-os chat "Draft an email" --system arena --agent writer\n\n# Interactive REPL\nrealize-os repl --system consulting\n\n# Knowledge base search\nrealize-os kb search "investment thesis"\n\n# Multi-instance profiles\nrealize-os config profile add prod --endpoint https://my-vps:8080\nrealize-os --profile prod status', language: 'bash' },
    { type: 'heading', text: 'Output Formats', level: 3, id: 'cli-output' },
    { type: 'code', text: '', code: 'realize-os venture list                    # Pretty table (default)\nrealize-os --format json venture list      # JSON (pipe to jq)\nrealize-os --format yaml evolution suggestions  # YAML', language: 'bash' },

    // === MCP ===
    { type: 'heading', text: 'MCP Server', level: 2, id: 'mcp' },
    { type: 'paragraph', text: 'The built-in MCP server lets Claude.ai, Claude Desktop, Claude Code, n8n and any MCP client work with your RealizeOS under the same roles, approvals and audit log. Setup, OAuth sign-in, reverse-proxy notes and troubleshooting are on their own page: Connect Your Agent.' },
    { type: 'code', text: '', code: '# .env\nMCP_ENABLED=true\n# Streamable HTTP endpoint for new clients: POST /mcp\n# Health check: GET /mcp/health', language: 'bash' },

    // === REST API ===
    { type: 'heading', text: 'REST API', level: 2, id: 'api' },
    { type: 'paragraph', text: 'Full REST API under /api on port 8080. Auth: an API key (X-API-Key or Authorization: Bearer), a JWT (Authorization: Bearer), or a signed-in dashboard session. With REALIZE_API_KEY empty and JWT off, the API is open — development only.' },
    { type: 'heading', text: 'Authentication', level: 3, id: 'api-auth' },
    { type: 'code', text: '', code: '# API key\ncurl -H "X-API-Key: YOUR_API_KEY" http://localhost:8080/api/systems\n\n# Mint a JWT with the API key\ncurl -X POST http://localhost:8080/api/auth/token \\\n  -H "Content-Type: application/json" \\\n  -d \'{"user_id": "owner", "role": "owner", "api_key": "YOUR_API_KEY"}\'\n# returns access_token, refresh_token, expires_in, token_type', language: 'bash' },
    { type: 'heading', text: 'Core Endpoints', level: 3, id: 'api-endpoints' },
    { type: 'table', text: '', headers: ['Endpoint', 'Method', 'Description'], rows: [
      ['/api/chat', 'POST', 'Send a message; returns the answer, message_id and the trail (sources and tool steps)'],
      ['/api/chat/stream', 'POST', 'Same, streamed as server-sent events: source, tool_call, tool_result, approval_requested, text, final'],
      ['/api/conversations/{system_key}/{user_id}', 'GET / DELETE', 'Read (limit=50, max 200) or clear a conversation, with the trail on each answer'],
      ['/api/approvals', 'GET', 'List approval requests (venture_key, status=pending by default)'],
      ['/api/approvals/{id}/approve', 'POST', 'Approve; a held action runs now, once'],
      ['/api/approvals/{id}/reject', 'POST', 'Reject; nothing runs'],
      ['/api/auth/login', 'POST', 'Dashboard sign-in (email, password); sets the session and CSRF cookies'],
      ['/api/auth/token', 'POST', 'Mint a JWT with the API key'],
      ['/api/auth/refresh', 'POST', 'Refresh a JWT'],
      ['/api/ventures', 'GET / POST', 'List or create ventures'],
      ['/api/ventures/{key}/kb/search', 'GET', 'Search one venture\'s knowledge base'],
      ['/api/trust', 'GET', 'The trust ladder matrix; PUT /api/trust/level changes the level'],
      ['/api/settings/features', 'PUT', 'Change feature flags'],
      ['/api/security/audit', 'GET', 'Audit log'],
      ['/api/health', 'GET', 'Liveness, no auth'],
      ['/api/status', 'GET', 'Version, ventures, LLM providers, tools'],
    ]},
    { type: 'heading', text: 'Chat Request Example', level: 3, id: 'api-chat' },
    { type: 'code', text: '', code: 'curl -X POST http://localhost:8080/api/chat \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -d \'{\n    "message": "Help me draft a strategy for Q2",\n    "system_key": "consulting",\n    "user_id": "user-123",\n    "agent_key": "analyst"\n  }\'', language: 'bash' },
  ],
};
