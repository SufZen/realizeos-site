# RealizeOS Full — Post-Setup Guide

> Your self-hosted AI operations engine is running.
> This guide covers everything after setup — from your first API call to advanced integrations, multi-LLM routing, and self-evolution.

---

## Step 1: Welcome & What You Built

Your RealizeOS Full system is a **self-hosted AI operations engine** running via Docker. It exposes a REST API that connects to any client — your apps, Telegram, Make.com, webhooks, or direct curl commands.

### How It Works

```
Your message → API/Telegram/Webhook → Base Handler
→ Session check → Skill detection → Agent routing
→ LLM Router (simple→Flash, content→Sonnet, complex→Opus)
→ Prompt Builder (12 layers from KB) → Tools (Google/Web/Browser/MCP)
→ Evolution engine → Response
```

### Quick Health Check

Open your browser or run:

```bash
curl http://localhost:8080/health
```

**Expected:** `{"status": "ok"}`

For detailed status including LLM providers, systems, and tools:

```bash
curl http://localhost:8080/status
```

**PowerShell:**

```powershell
Invoke-RestMethod http://localhost:8080/status | ConvertTo-Json -Depth 5
```

---

## Step 2: Full vs Lite — What You Gained

| Capability | Lite | Full |
|---|---|---|
| **Interface** | Claude Code CLI | REST API — connect from anywhere |
| **Always-on** | Only when Claude Code is open | Docker 24/7 |
| **Channels** | Claude Code only | API, Telegram, webhooks, scheduler |
| **LLMs** | Claude only ($20/mo) | Claude + Gemini + OpenAI + Ollama (auto-routing) |
| **Cost control** | Fixed subscription | Route simple→cheap, complex→powerful |
| **Tools** | Manual | Google Workspace (13), web search, browser, MCP |
| **Skills** | Manually followed | Auto-triggered by engine |
| **Evolution** | Manual | Self-evolution (gap detection, skill suggestion) |
| **Integrations** | None | Webhooks, Make.com, n8n, Zapier |
| **Multi-user** | Single | API keys, user IDs, concurrent |

---

## Step 3: Connect Your AI Tools (MCP Toolkit)

### The Fastest Way to Talk to Your Engine

Docker Desktop includes a built-in **MCP Toolkit** that lets you connect Claude Code Desktop, Claude Code CLI, and Gemini CLI to your running RealizeOS container — with just a few clicks. No manual API calls needed.

### What Is MCP?

The **Model Context Protocol (MCP)** is an open standard that lets AI tools (like Claude Code and Gemini) communicate with external services. Docker Desktop's MCP Toolkit turns your running containers into MCP servers automatically, so your AI tools can call your RealizeOS engine directly.

### Prerequisites

- **Docker Desktop 4.62+** — MCP Toolkit is built-in from this version
- Your RealizeOS container running (via `docker compose up -d`)
- At least one AI tool installed: Claude Code Desktop, Claude Code CLI, or Gemini CLI

### Step-by-Step Setup

1. **Open Docker Desktop** and verify your RealizeOS container is running (green status).
2. **Navigate to the MCP Toolkit** — find it in the Docker Desktop sidebar (look for the MCP Toolkit or Extensions section).
3. **Go to the "Clients" tab** in the MCP Toolkit. You'll see a list of supported AI tools.
4. **Enable your preferred clients:**
   - **Claude Code Desktop** — toggle on, Docker configures it automatically
   - **Claude Code CLI** — toggle on for terminal-based usage
   - **Gemini CLI** — toggle on if you use Google's Gemini tools
5. **Restart your AI tool** if it was already open. The MCP connection is detected on startup.

### Verify the Connection

After enabling, verify your AI tool can see the Docker MCP gateway:

```bash
# Claude Code CLI — list MCP servers
claude mcp list

# You should see the Docker MCP gateway listed
```

For **Claude Code Desktop**, open the app and check Settings → MCP Servers. The Docker gateway should appear automatically.

### How It Works Behind the Scenes

The MCP Toolkit registers a gateway that proxies MCP requests to your container:

```json
{
  "command": "docker",
  "args": ["mcp", "gateway", "run"]
}
```

This runs `docker mcp gateway run` which connects your AI tool to all MCP-enabled containers, including RealizeOS.

### What You Can Do After Connecting

Once connected, your AI tool can interact with RealizeOS directly. Instead of writing curl commands, you just talk to Claude or Gemini naturally:

- "Ask my RealizeOS consultant agent to draft a proposal"
- "Check the health status of my RealizeOS engine"
- "List all agents in my consulting system"
- "Run a skill on my RealizeOS instance"

> **Why This Matters:** The MCP Toolkit is the recommended way to interact with your RealizeOS engine day-to-day. It eliminates the need to memorize API endpoints or write curl commands — your AI tools become a natural interface to your entire operations system.

### Troubleshooting

- **Don't see MCP Toolkit?** Update Docker Desktop to version 4.62 or later.
- **Gateway not appearing in Claude Code?** Restart the AI tool after enabling in Docker Desktop.
- **Container not detected?** Make sure RealizeOS is running (`docker compose ps`).
- **Manual config needed?** Add the gateway manually to your AI tool's MCP config with: `{"command": "docker", "args": ["mcp", "gateway", "run"]}`

---

## Step 4: Your First Conversation

Now that your AI tool is connected, just open it and start talking. No API calls, no curl commands — your AI tool talks to RealizeOS through the MCP connection you set up in Step 3.

### Try These First Prompts

Open Claude Code, Claude Desktop, or Gemini CLI and type:

- **"What do you know about my business?"** — The system reads your brand identity and knowledge base, then summarizes what it knows.
- **"What agents are available?"** — Lists your agent team and what each one does.
- **"Check the health status"** — Confirms your engine is running and shows connected services.

### Talking to Specific Agents

RealizeOS automatically routes your message to the right agent, but you can also direct your request explicitly:

- **"Ask the analyst to research competitors in the AI consulting space"**
- **"Tell the writer to draft a LinkedIn post about our new service"**
- **"Have the reviewer check the tone of this email"**

The system understands natural references to agents and routes accordingly.

### What Happens Behind the Scenes

When you send a message, the engine handles everything automatically:

1. Your AI tool sends the message through the MCP connection
2. RealizeOS detects the intent, selects the right agent, and picks the optimal LLM
3. The response comes back to your AI tool naturally

> **For developers:** Direct API access is available — see Step 12 for the full API reference.

---

## Step 5: Understanding Your Agent Team

### The 4 Default Agents

| Agent | Role | Best For |
|-------|------|----------|
| **Orchestrator** | Strategic planning, coordination | "Help me plan...", "Prioritize my..." |
| **Writer** | Content creation, drafting | "Write a post...", "Draft an email..." |
| **Reviewer** | Quality control, brand compliance | "Review this...", "Check the tone..." |
| **Analyst** | Research, data analysis | "Analyze...", "Research competitors..." |

### How Routing Works

The system classifies your message and routes to the right agent pipeline:

- **Content tasks** (write, draft, post) → Writer → Reviewer
- **Strategy tasks** (plan, prioritize, advise) → Analyst → Orchestrator
- **Research tasks** (analyze, compare, evaluate) → Analyst
- **General tasks** (help, think) → Orchestrator

### LLM Routing

Tasks are automatically routed to the optimal LLM based on complexity:

| Task Class | Default Model | When Used |
|---|---|---|
| `simple` | Gemini Flash | Quick lookups, simple questions |
| `content` | Claude Sonnet | Writing, analysis, reasoning |
| `complex` | Claude Opus | Strategy, multi-step planning |

This means simple tasks cost fractions of a cent while complex tasks get the best model available.

### List Agents

Ask your AI tool:

> "List all available agents"

### Hot Reload Config

After editing agents, skills, or config, tell your AI tool:

> "Reload the RealizeOS config"

### Customizing Agents

Each agent is defined as a `.md` file in the system's `A-agents/` directory. Edit to change:

- **Role description** — What this agent does
- **Tone** — How it communicates
- **Constraints** — What it should never do
- **Examples** — Sample inputs and ideal outputs

### Adding New Agents

1. Create a new `.md` file in `systems/<key>/A-agents/` (e.g., `client-comms.md`)
2. Add routing keywords in `realize-os.yaml` under `agent_routing`
3. Tell your AI tool: "Reload the RealizeOS config"

---

## Step 6: Your Operations System by Business Type

RealizeOS ships with 8 pre-configured operations templates. Here's what each is optimized for.

### Consulting

**Best for:** Solo consultants, advisory firms

**Example tasks:**
- "Draft a client proposal for a 3-month strategy engagement"
- "Research competitors in the management consulting space"
- "Write a LinkedIn post about why AI agents should work as a team"
- "Create a quarterly review template for my advisory clients"

**Suggested integrations:** Google Calendar (client meetings), Gmail (proposals), web search (research).

### Agency

**Best for:** Creative and marketing agencies

**Example tasks:**
- "Run this content brief through the pipeline"
- "Write 5 social media post variations for this campaign"
- "Audit the brand voice on our latest copy"
- "Create a content calendar for next month"

**Suggested integrations:** Google Drive (asset management), Make.com (content distribution), Telegram (team notifications).

### Portfolio

**Best for:** Multi-venture operators, holding companies

**Example tasks:**
- "Give me a cross-venture status update"
- "Compare performance metrics across my businesses"
- "Draft investor update covering all ventures"

**Suggested integrations:** Webhooks (multi-system triggers), Google Sheets (reporting).

### SaaS

**Best for:** SaaS founders, product teams

**Example tasks:**
- "Write a feature spec for user onboarding improvements"
- "Analyze user feedback from last month's surveys"
- "Draft release notes for v2.1"

**Suggested integrations:** GitHub webhooks (deploy notifications), web search (competitor monitoring).

### E-Commerce

**Best for:** Online stores, D2C brands

**Example tasks:**
- "Write 20 product descriptions for our new collection"
- "Draft abandoned cart email sequences"
- "Analyze sales data and suggest pricing adjustments"
- "Create seasonal campaign copy for summer sale"

**Suggested integrations:** Gmail (customer comms), Make.com (order notifications), web search (trend research).

### Accounting

**Best for:** Accountants, bookkeepers, financial advisors

**Example tasks:**
- "Draft a client communication about upcoming tax deadlines"
- "Write a report summary for the quarterly review"
- "Create an FAQ document for new clients"

**Suggested integrations:** Gmail (client comms), Google Calendar (deadline tracking).

### Coaching

**Best for:** Coaches, course creators, trainers

**Example tasks:**
- "Create session notes template for client meetings"
- "Draft program materials for my 8-week coaching course"
- "Write a LinkedIn post about a coaching methodology"

**Suggested integrations:** Google Calendar (sessions), Gmail (follow-ups), Google Drive (materials).

### Freelance

**Best for:** Freelance professionals of all types

**Example tasks:**
- "Draft a project proposal for the website redesign"
- "Write a scope of work document"
- "Create a case study based on my last project"

**Suggested integrations:** Gmail (client comms), Google Calendar (deadlines), Make.com (project notifications).

> **Try it:** Just tell your AI tool any of the above — the system routes to the right agent automatically. No need to specify system keys or endpoints.

---

## Step 7: Working with Skills

### What Are Skills?

Skills are **YAML-defined workflows** that automate multi-step processes. The Full edition supports both v1 (simple pipelines) and v2 (multi-step with tools, conditions, and human-in-the-loop).

### Pre-Built Skills

| Skill | Trigger Examples |
|-------|-----------------|
| **Content Pipeline** | "write a blog post", "create content" |
| **Research Workflow** | "research", "analyze", "compare" |
| **Email Campaign** | "email campaign", "newsletter" |
| **Social Media** | "linkedin post", "write a post" |
| **Client Proposal** | "proposal", "scope of work" |
| **Weekly Review** | "weekly review", "plan my week" |

### v1 Skills (Simple Pipelines)

```yaml
name: content_pipeline
triggers:
  - "write a post"
  - "create content"
  - "draft an article"
task_type: content
pipeline:
  - writer
  - reviewer
```

### v2 Skills (Multi-Step with Tools)

```yaml
name: competitor_analysis
version: "2.0"
description: "Research competitors and produce analysis"
triggers:
  - "analyze competitor"
  - "competitive analysis"
  - "compare with"
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
    inject_context: [search, analyze]
```

### 4 Step Types

| Type | Purpose | Key Fields |
|------|---------|------------|
| `agent` | Call an LLM agent | `agent`, `inject_context`, `prompt` |
| `tool` | Execute a tool action | `action`, `params` |
| `condition` | Branch logic | `check`, `branches` |
| `human` | Ask user for input | `question` |

### Available Tool Actions

| Category | Actions |
|----------|---------|
| **Web** | `web_search`, `web_fetch` |
| **Gmail** | `gmail_search`, `gmail_read`, `gmail_send`, `gmail_create_draft` |
| **Calendar** | `calendar_list_events`, `calendar_create_event`, `calendar_update_event`, `calendar_find_free_time` |
| **Drive** | `drive_search`, `drive_list_folder`, `drive_read_content`, `drive_create_doc`, `drive_append_doc` |
| **Browser** | `browser_navigate`, `browser_click`, `browser_type`, `browser_screenshot`, `browser_extract`, `browser_scroll` |

### List Skills

Ask your AI tool:

> "List all available skills"

Skills are auto-loaded from `systems/<key>/R-routines/skills/`. After editing, tell your AI tool:

> "Reload the config"

---

## Step 8: Connecting Tools & Integrations

### 8a. Telegram Bot

**Step 1:** Open Telegram and message [@BotFather](https://t.me/BotFather)

**Step 2:** Send `/newbot` and follow the prompts to create your bot

**Step 3:** Copy the bot token and add to your `.env`:

```
TELEGRAM_BOT_TOKEN=your_token_here
```

**Step 4:** Start the bot:

```bash
python cli.py bot
```

Or add to `docker-compose.yml` and restart:

```bash
docker compose up -d
```

Now message your bot on Telegram — it routes through the same agent system.

### 8b. Google Workspace (Gmail, Calendar, Drive)

**Step 1:** Go to [Google Cloud Console](https://console.cloud.google.com/)

**Step 2:** Create a new project (or select existing)

**Step 3:** Enable these APIs:
- Gmail API
- Google Calendar API
- Google Drive API

**Step 4:** Create OAuth 2.0 credentials:
- Application type: Desktop app
- Download the JSON file

**Step 5:** Save as `.credentials/credentials.json` in your project root

**Step 6:** Run the authorization flow:

```bash
python cli.py auth google
```

This opens a browser for OAuth consent. After authorizing, tokens are saved automatically.

**13 available tools:**

| Tool | Action |
|------|--------|
| Gmail Search | `gmail_search(query, max_results=5)` |
| Gmail Read | `gmail_read(message_id)` |
| Gmail Send | `gmail_send(to, subject, body)` |
| Gmail Draft | `gmail_create_draft(to, subject, body)` |
| Calendar List | `calendar_list_events(time_min, time_max)` |
| Calendar Create | `calendar_create_event(summary, start, end)` |
| Calendar Update | `calendar_update_event(event_id, **updates)` |
| Calendar Free Time | `calendar_find_free_time(time_min, time_max)` |
| Drive Search | `drive_search(query, max_results=10)` |
| Drive List | `drive_list_folder(folder_id)` |
| Drive Read | `drive_read_content(file_id)` |
| Drive Create Doc | `drive_create_doc(title, content)` |
| Drive Append | `drive_append_doc(file_id, content)` |

Write operations (send, create, update) always require confirmation before executing.

### 8c. Web Search (Brave API)

**Step 1:** Get a Brave Search API key from [brave.com/search/api](https://brave.com/search/api/)

**Step 2:** Add to `.env`:

```
BRAVE_API_KEY=your_key_here
```

**Step 3:** Restart the server. Web search is now available in skills and direct queries:

```yaml
# In a skill:
- id: search
  type: tool
  action: web_search
  params:
    query: "{user_message}"
    count: 5
```

### 8d. Make.com / n8n / Zapier

Connect any automation platform to RealizeOS via the REST API.

**Make.com Setup:**

1. Create a new scenario in Make.com
2. Add an **HTTP** module (Make a request)
3. Configure:
   - **URL:** `http://YOUR_SERVER_IP:8080/api/chat`
   - **Method:** POST
   - **Headers:**
     ```
     Content-Type: application/json
     Authorization: Bearer YOUR_API_KEY
     ```
   - **Body:**
     ```json
     {
       "message": "{{trigger_data}}",
       "system_key": "consulting",
       "user_id": "make-automation"
     }
     ```
4. Connect a trigger (e.g., "New email in Gmail" → summarize → post to Slack)

**n8n Setup:** Same approach — use the HTTP Request node with the same URL, method, headers, and body format.

**Zapier Setup:** Use the "Webhooks by Zapier" action with a POST request to the same endpoint.

### 8e. MCP Servers

MCP (Model Context Protocol) lets you connect external tool servers to RealizeOS.

Add MCP server configuration to your system setup. The system will discover and register all tools exposed by the MCP server, making them available to agents and skills.

### 8f. Inbound Webhooks

External services (GitHub, Stripe, form builders, etc.) can trigger agent actions by posting to your RealizeOS `/api/chat` endpoint. Any system that can send an HTTP POST request can act as a webhook source — just point it at your server and include a message describing the event.

For example, a GitHub webhook could send "New push to main branch: 3 commits by dev-team. Summarize changes and notify." and RealizeOS will route it to the right agent automatically.

> **For developers:** See Step 12 for the full API reference, including request format, authentication headers, and endpoint details.

---

## Step 9: Managing Multiple Ventures

### Create a New Venture

Ask your AI tool:

> "Create a new venture called My SaaS Product"

This creates a new system directory with all FABRIC subdirectories and adds an entry in `realize-os.yaml`.

### List Ventures

Ask your AI tool:

> "List all my ventures"

### Switch Between Ventures

Just mention the venture you want to talk to:

> "Switch to my SaaS system and draft release notes"

The system routes your message to the correct venture automatically.

### Cross-System Context

Enable in `realize-os.yaml`:

```yaml
features:
  cross_system: true
```

When enabled, agents can reference context from other ventures — useful for portfolio operators.

### Delete a Venture

Ask your AI tool:

> "Delete the test venture"

The system will ask for confirmation before removing anything.

---

## Step 10: Daily Workflow

### Morning Routine

```
"What's on my calendar today and what should I prioritize?"
```

The system checks your calendar, reviews pending tasks, and suggests priorities.

### Working Session

```
"Draft a client proposal for the Acme Corp engagement"
```

Skills auto-trigger. The content pipeline handles drafting and review.

### End of Day

```
"Weekly review — summarize what I accomplished and plan tomorrow"
```

The system reviews conversations, logs learnings, and creates tomorrow's action items.

### Weekly Review

```
"Plan my week — review last week's outcomes and set this week's priorities"
```

---

## Step 11: Self-Evolution

The Full edition includes a self-evolution engine that continuously improves your system.

### How It Works

1. **Interaction Tracking** — Every request is logged with metadata (agent used, task type, duration)
2. **Gap Detection** — Finds unhandled patterns and repeated ad-hoc requests
3. **Skill Suggestion** — Auto-generates skill YAML for detected gaps
4. **Prompt Refinement** — Suggests agent prompt improvements based on feedback

### Example

After you manually create competitor analyses 5 times, the system detects the pattern and suggests:

```
Gap detected: "competitor analysis" requested 5 times with no matching skill.
Suggested skill: competitor_analysis.yaml
Approve? [yes/no]
```

All changes require your explicit approval. Nothing is modified automatically.

### Risk-Gated Approval

- Low risk (new skill, prompt tweak) → Simple yes/no
- Medium risk (agent modification) → Shows diff before applying
- High risk (config change) → Requires explicit confirmation with details

---

## Step 12: Customizing & Growing

### LLM Routing

Edit `realize-os.yaml` to customize which models handle which tasks:

```yaml
llm:
  default_model: claude-sonnet
  routing:
    simple: gemini-flash        # Quick lookups — cheapest
    content: claude-sonnet      # Writing and analysis
    complex: claude-opus        # Strategy and planning
    creative: claude-sonnet     # Creative work
    product: claude-sonnet      # Product descriptions
```

**Fallback chain:** Claude → Gemini → OpenAI → Ollama

### Model Overrides (Environment Variables)

```
GEMINI_FLASH_MODEL=gemini-2.5-flash
CLAUDE_SONNET_MODEL=claude-sonnet-4-6-20260217
CLAUDE_OPUS_MODEL=claude-opus-4-6-20260205
```

### Feature Flags

```yaml
features:
  review_pipeline: true    # Auto review pipeline for content
  auto_memory: true        # Log learnings after interactions
  proactive_mode: true     # Proactive suggestions
  cross_system: false      # Share context across ventures
  skills_v2: true          # Enable v2 multi-step skills
```

### Custom Tools

Add tools via MCP servers or extend the tool registry. Available tool categories: Communication, Research, Productivity, Development, Media, Data, Automation, Custom.

### Running Modes

```bash
python cli.py serve                  # API on port 8080
python cli.py serve --port 3000     # Custom port
python cli.py serve --reload        # Auto-reload on changes
docker compose up -d                 # Docker (background)
python cli.py bot                    # Telegram bot
```

---

## Step 13: Troubleshooting

### Docker Issues

**"Docker daemon not running"**

Make sure Docker Desktop is running (check system tray). On Windows, ensure WSL2 is installed:

```powershell
wsl --install
```

Restart your computer after installing WSL2.

**"Port 8080 already in use"**

Another process is using port 8080. Either stop it, or change the port in `.env`:

```
API_PORT=8081
```

Then update your docker-compose or CLI command accordingly.

### API Authentication

**"401 Unauthorized"**

If `REALIZE_API_KEY` is set in `.env`, you must include it in every request:

```bash
-H "Authorization: Bearer YOUR_API_KEY"
```

### LLM Key Issues

**"Invalid API key" or "Authentication failed"**

Check your `.env` file:
- No spaces around the `=` sign
- No quotes around the value
- No trailing spaces or invisible characters
- Key hasn't been revoked

**"Insufficient credits"**

Add credit to your API provider account. Go to console.anthropic.com → Billing → Add at least $5.

**"Rate limit exceeded"**

Wait a minute and try again. Adjust `RATE_LIMIT_PER_MINUTE` in `.env` for production.

### Config Issues

**"System not found"**

Your `system_key` doesn't match any entry in `realize-os.yaml`. Check with:

```bash
curl http://localhost:8080/api/systems
```

**"Config reload failed"**

YAML syntax error. Validate your `realize-os.yaml`:

```bash
python -c "import yaml; yaml.safe_load(open('realize-os.yaml'))"
```

### Output Quality

**"Output sounds generic"**

Your `F-foundations/brand-voice.md` needs more specific rules. Add concrete do/don't rules and paste real writing samples.

**"Wrong agent handles my task"**

Add more keywords to `agent_routing` in `realize-os.yaml`, or force an agent with `agent_key` in the API call.

### Backup & Updates

**Backup your system:**

```bash
cp -r systems/ systems-backup-$(date +%Y%m%d)/
cp realize-os.yaml realize-os.yaml.backup
cp .env .env.backup
```

**Update:**

```bash
git pull origin main
pip install -r requirements.txt
docker compose build && docker compose up -d
```

### Still Stuck?

- **Telegram Builders Group** — active community, fast responses
- **WhatsApp Community** — quick updates and direct support
- **Email** info@realizeos.ai — we reply within 24 hours

Screenshot your error and share it — we've probably seen it before.

---

*Downloaded from [realizeos.com](https://realizeos.com). Part of the Realization ecosystem.*
