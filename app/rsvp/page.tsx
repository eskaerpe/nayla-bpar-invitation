import Link from 'next/link';
import { RsvpForm } from '@/components/RsvpForm';

export const metadata = {
  title: 'RSVP · Nayla’s Sweet Seventeen',
  description: 'Reply to Nayla’s Sweet Seventeen invitation.',
};

export default function RsvpPage() {
  return <main className="rsvp-page"><div className="rsvp-page__marquee">NAYLA&apos;S BIRTHDAY PARTY · RSVP · 17 OCTOBER 2026 · </div><div className="rsvp-page__shell"><Link href="/" className="rsvp-back">← Back to invitation</Link><header className="rsvp-intro"><p className="section-kicker">A little note for Nayla</p><p className="font-accent">will you be there?</p><h1>Count me<br /><em>in.</em></h1><p>Every guest needs to reply — whether you are joining us or sending love from afar.</p></header><div className="rsvp-form-wrap"><RsvpForm /></div></div></main>;
}
