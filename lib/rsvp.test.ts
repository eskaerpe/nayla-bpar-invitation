import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildRsvpPayload,
  parseSubmitResponse,
  submitRsvp,
  validateRsvp,
  type RsvpForm,
} from './rsvp';

const attendingForm: RsvpForm = {
  name: '  Reihan Permana  ',
  attendance: 'yes',
  food: 'nashville-chicken-burger',
  drink: 'iced-lemon-tea',
  note: 'See you there.',
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('RSVP validation and payload mapping', () => {
  it('requires name, attendance, food, and drink for attending guests', () => {
    expect(validateRsvp({ name: '', attendance: '', food: '', drink: '', note: '' })).toEqual({
      name: 'Please enter your name.',
      attendance: 'Please choose whether you can join.',
    });
    expect(validateRsvp({ ...attendingForm, food: '', drink: '' })).toEqual({
      food: 'Choose 1 food.',
      drink: 'Choose 1 drink.',
    });
  });

  it('maps an attending guest to the exact Apps Script fields', () => {
    expect(buildRsvpPayload(attendingForm)).toEqual({
      nama: 'Reihan Permana',
      will_join: 'Ya',
      makanan: 'nashville-chicken-burger',
      minuman: 'iced-lemon-tea',
      notes_for_nayla: 'See you there.',
    });
  });

  it('maps a non-attending guest without menu selections', () => {
    expect(buildRsvpPayload({ ...attendingForm, attendance: 'no', food: 'ignored', drink: 'ignored' })).toEqual({
      nama: 'Reihan Permana',
      will_join: 'Tidak',
      makanan: '',
      minuman: '',
      notes_for_nayla: 'See you there.',
    });
  });
});

describe('Apps Script response handling', () => {
  it('accepts only a success result with an integer row', () => {
    expect(parseSubmitResponse({ result: 'success', row: 3 })).toEqual({ ok: true, result: 'success', row: 3 });
    expect(() => parseSubmitResponse({ result: 'success' })).toThrow('invalid submit response');
    expect(() => parseSubmitResponse('<html>not json</html>')).toThrow('invalid response');
  });

  it('returns Apps Script errors without treating them as success', () => {
    expect(parseSubmitResponse({ result: 'error', error: 'Missing field' })).toEqual({
      ok: false,
      result: 'error',
      error: 'Missing field',
    });
  });

  it('posts only the five Apps Script fields and accepts the success JSON', async () => {
    vi.stubEnv('NEXT_PUBLIC_RSVP_ENDPOINT', 'https://example.invalid/rsvp');
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ result: 'success', row: 8 }), { status: 200 }),
    );

    const result = await submitRsvp(attendingForm);
    expect(result).toEqual({ ok: true, result: 'success', row: 8 });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, request] = fetchMock.mock.calls[0];
    expect(request?.method).toBe('POST');
    expect([...((request?.body as FormData).entries())]).toEqual([
      ['nama', 'Reihan Permana'],
      ['will_join', 'Ya'],
      ['makanan', 'nashville-chicken-burger'],
      ['minuman', 'iced-lemon-tea'],
      ['notes_for_nayla', 'See you there.'],
    ]);
  });
});
