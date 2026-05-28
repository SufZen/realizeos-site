export interface GuideBlock {
  type: 'heading' | 'paragraph' | 'code' | 'callout' | 'table' | 'list' | 'tabs';
  // heading
  text: string;
  level?: 2 | 3;
  id?: string;
  // code
  code?: string;
  language?: string;
  title?: string;
  // callout
  calloutType?: 'info' | 'warning' | 'tip' | 'danger';
  // table
  headers?: string[];
  rows?: string[][];
  // list
  items?: string[];
  ordered?: boolean;
  // tabs
  tabs?: { id: string; label: string; blocks: GuideBlock[] }[];
}

export interface GuideSectionData {
  id: string;
  title: string;
  icon: string;
  description: string;
  readTime: string;
  content: GuideBlock[];
}
