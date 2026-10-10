export type Attendance = 'yes' | 'no';

export type RsvpForm = {
  name: string;
  attendance: Attendance | '';
  food: string;
  drink: string;
  note: string;
};

export type RsvpPayload = {
  nama: string;
  will_join: 'Ya' | 'Tidak';
  makanan: string;
  minuman: string;
  notes_for_nayla: string;
};

export type SubmitResponse = {
  ok: boolean;
  result?: string;
  row?: number;
  error?: string;
};

export function validateRsvp(form: RsvpForm): Partial<Record<keyof RsvpForm, string>> {
  const errors: Partial<Record<keyof RsvpForm, string>> = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.attendance) errors.attendance = 'Please choose whether you can join.';
  if (form.attendance === 'yes' && !form.food) errors.food = 'Choose 1 food.';
  if (form.attendance === 'yes' && !form.drink) errors.drink = 'Choose 1 drink.';
  return errors;
}

export function buildRsvpPayload(form: RsvpForm): RsvpPayload {
  return {
    nama: form.name.trim(),
    will_join: form.attendance === 'yes' ? 'Ya' : 'Tidak',
    makanan: form.attendance === 'yes' ? form.food : '',
    minuman: form.attendance === 'yes' ? form.drink : '',
    notes_for_nayla: form.note.trim(),
  };
}

export function parseSubmitResponse(value: unknown): SubmitResponse {
  if (!value || typeof value !== 'object') {
    throw new Error('The RSVP service returned an invalid response.');
  }

  const result = value as { result?: unknown; row?: unknown; error?: unknown };
  if (result.result === 'error') {
    return {
      ok: false,
      result: 'error',
      error: typeof result.error === 'string' ? result.error : undefined,
    };
  }

  if (result.result !== 'success' || typeof result.row !== 'number' || !Number.isInteger(result.row)) {
    throw new Error('The RSVP service returned an invalid submit response.');
  }

  return { ok: true, result: 'success', row: result.row };
}

async function request(endpoint: string, payload: Record<string, string>): Promise<unknown> {
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));

  const response = await fetch(endpoint, {
    method: 'POST',
    body,
  });

  if (!response.ok) throw new Error('The RSVP service is unavailable. Please try again.');

  try {
    return await response.json();
  } catch {
    throw new Error('The RSVP service returned an invalid response.');
  }
}

export async function submitRsvp(form: RsvpForm): Promise<SubmitResponse> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;
  if (!endpoint) {
    throw new Error('RSVP is not configured yet. Please check back soon.');
  }

  const result = await request(endpoint, buildRsvpPayload(form));
  return parseSubmitResponse(result);
}
