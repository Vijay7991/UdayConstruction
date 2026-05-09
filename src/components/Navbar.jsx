import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business } from '../data/business.js';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/services',   label: 'Services' },
  { to: '/portfolio',  label: 'Portfolio' },
  { to: '/estimate',   label: 'Estimate' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
];

// Split the business name into a "first word" + "rest" for the two-tone logo.
function splitBrand(name) {
  const i = name.indexOf(' ');
  return i === -1 ? [name, ''] : [name.slice(0, i), name.slice(i + 1)];
}

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScroll] = useState(false);
  const { pathname }          = useLocation();

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-soft' : 'bg-white'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label={business.name}>
          <Logo />
          <span className="text-lg font-extrabold text-navy-500 leading-none">
            {(() => {
              const [first, rest] = splitBrand(business.name);
              return (
                <>
                  {first}{rest && ' '}
                  {rest && <span className="text-brand">{rest}</span>}
                </>
              );
            })()}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-navy-500 hover:bg-navy-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${business.phone.tel}`} className="btn-outline !py-2 !px-4 text-sm">
            <PhoneIcon className="h-4 w-4" /> {business.phone.display}
          </a>
          <Link to="/contact" className="btn-primary !py-2 !px-4 text-sm">
            Get Free Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="md:hidden rounded-lg p-2 text-navy-500 hover:bg-navy-50"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-navy-50 bg-white">
          <nav className="container-x flex flex-col py-4">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-semibold ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-500'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={`tel:${business.phone.tel}`} className="btn-outline !py-2.5 text-sm">
                <PhoneIcon className="h-4 w-4" /> Call
              </a>
              <Link to="/contact" className="btn-primary !py-2.5 text-sm">
                Free Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- inline icons (no external deps) ---------- */
function Logo() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#1A1A2E" />
      <path d="M14 44 L14 28 L32 14 L50 28 L50 44 Z" fill="#E86A1A" />
      <rect x="28" y="34" width="8" height="10" fill="#F5C518" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinejoin="round"/>
    </svg>
  );
}
