export type Pending<T> = T | null;

export type EventContent = {
  person: string;
  occasion: string;
  dateLabel: string;
  isoDate: string;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;
  timeLabel: string;
  city: string;
  venue: string;
  address: Pending<string>;
  mapUrl: Pending<string>;
  startTime: string;
  timezone: Pending<string>;
  closingLine: string;
  dressCode: Pending<string>;
  outfitReferences: { label: string; url: string }[];
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
  timeLabel: '13.00–16.00 WIB',
  city: 'Bandung, Indonesia',
  venue: 'Braci by Matoa Group',
  address: 'Jl. Sulanjana No. 5, Bandung',
  mapUrl: 'https://maps.app.goo.gl/TVjSQ3XB5VA6y2Qu9',
  startTime: '13:00:00',
  timezone: '+07:00',
  closingLine: 'A page kept for you, until we meet on the 17th.',
  dressCode: 'Cream or beige',
  outfitReferences: [
    { label: 'Cream party outfit ideas', url: 'https://www.pinterest.com/ideas/cream-party-outfit/927753206757/' },
    { label: 'Cream and beige outfit ideas', url: 'https://www.pinterest.com/ideas/cream-beige-outfit/894853851283/' },
    { label: 'Cream and beige outfit ideas for men', url: 'https://www.pinterest.com/ideas/cream-outfit-men/960657287556/' },
  ],
  personalNote: "I'm turning seventeen, and I'd love to spend the afternoon with you. Join me for lunch, games, and a few surprises—having you there would make the day feel like mine.",
  activities: ['Lunch together', 'Games', 'And more surprises'],
};
