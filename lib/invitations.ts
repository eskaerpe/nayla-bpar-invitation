export type InvitationGuest = {
  name: string;
  code: string;
  note: string;
};

export const INVITATION_STORAGE_KEY = 'nayla-invitation-guest';

// Lightweight client-side gate: this is personalization, not strong authentication.
export const guests: InvitationGuest[] = [
  { name: 'Sarah', code: 'NHY4B2', note: 'Your presence would make the celebration even warmer.' },
  { name: 'Dindra', code: '5JMPMN', note: 'Save a little room for an afternoon made of good memories.' },
  { name: 'Zia', code: 'JX9FFP', note: 'It would be lovely to share this special day with you.' },
  { name: 'Sasa', code: '3RA4VT', note: 'Come ready for a bright afternoon and a table full of stories.' },
  { name: 'Lyra', code: 'KMRW4F', note: 'Your company would make this little milestone feel complete.' },
  { name: 'Davina', code: 'GNKKD3', note: 'A seat is waiting for you in this chapter of the celebration.' },
  { name: 'Anei', code: 'CYBCJM', note: 'Bring your best stories; there will be time to make new ones too.' },
  { name: 'Shasya', code: '767PKY', note: 'The day would feel brighter with you there.' },
  { name: 'Regina', code: 'BRPE62', note: 'Join us for an afternoon worth keeping close.' },
  { name: 'Nata', code: 'PUUBUQ', note: 'Your presence would add something special to the room.' },
  { name: 'Bibil', code: 'F5WG4C', note: 'Come celebrate a new chapter with good food and familiar faces.' },
  { name: 'Raihana', code: '4UM37K', note: 'It would mean a lot to have you with us for this moment.' },
  { name: 'Bila', code: 'WV69YW', note: 'Keep the date close; a lovely afternoon is waiting.' },
  { name: 'Kirana', code: 'QTGYU7', note: 'Your smile belongs in this celebration.' },
  { name: 'Lena', code: 'PQDMAS', note: 'Come make this milestone a memory we can revisit together.' },
  { name: 'Suci', code: 'SU26JF', note: 'A warm welcome and a place at the table are waiting for you.' },
  { name: 'Naway', code: 'AX2TCQ', note: 'Let us make this afternoon one to remember.' },
  { name: 'Neysa', code: 'E4UQ2S', note: 'It would be wonderful to celebrate this day alongside you.' },
  { name: 'Daania', code: 'VJUGVF', note: 'Come share the laughter, the food, and this special beginning.' },
  { name: 'Auliya', code: 'QXKNHC', note: 'Your presence would make Nayla’s day feel even more meaningful.' },
];

export function findGuestByCode(value: string): InvitationGuest | undefined {
  const code = value.trim().toUpperCase();
  return guests.find((guest) => guest.code === code);
}

export function serializeGuest(guest: InvitationGuest): string {
  return JSON.stringify({ name: guest.name, note: guest.note });
}

export function parseStoredGuest(value: string | null): Pick<InvitationGuest, 'name' | 'note'> | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return null;
    const candidate = parsed as { name?: unknown; note?: unknown };
    if (typeof candidate.name !== 'string' || typeof candidate.note !== 'string') return null;
    return { name: candidate.name, note: candidate.note };
  } catch {
    return null;
  }
}
