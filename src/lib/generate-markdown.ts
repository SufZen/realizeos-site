export interface WizardState {
  // Step 1: About You → shared/identity.md
  nameRole: string;
  strengths: string;
  gaps: string;
  commPrefs: string;
  personalValues: string;
  antiPatterns: string;
  // Step 2: Your Business → systems/my-business-1/F-foundations/brand-identity.md
  bizNameTagline: string;
  mission: string;
  audience: string;
  values: string;
  uvp: string;
  positioning: string;
  offerings: string;
  brandPersonality: string;
  // Step 3: Your Voice → systems/my-business-1/F-foundations/brand-voice.md
  tone: string;
  vocabulary: string;
  formatting: string;
  dosDonts: string;
  channelAdjustments: string;
  // Step 4: Voice Examples → appended to brand-voice.md
  goodExample: string;
  badExample: string;
  workflows: string;
}

export const emptyWizardState: WizardState = {
  nameRole: '', strengths: '', gaps: '', commPrefs: '',
  personalValues: '', antiPatterns: '',
  bizNameTagline: '', mission: '', audience: '', values: '',
  uvp: '', positioning: '', offerings: '', brandPersonality: '',
  tone: '', vocabulary: '', formatting: '', dosDonts: '',
  channelAdjustments: '',
  goodExample: '', badExample: '', workflows: '',
};

const fill = (val: string, fallback = '[Not filled in]') =>
  val.trim() || fallback;

export function generateIdentityMd(s: WizardState): string {
  return `# Personal Identity

This file defines **who you are** — the person behind the business(es). The AI team uses this to understand your perspective, values, and communication style.

## About You
${fill(s.nameRole)}

## Your Values
${fill(s.personalValues)}

## Your Strengths
${fill(s.strengths)}

## Your Gaps
${fill(s.gaps)}

## Communication Preferences
${fill(s.commPrefs)}

## Anti-Patterns
${fill(s.antiPatterns)}
`;
}

export function generateBrandIdentityMd(s: WizardState): string {
  return `# Brand Identity

This file defines **your business** — how it should look and sound to the world. This guides how all AI agents represent your business.

## Business Name & Tagline
${fill(s.bizNameTagline)}

## Mission
${fill(s.mission)}

## Target Audience
${fill(s.audience)}

## Core Values
${fill(s.values)}

## Unique Value Proposition
${fill(s.uvp)}

## Competitive Positioning
${fill(s.positioning)}

## Key Offerings
${fill(s.offerings)}

## Brand Personality
${fill(s.brandPersonality)}
`;
}

export function generateBrandVoiceMd(s: WizardState): string {
  return `# Brand Voice Guide

This document defines how all content should sound. Every AI agent MUST follow these rules.

## Tone of Voice
${fill(s.tone)}

## Vocabulary

### Words We Use
### Words We Avoid
${fill(s.vocabulary)}

## Formatting Rules
${fill(s.formatting)}

## Do's and Don'ts

### Always Do
### Never Do
${fill(s.dosDonts)}

## Voice Examples

### Good Example
> ${fill(s.goodExample, '[Paste a paragraph that sounds exactly like your brand]')}

### Bad Example
> ${fill(s.badExample, '[Paste a counter-example — what your brand should NOT sound like]')}

## Channel-Specific Adjustments
${fill(s.channelAdjustments)}

## Weekly Workflows to Automate
${fill(s.workflows)}
`;
}
