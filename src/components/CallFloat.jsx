import { business } from '../data/business.js';

/** Mobile-only call button (bottom-left), so WhatsApp + Call don't overlap. */
export default function CallFloat() {
  return (
    <a
      href={`tel:${business.phone.tel}`}
      aria-label="Call us now"
      className="fixed bottom-5 left-5 z-50 md:hidden grid place-items-center
                 h-14 w-14 rounded-full bg-brand text-white shadow-cta
                 hover:scale-105 transition"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}
