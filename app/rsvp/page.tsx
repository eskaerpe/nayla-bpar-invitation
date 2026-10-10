import Link from 'next/link';
import { RsvpForm } from '@/components/RsvpForm';

export const metadata = {
  title: 'RSVP · Nayla’s Sweet Seventeen',
  description: 'Reply to Nayla’s Sweet Seventeen invitation.',
};

export default function RsvpPage() {
  return <main className="min-h-screen px-5 py-8 sm:px-10 sm:py-12"><div className="mx-auto max-w-2xl"><Link href="/" className="inline-flex min-h-10 items-center text-sm font-semibold text-cocoa underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-espresso">← Back to invitation</Link><div className="mt-14"><p className="font-accent text-2xl text-cocoa">Nayla’s sweet seventeen</p><h1 className="mt-2 font-display text-6xl font-semibold leading-[0.88] sm:text-8xl">Count me<br /><em className="font-accent font-medium text-cocoa">in.</em></h1><p className="mt-5 max-w-md text-sm leading-6 text-cocoa">We’d love to know if you can make it. Your response helps us make the evening lovely for everyone.</p></div><div className="mt-10"><RsvpForm /></div></div></main>;
}
