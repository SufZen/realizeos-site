/*
 * VIE Provider-Agnostic Workflow Fix Script
 * 
 * Run this in the n8n browser console (F12 → Console) while logged in.
 * This will update BOTH VIE workflows (Analyze + Conversation) to use
 * the OpenAI-compatible format with Gemini as the configured provider.
 *
 * USAGE: Copy the entire contents of this file and paste into the n8n console.
 */

(async () => {
  console.log('🔧 Starting VIE Workflow Fix...');
  
  // ── Step 1: Fetch all workflows ──
  const listRes = await fetch('/rest/workflows', { credentials: 'include' });
  const listData = await listRes.json();
  const workflows = listData.data || listData;
  
  console.log(`Found ${workflows.length} workflows total`);
  
  // ── Step 2: Find VIE workflows ──
  const analyzeWf = workflows.find(w => w.name && (w.name.includes('Analyze') || w.name.includes('analyze')));
  const conversationWf = workflows.find(w => w.name && (w.name.includes('Conversation') || w.name.includes('conversation')));
  
  if (!analyzeWf) { console.error('❌ Analyze workflow not found!'); return; }
  if (!conversationWf) { console.error('❌ Conversation workflow not found!'); return; }
  
  console.log(`📋 Analyze workflow: "${analyzeWf.name}" (ID: ${analyzeWf.id})`);
  console.log(`📋 Conversation workflow: "${conversationWf.name}" (ID: ${conversationWf.id})`);
  
  // ── Step 3: Fetch full workflow details ──
  const analyzeDetail = await (await fetch(`/rest/workflows/${analyzeWf.id}`, { credentials: 'include' })).json();
  const conversationDetail = await (await fetch(`/rest/workflows/${conversationWf.id}`, { credentials: 'include' })).json();
  
  const analyzeFull = analyzeDetail.data || analyzeDetail;
  const conversationFull = conversationDetail.data || conversationDetail;
  
  // ═══════════════════════════════════════════════════════════════
  // ANALYZE WORKFLOW — Node Code
  // ═══════════════════════════════════════════════════════════════
  
  const ANALYZE_PROMPT_CODE = `// ═══════ PROVIDER CONFIG — EDIT THESE 3 LINES TO SWITCH PROVIDERS ═══════
const LLM_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai';
const LLM_API_KEY  = 'REDACTED_KEY_ROTATED';
const LLM_MODEL    = 'gemini-3.1-pro-preview';
// ═════════════════════════════════════════════════════════════════════════

const input = $input.first().json;
const docs = input.body?.documents || [];
const existingFields = input.body?.existingFields || {};
const docTexts = docs.map(d => \`--- \${d.name} (\${d.type}) ---\\n\${d.text}\`).join('\\n\\n');

const systemPrompt = \`You are the RealizeOS Venture Intelligence Engine — a multi-agent analysis system that helps founders build their custom FABRIC package.

Your task: Analyze the provided documents and extract information for the 22 venture profile fields.

The 22 fields are:
IDENTITY: nameRole, strengths, gaps, commPrefs, personalValues, antiPatterns
BUSINESS: bizNameTagline, mission, audience, values, uvp, positioning, offerings
VOICE: brandPersonality, tone, vocabulary, formatting, dosDonts, channelAdjustments
EXAMPLES: goodExample, badExample, workflows

For each field, provide:
- "value": The extracted value (string), or null if not found
- "confidence": One of "HIGH", "MEDIUM", "LOW", or "NOT_FOUND"
- "source": Brief note about where you found this info, or null
- "followUpQuestion": A warm, conversational question to ask if confidence is LOW or NOT_FOUND

Also provide:
- "bonusInsights": { "competitors": [], "writingPatterns": { "toneProfile": "", "vocabularyFrequent": [], "vocabularyAvoided": [] }, "marketClues": "" }

RESPOND WITH VALID JSON ONLY. No markdown, no code fences.\`;

const requestBody = {
  model: LLM_MODEL,
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: docTexts || 'No documents provided. Return all fields as NOT_FOUND with appropriate followUpQuestions.' }
  ],
  temperature: 0.3,
  max_tokens: 8192,
  response_format: { type: 'json_object' }
};

return [{ json: {
  requestBody: JSON.stringify(requestBody),
  llmBaseUrl: LLM_BASE_URL,
  llmApiKey: LLM_API_KEY
}}];`;

  const ANALYZE_PARSE_CODE = `const data = $input.first().json;
let rawText = '';

try {
  // OpenAI-compatible format: choices[0].message.content
  rawText = data.choices?.[0]?.message?.content || JSON.stringify(data);
} catch (e) {
  rawText = JSON.stringify(data);
}

// Try to parse as JSON
let parsed;
try {
  // Strip markdown code fences if present
  let cleaned = rawText.trim();
  if (cleaned.startsWith('\`\`\`')) {
    cleaned = cleaned.replace(/^\`\`\`(?:json)?\\n?/, '').replace(/\\n?\`\`\`$/, '');
  }
  parsed = JSON.parse(cleaned);
} catch (e) {
  // Return a fallback structure if parsing fails
  return [{ json: {
    error: 'Failed to parse LLM response',
    rawResponse: rawText.substring(0, 2000),
    fields: {},
    bonusInsights: { competitors: [], writingPatterns: { toneProfile: '', vocabularyFrequent: [], vocabularyAvoided: [] }, marketClues: '' }
  }}];
}

// Ensure required structure
if (!parsed.fields) {
  // If the LLM returned fields at the top level, wrap them
  const knownFields = ['nameRole','strengths','gaps','commPrefs','personalValues','antiPatterns','bizNameTagline','mission','audience','values','uvp','positioning','offerings','brandPersonality','tone','vocabulary','formatting','dosDonts','channelAdjustments','goodExample','badExample','workflows'];
  const hasTopLevelFields = knownFields.some(f => parsed[f]);
  if (hasTopLevelFields) {
    const fields = {};
    for (const f of knownFields) {
      if (parsed[f]) {
        fields[f] = typeof parsed[f] === 'string' 
          ? { value: parsed[f], confidence: 'MEDIUM', source: null, followUpQuestion: null }
          : parsed[f];
      }
    }
    parsed = { fields, bonusInsights: parsed.bonusInsights || { competitors: [], writingPatterns: { toneProfile: '', vocabularyFrequent: [], vocabularyAvoided: [] }, marketClues: '' } };
  }
}

return [{ json: parsed }];`;

  // ═══════════════════════════════════════════════════════════════
  // CONVERSATION WORKFLOW — Node Code
  // ═══════════════════════════════════════════════════════════════
  
  const CONVERSATION_PROMPT_CODE = `// ═══════ PROVIDER CONFIG — EDIT THESE 3 LINES TO SWITCH PROVIDERS ═══════
const LLM_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai';
const LLM_API_KEY  = 'REDACTED_KEY_ROTATED';
const LLM_MODEL    = 'gemini-3.1-pro-preview';
// ═════════════════════════════════════════════════════════════════════════

const input = $input.first().json;
const messages = input.body?.messages || [];
const currentFields = input.body?.currentFields || {};
const missingFields = input.body?.missingFields || [];

const systemPrompt = \`You are the RealizeOS Venture Intelligence Consultant — a warm, knowledgeable advisor helping founders build their venture profile.

CONTEXT: The user is filling out their venture profile. These fields still need information:
\${missingFields.map(f => '- ' + f).join('\\n')}

CURRENT STATE of filled fields:
\${Object.entries(currentFields).filter(([k,v]) => v && v.trim()).map(([k,v]) => '- ' + k + ': ' + v.substring(0, 100)).join('\\n') || '(none filled yet)'}

YOUR JOB:
1. Ask warm, grouped follow-up questions to extract the missing fields from the user
2. When the user responds, extract field values from their answer
3. Be conversational and natural — NOT like a robotic form
4. Group related questions together (e.g., ask about mission + audience + values together)
5. Acknowledge what they've shared before asking more

RESPOND WITH VALID JSON:
{
  "reply": "Your conversational response to the user",
  "fieldUpdates": { "fieldName": "extracted value", ... },
  "suggestions": ["suggested quick reply 1", "suggested quick reply 2"],
  "fieldsUpdated": ["fieldName1", "fieldName2"]
}

RESPOND WITH VALID JSON ONLY. No markdown, no code fences.\`;

// Build messages array for the LLM
const llmMessages = [
  { role: 'system', content: systemPrompt }
];

// Add conversation history
for (const msg of messages) {
  llmMessages.push({ role: msg.role, content: msg.content });
}

const requestBody = {
  model: LLM_MODEL,
  messages: llmMessages,
  temperature: 0.7,
  max_tokens: 4096,
  response_format: { type: 'json_object' }
};

return [{ json: {
  requestBody: JSON.stringify(requestBody),
  llmBaseUrl: LLM_BASE_URL,
  llmApiKey: LLM_API_KEY
}}];`;

  const CONVERSATION_PARSE_CODE = `const data = $input.first().json;
let rawText = '';

try {
  // OpenAI-compatible format: choices[0].message.content
  rawText = data.choices?.[0]?.message?.content || JSON.stringify(data);
} catch (e) {
  rawText = JSON.stringify(data);
}

// Try to parse as JSON
let parsed;
try {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('\`\`\`')) {
    cleaned = cleaned.replace(/^\`\`\`(?:json)?\\n?/, '').replace(/\\n?\`\`\`$/, '');
  }
  parsed = JSON.parse(cleaned);
} catch (e) {
  // Return fallback if parsing fails — treat raw text as the reply
  return [{ json: {
    reply: rawText.substring(0, 1000) || "I'm having trouble processing that. Could you try rephrasing?",
    fieldUpdates: {},
    suggestions: [],
    fieldsUpdated: []
  }}];
}

// Ensure required structure
return [{ json: {
  reply: parsed.reply || parsed.response || rawText.substring(0, 500),
  fieldUpdates: parsed.fieldUpdates || {},
  suggestions: parsed.suggestions || [],
  fieldsUpdated: parsed.fieldsUpdated || Object.keys(parsed.fieldUpdates || {})
}}];`;

  // ═══════════════════════════════════════════════════════════════
  // APPLY CHANGES
  // ═══════════════════════════════════════════════════════════════
  
  // Helper to update a workflow
  async function updateWorkflow(wf, promptCode, parseCode, newName) {
    const nodes = wf.nodes.map(node => {
      // Update Code nodes
      if (node.type === 'n8n-nodes-base.code') {
        const nameLower = node.name.toLowerCase();
        if (nameLower.includes('build') || nameLower.includes('prompt') || nameLower.includes('config')) {
          console.log(`  📝 Updating prompt builder: "${node.name}" → "LLM Config & Prompt Builder"`);
          return { ...node, name: 'LLM Config & Prompt Builder', parameters: { ...node.parameters, jsCode: promptCode } };
        }
        if (nameLower.includes('parse') || nameLower.includes('validate') || nameLower.includes('response')) {
          console.log(`  📝 Updating response parser: "${node.name}" → "Parse and Validate Response"`);
          return { ...node, name: 'Parse and Validate Response', parameters: { ...node.parameters, jsCode: parseCode } };
        }
      }
      
      // Update HTTP Request nodes
      if (node.type === 'n8n-nodes-base.httpRequest') {
        console.log(`  📝 Updating HTTP node: "${node.name}" → "Call LLM API"`);
        return {
          ...node,
          name: 'Call LLM API',
          parameters: {
            method: 'POST',
            url: '={{ $json.llmBaseUrl }}/chat/completions',
            authentication: 'genericCredentialType',
            genericAuthType: 'httpHeaderAuth',
            sendBody: true,
            specifyBody: 'json',
            jsonBody: '={{ $json.requestBody }}',
            sendHeaders: true,
            headerParameters: {
              parameters: [
                { name: 'Authorization', value: '=Bearer {{ $json.llmApiKey }}' },
                { name: 'Content-Type', value: 'application/json' }
              ]
            },
            options: {
              response: { response: { responseFormat: 'json' } },
              timeout: 120000
            }
          }
        };
      }
      
      return node;
    });
    
    // Update workflow name
    const updatedWf = { ...wf, name: newName, nodes };
    
    // Push via API
    const res = await fetch(`/rest/workflows/${wf.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWf)
    });
    
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to update ${newName}: ${res.status} ${errText}`);
    }
    
    console.log(`  ✅ Saved workflow: ${newName}`);
    
    // Activate the workflow
    const activateRes = await fetch(`/rest/workflows/${wf.id}/activate`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: true })
    });
    
    if (activateRes.ok) {
      console.log(`  ✅ Activated: ${newName}`);
    }
    
    return true;
  }
  
  // ── Apply to Analyze workflow ──
  console.log('\n🔄 Updating Analyze workflow...');
  try {
    await updateWorkflow(
      analyzeFull,
      ANALYZE_PROMPT_CODE,
      ANALYZE_PARSE_CODE,
      'RealizeOS — VIE: Venture Analyze'
    );
  } catch(e) {
    console.error('❌ Analyze update failed:', e.message);
  }
  
  // ── Apply to Conversation workflow ──
  console.log('\n🔄 Updating Conversation workflow...');
  try {
    await updateWorkflow(
      conversationFull,
      CONVERSATION_PROMPT_CODE,
      CONVERSATION_PARSE_CODE,
      'RealizeOS — VIE: Venture Conversation'
    );
  } catch(e) {
    console.error('❌ Conversation update failed:', e.message);
  }
  
  console.log('\n🎉 Done! Both workflows updated and activated.');
  console.log('Test with: curl -X POST https://n8n.realization.co.il/webhook/venture-analyze -H "Content-Type: application/json" -d \'{"documents":[{"name":"test","type":"text","text":"I am John, I run GrowthLab marketing agency"}],"existingFields":{}}\'');
})();
