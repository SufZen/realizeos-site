import { useTranslation } from 'react-i18next';

export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  promise: string;
  technical?: string;
}

export const useFeatures = (): Feature[] => {
  const { t } = useTranslation();

  return [
    {
      icon: 'Zap',
      title: t('features.routing.title'),
      promise: t('features.routing.promise'),
      technical: t('features.routing.technical'),
    },
    {
      icon: 'LayoutGrid',
      title: t('features.assembly.title'),
      promise: t('features.assembly.promise'),
      technical: t('features.assembly.technical'),
    },
    {
      icon: 'Shuffle',
      title: t('features.execution.title'),
      promise: t('features.execution.promise'),
      technical: t('features.execution.technical'),
    },
    {
      icon: 'SearchPlus',
      title: t('features.retrieval.title'),
      promise: t('features.retrieval.promise'),
      technical: t('features.retrieval.technical'),
    },
    {
      icon: 'PenTool',
      title: t('features.pipelines.title'),
      promise: t('features.pipelines.promise'),
      technical: t('features.pipelines.technical'),
    },
    {
      icon: 'RefreshCw',
      title: t('features.evolution.title'),
      promise: t('features.evolution.promise'),
      technical: t('features.evolution.technical'),
    },
  ];
};
