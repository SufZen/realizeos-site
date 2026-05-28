import type { GuideSectionData } from '../guideTypes';

export const skillAuthoring: GuideSectionData = {
  id: 'skill-authoring',
  title: 'Skill Authoring',
  icon: 'Wand2',
  description: 'Build v1 pipelines and v2 multi-step skills with tools and human gates.',
  readTime: '10 min',
  content: [
    { type: 'heading', text: 'What Are Skills?', level: 2, id: 'what-are-skills' },
    { type: 'paragraph', text: 'Skills are reusable, trigger-based workflows that chain agents, tools, conditions, and human approval gates. They come in two versions: v1 (simple pipelines) and v2 (multi-step with full orchestration).' },
    { type: 'heading', text: 'Pre-Built Skills', level: 2, id: 'pre-built' },
    { type: 'table', text: '', headers: ['Skill', 'Trigger Examples'], rows: [
      ['Content Pipeline', '"write a blog post", "create content"'],
      ['Research Workflow', '"research", "analyze", "compare"'],
      ['Email Campaign', '"email campaign", "newsletter"'],
      ['Social Media', '"linkedin post", "write a post"'],
      ['Client Proposal', '"proposal", "scope of work"'],
      ['Weekly Review', '"weekly review", "plan my week"'],
    ]},
    { type: 'heading', text: 'v1: Simple Pipeline', level: 2, id: 'v1-skills' },
    { type: 'code', text: '', code: 'name: content_pipeline\ntriggers:\n  - "write a post"\n  - "create content"\n  - "draft an article"\ntask_type: content\npipeline:\n  - writer\n  - reviewer', language: 'yaml', title: 'v1 skill definition' },
    { type: 'heading', text: 'v2: Multi-Step with Tools', level: 2, id: 'v2-skills' },
    { type: 'code', text: '', code: 'name: competitor_analysis\nversion: "2.0"\ndescription: "Research competitors and produce analysis"\ntriggers:\n  - "analyze competitor"\n  - "competitive analysis"\ntask_type: research\nsteps:\n  - id: search\n    type: tool\n    action: web_search\n    label: "Search for competitor info"\n    params:\n      query: "{user_message} site:linkedin.com OR site:crunchbase.com"\n\n  - id: analyze\n    type: agent\n    agent: analyst\n    label: "Analyze findings"\n    inject_context: [search]\n\n  - id: confirm\n    type: human\n    question: "Should I create a detailed report?"\n\n  - id: report\n    type: agent\n    agent: writer\n    label: "Write the report"\n    inject_context: [search, analyze]', language: 'yaml', title: 'v2 skill definition' },
    { type: 'heading', text: 'Step Types', level: 2, id: 'step-types' },
    { type: 'table', text: '', headers: ['Type', 'Purpose', 'Key Fields'], rows: [
      ['agent', 'Call an LLM agent', 'agent, inject_context, prompt'],
      ['tool', 'Execute a tool action', 'action, params'],
      ['condition', 'Branch logic', 'check, branches'],
      ['human', 'Ask user for input', 'question'],
    ]},
    { type: 'heading', text: 'Available Tool Actions', level: 2, id: 'tool-actions' },
    { type: 'table', text: '', headers: ['Category', 'Actions'], rows: [
      ['Web', 'web_search, web_fetch'],
      ['Gmail', 'gmail_search, gmail_read, gmail_send, gmail_create_draft'],
      ['Calendar', 'calendar_list_events, calendar_create_event, calendar_update_event, calendar_find_free_time'],
      ['Drive', 'drive_search, drive_list_folder, drive_read_content, drive_create_doc, drive_append_doc'],
      ['Browser', 'browser_navigate, browser_click, browser_type, browser_screenshot, browser_extract'],
    ]},
  ],
};
