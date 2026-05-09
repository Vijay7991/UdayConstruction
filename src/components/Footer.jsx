import { Link } from 'react-router-dom';
import { business, services } from '../data/business.js';

function splitBrand(name) {
  const i = name.indexOf(' ');
  return i === -1 ? [name, ''] : [name.slice(0, i), name.slice(i + 1)];
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [first, rest] = splitBrand(business.name);
  return (
    <footer className="bg-navy-500 text-navy-100">
      <div className="container-x grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-extrabold">
            {first}{rest && ' '}
            {rest && <span className="text-brand">{rest}</span>}
          </h3>
          <p className="mt-3 text-sm leading-relaxed">
            Trusted contractors across Maharashtra. Honest quotes, on-time delivery,
            and a {business.yearsGuarantee}-year workmanship guarantee on every job.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={business.social.instagram} aria-label="Instagram" target="_blank" rel="noopener" className="rounded-full bg-white/10 p-2 hover:bg-brand">
              <Ig />
            </a>
            <a href={business.social.facebook} aria-label="Facebook" target="_blank" rel="noopener" className="rounded-full bg-white/10 p-2 hover:bg-brand">
              <Fb />
            </a>
            <a href={business.social.justdial} aria-label="Justdial" target="_blank" rel="noopener" className="rounded-full bg-white/10 p-2 hover:bg-brand">
              <Jd />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map(s => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-brand">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand">Home</Link></li>
            <li><Link to="/portfolio" className="hover:text-brand">Portfolio</Link></li>
            <li><Link to="/estimate" className="hover:text-brand">Cost Estimator</Link></li>
            <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${business.phone.tel}`} className="hover:text-brand">
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={business.waLink('Hi, I have a question about your services.')} target="_blank" rel="noopener" className="hover:text-brand">
                WhatsApp Chat →
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-brand">{business.email}</a>
            </li>
            <li className="pt-2 text-navy-200">{business.address.full}</li>
            <li className="text-navy-200">{business.hours.weekdays}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between py-5 text-xs text-navy-200">
          <span>© {year} {business.name}. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Serving {business.serviceAreas.join(' · ')}</span>
        </div>
      </div>
    </footer>
  );
}

function Ig() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.25a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17 6.25Z"/>
    </svg>
  );
}
function Fb() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
      <path d="M13 22v-8h3l1-4h-4V7.5C13 6.5 13.5 6 14.5 6H17V2.2A24 24 0 0 0 14 2c-3 0-5 1.8-5 5v3H6v4h3v8Z"/>
    </svg>
  );
}
function Jd() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
      <path d="M3 12h18M3 6h18M3 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
