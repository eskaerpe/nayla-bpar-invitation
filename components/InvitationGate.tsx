'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, LockKey, Sparkle } from '@phosphor-icons/react';
import { findGuestByCode, INVITATION_STORAGE_KEY, serializeGuest, type InvitationGuest } from '@/lib/invitations';
import { Invitation } from './Invitation';

export function InvitationGate() {
  const [code, setCode] = useState('');
  const [guest, setGuest] = useState<InvitationGuest | null>(null);
  const [storedGuest, setStoredGuest] = useState<InvitationGuest | null>(null);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(INVITATION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string; note?: string };
        if (parsed.name && parsed.note) setStoredGuest({ name: parsed.name, note: parsed.note, code: '' });
      }
    } catch {
      window.sessionStorage.removeItem(INVITATION_STORAGE_KEY);
    } finally {
      setIsChecking(false);
    }
  }, []);

  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = findGuestByCode(code);
    if (!match) {
      setError('That code could not be found. Please check the characters and try again.');
      return;
    }
    setError('');
    setGuest(match);
  }

  function continueToInvitation() {
    if (!guest) return;
    window.sessionStorage.setItem(INVITATION_STORAGE_KEY, serializeGuest(guest));
    setStoredGuest(guest);
  }

  if (isChecking) return <main className="gate-page" aria-label="Loading invitation" />;
  if (storedGuest) return <Invitation />;

  return (
    <main className="gate-page">
      <div className="gate-grain" aria-hidden="true" />
      <section className="gate-modal" aria-labelledby="gate-title">
        <div className="gate-mark" aria-hidden="true"><LockKey size={21} weight="regular" /></div>
        <p className="gate-kicker">Nayla / Sweet Seventeen</p>
        {!guest ? (
          <>
            <h1 id="gate-title">A little<br /><em>something</em> for you.</h1>
            <p className="gate-copy">Enter the invitation code to open your personal invitation.</p>
            <form onSubmit={verify} className="gate-form">
              <label htmlFor="invitation-code">Invitation code</label>
              <input id="invitation-code" value={code} onChange={(event) => { setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)); setError(''); }} autoComplete="off" inputMode="text" maxLength={6} placeholder="XXXXXX" aria-describedby={error ? 'gate-error' : 'gate-hint'} aria-invalid={Boolean(error)} />
              <p id="gate-hint" className="gate-hint">Six characters · uppercase letters and numbers</p>
              {error && <p id="gate-error" className="gate-error" role="alert">{error}</p>}
              <button type="submit" className="gate-button">Open invitation <ArrowRight size={18} weight="bold" /></button>
            </form>
          </>
        ) : (
          <div className="gate-welcome" aria-live="polite">
            <p className="gate-kicker"><Sparkle size={15} weight="fill" aria-hidden="true" /> Your invitation is ready</p>
            <h1 id="gate-title">Hi, {guest.name}!<br /><em>You are invited.</em></h1>
            <p className="gate-copy">{guest.note}</p>
            <button type="button" className="gate-button" onClick={continueToInvitation}>Continue to invitation <ArrowRight size={18} weight="bold" /></button>
          </div>
        )}
        <p className="gate-footer">Private invitation · Please keep this code to yourself</p>
      </section>
    </main>
  );
}
