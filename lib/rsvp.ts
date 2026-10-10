export type Attendance = 'yes' | 'no';

export type RsvpForm = {
  code: string;
  name: string;
  attendance: Attendance | '';
  food: string;
  drink: string;
  note: string;
};

export type VerifyResponse = { valid: boolean; existing?: Partial<RsvpForm> };
export type SubmitResponse = { ok: boolean; updated?: boolean; error?: string };

export function validateRsvp(form: RsvpForm): Partial<Record<keyof RsvpForm, string>> {
  const errors: Partial<Record<keyof RsvpForm, string>> = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.attendance) errors.attendance = 'Please choose whether you can join.';
  if (form.attendance === 'yes' && !form.food) errors.food = 'Choose 1 food.';
  if (form.attendance === 'yes' && !form.drink) errors.drink = 'Choose 1 drink.';
  return errors;
}

async function request(endpoint: string, payload: Record<string, unknown>): Promise<unknown> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('The RSVP service is unavailable. Please try again.');
  const body: unknown = await response.json();
  if (!body || typeof body !== 'object') throw new Error('The RSVP service returned an invalid response.');
  return body;
}

const localCode = 'NAYLA17';

export async function verifyInvitation(code: string): Promise<VerifyResponse> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') return { valid: code.trim().toUpperCase() === localCode };
    throw new Error('RSVP is not configured yet. Please check back soon.');
  }
  const result = await request(endpoint, { action: 'verify', code: code.trim() }) as VerifyResponse;
  return result;
}

export async function submitRsvp(form: RsvpForm): Promise<SubmitResponse> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') return { ok: true, updated: false };
    throw new Error('RSVP is not configured yet. Please check back soon.');
  }
  const result = await request(endpoint, { action: 'submit', ...form }) as SubmitResponse;
  return result;
}
