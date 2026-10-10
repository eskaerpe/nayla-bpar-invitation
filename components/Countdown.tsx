'use client';

import { useEffect, useState } from 'react';
import { getCountdown, type Countdown as CountdownValue } from '@/lib/countdown';

type Props = { target: Date | null };
export function Countdown({ target }: Props) {
  const [value, setValue] = useState<CountdownValue | null>(() => getCountdown(target));
  useEffect(() => {
    if (!target) return;
    const update = () => setValue(getCountdown(target));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  if (!value) return null;
  return <div className="grid grid-cols-4 gap-2 text-center" aria-label="Countdown to the celebration">
    {Object.entries(value).map(([unit, number]) => <div key={unit} className="rounded-2xl bg-cream/70 px-2 py-3"><strong className="block font-display text-3xl leading-none">{String(number).padStart(2, '0')}</strong><span className="mt-1 block text-[0.65rem] uppercase tracking-[0.18em] text-cocoa">{unit}</span></div>)}
  </div>;
}
