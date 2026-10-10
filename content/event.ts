export type Pending<T> = T | null;

export type EventContent = {
  person: string;
  occasion: string;
  dateLabel: string;
  isoDate: string;
  venue: string;
  address: Pending<string>;
  mapUrl: Pending<string>;
  startTime: Pending<string>;
  timezone: Pending<string>;
  dressCode: Pending<string>;
  personalNote: Pending<string>;
  activities: Pending<string[]>;
};

export const event: EventContent = {
  person: 'Nayla',
  occasion: 'Sweet Seventeen',
  dateLabel: '17 October 2026',
  isoDate: '2026-10-17',
  venue: 'Braci Bandung',
  address: null,
  mapUrl: null,
  startTime: null,
  timezone: null,
  dressCode: null,
  personalNote: null,
  activities: null,
};
