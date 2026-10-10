import Link from 'next/link';
import { event } from '@/content/event';
import { Countdown } from './Countdown';

const expectationFacts = [
  { number: '01', label: 'Place', value: event.venue, detail: 'Bandung, Indonesia' },
  { number: '02', label: 'Reply', value: 'Invitation code', detail: 'Use your code to let us know.' },
  { number: '03', label: 'Table', value: 'Braci menu', detail: 'Choose your menu when you RSVP.' },
];

function Spark({ className = '' }: { className?: string }) {
  return <span className={`spark ${className}`} aria-hidden="true">✦</span>;
}

export function Invitation() {
  const target = event.startTime && event.timezone ? new Date(`${event.isoDate}T${event.startTime}${event.timezone}`) : null;

  return (
    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-marquee" aria-hidden="true"><span>NA YLA / SWEET SEVENTEEN / BRACI BANDUNG / 17 OCTOBER 2026 / </span><span>NA YLA / SWEET SEVENTEEN / BRACI BANDUNG / 17 OCTOBER 2026 / </span></div>
        <div className="hero-frame">
          <div className="hero-topline"><span>Invitation no. 17</span><span>Est. 2009 / Chapter 01</span></div>
          <div className="hero-composition">
            <p className="hero-invite font-accent">You&apos;re invited</p>
            <p className="hero-side-note">A celebration<br />in full bloom <Spark /></p>
            <div className="hero-stamp" aria-hidden="true"><span>SEVENTEEN</span><strong>17</strong><span>NAYLA&apos;S DAY</span></div>
            <h1 id="hero-title" className="hero-title">
              <span className="hero-name">{event.person}<em>&apos;s</em></span>
              <span className="hero-number">17</span>
              <span className="hero-occasion font-accent">{event.occasion}</span>
            </h1>
            <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
            <div className="hero-bottomline"><span>Saturday</span><span className="hero-dot">·</span><span>17 October 2026</span><span className="hero-dot">·</span><span>{event.venue}</span></div>
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
            {event.personalNote ? <p className="letter-copy">{event.personalNote}</p> : <p className="letter-copy letter-pending">A personal note will be added here.</p>}
            <div className="letter-signoff"><span>With love,</span><strong>Nayla</strong></div>
            <span className="letter-scribble" aria-hidden="true">always &amp; forever</span>
          </div>
          <div className="letter-aside" aria-hidden="true"><span>save</span><span>the</span><strong>date</strong></div>
        </div>
      </section>

      <section className="date-section" aria-labelledby="date-title">
        <div className="section-shell date-layout">
          <div className="date-heading">
            <div className="section-marker section-marker-dark"><span>03</span><span>When / where</span></div>
            <p className="section-kicker">Save the date</p>
            <h2 id="date-title"><span>Saturday</span><strong>17</strong><span>October 2026</span></h2>
          </div>
          <div className="date-card">
            <div className="date-card-top"><span>Field note 03</span><span>Bandung, ID</span></div>
            <div className="date-card-art" aria-hidden="true"><div className="sun-disc" /><div className="arch-line" /><div className="arch-line arch-line-small" /><Spark className="date-spark" /></div>
            <p className="section-kicker">The gathering place</p>
            <h3>{event.venue}</h3>
            <p>Bandung, Indonesia</p>
            <span className="date-card-foot">Details to follow <span>↗</span></span>
          </div>
        </div>
      </section>

      <section className="facts-section" aria-labelledby="facts-title">
        <div className="section-shell">
          <div className="facts-heading">
            <div className="section-marker"><span>04</span><span>Details</span></div>
            <p className="section-kicker">The small print</p>
            <h2 id="facts-title">Make a note<br /><em>of this.</em></h2>
          </div>
          <ol className="facts-list" aria-label="Invitation details">
            {expectationFacts.map((fact) => <li className="fact-row" key={fact.label}>
              <span className="fact-number">{fact.number}</span>
              <div><p className="fact-label">{fact.label}</p><p className="fact-value">{fact.value}</p><p className="fact-detail">{fact.detail}</p></div>
              <span className="fact-arrow" aria-hidden="true">↗</span>
            </li>)}
          </ol>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="closing-orbit closing-orbit-one" aria-hidden="true" /><div className="closing-orbit closing-orbit-two" aria-hidden="true" />
        <div className="section-shell closing-content">
          <div className="section-marker section-marker-dark"><span>05</span><span>Until then</span></div>
          <p className="section-kicker">Until then</p>
          <h2 id="closing-title">See you<br /><em>on the 17th.</em></h2>
          <div className="closing-meta"><span>Save your seat</span><span>RSVP / Menu</span></div>
          {target ? <Countdown target={target} /> : <p className="closing-pending">The evening details are being prepared.</p>}
          <Link href="/rsvp" className="closing-cta">RSVP &amp; choose your menu <span aria-hidden="true">↗</span></Link>
          <p className="closing-signature font-accent">Nayla&apos;s Sweet Seventeen</p>
        </div>
      </section>
    </main>
  );
}