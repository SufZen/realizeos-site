import { useTranslation } from 'react-i18next';

export interface UseCase {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  tasks: string[];
}

export const useUseCases = (): UseCase[] => {
  const { t } = useTranslation();

  return [
    {
      icon: 'PenTool',
      title: t('usecases.arch.title'),
      description: t('usecases.arch.description'),
      tasks: t('usecases.arch.tasks', { returnObjects: true }) as string[],
    },
    {
      icon: 'BookOpen',
      title: t('usecases.realestate.title'),
      description: t('usecases.realestate.description'),
      tasks: t('usecases.realestate.tasks', { returnObjects: true }) as string[],
    },
    {
      icon: 'Briefcase',
      title: t('usecases.venture.title'),
      description: t('usecases.venture.description'),
      tasks: t('usecases.venture.tasks', { returnObjects: true }) as string[],
    },
    {
      icon: 'Flag',
      title: t('usecases.engineering.title'),
      description: t('usecases.engineering.description'),
      tasks: t('usecases.engineering.tasks', { returnObjects: true }) as string[],
    },
    {
      icon: 'Layers',
      title: t('usecases.urban.title'),
      description: t('usecases.urban.description'),
      tasks: t('usecases.urban.tasks', { returnObjects: true }) as string[],
    },
    {
      icon: 'Home',
      title: t('usecases.asset.title'),
      description: t('usecases.asset.description'),
      tasks: t('usecases.asset.tasks', { returnObjects: true }) as string[],
    },
  ];
};
