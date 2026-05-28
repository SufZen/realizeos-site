const o={id:"getting-started",title:"Getting Started",icon:"Rocket",description:"From zero to a running RealizeOS instance in under 10 minutes.",readTime:"8 min",content:[{type:"heading",text:"Prerequisites",level:2,id:"prerequisites"},{type:"paragraph",text:"Before you begin, make sure you have the following installed:"},{type:"list",text:"",items:["Docker and Docker Compose installed","At least one LLM API key: ANTHROPIC_API_KEY or GOOGLE_AI_API_KEY","Python 3.11+ (for non-Docker setups)","Git (for cloning the repository)"]},{type:"heading",text:"Quick Install (Docker)",level:2,id:"quick-install"},{type:"paragraph",text:"The fastest way to get RealizeOS running is with Docker Compose."},{type:"heading",text:"Step 1: Clone the Repository",level:3,id:"step-1-clone"},{type:"code",text:"",code:`git clone https://github.com/SufZen/RealizeOS-5.git
cd RealizeOS-5`,language:"bash"},{type:"heading",text:"Step 2: Configure Environment",level:3,id:"step-2-configure"},{type:"code",text:"",code:"cp .env.example .env",language:"bash"},{type:"paragraph",text:"Open .env and add your API key(s):"},{type:"code",text:"",code:`ANTHROPIC_API_KEY=<your-anthropic-api-key>
# and/or
GOOGLE_AI_API_KEY=<your-google-ai-api-key>`,language:"bash"},{type:"heading",text:"Step 3: Launch",level:3,id:"step-3-launch"},{type:"code",text:"",code:"docker compose up --build",language:"bash"},{type:"paragraph",text:'Wait for the output showing "Application startup complete" and "Uvicorn running on http://0.0.0.0:8080".'},{type:"heading",text:"Step 4: Open Dashboard",level:3,id:"step-4-dashboard"},{type:"paragraph",text:"Open your browser to http://localhost:8080. The dashboard shows your Ventures, Agents, and Activity Feed."},{type:"heading",text:"Step 5: Send Your First Message",level:3,id:"step-5-first-message"},{type:"code",text:"",code:`curl -X POST http://localhost:8080/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Help me plan Q2 strategy", "system_key": "consulting"}'`,language:"bash"},{type:"heading",text:"Step 6: Initialize a Template",level:3,id:"step-6-template"},{type:"code",text:"",code:"realize-os init --template consulting",language:"bash"},{type:"paragraph",text:"Available templates: consulting, agency, portfolio, saas, ecommerce, accounting, coaching, freelance."},{type:"callout",text:"Use realize-os setup for an interactive wizard that handles configuration, dashboard setup, and template selection in one step.",calloutType:"tip"},{type:"heading",text:"Manual Setup (Without Docker)",level:2,id:"manual-setup"},{type:"code",text:"",code:`# 1. Create virtual environment
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\\Scripts\\activate       # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure
cp .env.example .env
# Edit .env — add your API key(s)

# 4. Start the server
realize-os serve`,language:"bash"},{type:"callout",text:"Run realize-os doctor to diagnose installation issues.",calloutType:"info"},{type:"heading",text:"Build Your Venture Profile",level:2,id:"venture-profile"},{type:"paragraph",text:"Before diving into the system, we recommend creating your Venture Intelligence Profile. Use the RealizeOS Venture Wizard (available as a Google Gem or Custom GPT) to generate your complete FABRIC knowledge graph — it takes about 10 minutes and gives your AI team the context it needs to perform."},{type:"callout",text:"The Venture Wizard is free to use and creates a downloadable venture profile you can import directly into your RealizeOS instance.",calloutType:"tip"}]},i={id:"architecture",title:"System Architecture",icon:"Layers",description:"Understand the FABRIC knowledge system, agent runtime, and LLM routing.",readTime:"10 min",content:[{type:"heading",text:"Overview",level:2,id:"overview"},{type:"paragraph",text:"RealizeOS is a self-hosted AI operations system that gives your business a coordinated team of AI agents. Unlike generic chatbots, RealizeOS agents know your venture, run multi-step workflows, route to the optimal model, and respect governance with approval gates and audit logs."},{type:"heading",text:"Request Flow",level:2,id:"request-flow"},{type:"code",text:"",code:`Message → Channel (API / Telegram / Webhook)
→ Base Handler (Session → Skill → Agent routing)
→ LLM Router (simple→Flash, content→Sonnet, complex→Opus)
→ Prompt Builder (12 layers from KB)
→ Tools (Google / Web / Browser / MCP)
→ Evolution Engine → Response`,language:"text",title:"Architecture Flow"},{type:"heading",text:"FABRIC Knowledge System",level:2,id:"fabric"},{type:"paragraph",text:"Every venture's AI knowledge is organized into six FABRIC layers — the knowledge graph that makes your AI team context-aware."},{type:"table",text:"",headers:["Layer","Folder","Purpose"],rows:[["Foundations","F-foundations/","Identity, brand voice, values, rules"],["Agents","A-agents/","Agent definitions, roles, specializations"],["Brain","B-brain/","Domain knowledge, templates, reference docs"],["Routines","R-routines/","Workflows, checklists, SOPs"],["Insights","I-insights/","Learning log, patterns, performance data"],["Creations","C-creations/","Generated content, deliverables, outputs"]]},{type:"heading",text:"Multi-LLM Routing",level:2,id:"llm-routing"},{type:"paragraph",text:"The engine classifies every task and selects the optimal model. Providers are auto-discovered at startup."},{type:"table",text:"",headers:["Task Class","Default Model","When Used"],rows:[["simple","Gemini Flash","Quick lookups, simple questions"],["content","Claude Sonnet","Writing, analysis, reasoning"],["complex","Claude Opus","Strategy, multi-step planning"]]},{type:"paragraph",text:"Supports Claude, Gemini, OpenAI, and Ollama (local models)."},{type:"heading",text:"Agent System",level:2,id:"agent-system"},{type:"list",text:"",items:["Composable agents with scope, inputs, outputs, guardrails, and tools","Pipelines — sequential execution with Dev-QA retry loops","7 handoff types — standard, QA-pass/fail, escalation, phase-gate, sprint, incident","Hot-reload — filesystem-watched agent registry","Per-agent SOUL — persistent identity: role, personality, expertise, communication style","Tool gating — per-agent allowlists/denylists"]},{type:"heading",text:"Default Agent Team",level:3,id:"default-agents"},{type:"table",text:"",headers:["Agent","Role","Triggers"],rows:[["Orchestrator","Strategic planning, coordination","plan, help, think, prioritize"],["Writer","Content creation, drafting","write, draft, post, blog, content, proposal"],["Reviewer","Quality control, brand compliance","review, check, quality, approve"],["Analyst","Research, data analysis","analyze, research, data, market, compare"]]},{type:"heading",text:"Extension System",level:2,id:"extensions"},{type:"paragraph",text:"RealizeOS supports four extension types: tool (add capabilities), channel (new input sources), integration (connect external services), and hook (event-driven logic)."},{type:"heading",text:"Security & Governance",level:2,id:"security"},{type:"list",text:"",items:["5-layer security middleware: Security headers → Audit → Rate limiting → Injection guard → JWT auth","RBAC with 6 roles: owner, admin, operator, user, viewer, guest","Prompt injection scanner — pattern + heuristic + Unicode normalization","Human-in-the-loop approval gates for consequential actions","Audit logging — JSONL persistent logs with SSE streaming","Secret redaction in error responses and logs"]}]},s={id:"connectors",title:"Connectors Setup",icon:"Plug",description:"Connect via CLI, MCP Server, or REST API — detailed setup for each.",readTime:"15 min",content:[{type:"heading",text:"Overview",level:2,id:"connectors-overview"},{type:"paragraph",text:"RealizeOS offers three primary connectors: the Operator CLI for terminal usage, the MCP Server for AI-tool integration, and the REST API for programmatic access. All three share the same authentication and audit system."},{type:"heading",text:"Operator CLI",level:2,id:"cli"},{type:"paragraph",text:"The realize-os CLI is a first-class operator interface. Install via pip or use the source checkout."},{type:"code",text:"",code:`pip install realize-os
# or from source:
python cli.py --help`,language:"bash"},{type:"heading",text:"Command Tree",level:3,id:"cli-commands"},{type:"code",text:"",code:`realize-os
├── init [--template NAME] [--setup PATH]       Deploy & initialize
├── serve [--port PORT] [--reload]              Start API + dashboard
├── bot                                          Start Telegram bot
├── status                                       Show system status
├── doctor                                       Diagnose issues
├── chat MESSAGE [--system KEY] [--agent KEY]    One-shot chat
├── ask QUERY                                    Smart-routed question
├── repl [--system KEY]                          Interactive REPL
├── venture
│   ├── list / create / delete
├── kb
│   ├── search / get / reindex
├── skill
│   ├── list / trigger
├── mcp
│   ├── serve / status / token
└── config
    ├── show / set / profile`,language:"text",title:"Command Tree"},{type:"heading",text:"Common Commands",level:3,id:"cli-examples"},{type:"code",text:"",code:`# Start the server
realize-os serve
realize-os serve --port 9090 --reload

# Chat
realize-os chat "What's my pipeline status?"
realize-os chat "Draft an email" --system arena --agent writer

# Interactive REPL
realize-os repl --system consulting

# Knowledge base search
realize-os kb search "investment thesis"

# Multi-instance profiles
realize-os config profile add prod --endpoint https://my-vps:8080
realize-os --profile prod status`,language:"bash"},{type:"heading",text:"Output Formats",level:3,id:"cli-output"},{type:"code",text:"",code:`realize-os venture list                    # Pretty table (default)
realize-os --format json venture list      # JSON (pipe to jq)
realize-os --format yaml evolution suggestions  # YAML`,language:"bash"},{type:"heading",text:"MCP Server",level:2,id:"mcp"},{type:"paragraph",text:"RealizeOS ships a built-in MCP server so any MCP-speaking agent — Claude Desktop, Cursor, n8n, your own scripts — can call into your instance. 24 tools across 4 families."},{type:"heading",text:"Enable MCP",level:3,id:"mcp-enable"},{type:"code",text:"",code:`# In .env:
MCP_ENABLED=true

# Or in realize-os.yaml:
mcp:
  enabled: true
  expose_kb: true
  expose_ops: true
  allow_admin: false`,language:"yaml"},{type:"heading",text:"MCP Endpoints",level:3,id:"mcp-endpoints"},{type:"table",text:"",headers:["Method","Path","Description"],rows:[["GET","/mcp/sse","SSE handshake — client keeps this open"],["POST","/mcp/messages/{session_id}","Client posts JSON-RPC payloads"],["GET","/mcp/health","No-auth liveness probe"]]},{type:"heading",text:"Tool Families",level:3,id:"mcp-families"},{type:"table",text:"",headers:["Family","Gating","Example Tools"],rows:[["chat","Always on","realize_chat, realize_health, list_agents, list_skills"],["kb","expose_kb (default: on)","kb_search, kb_get_document, list_ventures"],["ops","expose_ops (default: on)","run_workflow, trigger_skill, run_evolution"],["admin","allow_admin + role=owner","create_venture, delete_venture, reload_agents"]]},{type:"heading",text:"Claude Desktop Setup",level:3,id:"mcp-claude"},{type:"code",text:"",code:`// In Claude Desktop settings → mcpServers:
{
  "realize-os": {
    "url": "http://localhost:8080/mcp/sse",
    "headers": { "Authorization": "Bearer <your-jwt>" }
  }
}`,language:"json"},{type:"paragraph",text:"Restart Claude Desktop. RealizeOS tools appear in the tool palette. Generate a token with:"},{type:"code",text:"",code:"realize-os mcp token --user owner",language:"bash"},{type:"heading",text:"REST API",level:2,id:"api"},{type:"paragraph",text:"Full REST API at http://localhost:8080. Three auth methods: API Key, JWT (multi-user), or open mode (development)."},{type:"heading",text:"Authentication",level:3,id:"api-auth"},{type:"code",text:"",code:`# API Key (simple)
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:8080/api/systems

# JWT (multi-user)
curl -X POST http://localhost:8080/api/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "your-password"}'`,language:"bash"},{type:"heading",text:"Core Endpoints",level:3,id:"api-endpoints"},{type:"table",text:"",headers:["Endpoint","Method","Description"],rows:[["/api/chat","POST","Send a message, get AI response"],["/api/systems","GET","List all configured systems"],["/api/systems/reload","POST","Hot-reload configs from YAML"],["/api/ventures","GET/POST","List or create ventures"],["/api/ventures/{key}/agents","GET/POST","List or create agents"],["/api/ventures/{key}/kb","GET","Browse FABRIC directory"],["/api/workflows","GET/POST","List or create workflows"],["/api/approvals","GET","List pending approvals"],["/api/settings","GET/PUT","System settings"],["/api/evolution/suggestions","GET","Self-improvement suggestions"],["/status","GET","Detailed system status"]]},{type:"heading",text:"Chat Request Example",level:3,id:"api-chat"},{type:"code",text:"",code:`curl -X POST http://localhost:8080/api/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "message": "Help me draft a strategy for Q2",
    "system_key": "consulting",
    "user_id": "user-123",
    "agent_key": "analyst"
  }'`,language:"bash"}]},r={id:"configuration",title:"Configuration",icon:"Settings",description:"Environment variables, YAML config, templates, and LLM provider setup.",readTime:"8 min",content:[{type:"heading",text:"Configuration Files",level:2,id:"config-files"},{type:"table",text:"",headers:["File","Purpose"],rows:[[".env","API keys, secrets, environment flags"],["realize-os.yaml","System config — features, routing, LLM settings"],["setup.yaml","One-file bootstrap: keys + template + brand info"]]},{type:"heading",text:"Environment Variables",level:2,id:"env-vars"},{type:"code",text:"",code:`# Required — at least one LLM provider
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
OPENAI_API_KEY=sk-...

# Optional — features
TELEGRAM_BOT_TOKEN=...         # Enable Telegram channel
BRAVE_API_KEY=...              # Enable web search
REALIZE_API_KEY=...            # Simple API auth
REALIZE_JWT_ENABLED=true       # Multi-user JWT auth
REALIZE_JWT_SECRET=...         # 32+ char secret
MCP_ENABLED=true               # Enable MCP server
REALIZE_ENV=production         # Production mode`,language:"bash",title:".env"},{type:"callout",text:"No spaces around = signs, no quotes around values, no inline comments. Docker cannot parse them.",calloutType:"warning"},{type:"heading",text:"realize-os.yaml",level:2,id:"yaml-config"},{type:"code",text:"",code:`features:
  cross_system: true
  evolution: true

mcp:
  enabled: true
  expose_kb: true
  expose_ops: true
  allow_admin: false

llm:
  default_provider: anthropic
  routing:
    simple: gemini-flash
    content: claude-sonnet
    complex: claude-opus`,language:"yaml",title:"realize-os.yaml"},{type:"heading",text:"Business Templates",level:2,id:"templates"},{type:"paragraph",text:"Templates pre-configure agents, skills, and FABRIC structure for your business type."},{type:"code",text:"",code:"realize-os init --template consulting",language:"bash"},{type:"paragraph",text:"Available: consulting, agency, portfolio, saas, ecommerce, accounting, coaching, freelance."},{type:"heading",text:"Setup File (One-File Bootstrap)",level:2,id:"setup-file"},{type:"code",text:"",code:`cp setup.yaml.example setup.yaml
# Edit setup.yaml with your API keys + business info
python cli.py init --setup setup.yaml`,language:"bash"},{type:"paragraph",text:"The setup file creates your .env, copies the template config, builds the FABRIC structure, and pre-populates brand files — all from one command."}]},l={id:"skill-authoring",title:"Skill Authoring",icon:"Wand2",description:"Build v1 pipelines and v2 multi-step skills with tools and human gates.",readTime:"10 min",content:[{type:"heading",text:"What Are Skills?",level:2,id:"what-are-skills"},{type:"paragraph",text:"Skills are reusable, trigger-based workflows that chain agents, tools, conditions, and human approval gates. They come in two versions: v1 (simple pipelines) and v2 (multi-step with full orchestration)."},{type:"heading",text:"Pre-Built Skills",level:2,id:"pre-built"},{type:"table",text:"",headers:["Skill","Trigger Examples"],rows:[["Content Pipeline",'"write a blog post", "create content"'],["Research Workflow",'"research", "analyze", "compare"'],["Email Campaign",'"email campaign", "newsletter"'],["Social Media",'"linkedin post", "write a post"'],["Client Proposal",'"proposal", "scope of work"'],["Weekly Review",'"weekly review", "plan my week"']]},{type:"heading",text:"v1: Simple Pipeline",level:2,id:"v1-skills"},{type:"code",text:"",code:`name: content_pipeline
triggers:
  - "write a post"
  - "create content"
  - "draft an article"
task_type: content
pipeline:
  - writer
  - reviewer`,language:"yaml",title:"v1 skill definition"},{type:"heading",text:"v2: Multi-Step with Tools",level:2,id:"v2-skills"},{type:"code",text:"",code:`name: competitor_analysis
version: "2.0"
description: "Research competitors and produce analysis"
triggers:
  - "analyze competitor"
  - "competitive analysis"
task_type: research
steps:
  - id: search
    type: tool
    action: web_search
    label: "Search for competitor info"
    params:
      query: "{user_message} site:linkedin.com OR site:crunchbase.com"

  - id: analyze
    type: agent
    agent: analyst
    label: "Analyze findings"
    inject_context: [search]

  - id: confirm
    type: human
    question: "Should I create a detailed report?"

  - id: report
    type: agent
    agent: writer
    label: "Write the report"
    inject_context: [search, analyze]`,language:"yaml",title:"v2 skill definition"},{type:"heading",text:"Step Types",level:2,id:"step-types"},{type:"table",text:"",headers:["Type","Purpose","Key Fields"],rows:[["agent","Call an LLM agent","agent, inject_context, prompt"],["tool","Execute a tool action","action, params"],["condition","Branch logic","check, branches"],["human","Ask user for input","question"]]},{type:"heading",text:"Available Tool Actions",level:2,id:"tool-actions"},{type:"table",text:"",headers:["Category","Actions"],rows:[["Web","web_search, web_fetch"],["Gmail","gmail_search, gmail_read, gmail_send, gmail_create_draft"],["Calendar","calendar_list_events, calendar_create_event, calendar_update_event, calendar_find_free_time"],["Drive","drive_search, drive_list_folder, drive_read_content, drive_create_doc, drive_append_doc"],["Browser","browser_navigate, browser_click, browser_type, browser_screenshot, browser_extract"]]}]},p={id:"integrations",title:"Recommended Integrations",icon:"Link2",description:"Connect Telegram, Google Workspace, web search, Make.com, webhooks, and more.",readTime:"12 min",content:[{type:"heading",text:"Integration Overview",level:2,id:"integration-overview"},{type:"paragraph",text:"RealizeOS connects to external services through built-in tools, channels, and webhook endpoints. All integrations share the same authentication and audit logging."},{type:"heading",text:"Telegram Bot",level:2,id:"telegram"},{type:"list",text:"",ordered:!0,items:["Open Telegram and message @BotFather","Send /newbot and follow the prompts","Copy the bot token and add to your .env"]},{type:"code",text:"",code:"TELEGRAM_BOT_TOKEN=your_token_here",language:"bash"},{type:"code",text:"",code:`python cli.py bot
# Or add to Docker and restart:
docker compose up -d`,language:"bash"},{type:"paragraph",text:"Message your bot on Telegram — it routes through the same agent system as the API."},{type:"heading",text:"Google Workspace",level:2,id:"google-workspace"},{type:"paragraph",text:"Gmail, Calendar, and Drive — 13 tools total."},{type:"list",text:"",ordered:!0,items:["Go to Google Cloud Console → Create/select project","Enable Gmail API, Google Calendar API, Google Drive API","Create OAuth 2.0 credentials (Desktop app) → download JSON","Save as .credentials/credentials.json","Run: python cli.py auth google"]},{type:"table",text:"",headers:["Service","Available Tools"],rows:[["Gmail","gmail_search, gmail_read, gmail_send, gmail_create_draft"],["Calendar","calendar_list_events, calendar_create_event, calendar_update_event, calendar_find_free_time"],["Drive","drive_search, drive_list_folder, drive_read_content, drive_create_doc, drive_append_doc"]]},{type:"callout",text:"Write operations (send, create, update) always require confirmation before executing.",calloutType:"info"},{type:"heading",text:"Web Search (Brave API)",level:2,id:"web-search"},{type:"code",text:"",code:"BRAVE_API_KEY=your_key_here",language:"bash"},{type:"paragraph",text:"Restart the server. Web search becomes available in skills and direct queries."},{type:"heading",text:"Make.com / n8n / Zapier",level:2,id:"automation"},{type:"paragraph",text:"Connect any automation platform via the REST API:"},{type:"code",text:"",code:`URL:     http://YOUR_SERVER_IP:8080/api/chat
Method:  POST
Headers: Content-Type: application/json
         Authorization: Bearer YOUR_API_KEY
Body:
{
  "message": "{{trigger_data}}",
  "system_key": "consulting",
  "user_id": "make-automation"
}`,language:"json",title:"HTTP Module Config"},{type:"paragraph",text:"Example flow: New email in Gmail → summarize with RealizeOS → post summary to Slack."},{type:"heading",text:"Inbound Webhooks",level:2,id:"webhooks"},{type:"paragraph",text:"External services (GitHub, Stripe, forms) can trigger your agents by posting to /api/chat. Works with any HTTP-capable system."},{type:"heading",text:"MCP Tool Servers",level:2,id:"mcp-tools"},{type:"paragraph",text:"RealizeOS auto-discovers and registers all tools exposed by external MCP servers. Add them in your realize-os.yaml under the mcp section to extend your agent capabilities."}]},d={id:"self-hosting",title:"Self-Hosting & Production",icon:"Server",description:"Deploy to production with Docker, configure SSL, backups, and monitoring.",readTime:"10 min",content:[{type:"heading",text:"Deployment Options",level:2,id:"deployment-options"},{type:"table",text:"",headers:["Method","Best For","Requirements"],rows:[["Docker Compose","Most users, VPS/cloud","Docker 24.0+, 2GB RAM"],["Standalone Docker","Single container, quick test","Docker 24.0+"],["pip install","Development, custom integrations","Python 3.11+"],["One-line script","Fast Linux/Mac setup","curl, Docker"]]},{type:"heading",text:"Docker Compose (Recommended)",level:2,id:"docker-compose"},{type:"code",text:"",code:`git clone https://github.com/SufZen/RealizeOS-5.git && cd RealizeOS-5
cp .env.example .env
# Edit .env with your API keys
docker compose up --build -d`,language:"bash"},{type:"heading",text:"Standalone Docker",level:2,id:"standalone-docker"},{type:"code",text:"",code:`docker run -d -p 8080:8080 \\
  -v realizeos-data:/app/data \\
  ghcr.io/sufzen/realizeos-5:latest`,language:"bash"},{type:"heading",text:"One-Line Install",level:2,id:"one-line"},{type:"code",text:"",code:`# Linux / macOS:
curl -fsSL https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.sh | bash

# Windows (PowerShell):
irm https://raw.githubusercontent.com/SufZen/RealizeOS-5/main/scripts/install.ps1 | iex`,language:"bash"},{type:"heading",text:"Production Checklist",level:2,id:"production-checklist"},{type:"list",text:"",items:["Set REALIZE_ENV=production in .env","Enable JWT auth: REALIZE_JWT_ENABLED=true with a 32+ char REALIZE_JWT_SECRET","Set a strong REALIZE_API_KEY","Use docker-compose.prod.yml for production Docker config","Configure reverse proxy (nginx/Caddy) with SSL","Set up automated backups for the data volume","Monitor logs: docker compose logs -f","Enable rate limiting in security settings"]},{type:"callout",text:"In production mode, enabling MCP admin tools requires JWT authentication with a 32+ character secret. The server refuses to start otherwise.",calloutType:"warning"},{type:"heading",text:"Requirements",level:2,id:"requirements"},{type:"list",text:"",items:["Python 3.11+ (3.12+ recommended)","At least one LLM API key (Anthropic, Google, OpenAI, or Ollama)","Docker 24.0+ (for containerized deployment)","Node.js 20+ (optional, for dashboard development)"]}]},c={id:"best-practices",title:"Best Practices",icon:"Award",description:"Proven patterns for agent design, knowledge management, and daily operations.",readTime:"8 min",content:[{type:"heading",text:"Knowledge Base",level:2,id:"kb-best-practices"},{type:"list",text:"",items:["Start with the Venture Wizard — use the Google Gem or Custom GPT to generate your FABRIC profile before configuring agents","Save your vault in Documents, not in a cloud-synced folder (OneDrive, iCloud, Google Drive). Cloud sync causes conflicts",'Keep identity.md honest and specific. "I prefer direct communication with no fluff" is better than "I like good communication"',"Use the FABRIC structure consistently: F-foundations for rules, A-agents for team, B-brain for domain knowledge","Review and update B-brain/ quarterly — stale knowledge degrades output quality"]},{type:"heading",text:"Agent Design",level:2,id:"agent-design"},{type:"list",text:"",items:["Keep agents focused — one clear role per agent performs better than generalist agents","Use tool gating (allowlists/denylists) to prevent agents from accessing tools outside their scope","Define clear trigger keywords in agent_routing for reliable auto-routing","Test new agents in the REPL before deploying to production","Use the QA-pass/fail handoff type for content that needs review before delivery"]},{type:"heading",text:"LLM Cost Optimization",level:2,id:"cost-optimization"},{type:"list",text:"",items:["Let the router do its job — simple→Flash ($), content→Sonnet ($$), complex→Opus ($$$)","Use Gemini Flash for quick lookups and triage — it has a generous free tier","Add Ollama for local inference on non-sensitive tasks to reduce API costs","Monitor usage patterns via the evolution engine suggestions","Set up cost alerts on your LLM provider dashboards"]},{type:"heading",text:"Daily Workflow",level:2,id:"daily-workflow"},{type:"paragraph",text:"Establish a rhythm with your AI team for maximum productivity:"},{type:"table",text:"",headers:["When","What to Ask","What Happens"],rows:[["Morning",`"What's on my calendar today and what should I prioritize?"`,"System checks calendar, reviews pending tasks, suggests priorities"],["Working",'"Draft a client proposal for the Acme Corp engagement"',"Skills auto-trigger — content pipeline handles drafting and review"],["End of Day",'"Summarize what I accomplished today and plan tomorrow"',"Reviews conversations, logs learnings, creates action items"],["Weekly",'"Plan my week — review last week and set priorities"',"Weekly Review skill — cross-references outcomes with goals"]]},{type:"heading",text:"Security",level:2,id:"security-practices"},{type:"list",text:"",items:["Always use JWT auth in production (REALIZE_JWT_ENABLED=true)","Use a 32+ character JWT secret — the server enforces this in production mode","Keep MCP admin tools disabled unless specifically needed (allow_admin: false)","Review audit logs regularly: GET /api/security/audit","Use human-in-the-loop approval gates for consequential actions (email sends, data writes)"]},{type:"heading",text:"Environment Configuration",level:2,id:"env-practices"},{type:"callout",text:"Common .env mistakes: No spaces around the = sign. No quotes around values. No inline comments — Docker cannot parse them. Put comments on their own line.",calloutType:"warning"},{type:"heading",text:"Getting Help",level:2,id:"getting-help"},{type:"paragraph",text:"Need personalized help getting started? Book a 1-on-1 setup session with the RealizeOS team. Limited-time launch offer: $249 (50% off, valid until July 1st 2025)."},{type:"list",text:"",items:["Report bugs: github.com/SufZen/RealizeOS-5/issues","Join the community: Telegram and WhatsApp groups","Read the full docs: github.com/SufZen/RealizeOS-5/docs","Run realize-os doctor to diagnose common issues"]}]},t=[o,i,s,r,l,p,d,c];function u(a){return t.find(e=>e.id===a)}function g(a){const e=t.findIndex(n=>n.id===a);return{prev:e>0?{id:t[e-1].id,title:t[e-1].title}:null,next:e<t.length-1?{id:t[e+1].id,title:t[e+1].title}:null}}export{u as a,g as b,t as g};
