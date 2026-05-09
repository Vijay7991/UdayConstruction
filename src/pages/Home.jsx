import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import {
  business,
  services,
  testimonials,
  trustStats,
} from '../data/business.js';

// Tiny calculator-style icon used in the hero CTA
function CalcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M16 14h0M8 18h8" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description={`${business.name} — painting, plumbing, electrical, civil repair, renovation & waterproofing across ${business.serviceAreas.join(', ')}. Free site visit.`}
        path="/"
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-500 text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=70&auto=format)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-500/90 via-navy-500/70 to-navy-500/40" aria-hidden="true" />

        <div className="container-x relative py-20 sm:py-28 lg:py-32">
          <span className="eyebrow text-gold">Maharashtra's trusted contractor since {business.established}</span>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Quality work.<br />
            On-time delivery.<br />
            <span className="text-brand">{business.yearsGuarantee}-year guarantee.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-100">
            {business.tagline} Painting, plumbing, electrical, civil repair,
            renovation &amp; waterproofing — all under one roof.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/estimate" className="btn-primary text-base">
              <CalcIcon /> Get instant cost estimate
            </Link>
            <a
              href={business.waLink("Hi, I'd like a free site visit and quote.")}
              target="_blank" rel="noopener"
              className="btn-wa text-base"
            >
              <WaIcon /> Quote on WhatsApp
            </a>
            <a href={`tel:${business.phone.tel}`} className="btn-secondary text-base">
              <PhoneIcon /> Call {business.phone.display}
            </a>
          </div>

          {/* Trust strip — above the fold, key conversion lever */}
          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {trustStats.map(s => (
              <div key={s.label} className="rounded-2xl bg-white/10 backdrop-blur px-4 py-4">
                <dt className="text-xs uppercase tracking-wider text-navy-100">{s.label}</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Services grid ---------------- */}
      <section className="section bg-navy-50/40">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-2 text-3xl sm:text-4xl text-navy-500">Six services. One reliable team.</h2>
            <p className="mt-3 text-navy-300">
              From a leaking tap to a full-home renovation — we handle it end to end so you never juggle three contractors.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <article key={s.slug} className="card p-6 flex flex-col">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="mt-5 text-xl text-navy-500">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-300 flex-1">{s.short}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand">From {s.pricingFrom}</span>
                  <Link to="/services" className="text-sm font-semibold text-navy-500 hover:text-brand">
                    Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Why {business.shortName}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl text-navy-500">No hidden costs. No site babysitting.</h2>
            <p className="mt-3 text-navy-300">
              We've built our reputation by being predictable: a written quote,
              a fixed timeline, daily WhatsApp updates with photos, and a clean handover.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Free site visit + itemised written quote',
                'Daily WhatsApp photo updates from your supervisor',
                'Branded materials only (Asian Paints, Anchor, Dr. Fixit, CPVC)',
                `${business.yearsGuarantee}-year written workmanship warranty`,
                'Single point of contact from quote to handover',
              ].map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 grid place-items-center h-5 w-5 rounded-full bg-brand text-white text-[10px] font-bold">✓</span>
                  <span className="text-navy-500">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link to="/contact" className="btn-primary">Get a free site visit →</Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=70&auto=format"
              alt={`${business.name} team on site`}
              loading="lazy"
              className="rounded-2xl shadow-soft w-full h-[420px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-soft p-4 max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 text-gold">★★★★★</div>
              <p className="mt-1 text-sm text-navy-500 font-semibold">4.9 average rating</p>
              <p className="text-xs text-navy-300">across Justdial, Google &amp; word of mouth</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="section bg-navy-500 text-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow text-gold">Reviews</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">Real customers. Real projects.</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(t => (
              <figure key={t.name} className="rounded-2xl bg-white/5 backdrop-blur p-6 flex flex-col">
                <div className="text-gold text-lg" aria-label={`${t.rating} stars`}>
                  {'★'.repeat(t.rating)}
                </div>
                <blockquote className="mt-3 text-sm text-navy-100 flex-1">"{t.text}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-navy-200">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="section bg-brand">
        <div className="container-x text-center text-white">
          <h2 className="text-3xl sm:text-4xl">Get your free site visit today.</h2>
          <p className="mt-3 max-w-xl mx-auto">
            Tell us what you need on WhatsApp — we usually reply in under 30 minutes
            during working hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={business.waLink("Hi, I'd like a free site visit and quote.")}
              target="_blank" rel="noopener"
              className="btn-wa text-base"
            >
              <WaIcon /> WhatsApp us now
            </a>
            <a href={`tel:${business.phone.tel}`} className="btn-secondary text-base">
              <PhoneIcon /> Call {business.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* tiny inline icons */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinejoin="round"/>
    </svg>
  );
}
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.7L0 24l6.5-1.7c1.7.9 3.6 1.4 5.5 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5Zm0 21c-1.7 0-3.4-.5-4.9-1.4l-.4-.2-3.9 1 1-3.8-.2-.4C2.5 14.9 2 13.5 2 12 2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 9.5-10 9.5Z"/>
    </svg>
  );
}
