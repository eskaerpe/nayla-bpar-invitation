import { useEffect, type ReactNode } from 'react';

const motionTargets = [
  '.letter-intro', '.personal-note', '.when-section .section-heading', '.date-card', '.map-panel',
  '.outfit-section .section-shell > div:first-child', '.outfit-preview', '.details-heading',
  '.detail-item', '.closing-content > *',
].join(', ');

export function ScrollReveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(motionTargets);
    if (!targets.length) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-revealed'));
      return;
    }

    document.documentElement.classList.add('has-scroll-reveal');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 0px 0px' });

    targets.forEach((target, index) => {
      target.setAttribute('data-reveal', '');
      const delay = (index % 3) * 110;
      target.style.setProperty('--reveal-delay', `${delay}ms`);
      observer.observe(target);
    });

    const onMotionPreferenceChange = () => {
      if (!motionPreference.matches) return;
      document.documentElement.classList.remove('has-scroll-reveal');
      targets.forEach((target) => target.classList.add('is-revealed'));
      observer.disconnect();
    };

    motionPreference.addEventListener('change', onMotionPreferenceChange);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', onMotionPreferenceChange);
      document.documentElement.classList.remove('has-scroll-reveal');
    };
  }, []);

  return <>{children}</>;
}
