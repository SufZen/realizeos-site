import { useTranslation } from 'react-i18next';

export interface UseCase {
  key: 'developer' | 'architecture' | 'construction';
  title: string;
  description: string;
  tasks: string[];
}

export interface PackExampleRow {
  skill: string;
  in: string;
  out: string;
  held: string;
}

// Focus market (direction 2026-10, §4): real-estate development, architecture and
// planning, construction. The worked example is the real-estate developer pack
// shipped in RealizeOS 5.13.0 (docs/webinar-demo.md in the product repo).
export const useUseCases = (): UseCase[] => {
  const { t } = useTranslation();
  return (['developer', 'architecture', 'construction'] as const).map((key) => ({
    key,
    title: t(`usecases.${key}.title`),
    description: t(`usecases.${key}.description`),
    tasks: t(`usecases.${key}.tasks`, { returnObjects: true }) as string[],
  }));
};

export const usePackExample = (): PackExampleRow[] => {
  const { t } = useTranslation();
  return t('usecases.example.rows', { returnObjects: true }) as PackExampleRow[];
};

// `init` applies the whole template (agents, skills, routing, features). `venture create --template`
// copies the files but keeps default routing, so it is not the documented path for this pack.
export const PACK_INSTALL_COMMAND = 'realize-os init --template real-estate-developer';
