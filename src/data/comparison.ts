export interface ComparisonItem {
  text: string;
}

export interface ComparisonColumn {
  header: string;
  price: string;
  priceSuffix: string;
  items: ComparisonItem[];
  featured?: boolean;
}

export const comparisonColumns: ComparisonColumn[] = [
  {
    header: 'Hiring a Team',
    price: '$50,000+',
    priceSuffix: '/year',
    items: [
      { text: '2-4 week ramp-up per hire' },
      { text: 'Limited to business hours' },
      { text: 'Knowledge walks out the door' },
      { text: 'Coordination overhead' },
    ],
  },
  {
    header: 'Individual AI Tools',
    price: '$1,200+',
    priceSuffix: '/year',
    items: [
      { text: '$97/mo per community' },
      { text: '$49-99 per agent config' },
      { text: 'No coordination between tools' },
      { text: 'Context lost every session' },
    ],
  },
  {
    header: 'RealizeOS',
    price: '$249',
    priceSuffix: ' once',
    featured: true,
    items: [
      { text: 'Running in hours, not weeks' },
      { text: 'Available 24/7, every day' },
      { text: 'Knowledge compounds forever' },
      { text: 'Agents coordinate automatically' },
    ],
  },
];
