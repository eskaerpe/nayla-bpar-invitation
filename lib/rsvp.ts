export type Attendance = 'yes' | 'no';

export type RsvpForm = {
  code: string;
  name: string;
  attendance: Attendance | '';
  food: string;
  drink: string;
  note: string;
};

export type VerifyResponse = { valid: boolean; error?: string };
export type SubmitResponse = { ok: boolean; result?: string; row?: number; error?: string };

export function validateRsvp(form: RsvpForm): Partial<Record<keyof RsvpForm, string>> {
  const errors: Partial<Record<keyof RsvpForm, string>> = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.attendance) errors.attendance = 'Please choose whether you can join.';
  if (form.attendance === 'yes' && !form.food) errors.food = 'Choose 1 food.';
  if (form.attendance === 'yes' && !form.drink) errors.drink = 'Choose 1 drink.';
  return errors;
}

async function request(endpoint: string, payload: Record<string, string>): Promise<unknown> {
  const body = new URLSearchParams(payload).toString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body,
  });
  if (!response.ok) throw new Error('The RSVP service is unavailable. Please try again.');
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object') throw new Error('The RSVP service returned an invalid response.');
  return result;
}

export async function verifyInvitation(code: string): Promise<VerifyResponse> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
  const normalizedCode = code.trim();
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') return { valid: normalizedCode.length > 0 };
    throw new Error('RSVP is not configured yet. Please check back soon.');
  }
  const result = await request(endpoint, { action: 'verify', code: normalizedCode }) as VerifyResponse;
  return { valid: result.valid === true, error: result.error };
}

export async function submitRsvp(form: RsvpForm): Promise<SubmitResponse> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') return { ok: true, result: 'development-mock' };
    throw new Error('RSVP is not configured yet. Please check back soon.');
  }
  const result = await request(endpoint, {
    action: 'submit',
    code: form.code.trim(),
    nama: form.name.trim(),
    will_join: form.attendance,
    makanan: form.attendance === 'yes' ? form.food : '',
    minuman: form.attendance === 'yes' ? form.drink : '',
    notes_for_nayla: form.note.trim(),
  }) as SubmitResponse;
  if (typeof result.ok !== 'boolean') throw new Error('The RSVP service returned an invalid submit response.');
  return result;
}
