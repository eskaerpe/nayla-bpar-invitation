export type Pending<T> = T | null;

export type EventContent = {
  person: string;
  occasion: string;
  dateLabel: string;
  isoDate: string;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;
  city: string;
  venue: string;
  address: Pending<string>;
  mapUrl: Pending<string>;
  startTime: string;
  timezone: Pending<string>;
  closingLine: string;
  dressCode: Pending<string>;
  personalNote: Pending<string>;
  activities: Pending<string[]>;
};

export const event: EventContent = {
  person: 'Nayla',
  occasion: 'Sweet Seventeen',
  dateLabel: '17 October 2026',
  isoDate: '2026-10-17',
  dayLabel: 'Saturday',
  monthLabel: 'October',
  yearLabel: '2026',
  city: 'Bandung, Indonesia',
  venue: 'Braci Bandung',
  address: null,
  mapUrl: null,
  startTime: 'TIME_TBD',
  timezone: null,
  closingLine: 'A page kept for you, until we meet on the 17th.',
  dressCode: null,
  personalNote: null,
  activities: null,
};
