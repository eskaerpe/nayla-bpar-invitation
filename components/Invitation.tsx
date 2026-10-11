'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CaretRight, ForkKnife, MapPin, Sparkle, Ticket, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { event } from '@/content/event';
import { Countdown } from './Countdown';
import { ScrollReveal } from './ScrollReveal';

const iconProps = { size: 19, weight: 'regular' as const, 'aria-hidden': true };
const details = [
  { label: 'Dress code', title: 'Cream or beige', copy: 'A soft, celebratory palette to wear to lunch.', Icon: Sparkle },
  { label: 'The afternoon', title: 'Lunch & games', copy: 'Come ready for a long lunch and a little fun.', Icon: ForkKnife },
  { label: 'Your reply', title: 'RSVP is a must', copy: 'Please reply either way, and choose your meal if you can join.', Icon: Ticket },
];

function OutfitLightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    function onKeyDown(event: KeyboardEvent) { if (event.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; previousFocus?.focus(); };
  }, [onClose]);
  return <div className="outfit-dialog" role="dialog" aria-modal="true" aria-label="Outfit inspiration" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="outfit-dialog__panel"><button className="outfit-dialog__close" type="button" onClick={onClose} aria-label="Close outfit inspiration"><X size={21} weight="bold" /></button><Image src="/outfit-inspo.png" alt="Cream and beige party outfit inspiration" width={1254} height={1254} priority /></div>
  </div>;
}

export function Invitation() {
  const target = event.startTime !== 'TIME_TBD' && event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;
  const [showOutfit, setShowOutfit] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  return <ScrollReveal><main>
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-marquee" aria-hidden="true"><div className="hero-marquee-track"><span>NAYLA’S SWEET SEVENTEEN · SATURDAY 17 OCTOBER 2026 · BANDUNG · </span><span>NAYLA’S SWEET SEVENTEEN · SATURDAY 17 OCTOBER 2026 · BANDUNG · </span></div></div>
      <div className="hero-frame"><div className="hero-topline"><span>A birthday invitation</span><span>Bandung · 2026</span></div><div className="hero-orbit hero-orbit--one" aria-hidden="true" /><div className="hero-orbit hero-orbit--two" aria-hidden="true" /><div className="hero-seal" aria-hidden="true"><span>chapter</span><strong>17</strong><span>with love</span></div>
        <div className="hero-copy"><p className="hero-kicker">Birthday Party <Sparkle {...iconProps} size={14} /></p><p className="hero-invite font-accent">you’re invited to</p><p className="hero-celebrate">celebrate</p><h1 id="hero-title">Nayla’s</h1><p className="hero-occasion"><span>Sweet Seventeen</span></p></div>
        <div className="hero-bottomline"><p><strong>Saturday, 17 October 2026</strong><span>13.00–16.00 WIB · Bandung</span></p><a href="#letter">Unfold your invitation <CaretRight size={17} weight="bold" /></a></div>
      </div></section>
      <section className="letter-section" id="letter" aria-labelledby="letter-title"><div className="section-shell letter-grid"><div className="letter-intro"><p className="section-kicker">A note from Nayla</p><h2 id="letter-title">I saved<br />you a <em>place.</em></h2><p>It wouldn’t feel quite the same without you there.</p></div><article className="personal-note"><span className="tape" aria-hidden="true"/><p className="personal-note__label">for you, with love</p><p>{event.personalNote}</p><p className="personal-note__signoff">Love, Nayla</p></article></div></section>
    <section className="when-section" aria-labelledby="when-title"><div className="section-shell"><div className="section-heading"><p className="section-kicker">Save the afternoon</p><h2 id="when-title">A day made <em>for us.</em></h2></div><div className="when-layout"><article className="date-card"><div className="date-heading"><span className="date-heading__day">17</span><span className="date-heading__month"><span>Saturday</span><span>October 2026</span></span></div><div className="date-card__time"><span>Time</span><strong>13.00–16.00 WIB</strong></div><div className="date-card__venue"><p>Meet us at</p><h3>Braci</h3><span>by Matoa Group</span><address>{event.address}</address></div><a className="text-link" href={event.mapUrl ?? '#'} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15} /></a></article>
          <div className={`map-panel${mapFailed ? ' map-panel--fallback' : ''}`}><iframe title="Map showing Braci in Bandung" src="https://maps.google.com/maps?q=Braci%20Jl.%20Sulanjana%20No.%205%20Bandung&t=&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" onError={() => setMapFailed(true)} /><div className="map-panel__fallback"><MapPin size={30} weight="light"/><strong>Braci</strong><span>Jl. Sulanjana No. 5 · Bandung</span><a href={event.mapUrl ?? '#'} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div><p className="map-panel__label">Braci · Bandung</p></div>
        </div></div></section>
    <section className="outfit-section" aria-labelledby="outfit-title"><div className="section-shell outfit-layout"><div><p className="section-kicker">A little something to wear</p><h2 id="outfit-title">Come in<br /><em>soft tones.</em></h2><p className="outfit-copy">Cream or beige, if you’d like. Think easy, elegant, and comfortable for a long lunch.</p></div><button type="button" className="outfit-preview" aria-label="Open outfit inspiration image" onClick={() => setShowOutfit(true)}><Image src="/outfit-inspo.png" alt="Outfit ideas in cream and beige tones" width={1254} height={1254} sizes="(max-width: 700px) 90vw, 44vw" /><span>View the image <ArrowUpRight size={15} /></span></button></div></section>
    <section className="details-section" aria-labelledby="details-title"><div className="section-shell"><div className="details-heading"><p className="section-kicker">The little details</p><h2 id="details-title">Just so <em>you know.</em></h2><p>Everything you need for a lovely afternoon together.</p></div><div className="details-list">{details.map(({ label, title, copy, Icon }) => <article className="detail-item" key={label}><Icon size={22} weight="light"/><div><p>{label}</p><h3>{title}</h3><span>{copy}</span></div></article>)}</div></div></section>
    <section className="closing-section" aria-labelledby="closing-title"><div className="closing-orbit" aria-hidden="true"/><div className="section-shell closing-content"><p className="section-kicker">Counting down to us</p><h2 id="closing-title">See you<br /><em>on the 17th.</em></h2><p className="closing-copy">A seat, a meal, and an afternoon saved just for you.</p><div className="closing-countdown"><Countdown target={target}/></div><Link href="/rsvp" className="button button--primary">RSVP & choose your meal <CaretRight size={18} weight="bold" /></Link><p className="closing-footnote">Please let me know either way.</p></div></section>
    {showOutfit && <OutfitLightbox onClose={() => setShowOutfit(false)} />}
  </main></ScrollReveal>;
}
