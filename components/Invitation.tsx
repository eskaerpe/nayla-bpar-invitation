'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ForkKnife, MapPin, X } from '@phosphor-icons/react';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const iconProps = { size: 20, weight: 'regular' as const, 'aria-hidden': true };

function OutfitModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="outfit-modal-overlay" role="dialog" aria-modal="true" aria-label="Outfit inspiration" onClick={onClose}>
      <div className="outfit-modal-inner" onClick={(event) => event.stopPropagation()}>
        <button className="outfit-modal-close" onClick={onClose} aria-label="Close outfit inspiration">
          <X size={22} weight="bold" aria-hidden />
        </button>
        <Image src="/outfit-inspo.png" alt="Cream and beige outfit inspiration" width={1254} height={1254} className="outfit-modal-img" priority />
      </div>
    </div>
  );
}

export function Invitation() {
  const target = event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;
  const [outfitOpen, setOutfitOpen] = useState(false);
  const mapEmbedSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6!2d107.6072!3d-6.9025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7da08a4d7a3%3A0x1a4d2e3f5b8c9e2f!2sBraci%20by%20Matoa%20Group!5e0!3m2!1sen!2sid!4v1';

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-frame">
          <p className="hero-invite font-accent">You&apos;re invited</p>
          <p className="hero-side-note">Saturday, 17 October 2026 · Braci Bandung</p>
          <h1 id="hero-title" className="hero-name font-display">Nayla<em>&apos;s</em></h1>
          <p className="hero-occasion">Sweet Seventeen</p>
          <div className="hero-date-stamp" aria-label={`Date: ${event.dateLabel}`}>
            <span className="hero-stamp-day">17</span><span className="hero-stamp-month">OCTOBER</span><span className="hero-stamp-year">2026</span>
          </div>
        </div>
      </section>

      <section className="note-section" aria-labelledby="note-title">
        <div className="section-shell note-layout">
          <div className="letter-card">
            <p className="section-kicker">A note for you</p>
            <h2 id="note-title">A page kept<br /><em>for you.</em></h2>
            {event.personalNote ? <p className="letter-copy">{event.personalNote}</p> : null}
            <div className="letter-signoff"><span>With love,</span><strong>Nayla</strong></div>
          </div>
          <p className="letter-aside" aria-hidden="true">save the<br /><strong>date</strong></p>
        </div>
      </section>

      <section className="date-section" aria-labelledby="date-title">
        <div className="section-shell date-layout">
          <div className="date-heading">
            <p className="section-kicker">When we meet</p>
            <h2 id="date-title" className="date-headline">
              <span className="date-headline-day">{event.dayLabel}</span>
              <span className="date-headline-num">17</span>
              <span className="date-headline-month">{event.monthLabel}</span>
              <span className="date-headline-time">{event.timeLabel}</span>
            </h2>
          </div>
          <div className="date-card">
            <p className="section-kicker">At Braci</p>
            <h3 className="date-card-venue">Braci<span className="date-card-venue-muted"> by Matoa Group</span></h3>
            <p className="date-card-address">{event.address}<br />{event.city}</p>
            <div className="map-embed-wrap">
              <iframe src={mapEmbedSrc} title="Braci by Matoa Group location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="map-embed" />
            </div>
            <a href={event.mapUrl ?? '#'} target="_blank" rel="noreferrer" className="map-open-link">Open in Google Maps <ArrowUpRight {...iconProps} size={16} /></a>
          </div>
        </div>
      </section>

      <section className="outfit-section" aria-labelledby="outfit-title">
        <div className="section-shell outfit-layout">
          <div>
            <p className="section-kicker">Dress code</p>
            <h2 id="outfit-title">Cream<br /><em>or beige.</em></h2>
            <p>Wear a soft, warm neutral—whatever feels most like you.</p>
          </div>
          <button className="outfit-inspo-thumb-btn" onClick={() => setOutfitOpen(true)} aria-label="View outfit inspiration photo">
            <Image src="/outfit-inspo.png" alt="Cream and beige outfit inspiration" width={1254} height={1254} className="outfit-inspo-thumb" />
            <span className="outfit-inspo-overlay"><ArrowUpRight size={20} weight="bold" aria-hidden /> View inspiration</span>
          </button>
        </div>
      </section>
      {outfitOpen && <OutfitModal onClose={() => setOutfitOpen(false)} />}

      <section className="details-section" aria-labelledby="details-title">
        <div className="section-shell details-layout">
          <div>
            <p className="section-kicker">A few details</p>
            <h2 id="details-title">Come hungry.<br /><em>Stay awhile.</em></h2>
          </div>
          <div className="details-copy">
            <p>Lunch, games, and a few surprises are waiting at the table.</p>
            <p>Choose one meal and one drink when you RSVP.</p>
            <p className="details-icon-line"><ForkKnife {...iconProps} /> Your lunch is on Nayla.</p>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="section-shell closing-content">
          <p className="section-kicker">Until then</p>
          <h2 id="closing-title">See you<br /><em>on the 17th.</em></h2>
          {target ? <div className="closing-meta-row"><Countdown target={target} /></div> : <p className="closing-pending">{event.closingLine}</p>}
          <Link href="/rsvp" className="closing-cta">RSVP &amp; choose your menu <ArrowUpRight {...iconProps} /></Link>
          <p className="closing-signature font-accent">Nayla&apos;s Sweet Seventeen</p>
        </div>
      </section>
    </main>
  );
}
