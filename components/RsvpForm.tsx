'use client';

import Link from 'next/link';
import { Check, ForkKnife, Wine } from '@phosphor-icons/react';
import { useState, type FormEvent } from 'react';
import { menu, type MenuItem } from '@/content/menu';
import { submitRsvp, validateRsvp, type RsvpForm } from '@/lib/rsvp';

const initialForm: RsvpForm = { name: '', attendance: '', food: '', drink: '', note: '' };
type Step = 'details' | 'menu' | 'review' | 'success';

const food = menu.filter((item) => item.category === 'food');
const drinks = menu.filter((item) => item.category === 'drink');
const money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

function MenuCard({ item, selected, onSelect }: { item: MenuItem; selected: boolean; onSelect: () => void }) {
  return <label className={`relative flex min-h-44 cursor-pointer flex-col rounded-2xl border p-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-espresso ${selected ? 'border-espresso bg-cream ring-2 ring-espresso' : 'border-latte/60 bg-sand hover:border-espresso'}`}>
    <input className="sr-only" type="radio" name={item.category} value={item.id} checked={selected} onChange={onSelect} aria-label={`${item.name}, ${money.format(item.price)}`} />
    <span className="flex items-start justify-between gap-3"><span className="font-semibold text-cocoa">{item.name}</span><span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-espresso bg-espresso text-cream' : 'border-latte text-transparent'}`}><Check size={15} weight="bold" /></span></span>
    {item.description && <span className="mt-2 text-sm leading-6 text-cocoa/80">{item.description}</span>}
    <span className="mt-auto pt-4 text-sm font-semibold text-cocoa">{money.format(item.price)}</span>
  </label>;
}

export function RsvpForm() {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<RsvpForm>(initialForm);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpForm, string>>>({});

  function update<K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
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
    if (!Object.keys(nextErrors).length) setStep('review');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true); setMessage('');
    try {
      const result = await submitRsvp(form);
      if (!result.ok) { setMessage(result.error ?? 'We could not save your RSVP. Please try again.'); return; }
      setStep('success');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'We could not save your RSVP. Please try again.'); }
    finally { setBusy(false); }
  }

  if (step === 'success') return <div className="rounded-[2rem] bg-sand p-8 text-center sm:p-12" aria-live="polite"><p className="font-accent text-3xl text-cocoa">RSVP received</p><h2 className="mt-3 font-display text-5xl font-semibold">Thank you, {form.name}.</h2><p className="mx-auto mt-5 max-w-md leading-7 text-cocoa">Your response has been saved.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso">Back to invitation</Link></div>;

  const stepNumber = step === 'details' ? 1 : step === 'menu' ? 2 : 3;
  const selectedFood = food.find((item) => item.id === form.food);
  const selectedDrink = drinks.find((item) => item.id === form.drink);
  const attending = form.attendance === 'yes';

  return <div className="rounded-[2rem] bg-sand p-6 sm:p-10">
    <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa" aria-label={`Step ${stepNumber} of 3`}><span className="h-2 w-2 rounded-full bg-espresso" /> RSVP <span className="text-latte">/</span> {step === 'details' ? 'Details' : step === 'menu' ? 'Menu' : 'Review'}</div>
    <div className="mb-6 h-1 rounded-full bg-latte/40" aria-hidden="true"><div className="h-1 rounded-full bg-espresso transition-all" style={{ width: `${(stepNumber / 3) * 100}%` }} /></div>
    <p className="sr-only" aria-live="polite">Step {stepNumber} of 3</p>
    {message && <p className="mb-5 rounded-xl border border-red-900/20 bg-red-50 p-3 text-sm text-red-950" role="alert" aria-live="assertive">{message}</p>}


    {step === 'details' && <form onSubmit={continueFromDetails} className="space-y-6"><div><label htmlFor="guest-name" className="text-sm font-semibold text-cocoa">Your name</label><input id="guest-name" value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-latte bg-cream px-4 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" aria-invalid={Boolean(errors.name)} />{errors.name && <p className="mt-2 text-sm text-red-950" role="alert">{errors.name}</p>}</div><fieldset><legend className="text-sm font-semibold text-cocoa">Will you be joining?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-cream px-4 ${form.attendance === 'yes' ? 'border-espresso ring-2 ring-espresso' : 'border-latte'}`}><input type="radio" name="attendance" checked={form.attendance === 'yes'} onChange={() => { update('attendance', 'yes'); }} className="h-5 w-5 accent-espresso" /> Yes, I will join</label><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-cream px-4 ${form.attendance === 'no' ? 'border-espresso ring-2 ring-espresso' : 'border-latte'}`}><input type="radio" name="attendance" checked={form.attendance === 'no'} onChange={() => { update('attendance', 'no'); }} className="h-5 w-5 accent-espresso" /> No, I cannot join</label></div>{errors.attendance && <p className="mt-2 text-sm text-red-950" role="alert">{errors.attendance}</p>}</fieldset><div><label htmlFor="guest-note" className="text-sm font-semibold text-cocoa">A note for Nayla <span className="font-normal text-cocoa/70">(optional)</span></label><textarea id="guest-note" value={form.note} onChange={(event) => update('note', event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-latte bg-cream px-4 py-3 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" /></div><button disabled={busy} className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">Continue</button></form>}

    {step === 'menu' && <form onSubmit={continueFromMenu} className="space-y-6"><div><div className="flex items-center gap-2 text-cocoa"><ForkKnife size={20} weight="regular" aria-hidden="true" /><h2 className="font-display text-3xl font-semibold">Choose your food</h2></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{food.map((item) => <MenuCard key={item.id} item={item} selected={form.food === item.id} onSelect={() => update('food', item.id)} />)}</div>{errors.food && <p className="mt-2 text-sm text-red-950" role="alert">{errors.food}</p>}</div><div><div className="flex items-center gap-2 text-cocoa"><Wine size={20} weight="regular" aria-hidden="true" /><h2 className="font-display text-3xl font-semibold">Choose your drink</h2></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{drinks.map((item) => <MenuCard key={item.id} item={item} selected={form.drink === item.id} onSelect={() => update('drink', item.id)} />)}</div>{errors.drink && <p className="mt-2 text-sm text-red-950" role="alert">{errors.drink}</p>}</div><button className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso">Review response</button></form>}

    {step === 'review' && <form onSubmit={submit} className="space-y-6"><div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-cocoa">Review before sending</p><dl className="mt-4 divide-y divide-latte/50 rounded-xl border border-latte bg-cream px-4"><div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="text-sm text-cocoa/70">Name</dt><dd className="font-semibold text-cocoa">{form.name}</dd></div><div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="text-sm text-cocoa/70">Attendance</dt><dd className="font-semibold text-cocoa">{attending ? 'I will join' : 'I cannot join'}</dd></div>{attending && <><div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="text-sm text-cocoa/70">Food</dt><dd className="font-semibold text-cocoa">{selectedFood?.name}</dd></div><div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="text-sm text-cocoa/70">Drink</dt><dd className="font-semibold text-cocoa">{selectedDrink?.name}</dd></div></>}<div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="text-sm text-cocoa/70">Note</dt><dd className="whitespace-pre-wrap font-semibold text-cocoa">{form.note || 'No note'}</dd></div></dl></div><p className="text-sm leading-6 text-cocoa">Please check your response carefully. RSVP responses cannot be edited after submission.</p><button disabled={busy} className="min-h-12 w-full rounded-full bg-espresso px-5 py-3 font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso disabled:opacity-60">{busy ? 'Sending...' : 'Send RSVP'}</button></form>}
  </div>;
}
