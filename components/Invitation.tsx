'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CaretRight, ForkKnife, MapPin, Sparkle, Ticket, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const iconProps = { size: 19, weight: 'regular' as const, 'aria-hidden': true };

const details = [
  {
    number: '01',
    label: 'The table',
    title: <> <strong>Braci</strong><span> by Matoa Group</span></>,
    copy: 'A long lunch, a little celebration, and all of us in one place.',
    Icon: MapPin,
  },
  {
    number: '02',
    label: 'Your reply',
    title: <>RSVP <span>online</span></>,
    copy: 'Every guest, even if you cannot make it: scroll to the bottom and let me know if you are coming.',
    Icon: Ticket,
  },
  {
    number: '03',
    label: 'Hunger buster',
    title: <>Lunch <span>is on me</span></>,
    copy: "I've got your hunger covered — just do not forget to pick your favorites.",
    Icon: ForkKnife,
  },
];

function OutfitLightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="outfit-dialog" role="dialog" aria-modal="true" aria-label="Outfit inspiration" onMouseDown={onClose}>
      <div className="outfit-dialog__panel" onMouseDown={(event) => event.stopPropagation()}>
        <button className="outfit-dialog__close" type="button" onClick={onClose} aria-label="Close outfit inspiration"><X size={21} weight="bold" /></button>
        <Image src="/outfit-inspo.png" alt="Cream and beige party outfit inspiration" width={1254} height={1254} priority />
      </div>
    </div>
  );
}

export function Invitation() {
  const target = event.startTime !== 'TIME_TBD' && event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;
  const [showOutfit, setShowOutfit] = useState(false);

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-marquee" aria-hidden="true"><div className="hero-marquee-track"><span>NAYLA&apos;S BIRTHDAY PARTY · 17 OCTOBER 2026 · BRACI BY MATOA GROUP · </span><span>NAYLA&apos;S BIRTHDAY PARTY · 17 OCTOBER 2026 · BRACI BY MATOA GROUP · </span></div></div>
        <div className="hero-frame">
          <div className="hero-topline"><span>Private invitation</span><span>Bandung · 2026</span></div>
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" /><div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="hero-seal" aria-hidden="true"><span>chapter</span><strong>17</strong><span>with love</span></div>
          <div className="hero-copy">
            <p className="hero-kicker">Birthday Party <Sparkle {...iconProps} size={14} /></p>
            <p className="hero-invite font-accent">come celebrate</p>
            <h1 id="hero-title">Nayla</h1>
            <p className="hero-occasion">Sweet <em>Seventeen</em></p>
          </div>
          <div className="hero-bottomline"><p><strong>Saturday, 17 October</strong><span>13.00–16.00 WIB · Bandung</span></p><a href="#letter">Scroll to unfold <CaretRight size={17} weight="bold" /></a></div>
        </div>
      </section>

      <section className="letter-section" id="letter" aria-labelledby="letter-title">
        <div className="section-shell letter-grid">
          <div className="letter-intro"><p className="section-kicker">A note from Nayla</p><h2 id="letter-title">A page kept<br />for <em>you.</em></h2></div>
          <article className="personal-note"><span className="tape tape--left" aria-hidden="true" /><span className="tape tape--right" aria-hidden="true" /><p>{event.personalNote}</p><p className="personal-note__signoff">With love,<br /><span>Nayla</span></p></article>
        </div>
      </section>

      <section className="when-section" aria-labelledby="when-title">
        <div className="section-shell">
          <div className="date-heading"><div><p className="section-kicker">Save the date</p><p className="date-heading__day">{event.dayLabel}</p></div><strong aria-label="17 October 2026">17</strong><div className="date-heading__month"><span>{event.monthLabel}</span><span>{event.yearLabel}</span></div></div>
          <div className="when-layout">
            <article className="date-card" aria-labelledby="when-title"><p className="section-kicker">When / Where</p><h2 id="when-title">Meet me<br />at <em>Braci.</em></h2><p className="venue-subtitle">by Matoa Group</p><dl><div><dt>When</dt><dd>{event.timeLabel}<br />{event.dayLabel}, 17 {event.monthLabel} {event.yearLabel}</dd></div><div><dt>Where</dt><dd>{event.address}</dd></div></dl><a href={event.mapUrl ?? '#'} target="_blank" rel="noreferrer" className="text-link">Open in Google Maps <ArrowUpRight size={17} weight="bold" /></a></article>
            <div className="map-panel"><iframe title="Map to Braci by Matoa Group" src="https://www.google.com/maps?q=Braci%20by%20Matoa%20Group%2C%20Jl.%20Sulanjana%20No.%205%2C%20Bandung&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><p>Jl. Sulanjana No. 5, Bandung</p></div>
          </div>
        </div>
      </section>

      <section className="outfit-section" aria-labelledby="outfit-title"><div className="section-shell outfit-layout"><div><p className="section-kicker">Dress code</p><h2 id="outfit-title">Cream &amp; beige,<br /><em>made personal.</em></h2><p>Soft neutrals, warm layers, and anything that makes you feel good. Come dressed in your own version of cream or beige.</p><button className="text-link" type="button" onClick={() => setShowOutfit(true)}>See outfit inspiration <ArrowUpRight size={17} weight="bold" /></button></div><button className="outfit-preview" type="button" onClick={() => setShowOutfit(true)} aria-label="Open outfit inspiration"><Image src="/outfit-inspo.png" alt="Cream and beige party outfit inspiration" width={1254} height={1254} /><span>Tap to expand</span></button></div></section>

      <section className="details-section" aria-labelledby="details-title"><div className="section-shell"><div className="details-heading"><p className="section-kicker">Little details</p><h2 id="details-title">For a lovely<br /><em>afternoon.</em></h2><p>Lunch, games &amp; more surprises — the only thing missing is you.</p></div><div className="details-list">{details.map(({ number, label, title, copy, Icon }) => <article className="detail-item" key={number}><span className="detail-item__number">{number}</span><Icon {...iconProps} /><div><p>{label}</p><h3>{title}</h3><span>{copy}</span></div></article>)}</div></div></section>

      <section className="closing-section" id="rsvp" aria-labelledby="closing-title"><div className="closing-orbit" aria-hidden="true" /><div className="section-shell closing-content"><p className="section-kicker">Until then</p><h2 id="closing-title">See you<br />on the <em>17th.</em></h2><p className="closing-copy">Count down with me. I cannot wait to make this little chapter one to remember.</p><Countdown target={target} /><div className="closing-actions"><Link href="/rsvp" className="button button--light">RSVP &amp; choose your menu <ArrowUpRight size={18} weight="bold" /></Link><a href="#letter" className="button button--quiet">Read the invitation again</a></div></div></section>
      {showOutfit && <OutfitLightbox onClose={() => setShowOutfit(false)} />}
    </main>
  );
}
