# RealizeOS Lite — Post-Setup Guide

> Your Obsidian vault is now an AI operations center.
> This guide covers everything after setup — from your first conversation to building custom workflows.

---

## Step 1: Welcome & What You Built

Your RealizeOS Lite system is an **Obsidian vault** powered by **Claude Code**. When you start Claude Code in your vault directory, it reads your `CLAUDE.md` file and becomes a team of specialized AI agents — each with deep knowledge of your brand, your voice, and your business.

### How It Works

```
You speak naturally → Claude reads CLAUDE.md → Picks the right agent
→ Loads your brand + knowledge → Responds in your voice
```

### Quick Health Check

Open your terminal in the vault directory and run:

```bash
claude
```

Then ask:

```
What do you know about my business?
```

**Expected:** A response that references your brand identity, business name, audience, and values — not generic AI filler.

If the response is generic, your `F-foundations/brand-identity.md` needs more detail.

---

## Step 2: Understanding Your AI Team

### The 4 Default Agents

| Agent | Role | Best For |
|-------|------|----------|
| **Orchestrator** | Strategic planning, coordination | "Help me plan...", "Prioritize my..." |
| **Writer** | Content creation, drafting | "Write a post...", "Draft an email..." |
| **Reviewer** | Quality control, brand compliance | "Review this...", "Check the tone..." |
| **Analyst** | Research, data analysis | "Analyze...", "Research competitors..." |

### How Routing Works

Claude reads the `routing` config in `realize-os.yaml` and picks the right agent based on your message:

- **Content tasks** (write, draft, post) → Writer → Reviewer pipeline
- **Strategy tasks** (plan, prioritize, advise) → Analyst → Orchestrator
- **Research tasks** (analyze, compare, evaluate) → Analyst
- **General tasks** (help, think) → Orchestrator

### Talking to a Specific Agent

You can direct your message to any agent:

```
Switch to the Analyst for this — analyze the competitive landscape for my industry.
```

### Customizing Agents

Each agent is defined as a `.md` file in `A-agents/`. Open any file and edit:

- **Role description** — What this agent does
- **Tone** — How it communicates
- **Constraints** — What it should never do
- **Examples** — Sample inputs and ideal outputs

### Adding New Agents

1. Create a new `.md` file in `A-agents/` (e.g., `client-comms.md`)
2. Define the role, tone, and constraints
3. Add routing keywords in `realize-os.yaml` under `agent_routing`
4. The agent is auto-discovered on next conversation start

---

## Step 3: Your Operations System by Business Type

RealizeOS ships with 8 pre-configured operations templates. Your system was set up with one of these. Here's what each template is optimized for:

### Consulting

**Best for:** Solo consultants, advisory firms

**Example tasks to try:**
- "Draft a client proposal for a 3-month strategy engagement"
- "Research competitors in the management consulting space"
- "Write a LinkedIn post about why AI agents should work as a team"
- "Create a quarterly review template for my advisory clients"
- "Draft an onboarding email sequence for new clients"

**Agent focus:** Analyst handles strategy and research, Writer creates proposals and thought leadership, Reviewer ensures brand consistency.

### Agency

**Best for:** Creative and marketing agencies

**Example tasks to try:**
- "Run this content brief through the pipeline"
- "Write 5 social media post variations for this campaign"
- "Audit the brand voice consistency on our latest copy"
- "Create a content calendar for next month"
- "Draft campaign concepts for a product launch"

**Agent focus:** Writer handles creative copy, Analyst manages audience and SEO insights, Reviewer enforces brand guidelines.

### Portfolio

**Best for:** Multi-venture operators, holding companies

**Example tasks to try:**
- "Give me a cross-venture status update"
- "Compare performance metrics across my businesses"
- "Draft investor update covering all ventures"
- "Prioritize tasks across my portfolio for this week"

**Agent focus:** Orchestrator coordinates across ventures, Analyst tracks cross-venture metrics.

### SaaS

**Best for:** SaaS founders, product teams

**Example tasks to try:**
- "Write a feature spec for user onboarding improvements"
- "Analyze user feedback from last month's surveys"
- "Draft release notes for v2.1"
- "Create a competitive analysis of the top 3 competitors"
- "Write documentation for our new API endpoint"

**Agent focus:** Writer handles specs and docs, Analyst processes user feedback and market data.

### E-Commerce

**Best for:** Online stores, D2C brands

**Example tasks to try:**
- "Write 20 product descriptions for our new collection"
- "Draft abandoned cart email sequences"
- "Analyze sales data and suggest pricing adjustments"
- "Create seasonal campaign copy for summer sale"
- "Write SEO-optimized category page descriptions"

**Agent focus:** Writer produces high-volume product copy, Analyst handles sales and conversion data.

### Accounting

**Best for:** Accountants, bookkeepers, financial advisors

**Example tasks to try:**
- "Draft a client communication about upcoming tax deadlines"
- "Write a report summary for the quarterly review"
- "Create an FAQ document for new clients"
- "Draft a professional letter regarding billing changes"

**Agent focus:** Writer handles professional communications, Analyst manages financial report summaries.

### Coaching

**Best for:** Coaches, course creators, trainers

**Example tasks to try:**
- "Create session notes template for client meetings"
- "Draft program materials for my 8-week coaching course"
- "Write a LinkedIn post about a coaching methodology"
- "Create intake questionnaire for new coaching clients"
- "Draft follow-up emails after coaching sessions"

**Agent focus:** Writer creates program content, Orchestrator manages session workflows.

### Freelance

**Best for:** Freelance professionals of all types

**Example tasks to try:**
- "Draft a project proposal for the website redesign"
- "Write a scope of work document"
- "Create an invoice cover letter for this month"
- "Draft a project brief for the new client"
- "Write a case study based on my last project"

**Agent focus:** Writer handles proposals and briefs, Orchestrator manages project coordination.

---

## Step 4: Working with Skills

### What Are Skills?

Skills are **YAML-defined workflows** that automate multi-step processes. Instead of giving instructions step by step, you trigger a skill with a natural phrase and it runs the full pipeline.

### 6 Pre-Built Skills

| Skill | Trigger Examples |
|-------|-----------------|
| **Content Pipeline** | "write a blog post", "create content" |
| **Research Workflow** | "research", "analyze", "compare" |
| **Email Campaign** | "email campaign", "newsletter" |
| **Social Media** | "linkedin post", "write a post" |
| **Client Proposal** | "proposal", "scope of work" |
| **Weekly Review** | "weekly review", "plan my week" |

### How to Trigger

Just say the trigger phrase naturally. The system auto-detects skills from your message:

```
Write a blog post about AI operations for consulting firms.
```

This triggers the **Content Pipeline** skill:
1. **Writer** creates the draft
2. **Reviewer** evaluates against your brand voice
3. If it passes → delivered. If not → Writer iterates with feedback.

### Creating Your First Custom Skill

Create a new file at `R-routines/skills/my-skill.yaml`:

```yaml
name: meeting_prep
triggers:
  - "prepare for meeting"
  - "meeting prep"
  - "get ready for meeting"
task_type: strategy
pipeline:
  - analyst
  - writer
  - orchestrator
```

This skill will:
1. Have the **Analyst** research the meeting context
2. Have the **Writer** draft talking points
3. Have the **Orchestrator** create an action plan

Skills are auto-discovered — no restart needed.

---

## Step 5: Your First Week Roadmap

### Day 1 — Foundations

- Send 5-10 test messages to check your brand voice
- Refine rules in `F-foundations/brand-voice.md` based on what you see
- Add 3-5 anti-patterns (what your AI should NEVER say or do)
- Complete your `F-foundations/brand-identity.md` with specific details

**Key tip:** Anti-patterns have outsized impact. "Never use exclamation marks" or "Never start with 'In today's fast-paced world'" dramatically improves output.

### Day 2-3 — Knowledge

- Add domain knowledge to `B-brain/` — industry data, methodologies, past work
- Test that agents reference this knowledge in responses
- Drop in any existing documents you want the AI to know about

### Day 4-5 — Workflows

- Create your first custom YAML skill (content pipeline is a great start)
- Test it with a real task from your actual workflow
- Iterate on agent prompts — small changes make big differences

### Week 2+ — Expansion

- Add specialized agents for roles you need
- Build skill workflows for recurring tasks
- Activate a second venture if you manage multiple businesses
- Consider upgrading to Full edition for API access and integrations

---

## Step 6: Customizing & Growing

### Add Knowledge

Drop `.md` files into `B-brain/`:

```
B-brain/
  industry-trends.md
  competitor-analysis.md
  client-personas.md
  pricing-strategy.md
```

### Refine Brand Voice

Edit `F-foundations/brand-voice.md` with specific rules:

```markdown
## Voice Rules
- Use short paragraphs (2-3 sentences max)
- Start with data or a specific observation, not a generic claim
- No exclamation marks
- Never use "synergy", "leverage", or "game-changer"
- Write at a 10th-grade reading level
```

### Feature Flags

Edit `realize-os.yaml` to toggle features:

```yaml
features:
  review_pipeline: true    # Auto-route content through Reviewer
  auto_memory: true        # Log learnings to I-insights/
  proactive_mode: true     # Suggest next steps, ask clarifying questions
  cross_system: false      # Share context across ventures
```

### Multi-Venture

Your Lite license includes 3 venture slots. Activate a new venture:

1. Fill in `systems/my-business-2/F-foundations/` with identity and voice files
2. Add the system entry in `realize-os.yaml`
3. Tell the agent: "Switch to my-business-2"

Or simply say: **"Create a new venture"** and the agent will walk you through it.

### When to Consider Full Edition

Upgrade to Full when you need:
- REST API (connect from any app, not just Claude Code)
- Always-on Docker deployment (24/7, not just when terminal is open)
- Multi-LLM routing (Claude + Gemini + OpenAI, auto-route by task complexity)
- Google Workspace integration (Gmail, Calendar, Drive — 13 tools)
- Telegram bot, webhooks, Make.com/n8n/Zapier connections
- Self-evolution engine (auto-detects gaps and suggests improvements)

---

## Step 7: Troubleshooting

### Claude Code Doesn't Read CLAUDE.md

Make sure you're running `claude` from the correct directory — the one containing the `CLAUDE.md` file:

```bash
cd /path/to/your/realize-lite-vault
ls CLAUDE.md    # Should show the file
claude          # Now start Claude Code
```

### Output Sounds Generic

Your `F-foundations/brand-voice.md` is too vague. Replace generic rules like "be professional" with specific ones:

- "Use short paragraphs (2-3 sentences)"
- "Start with data or a specific observation"
- "No exclamation marks"
- "Never use the word 'synergy'"
- Paste a real writing sample as a "Good Example"

### Skill Doesn't Trigger

- Check YAML syntax (indentation matters — use spaces, not tabs)
- Verify the `triggers` array contains phrases that match your message
- Test with an exact trigger phrase first
- Use a YAML validator if unsure about formatting

### Obsidian Shows Empty Vault

You opened the wrong folder. Close the vault, then re-open by selecting the folder that *contains* the FABRIC subfolders (`A-agents/`, `B-brain/`, etc.). If you unzipped into a nested folder, look one level deeper.

### Agents Respond Generically

- Check that `A-agents/` contains detailed agent definitions, not just "handles content"
- Add more context to `B-brain/` — the more domain knowledge, the better
- Make sure `F-foundations/brand-identity.md` has specific business details

### "claude: command not found"

Node.js isn't installed or isn't in your PATH. Close and reopen your terminal after installing Node.js:
- **macOS:** `brew install node`
- **Windows:** Download from nodejs.org — check "Add to PATH" during install

### Still Stuck?

- **Telegram Builders Group** — active community, fast responses
- **WhatsApp Community** — quick updates and direct support
- **Email** info@realizeos.ai — we reply within 24 hours

Screenshot your error and share it — we've probably seen it before.

---

*Downloaded from [realizeos.com](https://realizeos.com). Part of the Realization ecosystem.*
