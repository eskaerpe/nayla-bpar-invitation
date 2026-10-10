import Link from 'next/link';
import { ArrowUpRight, ForkKnife, MapPin, Sparkle, Ticket } from '@phosphor-icons/react/dist/ssr';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const iconProps = { size: 20, weight: 'regular' as const, 'aria-hidden': true };

const expectationFacts = [
  { number: '01', label: 'Venue', value: event.venue, detail: event.city, Icon: MapPin },
  { number: '02', label: 'Reply', value: 'RSVP online', detail: 'Let us know whether you can join.', Icon: Ticket },
  { number: '03', label: 'Menu', value: 'Braci menu', detail: 'Choose your menu when you RSVP.', Icon: ForkKnife },
];

export function Invitation() {
  const target = event.startTime !== 'TIME_TBD' && event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;

  return (
    <main>
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
            <p className="hero-side-note">A celebration<br />in full bloom <Sparkle {...iconProps} size={16} /></p>
            <div className="hero-stamp" aria-hidden="true"><span>SEVENTEEN</span><strong>17</strong><span>NAYLA&apos;S DAY</span></div>
            <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
            <h1 id="hero-title" className="hero-title">
              <span className="hero-name">{event.person}<em>&apos;s</em></span>
              <span className="hero-number" aria-hidden="true">17</span>
              <span className="hero-occasion font-accent">{event.occasion}</span>
            </h1>
            <div className="hero-bottomline">
              <span>{event.dayLabel}</span><span className="hero-dot" aria-hidden="true" /><span>{event.dateLabel}</span><span className="hero-dot" aria-hidden="true" /><span>{event.venue}</span>
            </div>
          </div>
          <div className="hero-scroll"><span>Scroll to unfold</span><span className="hero-scroll-line" /></div>
        </div>
      </section>

      <section className="letter-section" aria-labelledby="note-title">
        <div className="section-shell letter-layout">
          <div className="section-marker"><span>02</span><span>Note</span></div>
          <div className="letter-sheet">
            <div className="paper-tape paper-tape-left" aria-hidden="true" />
            <div className="paper-tape paper-tape-right" aria-hidden="true" />
            <p className="section-kicker">A little note</p>
            <h2 id="note-title">A page kept<br /><em>for you.</em></h2>
            {event.personalNote ? <p className="letter-copy">{event.personalNote}</p> : null}
            <div className="letter-signoff"><span>With love,</span><strong>Nayla</strong></div>
          </div>
          <div className="letter-aside" aria-hidden="true"><span>save</span><span>the</span><strong>date</strong></div>
        </div>
      </section>

      <section className="date-section" aria-labelledby="date-title">
        <div className="section-shell date-layout">
          <div className="date-heading">
            <div className="section-marker section-marker-dark"><span>03</span><span>When / where</span></div>
            <p className="section-kicker">Save the date</p>
            <h2 id="date-title"><span>{event.dayLabel}</span><small className="date-time-caption">{event.timeLabel}</small><strong>17</strong><span>{event.monthLabel} {event.yearLabel}</span></h2>
          </div>
          <div className="date-card">
            <div className="date-card-top"><span>Field note 03</span><span>{event.city.replace(', Indonesia', ', ID')}</span></div>
            <div className="date-card-art" aria-hidden="true"><div className="sun-disc" /><div className="arch-line" /><div className="arch-line arch-line-small" /><Sparkle className="date-spark" {...iconProps} size={24} /></div>
            <p className="section-kicker">The gathering place</p>
            <h3>{event.venue}</h3>
            <p>{event.address}<br />{event.city}</p>
            {event.mapUrl ? <Link href={event.mapUrl} target="_blank" rel="noreferrer" className="venue-map-link">Open in Google Maps <ArrowUpRight {...iconProps} size={16} /></Link> : null}
          </div>
        </div>
      </section>

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
              return <li className="fact-row" key={fact.label}>
                <span className="fact-number">{fact.number}</span>
                <div><p className="fact-label">{fact.label}</p><p className="fact-value">{fact.value}</p><p className="fact-detail">{fact.detail}</p></div>
                <Icon className="fact-icon" {...iconProps} />
              </li>;
            })}
          </ol>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="closing-orbit closing-orbit-one" aria-hidden="true" /><div className="closing-orbit closing-orbit-two" aria-hidden="true" />
        <div className="section-shell closing-content">
          <div className="section-marker section-marker-dark"><span>05</span><span>Until then</span></div>
          <p className="section-kicker">A final note</p>
          <h2 id="closing-title">See you<br /><em>on the 17th.</em></h2>
          <div className="closing-action">
            <div className="closing-meta"><span>Save your seat</span><span>RSVP / Menu</span></div>
            {target ? <Countdown target={target} /> : <p className="closing-pending">{event.closingLine}</p>}
            <Link href="/rsvp" className="closing-cta">RSVP &amp; choose your menu <ArrowUpRight {...iconProps} /></Link>
          </div>
          <p className="closing-signature font-accent">Nayla&apos;s Sweet Seventeen</p>
        </div>
      </section>
    </main>
  );
}
