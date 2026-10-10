'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { menu, type MenuItem } from '@/content/menu';
import { INVITATION_STORAGE_KEY, parseStoredGuest } from '@/lib/invitations';
import { submitRsvp, validateRsvp, type RsvpForm } from '@/lib/rsvp';

const initialForm: RsvpForm = { name: '', attendance: '', food: '', drink: '', note: '' };
type Step = 'attendance' | 'food' | 'drink' | 'review' | 'success';
const steps: Exclude<Step, 'success'>[] = ['attendance', 'food', 'drink', 'review'];
const labels: Record<Exclude<Step, 'success'>, string> = { attendance: 'Attendance', food: 'Choose food', drink: 'Choose drink', review: 'Review' };
const food = menu.filter((item) => item.category === 'food');
const drinks = menu.filter((item) => item.category === 'drink');
const title = (value: string) => value.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

function MenuChoice({ item, selected, onSelect }: { item: MenuItem; selected: boolean; onSelect: () => void }) {
  return <button type="button" role="radio" aria-checked={selected} onClick={onSelect} className={`menu-choice${selected ? ' is-selected' : ''}`}>
    <span className="menu-choice__copy"><strong>{title(item.name.toLowerCase())}</strong>{item.description && <small>{item.description}</small>}</span>
    <span className="menu-choice__state" aria-hidden="true">{selected && <Check size={15} weight="bold" />}</span>
  </button>;
}

export function RsvpForm() {
  const [form, setForm] = useState<RsvpForm>(initialForm);
  const [step, setStep] = useState<Step>('attendance');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RsvpForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [guest, setGuest] = useState('');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(INVITATION_STORAGE_KEY);
      if (!stored) return;
      const parsed = parseStoredGuest(stored);
      if (parsed) { setGuest(parsed.name); setForm((current) => ({ ...current, name: parsed.name })); }
    } catch { /* Storage can be unavailable in restricted browser contexts. */ }
  }, []);

  const groups = useMemo(() => {
    const items = step === 'food' ? food : drinks;
    const filtered = items.filter((item) => !query.trim() || `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
    const bySection = new Map<string, MenuItem[]>();
    filtered.forEach((item) => bySection.set(item.section, [...(bySection.get(item.section) ?? []), item]));
    return [...bySection.entries()];
  }, [query, step]);
  const categories = (step === 'food' ? food : drinks).reduce<string[]>((list, item) => list.includes(item.section) ? list : [...list, item.section], []);
  const visibleGroups = groups.filter(([section]) => !category || category === section);
  const selectedFood = food.find((item) => item.id === form.food);
  const selectedDrink = drinks.find((item) => item.id === form.drink);
  const stepIndex = steps.indexOf(step as Exclude<Step, 'success'>);

  function update<K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }
  function goToMenu(next: 'food' | 'drink') { setCategory(''); setQuery(''); setStep(next); setError(''); }
  function continueFromAttendance() {
    const errors = validateRsvp(form);
    setFieldErrors(errors);
    if (!form.name.trim() || !form.attendance) { setError('Add your name and choose an attendance reply to continue.'); return; }
    setError('');
    if (form.attendance === 'yes') goToMenu('food');
    else setStep('review');
  }
  function continueFromMenu(kind: 'food' | 'drink') {
    const value = kind === 'food' ? form.food : form.drink;
    if (!value) { setError(`Please choose one ${kind === 'food' ? 'dish' : 'drink'} to continue.`); return; }
    setError('');
    if (kind === 'food') goToMenu('drink'); else setStep('review');
  }
  function back() {
    setError('');
    if (step === 'food') setStep('attendance');
    else if (step === 'drink') setStep('food');
    else if (step === 'review') setStep(form.attendance === 'yes' ? 'drink' : 'attendance');
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateRsvp(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) { setStep('attendance'); setError('Please complete the required details before sending.'); return; }
    setSubmitting(true); setError('');
    try { await submitRsvp(form); setStep('success'); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Your reply could not be sent. Please try again.'); }
    finally { setSubmitting(false); }
  }

  if (step === 'success') return <section className="rsvp-success" aria-live="polite"><p className="rsvp-eyebrow">Your reply is with Nayla</p><h2>Thank you,<br /><em>{form.name.trim()}.</em></h2><p>We can’t wait to celebrate together.</p><Link href="/" className="rsvp-success__link">Back to the invitation <ArrowRight size={16} /></Link></section>;

  return <form onSubmit={handleSubmit} className="rsvp-flow" noValidate>
    <ol className="rsvp-progress" aria-label="RSVP progress">{steps.map((key, index) => <li key={key} className={`${index === stepIndex ? 'is-current' : ''} ${index < stepIndex ? 'is-complete' : ''}`}><span>{index < stepIndex ? <Check size={13} weight="bold" /> : `0${index + 1}`}</span><b>{labels[key]}</b></li>)}</ol>
    <div className="rsvp-stage">
      {step === 'attendance' && <section aria-labelledby="attendance-title"><p className="rsvp-eyebrow">First, a little introduction</p><h2 id="attendance-title">Will you be<br /><em>joining us?</em></h2>
        <label className="field-label" htmlFor="guest-name">Your name</label><input id="guest-name" className="rsvp-text-input" autoComplete="name" value={form.name} readOnly={Boolean(guest)} onChange={(event) => update('name', event.target.value)} placeholder="Name on your invitation" aria-invalid={Boolean(fieldErrors.name)} />{guest && <p className="rsvp-field-hint">Welcome, {guest}. Your name is set from your invitation.</p>}{fieldErrors.name && <p className="rsvp-error">{fieldErrors.name}</p>}
        <div className="attendance-options" role="radiogroup" aria-label="Attendance"><button type="button" role="radio" aria-checked={form.attendance === 'yes'} className={`attendance-option${form.attendance === 'yes' ? ' is-selected' : ''}`} onClick={() => update('attendance', 'yes')}><span><strong>Yes, I’ll be there</strong><small>Save me a place at the table</small></span><i>{form.attendance === 'yes' && <Check size={15} weight="bold" />}</i></button><button type="button" role="radio" aria-checked={form.attendance === 'no'} className={`attendance-option${form.attendance === 'no' ? ' is-selected' : ''}`} onClick={() => update('attendance', 'no')}><span><strong>Sending love from afar</strong><small>I won’t be able to make it</small></span><i>{form.attendance === 'no' && <Check size={15} weight="bold" />}</i></button></div>
      </section>}

      {(step === 'food' || step === 'drink') && <section className="menu-step" aria-labelledby="menu-title"><div className="menu-step__heading"><div><p className="rsvp-eyebrow">{step === 'food' ? 'A place at the table' : 'Something to sip'}</p><h2 id="menu-title">Choose your<br /><em>{step === 'food' ? 'dish.' : 'drink.'}</em></h2></div><p>{step === 'food' ? 'One dish, prepared for you.' : 'One drink to enjoy with lunch.'}</p></div>
        <div className="menu-browser"><aside className="menu-browser__nav" aria-label={`${step === 'food' ? 'Food' : 'Drink'} categories`}><p>Browse by</p><button type="button" aria-pressed={!category} className={!category ? 'is-active' : ''} onClick={() => setCategory('')}>All <span>{step === 'food' ? food.length : drinks.length}</span></button>{categories.map((section) => <button type="button" key={section} aria-pressed={category === section} className={category === section ? 'is-active' : ''} onClick={() => setCategory(section)}>{title(section)}<span>{(step === 'food' ? food : drinks).filter((item) => item.section === section).length}</span></button>)}</aside>
          <div className="menu-browser__results"><label className="menu-search"><MagnifyingGlass size={17} aria-hidden="true" /><span className="sr-only">Search {step === 'food' ? 'food' : 'drinks'}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Find a ${step === 'food' ? 'dish' : 'drink'}…`} /></label><p className="menu-picked">{step === 'food' ? <><strong>Your dish</strong><span>{selectedFood ? title(selectedFood.name.toLowerCase()) : 'Choose one dish'}</span></> : <><strong>Your drink</strong><span>{selectedDrink ? title(selectedDrink.name.toLowerCase()) : 'Choose one drink'}</span></>}</p>
            <div className="menu-result-scroll">{visibleGroups.length ? visibleGroups.map(([section, items]) => <section key={section} className="menu-category"><header><h3>{title(section)}</h3><span>{items.length} choices</span></header><div role="radiogroup" aria-label={title(section)}>{items.map((item) => <MenuChoice key={item.id} item={item} selected={step === 'food' ? form.food === item.id : form.drink === item.id} onSelect={() => { update(step, item.id); setError(''); }} />)}</div></section>) : <p className="menu-empty">No matches. Try another search.</p>}</div>
          </div>
        </div>
      </section>}

      {step === 'review' && <section aria-labelledby="review-title"><p className="rsvp-eyebrow">Just one last look</p><h2 id="review-title">Your note<br /><em>for Nayla.</em></h2><dl className="review-list"><div><dt>Guest</dt><dd>{form.name.trim()}</dd></div><div><dt>Attendance</dt><dd>{form.attendance === 'yes' ? 'Joining the celebration' : 'Sending love from afar'}</dd></div>{form.attendance === 'yes' && <><div><dt>Your dish</dt><dd>{selectedFood ? title(selectedFood.name.toLowerCase()) : '—'}</dd></div><div><dt>Your drink</dt><dd>{selectedDrink ? title(selectedDrink.name.toLowerCase()) : '—'}</dd></div></>}</dl><label className="field-label" htmlFor="note-for-nayla">A note for Nayla <span>optional</span></label><textarea id="note-for-nayla" className="rsvp-text-input rsvp-note" value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Write a little birthday wish…" maxLength={500} /><p className="rsvp-field-hint">{form.note.length}/500 characters</p></section>}
    </div>
    {error && <p role="alert" className="rsvp-error rsvp-flow__error">{error}</p>}
    <div className="rsvp-controls">{step !== 'attendance' && <button type="button" className="rsvp-button rsvp-button--back" onClick={back}><ArrowLeft size={17} /> Back</button>}{step === 'attendance' && <span />}{step === 'attendance' && <button type="button" className="rsvp-button rsvp-button--primary" onClick={continueFromAttendance}>Continue <ArrowRight size={17} /></button>}{step === 'food' && <button type="button" className="rsvp-button rsvp-button--primary" onClick={() => continueFromMenu('food')}>Choose drink <ArrowRight size={17} /></button>}{step === 'drink' && <button type="button" className="rsvp-button rsvp-button--primary" onClick={() => continueFromMenu('drink')}>Review reply <ArrowRight size={17} /></button>}{step === 'review' && <button type="submit" disabled={submitting} className="rsvp-button rsvp-button--primary">{submitting ? 'Sending your reply…' : 'Send my reply'} {!submitting && <ArrowRight size={17} />}</button>}</div>
  </form>;
}
