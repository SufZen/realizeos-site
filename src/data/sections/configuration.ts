import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.14.0 — .env.example, realize_core/config.py (get_features),
// realize_core/mcp_server/config.py, realize_core/governance/trust_ladder.py, realize_core/llm/registry.py.
export const configuration: GuideSectionData = {
  id: 'configuration',
  title: 'Configuration',
  icon: 'Settings',
  description: 'Environment variables, realize-os.yaml, feature flags, MCP and LLM provider setup.',
  readTime: '10 min',
  content: [
    { type: 'heading', text: 'Configuration files', level: 2, id: 'config-files' },
    { type: 'table', text: '', headers: ['File', 'Purpose'], rows: [
      ['.env', 'API keys, secrets, environment flags'],
      ['realize-os.yaml', 'Ventures (systems), features, trust ladder, MCP, LLM settings (path: REALIZE_CONFIG)'],
      ['users.yaml', 'People who can sign in, their roles and ventures (see Users, Roles & Ventures)'],
      ['setup.yaml', 'Optional one-file bootstrap: keys + template + brand info'],
    ]},

    { type: 'heading', text: 'Environment variables', level: 2, id: 'env-vars' },
    { type: 'code', text: '', code: '# LLM providers — at least one\nANTHROPIC_API_KEY=\nGOOGLE_AI_API_KEY=\nOPENAI_API_KEY=\n\n# Server\nREALIZE_ENV=development        # development | production\nREALIZE_HOST=0.0.0.0\nREALIZE_PORT=8080\n\n# Auth — leave REALIZE_API_KEY empty only for local, single-person use\nREALIZE_API_KEY=\nREALIZE_JWT_ENABLED=false\nREALIZE_JWT_SECRET=            # 32+ characters in production\nCORS_ORIGINS=                  # required in production, comma-separated, no wildcards\n\n# MCP server\nMCP_ENABLED=false\nMCP_EXPOSE_KB=true\nMCP_EXPOSE_OPS=true\nMCP_ALLOW_ADMIN=false\nMCP_STREAMABLE_HTTP=true\nMCP_OAUTH_ENABLED=false\nMCP_PUBLIC_URL=                # https://your-host — needed for OAuth\nMCP_OAUTH_REDIRECT_HOSTS=      # empty = claude.ai, claude.com and loopback\n\n# Optional tools\nBRAVE_API_KEY=                 # web search\nCLICKUP_API_KEY=               # ClickUp tools', language: 'bash', title: '.env' },
    { type: 'callout', text: 'No spaces around =, no quotes around values, and no inline comments in a real .env — Docker can\'t parse them. (The comments above are for reading only.) Generate secrets with: python -c "import secrets; print(secrets.token_urlsafe(48))"', calloutType: 'warning' },

    { type: 'heading', text: 'Ventures', level: 2, id: 'systems' },
    { type: 'code', text: '', code: 'systems:\n  - key: tower-b\n    name: Tower B\n    locale: he        # optional: content language; he/ar/fa/ur/yi turn the dashboard RTL', language: 'yaml', title: 'realize-os.yaml' },

    { type: 'heading', text: 'Feature flags', level: 2, id: 'features' },
    { type: 'paragraph', text: 'Flags live under features: in realize-os.yaml. A missing flag uses the engine default. You can also change them with PUT /api/settings/features; enforce_gates needs a restart.' },
    { type: 'table', text: '', headers: ['Flag', 'Engine default', 'What it does'], rows: [
      ['agent_tools', 'false', 'Agents use tools while answering (Claude only). Without enforce_gates, only read-only tools are offered.'],
      ['enforce_gates', 'false', 'Hold gated actions for approval; approving runs them once (see Approvals & the Trail).'],
      ['cite_sources', 'false', 'Answers cite their knowledge-base sources inline as [S1], [S2] ...'],
      ['review_pipeline, auto_memory, proactive_mode', 'true', 'Core behaviours, on by default. See docs/configuration.md in the repository.'],
      ['cross_system', 'false', 'Let one venture read another\'s knowledge'],
      ['email_digest, dreaming_curator, dreaming_reflex', 'false', 'Dreaming / self-improvement features (available, not under active development)'],
    ]},
    { type: 'callout', text: 'The sample realize_lite/realize-os.yaml and the real-estate-developer template turn on agent_tools, enforce_gates and cite_sources.', calloutType: 'info' },

    { type: 'heading', text: 'Trust ladder', level: 2, id: 'trust' },
    { type: 'code', text: '', code: 'trust:\n  level: 3          # 1–5; default 3; an invalid value falls back to 1\n  actions:          # optional per-action overrides\n    send_email: {1: block, 2: approve, 3: approve, 4: auto, 5: auto}', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'paragraph', text: 'At level 3, emails, sheet and document writes, uploads and unknown writes need approval; calendar events and reads run automatically. Full table in Approvals & the Trail.' },

    { type: 'heading', text: 'MCP', level: 2, id: 'mcp' },
    { type: 'code', text: '', code: 'mcp:\n  enabled: false\n  expose_kb: true\n  expose_ops: true\n  allow_admin: false\n  audit_full_payload: false\n  streamable_http: true\n  public_url: ""\n  oauth:\n    enabled: false\n    redirect_hosts: []', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'paragraph', text: 'Each key has an env var that overrides it (MCP_ENABLED, MCP_EXPOSE_KB, MCP_EXPOSE_OPS, MCP_ALLOW_ADMIN, MCP_AUDIT_FULL_PAYLOAD, MCP_STREAMABLE_HTTP, MCP_PUBLIC_URL, MCP_OAUTH_ENABLED, MCP_OAUTH_REDIRECT_HOSTS). Booleans accept 1, true, yes or on. See Connect Your Agent.' },

    { type: 'heading', text: 'LLM providers', level: 2, id: 'llm' },
    { type: 'table', text: '', headers: ['Provider', 'Set', 'Notes'], rows: [
      ['Claude (Anthropic)', 'ANTHROPIC_API_KEY', 'Needed for agent tool use'],
      ['Gemini (Google)', 'GOOGLE_AI_API_KEY', ''],
      ['OpenAI', 'OPENAI_API_KEY', ''],
      ['Ollama (local)', 'OLLAMA_HOST (default http://localhost:11434)', 'Used when the Ollama server answers. Basic chat only; no tool use'],
    ]},
    { type: 'callout', text: '.env.example lists OLLAMA_BASE_URL, but in 5.14.0 the Ollama provider reads OLLAMA_HOST. Set OLLAMA_HOST if your Ollama isn\'t on the default address.', calloutType: 'warning' },
    { type: 'heading', text: 'Model routing', level: 3, id: 'routing' },
    { type: 'paragraph', text: 'Available, not under active development. RealizeOS can route simple tasks to a fast model and harder ones to a stronger model. Override the model names with GEMINI_FLASH_MODEL, CLAUDE_SONNET_MODEL and CLAUDE_OPUS_MODEL.' },
    { type: 'code', text: '', code: 'llm:\n  routing:\n    simple: gemini-flash\n    content: claude-sonnet\n    complex: claude-opus', language: 'yaml', title: 'realize-os.yaml' },

    { type: 'heading', text: 'Setup file (one-file bootstrap)', level: 2, id: 'setup-file' },
    { type: 'code', text: '', code: 'cp setup.yaml.example setup.yaml\n# Edit setup.yaml with your API keys + business info\npython cli.py init --setup setup.yaml', language: 'bash' },
    { type: 'paragraph', text: 'Creates your .env, copies the template config, builds the FABRIC structure and pre-fills brand files in one command.' },
  ],
};
