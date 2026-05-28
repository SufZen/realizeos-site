import type { GuideSectionData } from '../guideTypes';

export const connectors: GuideSectionData = {
  id: 'connectors',
  title: 'Connectors Setup',
  icon: 'Plug',
  description: 'Connect via CLI, MCP Server, or REST API — detailed setup for each.',
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
    { type: 'paragraph', text: 'RealizeOS ships a built-in MCP server so any MCP-speaking agent — Claude Desktop, Cursor, n8n, your own scripts — can call into your instance. 24 tools across 4 families.' },
    { type: 'heading', text: 'Enable MCP', level: 3, id: 'mcp-enable' },
    { type: 'code', text: '', code: '# In .env:\nMCP_ENABLED=true\n\n# Or in realize-os.yaml:\nmcp:\n  enabled: true\n  expose_kb: true\n  expose_ops: true\n  allow_admin: false', language: 'yaml' },
    { type: 'heading', text: 'MCP Endpoints', level: 3, id: 'mcp-endpoints' },
    { type: 'table', text: '', headers: ['Method', 'Path', 'Description'], rows: [
      ['GET', '/mcp/sse', 'SSE handshake — client keeps this open'],
      ['POST', '/mcp/messages/{session_id}', 'Client posts JSON-RPC payloads'],
      ['GET', '/mcp/health', 'No-auth liveness probe'],
    ]},
    { type: 'heading', text: 'Tool Families', level: 3, id: 'mcp-families' },
    { type: 'table', text: '', headers: ['Family', 'Gating', 'Example Tools'], rows: [
      ['chat', 'Always on', 'realize_chat, realize_health, list_agents, list_skills'],
      ['kb', 'expose_kb (default: on)', 'kb_search, kb_get_document, list_ventures'],
      ['ops', 'expose_ops (default: on)', 'run_workflow, trigger_skill, run_evolution'],
      ['admin', 'allow_admin + role=owner', 'create_venture, delete_venture, reload_agents'],
    ]},
    { type: 'heading', text: 'Claude Desktop Setup', level: 3, id: 'mcp-claude' },
    { type: 'code', text: '', code: '// In Claude Desktop settings → mcpServers:\n{\n  "realize-os": {\n    "url": "http://localhost:8080/mcp/sse",\n    "headers": { "Authorization": "Bearer <your-jwt>" }\n  }\n}', language: 'json' },
    { type: 'paragraph', text: 'Restart Claude Desktop. RealizeOS tools appear in the tool palette. Generate a token with:' },
    { type: 'code', text: '', code: 'realize-os mcp token --user owner', language: 'bash' },

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
