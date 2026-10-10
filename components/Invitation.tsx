'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ForkKnife, MapPin, Sparkle, Ticket, X } from '@phosphor-icons/react';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const iconProps = { size: 20, weight: 'regular' as const, 'aria-hidden': true };

// ── Details / facts ──────────────────────────────────────────────
const expectationFacts = [
  {
    number: '01',
    label: 'Venue',
    value: event.venue,
    valueNode: (
      <p className="fact-value">
        <span>Braci</span>
        <span className="fact-value-muted"> by Matoa Group</span>
      </p>
    ),
    detail: event.address ?? event.city,
    Icon: MapPin,
  },
  {
    number: '02',
    label: 'Dress code',
    value: null,
    valueNode: <p className="fact-value">{event.dressCode ?? 'To be announced'}</p>,
    detail: 'Think soft, warm neutrals — cream, ivory, ecru, or beige.',
    Icon: Sparkle,
  },
  {
    number: '03',
    label: 'Activities',
    value: null,
    valueNode: <p className="fact-value">{event.activities?.join(', ') ?? 'To be announced'}</p>,
    detail: 'An afternoon of food, fun, and good company.',
    Icon: Sparkle,
  },
  {
    number: '04',
    label: 'Reply',
    value: null,
    valueNode: <p className="fact-value">RSVP online</p>,
    detail: 'Scroll to the bottom and fill in your RSVP — it only takes a minute.',
    Icon: Ticket,
  },
  {
    number: '05',
    label: 'Hunger buster',
    value: null,
    valueNode: <p className="fact-value">Free lunch, on Nayla</p>,
    detail: "We've got your hunger covered — just don't forget to choose your meal when you RSVP.",
    Icon: ForkKnife,
  },
];

// ── Outfit modal ─────────────────────────────────────────────────
function OutfitModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="outfit-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Outfit inspiration"
      onClick={onClose}
    >
      <div className="outfit-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="outfit-modal-close" onClick={onClose} aria-label="Close">
          <X size={22} weight="bold" aria-hidden />
        </button>
        <Image
          src="/outfit-inspo.png"
          alt="Cream and beige outfit inspiration"
          width={1254}
          height={1254}
          className="outfit-modal-img"
          priority
        />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function Invitation() {
  const target = event.timezone
    ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`)
    : null;

  const [outfitOpen, setOutfitOpen] = useState(false);

  // Google Maps embed ID extracted from the short URL's redirect — use the raw coords embed
  // Braci Bandung: Jl. Sulanjana No. 5 → lat/lng approximate for embed
  const mapEmbedSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6!2d107.6072!3d-6.9025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7da08a4d7a3%3A0x1a4d2e3f5b8c9e2f!2sBraci%20by%20Matoa%20Group!5e0!3m2!1sen!2sid!4v1';

  return (
    <main>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-track">
            <span>NAYLA / SWEET SEVENTEEN / BRACI BANDUNG / 17 OCTOBER 2026</span>
            <span>NAYLA / SWEET SEVENTEEN / BRACI BANDUNG / 17 OCTOBER 2026</span>
          </div>
        </div>
        <div className="hero-frame">
          <div className="hero-topline"><span>Invitation no. 17</span><span>Chapter 01 / 2026</span></div>
          <div className="hero-composition">
            <p className="hero-invite font-accent">You&apos;re invited</p>
            <p className="hero-side-note">A birthday worth remembering</p>
            <h1 id="hero-title" className="hero-name font-display">Nayla<em>&apos;s</em></h1>
            <p className="hero-occasion">Sweet Seventeen</p>
          </div>
          <div className="hero-date-stamp" aria-label={`Date: ${event.dateLabel}`}>
            <span className="hero-stamp-day">17</span>
            <span className="hero-stamp-month">OCT</span>
            <span className="hero-stamp-year">2026</span>
          </div>
        </div>
      </section>

      {/* ── NOTE ───────────────────────────────────────────── */}
      <section className="note-section" aria-labelledby="note-title">
        <div className="section-shell note-layout">
          <div className="section-marker"><span>02</span><span>A note</span></div>
          <div className="letter-card">
            <h2 id="note-title">A page kept<br /><em>for you.</em></h2>
            {event.personalNote
              ? <p className="letter-copy">{event.personalNote}</p>
              : null}
            <div className="letter-signoff"><span>With love,</span><strong>Nayla</strong></div>
          </div>
          <div className="letter-aside" aria-hidden="true"><span>save</span><span>the</span><strong>date</strong></div>
        </div>
      </section>

      {/* ── WHEN / WHERE ───────────────────────────────────── */}
      <section className="date-section" aria-labelledby="date-title">
        <div className="section-shell date-layout">

          {/* Left: typographic date headline */}
          <div className="date-heading">
            <div className="section-marker section-marker-dark"><span>03</span><span>When / where</span></div>
            <h2 id="date-title" className="date-headline">
              <span className="date-headline-day">{event.dayLabel}</span>
              <span className="date-headline-num">17</span>
              <span className="date-headline-month">{event.monthLabel}</span>
              <span className="date-headline-time">{event.timeLabel}</span>
            </h2>
          </div>

          {/* Right: card */}
          <div className="date-card">
            <div className="date-card-top">
              <span>Field note 03</span>
              <span>{event.city.replace(', Indonesia', ', ID')}</span>
            </div>

            {/* Decorative art */}
            <div className="date-card-art" aria-hidden="true">
              <div className="sun-disc" />
              <div className="arch-line" />
              <div className="arch-line arch-line-small" />
              <Sparkle className="date-spark" {...iconProps} size={24} />
            </div>

            {/* Venue */}
            <p className="section-kicker">The gathering place</p>
            <h3 className="date-card-venue">
              Braci<span className="date-card-venue-muted"> by Matoa Group</span>
            </h3>
            <p className="date-card-address">{event.address}<br />{event.city}</p>

            {/* Google Maps embed */}
            <div className="map-embed-wrap">
              <iframe
                src={mapEmbedSrc}
                title="Braci by Matoa Group location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="map-embed"
              />
            </div>
            <a
              href={event.mapUrl ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="map-open-link"
            >
              Open in Google Maps <ArrowUpRight {...iconProps} size={16} />
            </a>

            {/* Outfit inspo */}
            <div className="outfit-references">
              <p className="outfit-references-label">Dress code inspiration</p>
              <button
                className="outfit-inspo-thumb-btn"
                onClick={() => setOutfitOpen(true)}
                aria-label="View outfit inspiration photo"
              >
                <Image
                  src="/outfit-inspo.png"
                  alt="Cream and beige outfit inspiration"
                  width={320}
                  height={320}
                  className="outfit-inspo-thumb"
                />
                <span className="outfit-inspo-overlay">
                  <ArrowUpRight size={20} weight="bold" aria-hidden /> View
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {outfitOpen && <OutfitModal onClose={() => setOutfitOpen(false)} />}

      {/* ── DETAILS ────────────────────────────────────────── */}
      <section className="facts-section" aria-labelledby="facts-title">
        <div className="section-shell facts-layout">
          <div className="facts-heading">
            <div className="section-marker"><span>04</span><span>Details</span></div>
            <p className="section-kicker">The small print</p>
            <h2 id="facts-title">Make a note<br /><em>of this.</em></h2>
          </div>
          <ol className="facts-list" aria-label="Invitation details">
            {expectationFacts.map((fact) => {
              const Icon = fact.Icon;
              return (
                <li className="fact-row" key={fact.label}>
                  <span className="fact-number">{fact.number}</span>
                  <div>
                    <p className="fact-label">{fact.label}</p>
                    {fact.valueNode}
                    <p className="fact-detail">{fact.detail}</p>
                  </div>
                  <Icon className="fact-icon" {...iconProps} />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── UNTIL THEN / CLOSING ───────────────────────────── */}
      <section className="closing-section" aria-labelledby="closing-title">
        <div className="section-shell closing-content">
          <div className="section-marker section-marker-dark"><span>05</span><span>Until then</span></div>
          <h2 id="closing-title">See you<br /><em>on the 17th.</em></h2>

          <div className="closing-meta-row">
            {target ? (
              <Countdown target={target} />
            ) : (
              <p className="closing-pending">{event.closingLine}</p>
            )}
          </div>

          <Link href="/rsvp" className="closing-cta">
            RSVP &amp; choose your menu <ArrowUpRight {...iconProps} />
          </Link>

          <p className="closing-signature font-accent">Nayla&apos;s Sweet Seventeen</p>
        </div>
      </section>
    </main>
  );
}
