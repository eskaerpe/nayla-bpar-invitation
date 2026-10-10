'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin } from '@phosphor-icons/react';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const detailRows = [
  { number: '01', label: 'Venue', value: 'Braci Bandung', copy: event.address ?? event.city },
  { number: '02', label: 'Dress code', value: event.dressCode ?? 'Cream or beige', copy: 'Cream or beige tones are welcome.' },
  { number: '03', label: 'Activities', value: 'Makan-makan bersama · Games · Dan keseruan lainnya', copy: 'An afternoon to eat, play, and celebrate together.' },
  { number: '04', label: 'Reply', value: 'RSVP online', copy: 'Let us know whether you can join.' },
  { number: '05', label: 'Menu', value: 'Braci menu', copy: 'Choose your menu when you RSVP.' },
];

function SectionMarker({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) {
  return <p className={`paper-marker${dark ? ' paper-marker-dark' : ''}`}><span>{number}</span>{children}</p>;
}

export function Invitation() {
  const target = event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;

  return (
    <main className="invitation-page">
      <section className="cover-section">
        <p className="cover-running">NAYLA / SWEET SEVENTEEN / BRACI BANDUNG / 17 OCTOBER</p>
        <div className="cover-frame" aria-hidden="true" />
        <p className="cover-id">Invitation no. 17</p>
        <p className="cover-bloom">A celebration<br />in full bloom</p>
        <p className="cover-invite">You&apos;re invited</p>
        <div className="cover-stamp" aria-label="Sweet seventeen"><span>Sweet<br />Seventeen</span><strong>17</strong></div>
        <div className="cover-orbits" aria-hidden="true"><i /><i /><i /><b /><em /></div>
        <h1 className="cover-title"><span>Nayla&apos;s</span><em>Sweet</em><strong>Seventeen</strong></h1>
        <span className="cover-ghost-number" aria-hidden="true">17</span>
        <div className="cover-footer"><p>Scroll to unfold</p><span>Saturday 17 October 2026 · Braci Bandung</span><i /></div>
      </section>

      <section className="note-section">
        <SectionMarker number="02">Note</SectionMarker>
        <div className="note-card">
          <i className="tape tape-top" aria-hidden="true" />
          <i className="tape tape-bottom" aria-hidden="true" />
          <p className="note-kicker">A little note</p>
          <p className="note-copy">A page kept<br />for you.</p>
          <p className="note-signoff">With love,</p>
          <p className="note-signature">Nayla</p>
        </div>
      </section>

      <section className="place-section">
        <SectionMarker number="03" dark>When / where</SectionMarker>
        <div className="date-block">
          <p>Save the date</p><span>{event.dayLabel}</span><small>{event.timeLabel}</small>
          <strong>17</strong><em>{event.monthLabel} {event.yearLabel}</em>
        </div>
        <article className="place-card">
          <p className="place-meta"><span>Field note 03</span><span>Bandung, ID</span></p>
          <MapPin size={17} weight="fill" aria-hidden="true" />
          <p className="place-kicker">The gathering place</p>
          <h2>Braci<br />Bandung</h2>
          <address>{event.address}<br />{event.city}</address>
          {event.mapUrl && <Link href={event.mapUrl} target="_blank" rel="noreferrer" className="place-link">Open in Google Maps <ArrowUpRight size={14} weight="bold" /></Link>}
          <hr />
          <p className="place-kicker">Outfit references</p>
          <div className="outfit-links">{event.outfitReferences.map((reference) => <Link key={reference.url} href={reference.url} target="_blank" rel="noreferrer">{reference.label} <ArrowUpRight size={12} weight="bold" /></Link>)}</div>
        </article>
      </section>

      <section className="details-section">
        <SectionMarker number="04">Details</SectionMarker>
        <p className="details-eyebrow">The small print</p>
        <h2>Make a note<br />of this.</h2>
        <div className="detail-list">
          {detailRows.map((item) => <article className="detail-row" key={item.number}>
            <span>{item.number}</span><div><p>{item.label}</p><h3>{item.value}</h3><small>{item.copy}</small></div>
          </article>)}
        </div>
      </section>

      <section className="closing-section" id="rsvp">
        <SectionMarker number="05">Until then</SectionMarker>
        <p className="closing-kicker">A final note</p>
        <h2>See you<br />on the 17th.</h2>
        <p className="closing-copy">Save the date. RSVP / Menu</p>
        <Countdown target={target} />
        <Link href="/rsvp" className="rsvp-link">RSVP &amp; choose your menu <ArrowUpRight size={20} weight="bold" /></Link>
        <p className="closing-name">Nayla&apos;s Sweet Seventeen</p>
      </section>
    </main>
  );
}
