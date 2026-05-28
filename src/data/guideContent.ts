import type { GuideSectionData } from './guideTypes';
import { gettingStarted } from './sections/gettingStarted';
import { architecture } from './sections/architecture';
import { connectors } from './sections/connectors';
import { configuration } from './sections/configuration';
import { skillAuthoring } from './sections/skillAuthoring';
import { integrations } from './sections/integrations';
import { selfHosting } from './sections/selfHosting';
import { bestPractices } from './sections/bestPractices';

export const guideSections: GuideSectionData[] = [
  gettingStarted,
  architecture,
  connectors,
  configuration,
  skillAuthoring,
  integrations,
  selfHosting,
  bestPractices,
];

export function getSection(id: string): GuideSectionData | undefined {
  return guideSections.find(s => s.id === id);
}

export function getAdjacentSections(id: string) {
  const idx = guideSections.findIndex(s => s.id === id);
  return {
    prev: idx > 0 ? { id: guideSections[idx - 1].id, title: guideSections[idx - 1].title } : null,
    next: idx < guideSections.length - 1 ? { id: guideSections[idx + 1].id, title: guideSections[idx + 1].title } : null,
  };
}
