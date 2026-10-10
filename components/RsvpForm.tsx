'use client';

import Link from 'next/link';
import { Check, ForkKnife, Wine } from '@phosphor-icons/react';
import { useEffect, useState, type FormEvent } from 'react';
import { menu, type MenuItem } from '@/content/menu';
import { INVITATION_STORAGE_KEY, parseStoredGuest } from '@/lib/invitations';
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

function Review({ form, selectedFood, selectedDrink }: { form: RsvpForm; selectedFood?: MenuItem; selectedDrink?: MenuItem }) {
  return <dl className="divide-y divide-latte/40 rounded-2xl border border-latte/60 bg-cream">
    <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">Name</dt><dd className="font-semibold text-cocoa">{form.name}</dd></div>
    <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">Attendance</dt><dd className="font-semibold text-cocoa">{form.attendance === 'yes' ? 'Yes, I will join' : 'Sorry, I cannot join'}</dd></div>
    {form.attendance === 'yes' && <>
      <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">Food</dt><dd className="font-semibold text-cocoa">{selectedFood?.name}</dd></div>
      <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">Drink</dt><dd className="font-semibold text-cocoa">{selectedDrink?.name}</dd></div>
    </>}
    <div className="grid gap-1 p-4 sm:grid-cols-[8rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.16em] text-cocoa/70">Note</dt><dd className="whitespace-pre-wrap text-cocoa">{form.note || '—'}</dd></div>
  </dl>;
}

export function RsvpForm() {
  const [form, setForm] = useState<RsvpForm>(initialForm);
  const [step, setStep] = useState<Step>('details');
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpForm, string>>>({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestReady, setGuestReady] = useState(false);

  useEffect(() => {
    const guest = parseStoredGuest(window.sessionStorage.getItem(INVITATION_STORAGE_KEY));
    if (guest) setForm((current) => ({ ...current, name: guest.name, note: guest.note }));
    setGuestReady(true);
  }, []);

  function update<K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setMessage('');
  }

  function continueFromDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.attendance) return;
    setStep(form.attendance === 'yes' ? 'menu' : 'review');
  }

  function continueFromMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (nextErrors.food || nextErrors.drink) return;
    setStep('review');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);
    try {
      await submitRsvp(form);
      setStep('success');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'We could not send your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const stepNumber = step === 'details' ? 1 : step === 'menu' ? 2 : 3;
  const selectedFood = food.find((item) => item.id === form.food);
  const selectedDrink = drinks.find((item) => item.id === form.drink);

  if (!guestReady) return <div className="rounded-[2rem] bg-sand p-6 sm:p-10" aria-busy="true" />;

  return <div className="rounded-[2rem] bg-sand p-6 sm:p-10">
    {step !== 'success' && <>
      <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa" aria-label={`Step ${stepNumber} of 3`}><span className="h-2 w-2 rounded-full bg-espresso" /> RSVP <span className="text-latte">/</span> {step === 'details' ? 'Details' : step === 'menu' ? 'Menu' : 'Review'}</div>
      <div className="mb-6 h-1 rounded-full bg-latte/40" aria-hidden="true"><div className="h-1 rounded-full bg-espresso transition-all" style={{ width: `${(stepNumber / 3) * 100}%` }} /></div>
    </>}
    <p className="sr-only" aria-live="polite">{step === 'success' ? 'RSVP sent' : `Step ${stepNumber} of 3`}</p>
    {message && <p className="mb-5 rounded-xl border border-red-900/20 bg-red-50 p-3 text-sm text-red-950" role="alert" aria-live="assertive">{message}</p>}

    {step === 'details' && <form onSubmit={continueFromDetails} className="space-y-6"><div><label htmlFor="guest-name" className="text-sm font-semibold text-cocoa">Your name</label><input id="guest-name" value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-latte bg-cream px-4 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" aria-invalid={Boolean(errors.name)} />{errors.name && <p className="mt-2 text-sm text-red-950" role="alert">{errors.name}</p>}</div><fieldset><legend className="text-sm font-semibold text-cocoa">Will you be joining?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 ${form.attendance === 'yes' ? 'border-espresso bg-cream ring-2 ring-espresso' : 'border-latte bg-cream'}`}><input type="radio" name="attendance" value="yes" checked={form.attendance === 'yes'} onChange={() => update('attendance', 'yes')} /> Yes, I will join</label><label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 ${form.attendance === 'no' ? 'border-espresso bg-cream ring-2 ring-espresso' : 'border-latte bg-cream'}`}><input type="radio" name="attendance" value="no" checked={form.attendance === 'no'} onChange={() => update('attendance', 'no')} /> Sorry, I cannot join</label></div>{errors.attendance && <p className="mt-2 text-sm text-red-950" role="alert">{errors.attendance}</p>}</fieldset><div><label htmlFor="guest-note" className="text-sm font-semibold text-cocoa">A note for Nayla <span className="font-normal text-cocoa/70">(optional)</span></label><textarea id="guest-note" value={form.note} onChange={(event) => update('note', event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-latte bg-cream px-4 py-3 text-cocoa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso" /></div><button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-espresso px-6 font-semibold text-cream transition hover:bg-cocoa">Continue to menu <ForkKnife size={18} className="ml-2" /></button></form>}
    {step === 'menu' && <form onSubmit={continueFromMenu} className="space-y-8"><fieldset><legend className="flex items-center gap-2 font-display text-3xl text-espresso"><ForkKnife size={22} aria-hidden="true" /> Choose 1 food</legend><p className="mt-2 text-sm text-cocoa">One selection only.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{food.map((item) => <MenuCard key={item.id} item={item} selected={form.food === item.id} onSelect={() => update('food', item.id)} />)}</div>{errors.food && <p className="mt-3 text-sm text-red-950" role="alert">{errors.food}</p>}</fieldset><fieldset><legend className="flex items-center gap-2 font-display text-3xl text-espresso"><Wine size={22} aria-hidden="true" /> Choose 1 drink</legend><p className="mt-2 text-sm text-cocoa">One selection only.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{drinks.map((item) => <MenuCard key={item.id} item={item} selected={form.drink === item.id} onSelect={() => update('drink', item.id)} />)}</div>{errors.drink && <p className="mt-3 text-sm text-red-950" role="alert">{errors.drink}</p>}</fieldset><div className="flex flex-wrap gap-3"><button type="button" onClick={() => setStep('details')} className="min-h-12 rounded-full border border-espresso px-6 font-semibold text-espresso">Back</button><button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-espresso px-6 font-semibold text-cream transition hover:bg-cocoa">Review RSVP <ForkKnife size={18} className="ml-2" /></button></div></form>}
    {step === 'review' && <form onSubmit={submit} className="space-y-6"><div><p className="section-kicker">Almost there</p><h2 className="mt-2 font-display text-4xl text-espresso">Check your reply.</h2><p className="mt-3 text-sm leading-6 text-cocoa">Review the details below before sending. Menu choices are final after submission.</p></div><Review form={form} selectedFood={selectedFood} selectedDrink={selectedDrink} /><div className="flex flex-wrap gap-3"><button type="button" onClick={() => setStep(form.attendance === 'yes' ? 'menu' : 'details')} className="min-h-12 rounded-full border border-espresso px-6 font-semibold text-espresso">Edit</button><button type="submit" disabled={isSubmitting} className="min-h-12 rounded-full bg-espresso px-6 font-semibold text-cream disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Sending…' : 'Submit RSVP'}</button></div></form>}
    {step === 'success' && <div className="space-y-6"><div><p className="section-kicker">Reply received</p><h2 className="mt-2 font-display text-5xl text-espresso">Thank you, {form.name}.</h2><p className="mt-3 text-sm leading-6 text-cocoa">Your reply is saved. If you need to change your menu choice, please contact Nayla directly.</p></div><Review form={form} selectedFood={selectedFood} selectedDrink={selectedDrink} /><Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-espresso px-6 font-semibold text-cream">Back to invitation</Link></div>}
  </div>;
}
