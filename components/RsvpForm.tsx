'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { menu, type MenuItem } from '@/content/menu';
import { submitRsvp, validateRsvp, verifyInvitation, type RsvpForm } from '@/lib/rsvp';

const initialForm: RsvpForm = { code: '', name: '', attendance: '', food: '', drink: '', note: '' };
type Step = 'code' | 'details' | 'menu' | 'review' | 'success';

const food = menu.filter((item) => item.category === 'food');
const drinks = menu.filter((item) => item.category === 'drink');
const money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

function MenuCard({ item, selected, onSelect }: { item: MenuItem; selected: boolean; onSelect: () => void }) {
  return <label className={`relative flex min-h-44 cursor-pointer flex-col rounded-2xl border p-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-espresso ${selected ? 'border-espresso bg-cream ring-2 ring-espresso' : 'border-latte/60 bg-sand hover:border-espresso'}`}>
    <input className="sr-only" type="radio" name={item.category} value={item.id} checked={selected} onChange={onSelect} aria-label={`${item.name}, ${money.format(item.price)}`} />
    <span className="flex items-start justify-between gap-3"><span className="font-semibold text-cocoa">{item.name}</span><span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm ${selected ? 'border-espresso bg-espresso text-cream' : 'border-latte text-transparent'}`}>✓</span></span>
    {item.description && <span className="mt-2 text-sm leading-6 text-cocoa/80">{item.description}</span>}
    <span className="mt-auto pt-4 text-sm font-semibold text-cocoa">{money.format(item.price)}</span>
  </label>;
}

export function RsvpForm() {
  const [form, setForm] = useState(initialForm);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<Step>('code');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpForm, string>>>({});

  function update<K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function checkCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const result = await verifyInvitation(code);
      if (!result.valid) { setMessage('That code does not look right. Please check your invitation and try again.'); return; }
      const existing = result.existing ?? {};
      setForm((current) => ({ ...current, code, ...existing }));
      setStep('details');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'We could not check that code. Please try again.'); }
    finally { setBusy(false); }
  }

  function continueFromDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (form.attendance === 'yes') setStep('menu');
    else setStep('review');
  }

  function continueFromMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (!nextErrors.food && !nextErrors.drink) setStep('review');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const result = await submitRsvp(form);
      if (!result.ok) { setMessage(result.error ?? 'We could not save your RSVP. Please try again.'); return; }
      setStep('success');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'We could not save your RSVP. Please try again.'); }
    finally { setBusy(false); }
  }

  if (step === 'success') return <div className="rounded-[2rem] bg-sand p-8 text-center sm:p-12" aria-live="polite"><p className="font-accent text-3xl text-cocoa">RSVP received</p><h2 className="mt-3 font-display text-5xl font-semibold">Thank you, {form.name}.</h2><p className="mx-auto mt-5 max-w-md leading-7 text-cocoa">Your response has been saved.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso">Back to invitation</Link></div>;

  const stepNumber = step === 'code' ? 1 : step === 'details' ? 2 : step === 'menu' ? 3 : 4;
  const selectedFood = food.find((item) => item.id === form.food);
  const selectedDrink = drinks.find((item) => item.id === form.drink);
  const attending = form.attendance === 'yes';

  return <div className="rounded-[2rem] bg-sand p-6 sm:p-10">
    <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa" aria-label={`Step ${stepNumber} of 4`}><span className="h-2 w-2 rounded-full bg-espresso" /> RSVP <span className="text-latte">/</span> {step === 'code' ? 'Access' : step === 'details' ? 'Details' : step === 'menu' ? 'Menu' : 'Review'}</div>
    <div className="mb-6 h-1 rounded-full bg-latte/40" aria-hidden="true"><div className="h-1 rounded-full bg-espresso transition-all" style={{ width: `${stepNumber * 25}%` }} /></div>
    <p className="sr-only" aria-live="polite">Step {stepNumber} of 4</p>
    {message && <p className="mb-5 rounded-xl border border-red-900/20 bg-red-50 p-3 text-sm text-red-950" role="alert" aria-live="assertive">{message}</p>}

    {step === 'code' && <form onSubmit={checkCode} className="space-y-5"><div><label htmlFor="invite-code" className="text-sm font-semibold text-cocoa">Invitation code</label><input id="invite-code" value={code} onChange={(event) => setCode(event.target.value)} required autoComplete="off" className="mt-2 min-h-12 w-full rounded-xl border border-latte bg-cream px-4 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" /></div><button disabled={busy} className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">{busy ? 'Checking…' : 'Continue'}</button></form>}

    {step === 'details' && <form onSubmit={continueFromDetails} className="space-y-6"><div><label htmlFor="guest-name" className="text-sm font-semibold text-cocoa">Your name</label><input id="guest-name" value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-latte bg-cream px-4 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" aria-invalid={Boolean(errors.name)} />{errors.name && <p className="mt-2 text-sm text-red-950" role="alert">{errors.name}</p>}</div><fieldset><legend className="text-sm font-semibold text-cocoa">Will you be joining?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-cream px-4 ${form.attendance === 'yes' ? 'border-espresso ring-2 ring-espresso' : 'border-latte'}`}><input type="radio" name="attendance" checked={form.attendance === 'yes'} onChange={() => { update('attendance', 'yes'); }} className="h-5 w-5 accent-espresso" /> Yes, I’ll be there</label><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-cream px-4 ${form.attendance === 'no' ? 'border-espresso ring-2 ring-espresso' : 'border-latte'}`}><input type="radio" name="attendance" checked={form.attendance === 'no'} onChange={() => { setForm((current) => ({ ...current, attendance: 'no', food: '', drink: '' })); setErrors((current) => ({ ...current, attendance: undefined, food: undefined, drink: undefined })); }} className="h-5 w-5 accent-espresso" /> No, I can’t make it</label></div>{errors.attendance && <p className="mt-2 text-sm text-red-950" role="alert">{errors.attendance}</p>}</fieldset><div><label htmlFor="rsvp-note" className="text-sm font-semibold text-cocoa">Note <span className="font-normal">(optional)</span></label><textarea id="rsvp-note" value={form.note} onChange={(event) => update('note', event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-latte bg-cream px-4 py-3 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" /></div><button disabled={busy} className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">{attending ? 'Choose menu' : 'Review response'}</button></form>}

    {step === 'menu' && <form onSubmit={continueFromMenu} className="space-y-8"><fieldset><legend className="text-xl font-semibold text-cocoa">Choose 1 food</legend>{errors.food && <p className="mt-2 text-sm text-red-950" role="alert">{errors.food}</p>}<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{food.map((item) => <MenuCard key={item.id} item={item} selected={form.food === item.id} onSelect={() => update('food', item.id)} />)}</div></fieldset><fieldset><legend className="text-xl font-semibold text-cocoa">Choose 1 drink</legend>{errors.drink && <p className="mt-2 text-sm text-red-950" role="alert">{errors.drink}</p>}<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">{drinks.map((item) => <MenuCard key={item.id} item={item} selected={form.drink === item.id} onSelect={() => update('drink', item.id)} />)}</div></fieldset><button disabled={busy || !form.food || !form.drink} className="sticky bottom-4 min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">Review menu</button></form>}

    {step === 'review' && <form onSubmit={submit} className="space-y-6"><div className="space-y-4 text-cocoa"><div><span className="text-sm text-cocoa/70">Name</span><p className="font-semibold">{form.name}</p></div><div><span className="text-sm text-cocoa/70">Attendance</span><p className="font-semibold">{attending ? 'Yes' : 'No'}</p></div>{attending && <><div><span className="text-sm text-cocoa/70">Food</span><p className="font-semibold">{selectedFood?.name}</p><button type="button" onClick={() => setStep('menu')} className="mt-1 min-h-11 text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">Edit menu</button></div><div><span className="text-sm text-cocoa/70">Drink</span><p className="font-semibold">{selectedDrink?.name}</p></div></>}<div><span className="text-sm text-cocoa/70">Note</span><p>{form.note || '—'}</p></div></div><button type="button" onClick={() => setStep('details')} className="min-h-11 text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">Edit details</button><button disabled={busy} className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">{busy ? 'Saving…' : 'Submit RSVP'}</button></form>}
  </div>;
}
