import { business } from '../data/business.js';

/** Pulsing WhatsApp button, fixed bottom-right on every page. */
export default function WhatsAppFloat() {
  return (
    <a
      href={business.waLink(`Hi ${business.name}, I'd like a free quote.`)}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-pulse-ring" aria-hidden="true" />
      <span className="relative grid place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-cta hover:scale-105 transition">
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.5 2.1 7.9L.3 31.6l8-2.1c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.6-6.9 15.6-15.5C31.5 7.3 24.6.4 16 .4Zm0 28.4c-2.4 0-4.7-.7-6.7-1.9l-.5-.3-4.7 1.2 1.3-4.6-.3-.5C3.9 20.6 3.1 18.3 3.1 15.9 3.1 8.7 8.9 3 16.1 3c3.4 0 6.7 1.4 9.1 3.8 2.4 2.4 3.8 5.7 3.8 9.1 0 7.1-5.9 12.9-13 12.9Zm7.4-9.7c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.5-.7.2-.2.2-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.7h-.7c-.2 0-.6.1-1 .5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.2c.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9.9.3 1.7.3 2.4.2.7-.1 2.3-.9 2.7-1.9.3-1 .3-1.8.2-1.9-.1-.1-.3-.2-.7-.4Z"/>
        </svg>
      </span>
    </a>
  );
}
