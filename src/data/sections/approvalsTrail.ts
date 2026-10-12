import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.9.0–5.14.0 — realize_core/governance/{trust_ladder,tool_gate,gates}.py,
// realize_api/routes/approvals.py, docs/configuration.md, dashboard Approvals page and trail panel.
export const approvalsTrail: GuideSectionData = {
  id: 'approvals-and-trail',
  title: 'Approvals & the Trail',
  icon: 'ShieldCheck',
  description: 'What waits for a person, how to approve it, and how every answer shows where it came from.',
  readTime: '10 min',
  content: [
    { type: 'heading', text: 'The idea', level: 2, id: 'idea' },
    { type: 'paragraph', text: 'Agents can read freely. When an agent wants to write — send an email, add rows to a sheet, create a task — the action can be held until a person approves it. Once approved, it runs exactly once and reports back to the conversation. Every answer can also show which documents it used and which tools it ran.' },

    { type: 'heading', text: 'Turn it on', level: 2, id: 'enable' },
    { type: 'code', text: '', code: 'features:\n  agent_tools: true     # agents use tools while they answer\n  enforce_gates: true   # hold gated actions for approval; approving runs them\n  cite_sources: true    # answers cite their sources as [S1], [S2] ...', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'paragraph', text: 'The sample config in realize_lite/realize-os.yaml has all three on. If a flag is missing from your realize-os.yaml, it is off. enforce_gates is read at startup, so restart after changing it. Without enforce_gates, agents are offered read-only tools only.' },
    { type: 'callout', text: 'Agents use tools while answering only on models with a native tool API (Claude). With other providers, chat still works but without tools.', calloutType: 'info' },

    { type: 'heading', text: 'What needs approval', level: 2, id: 'what-needs-approval' },
    { type: 'paragraph', text: 'A trust ladder decides, by action type and trust level (1–5, default 3). At the default level:' },
    { type: 'table', text: '', headers: ['Action type', 'Examples', 'Level 3'], rows: [
      ['send_email', 'gmail_send, gmail_reply, gmail_forward, gmail_create_draft', 'Approve'],
      ['data_write', 'sheets_append, sheets_create, drive_create_doc, drive_append_doc, drive_move, clickup_create_task, clickup_update_task_status', 'Approve'],
      ['drive_upload', 'drive_upload', 'Approve'],
      ['publish_content', 'drive_set_permissions', 'Approve'],
      ['financial_action, phone_call, social_post', '—', 'Approve'],
      ['unknown_write', 'Any write tool not in the map (including external MCP tools)', 'Approve'],
      ['create_event', 'calendar_create_event, calendar_update_event', 'Automatic'],
      ['Reads', 'gmail_search, drive_read_content, sheets_read, clickup_list_tasks, ...', 'Automatic'],
    ]},
    { type: 'code', text: '', code: 'trust:\n  level: 3          # 1 = most cautious, 5 = most automatic\n  actions:          # optional per-action overrides\n    send_email: {1: block, 2: approve, 3: approve, 4: auto, 5: auto}', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'paragraph', text: 'You can also change the level with PUT /api/trust/level and see the full matrix at GET /api/trust. Restart after changing it, so the gate picks up the new level. External MCP tools count as writes unless you list them in read_only_tools for that server.' },

    { type: 'heading', text: 'How a held action works', level: 2, id: 'lifecycle' },
    { type: 'list', text: '', ordered: true, items: [
      'The agent asks to run a write tool. The gate holds it and creates an approval request. The agent tells you it is waiting.',
      'A person with approval rights (owner, admin or operator) approves or rejects it — in the dashboard, through the API, or from a connected agent over MCP.',
      'On approval, the action runs once. The result is recorded and reported back. On rejection, nothing runs.',
      'Requests expire: held tool actions after 60 minutes, questions from a skill after 24 hours. Expired requests can\'t be approved or run.',
    ]},
    { type: 'callout', text: 'Fail closed: if the gate hits an error, or the approval can\'t be recorded, writes are blocked and reads keep working. An action that started but whose outcome is unknown stays marked "claimed" and is never retried automatically.', calloutType: 'info' },
    { type: 'paragraph', text: 'Each decision records who decided, when, an optional note, and the channel: dashboard, api or mcp.' },

    { type: 'heading', text: 'Approve in the dashboard', level: 2, id: 'dashboard' },
    { type: 'paragraph', text: 'Open Approvals (under Monitor in the sidebar, /approvals). The Pending tab shows each request with its expiry time and an optional note field. Held actions have an "Approve & run" button; questions from a skill have "Yes / send note" and "No". The History tab shows past decisions. In chat, a held tool appears in the trail as "waiting for approval", linked to the Approvals page.' },

    { type: 'heading', text: 'Approve through the API', level: 2, id: 'api' },
    { type: 'table', text: '', headers: ['Method', 'Path', 'What it does'], rows: [
      ['GET', '/api/approvals?venture_key=&status=pending', 'List requests (status= empty returns all)'],
      ['POST', '/api/approvals/{approval_id}/approve', 'Approve; a held action runs now, once'],
      ['POST', '/api/approvals/{approval_id}/reject', 'Reject; nothing runs'],
    ]},
    { type: 'code', text: '', code: 'curl -X POST https://realizeos.example.com/api/approvals/<approval_id>/approve \\\n  -H "Authorization: Bearer <jwt or API key>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"decision_note": "Checked against milestone 4"}\'', language: 'bash' },

    { type: 'heading', text: 'Approve from a connected agent (MCP)', level: 2, id: 'mcp' },
    { type: 'table', text: '', headers: ['Tool', 'Parameters'], rows: [
      ['list_approvals', 'venture_key (optional), status (default "pending")'],
      ['approve_request', 'approval_id (required), decision_note (optional)'],
      ['reject_request', 'approval_id (required), decision_note (optional)'],
    ]},
    { type: 'paragraph', text: 'The result says whether the action ran and succeeded. Parameters and tool output are not echoed back. A user limited to some ventures can only see and decide approvals in those ventures.' },

    { type: 'heading', text: 'The trail: "What I used"', level: 2, id: 'trail' },
    { type: 'paragraph', text: 'Under each answer in Chat, the "What I used" panel lists the knowledge-base sources the answer drew on, numbered [S1], [S2] ..., with title and path, and the tools it called in order, each with its status: running, done (with time), failed (with the error), or waiting for approval. The trail is stored with the conversation, shown again in history, deleted with it, and never sent back to a model.' },
    { type: 'heading', text: 'Citations', level: 3, id: 'citations' },
    { type: 'paragraph', text: 'With features.cite_sources on, the model is asked to put the source marker right after each fact or figure it takes from a source, and not to cite sources it did not use. The dashboard turns markers into footnotes. Citations are requested on the dashboard, API and MCP channels.' },
    { type: 'heading', text: 'Read the trail through the API', level: 3, id: 'trail-api' },
    { type: 'list', text: '', items: [
      'POST /api/chat returns trail: { sources: [{ id, title, path }], steps: [...] } with each answer.',
      'POST /api/chat/stream sends source, tool_call, tool_result, approval_requested, text and final events as they happen.',
      'GET /api/conversations/{system_key}/{user_id}?limit=50 returns the history with the trail on each assistant message.',
      'Over MCP, realize_chat returns a short trail summary: sources and which tools ran, without their inputs or outputs.',
    ]},
    { type: 'callout', text: 'Citations make answers checkable; they don\'t make them right. RealizeOS prepares the work and shows its sources. A person decides — especially on money, contracts and anything that needs a professional\'s sign-off.', calloutType: 'tip' },
  ],
};
