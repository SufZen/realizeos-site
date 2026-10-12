import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.11.0–5.14.0 — users.yaml.example, realize_core/security/{users,rbac,venture_scope}.py,
// realize_core/mcp_server/venture_guard.py, docs/PRODUCTION.md.
export const usersRoles: GuideSectionData = {
  id: 'users-and-roles',
  title: 'Users, Roles & Ventures',
  icon: 'Users',
  description: 'Who can see what: the users.yaml file, the five roles, and limiting people to their ventures.',
  readTime: '8 min',
  content: [
    { type: 'heading', text: 'Before you start: turn auth on', level: 2, id: 'auth-on' },
    { type: 'paragraph', text: 'Sign-in and roles only apply when auth is on: set REALIZE_API_KEY, or REALIZE_JWT_ENABLED=true with a REALIZE_JWT_SECRET of 32+ characters. With auth off, the dashboard and API are open and everyone is treated as owner — fine on your own laptop, never on a server.' },

    { type: 'heading', text: 'The users.yaml file', level: 2, id: 'users-yaml' },
    { type: 'paragraph', text: 'People sign in with an email and password listed in users.yaml, in the folder you run RealizeOS from (usually the repo root). Start from the example:' },
    { type: 'code', text: '', code: 'cp users.yaml.example users.yaml', language: 'bash' },
    { type: 'code', text: '', code: 'users:\n  - email: owner@example.com\n    role: owner\n    password_hash: $2b$12$...\n\n  - email: pm@client.example\n    role: operator\n    ventures: [tower-b]        # optional: only this venture\n    password_hash: $2b$12$...\n\n  - email: investor-relations@example.com\n    role: viewer\n    password_hash: $2b$12$...', language: 'yaml', title: 'users.yaml' },
    { type: 'heading', text: 'Create a password hash', level: 3, id: 'hash' },
    { type: 'code', text: '', code: 'python scripts/hash_password.py\n# Password: ********\n# Confirm:  ********\n# $2b$12$...   ← paste this into password_hash', language: 'bash' },
    { type: 'paragraph', text: 'Run it on the host, from the repo root (the scripts folder is not inside the Docker image). It warns if the password is shorter than 8 characters.' },
    { type: 'list', text: '', items: [
      'users.yaml is gitignored. Never commit real password hashes.',
      'Changes apply on the next request — no restart. Remove a user and their sessions and connector tokens stop working at once; change a role and it applies immediately.',
      'Entries with a missing email or hash, an unknown role, or an empty ventures list are skipped (fail closed). Emails are matched lowercase. A missing role means viewer.',
      'No users.yaml? RealizeOS falls back to a single owner from REALIZE_ADMIN_USER and REALIZE_ADMIN_PASSWORD_HASH.',
      'There is no user-management screen: you manage people by editing this file.',
    ]},
    { type: 'callout', text: 'Running in Docker? The compose files don\'t mount users.yaml by default. Add a volume such as ./users.yaml:/app/users.yaml:ro to the RealizeOS service.', calloutType: 'warning' },

    { type: 'heading', text: 'The five roles', level: 2, id: 'roles' },
    { type: 'table', text: '', headers: ['Role', 'Read', 'Chat & run skills', 'Edit venture files', 'Approve held actions', 'Change settings, integrations, ventures'], rows: [
      ['owner', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes (and admin MCP tools, if enabled)'],
      ['admin', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['operator', 'Yes', 'Yes', 'Yes', 'Yes', 'No'],
      ['user', 'Yes', 'Yes', 'Yes', 'No', 'No'],
      ['viewer', 'Yes', 'No', 'No', 'No', 'No'],
    ]},
    { type: 'paragraph', text: 'Only owner and admin can chat on behalf of another user or read someone else\'s conversations. Everyone else always chats as themselves. When a role doesn\'t allow something, the API answers 403 with the permission that was missing.' },

    { type: 'heading', text: 'Limit people to their ventures', level: 2, id: 'ventures' },
    { type: 'paragraph', text: 'Add ventures: [key, ...] to a user to limit them to those ventures. Leave it out for access to every venture. A limited user:' },
    { type: 'list', text: '', items: [
      'Sees only their ventures, in the dashboard (the venture switcher is locked when there is one), the REST API and MCP.',
      'Can\'t open areas shared by every venture — settings, security, integrations, storage, extensions, tools, trust — not even to read them. Those pages are hidden.',
      'Can\'t create or delete ventures, even with a role that normally could.',
      'Sees and decides only approvals in their ventures.',
    ]},

    { type: 'heading', text: 'How this applies to agents and integrations', level: 2, id: 'agents' },
    { type: 'list', text: '', items: [
      'Claude.ai / Claude Desktop connectors: the connector acts as the person who signed in, with their role and ventures, checked on every request.',
      'Over MCP, tools that work inside a venture (chat, history, KB search, skills, approvals) must name an allowed venture. Tools that span every venture are refused for limited users.',
      'API keys are service identities with full access. A JWT can be narrowed with venture:<key> scopes.',
      'Every sign-in and denied action is written to the audit log (GET /api/security/audit).',
    ]},
    { type: 'heading', text: 'A setup for a project team', level: 3, id: 'example' },
    { type: 'table', text: '', headers: ['Person', 'Role', 'Ventures'], rows: [
      ['Managing partner', 'owner', 'all'],
      ['Office manager who runs the system', 'admin', 'all'],
      ['Project manager, Tower B', 'operator', '[tower-b]'],
      ['Site engineer, Tower B', 'user', '[tower-b]'],
      ['Investor liaison', 'viewer', '[tower-b]'],
    ]},
  ],
};
