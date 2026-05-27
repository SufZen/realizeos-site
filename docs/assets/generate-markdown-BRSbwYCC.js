const t={nameRole:"",strengths:"",gaps:"",commPrefs:"",personalValues:"",antiPatterns:"",bizNameTagline:"",mission:"",audience:"",values:"",uvp:"",positioning:"",offerings:"",brandPersonality:"",tone:"",vocabulary:"",formatting:"",dosDonts:"",channelAdjustments:"",goodExample:"",badExample:"",workflows:""},n=(e,o="[Not filled in]")=>e.trim()||o;function a(e){return`# Personal Identity

This file defines **who you are** — the person behind the business(es). The AI team uses this to understand your perspective, values, and communication style.

## About You
${n(e.nameRole)}

## Your Values
${n(e.personalValues)}

## Your Strengths
${n(e.strengths)}

## Your Gaps
${n(e.gaps)}

## Communication Preferences
${n(e.commPrefs)}

## Anti-Patterns
${n(e.antiPatterns)}
`}function s(e){return`# Venture Identity

This file defines **your business** — how it should look and sound to the world. This guides how all AI agents represent your business.

## Business Name & Tagline
${n(e.bizNameTagline)}

## Mission
${n(e.mission)}

## Target Audience
${n(e.audience)}

## Core Values
${n(e.values)}

## Unique Value Proposition
${n(e.uvp)}

## Competitive Positioning
${n(e.positioning)}

## Key Offerings
${n(e.offerings)}

## Venture Personality
${n(e.brandPersonality)}
`}function i(e){return`# Venture Voice Guide

This document defines how all content should sound. Every AI agent MUST follow these rules.

## Tone of Voice
${n(e.tone)}

## Vocabulary

### Words We Use
### Words We Avoid
${n(e.vocabulary)}

## Formatting Rules
${n(e.formatting)}

## Do's and Don'ts

### Always Do
### Never Do
${n(e.dosDonts)}

## Voice Examples

### Good Example
> ${n(e.goodExample,"[Paste a paragraph that sounds exactly like your venture]")}

### Bad Example
> ${n(e.badExample,"[Paste a counter-example — what your venture should NOT sound like]")}

## Channel-Specific Adjustments
${n(e.channelAdjustments)}

## Weekly Workflows to Automate
${n(e.workflows)}
`}export{s as a,i as b,t as e,a as g};
