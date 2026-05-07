# n8n Session Prompt: Venture Intelligence Engine (V5) — Backend Workflows

## Context

The RealizeOS V5 **Venture Intelligence Engine (VIE)** is a multi-agent backend pipeline designed to help users build their custom "FABRIC" (Foundations, Agents, Brain, Routines, Insights, Creations) package.

Users upload documents or provide URLs on the React frontend. The frontend extracts raw text and sends it to n8n webhooks.

**What's needed:** Four n8n webhook workflows on `n8n.realization.co.il` to power the V5 open-source transition:

1. **URL text extraction**
2. **Multi-Agent Document Analysis** (Extractor → Analyzer → Architect)
3. **Conversational gap-fill**
4. **Lead Automation & FABRIC Delivery** (Show, Don't Tell personalization)

There is already a working n8n webhook instance: `n8n.realization.co.il`.

---

## Provider Configuration

> **Provider-Agnostic Architecture:** All workflows use the **OpenAI Chat Completions API format** (`/v1/chat/completions`) as a universal standard. This means the **same code** works for any provider by changing only 3 values in the Config block at the top of each Code node.

| Provider | Base URL | Auth Header |
|----------|----------|-------------|
| **Google Gemini** | `https://generativelanguage.googleapis.com/v1beta/openai` | `Bearer <API_KEY>` |
| **OpenAI** | `https://api.openai.com/v1` | `Bearer <API_KEY>` |
| **xAI (Grok)** | `https://api.x.ai/v1` | `Bearer <API_KEY>` |
| **Groq** | `https://api.groq.com/openai/v1` | `Bearer <API_KEY>` |
| **Together AI** | `https://api.together.xyz/v1` | `Bearer <API_KEY>` |

### How to Switch Providers

In each workflow's **"LLM Config & Prompt Builder"** Code node, edit these 3 lines:

```javascript
const LLM_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai';
const LLM_API_KEY  = '<YOUR_API_KEY>';
const LLM_MODEL    = 'gemini-3.1-pro-preview';
```

No other changes required — the HTTP Request and Parse nodes are fully dynamic.

---

## Workflow 1: `POST /webhook/extract-url`

### Purpose
The client sends a URL, this workflow fetches the page and extracts its text content (bypassing CORS restrictions on the client).

### Workflow Nodes
1. **Webhook Trigger** — `POST /webhook/extract-url`, response mode: "Last Node"
2. **HTTP Request** — Fetch URL (`GET {{ $json.url }}`)
3. **HTML Extract** — Strip `<script>`, `<style>`, `<nav>`, `<footer>` and extract `textContent`.
4. **Respond to Webhook** — Return JSON with `text`, `title`, and `wordCount`.

---

## Workflow 2: `POST /webhook/venture-analyze` (Multi-Agent Pipeline)

### Purpose
Replaces the old monolithic prompt with a 3-step agent pipeline to reduce hallucination and expand capabilities from just "Foundations" to "FABRIC Packages".

### Request Body
```json
{
  "documents": [{ "name": "pitch.pdf", "type": "pdf", "text": "..." }],
  "existingFields": {}
}
```

### The Pipeline

#### Step 2A: The Extractor Agent
**Role**: Read the raw text and pull exact quotes/chunks relevant to Identity, Business, and Voice.
**System Prompt**: 
> You are the Extractor. Read these documents and pull EXACT verbatim quotes that hint at the founder's strengths, gaps, target audience, tone of voice, and weekly workflows. Do not summarize. Just extract the raw data chunks categorized by theme.

#### Step 2B: The Analyzer Agent
**Role**: Take the extracted chunks from 2A and structure them into the exact 22 VIE fields.
**System Prompt**:
> You are the Analyzer. Take these extracted quotes and map them to the 22 RealizeOS venture profile fields (nameRole, strengths, gaps, commPrefs, personalValues, antiPatterns, bizNameTagline, mission, audience, values, uvp, positioning, offerings, brandPersonality, tone, vocabulary, formatting, dosDonts, channelAdjustments, goodExample, badExample, workflows).
> Provide a confidence score (HIGH/MEDIUM/LOW/NOT_FOUND) and a followUpQuestion for missing/low fields.

#### Step 2C: The Architect Agent
**Role**: Look at the "gaps" and "workflows" fields from 2B and design custom V5 components.
**System Prompt**:
> You are the FABRIC Architect. Based on the user's identified "gaps" (what they struggle with) and "workflows" (their weekly tasks):
> 1. Propose 2 custom AI Agents (`A-agents`) that would solve their gaps.
> 2. Propose 2 Automated Routines (`R-routines`) that would streamline their workflows.
> Return this as JSON alongside the 22 structured fields.

### Expected Response Format
Return the 22 fields from the Analyzer + the proposed implementations from the Architect:
```json
{
  "fields": { "nameRole": { "value": "...", "confidence": "HIGH", "followUpQuestion": null } },
  "architectProposals": {
    "agents": [
      { "name": "Content Strategist Agent", "description": "Addresses your gap in content creation..." }
    ],
    "routines": [
      { "name": "Weekly Newsletter Sync", "trigger": "Every Friday", "action": "Drafts newsletter..." }
    ]
  }
}
```

### n8n Implementation (3 nodes)

1. **LLM Config & Prompt Builder** (Code node) — Defines provider config + builds OpenAI-format request body
2. **Call LLM API** (HTTP Request node) — `POST {{ $json.llmBaseUrl }}/chat/completions` with `Authorization: Bearer {{ $json.llmApiKey }}`
3. **Parse and Validate Response** (Code node) — Extracts `choices[0].message.content` and validates JSON

---

## Workflow 3: `POST /webhook/venture-conversation`

### Purpose
Powers the conversational gap-fill chat. 

### Nodes & Logic
1. **Webhook Trigger**
2. **LLM Config & Prompt Builder** (Code node):
> You are the RealizeOS consultant. We are missing fields: {missingFields}.
> Ask warm, grouped follow-up questions to extract these fields from the user. When the user responds, extract the values and update the JSON state. Do not act like a robotic form.
3. **Call LLM API** (HTTP Request node) — Same dynamic URL/auth pattern as Workflow 2
4. **Parse and Validate Response** (Code node) — Same OpenAI response parsing
5. **Respond to Webhook**:
Return `{ "reply": "...", "fieldUpdates": {...}, "fieldsUpdated": [...] }`

---

## Workflow 4: `POST /webhook/new-lead` (The "Show, Don't Tell" Automation)

### Purpose
When the user finishes the VIE wizard and enters their email, this workflow completely automates the creation of their custom RealizeOS FABRIC package and sends a hyper-personalized email.

### Request Body
```json
{
  "email": "lead@example.com",
  "name": "Sara Cohen",
  "profile": { /* The final 22 fields */ },
  "architectProposals": { /* The agents and routines from Workflow 2C */ }
}
```

### Workflow Nodes
1. **Webhook Trigger** — `POST /webhook/new-lead`, response immediately (Return 200 OK async).
2. **Data Transformation (Code Node)** — Format the 22 fields into Markdown files (`F-foundations/identity.md`, `F-foundations/brand-voice.md`, etc.).
3. **LLM Agent (The Creator)** — Generate `C-creations`:
   > Write a sample internal company memo (or blog post) demonstrating the exact Tone of Voice, vocabulary, and formatting rules defined in the provided profile. This proves we understand their brand.
4. **Archive/Zip Node** — Package the generated markdown files (`F-foundations`, `A-agents`, `R-routines`, `C-creations`) into `fabric-starter-kit.zip`.
5. **LLM Agent (The Communicator)** — Draft the email body:
   > Draft a welcome email to the prospect ({name}). 
   > CRITICAL INSTRUCTION: You MUST write this email using the prospect's OWN Tone of Voice, Vocabulary, and Formatting rules defined in their profile!
   > Include a link to download their attached `fabric-starter-kit.zip`.
   > Include instructions to install RealizeOS V5: `npx @realize-os/cli init`
   > Include a CTA to book an Expert Setup session: `https://tidycal.com/team/realizeos/setup`
6. **Send Email (SMTP/SendGrid)** — Send the crafted email with the Zip attached.
7. **CRM Sync (HTTP Request)** — POST the structured lead data to the internal Realization CRM.

### Deliverables
Instead of generic sales emails, the prospect receives their actual custom infrastructure (`.zip`), written in their actual brand voice, demonstrating immediate value and pushing them towards the open-source install or the paid Setup session.
