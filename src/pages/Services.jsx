import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import { business, services } from '../data/business.js';

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description={`Painting, plumbing, electrical, civil repair, renovation & waterproofing in ${business.serviceAreas.join(', ')}. Transparent pricing, ${business.yearsGuarantee}-year warranty.`}
        path="/services"
      />

      {/* ---------- Header ---------- */}
      <section className="bg-navy-500 text-white">
        <div className="container-x py-16 sm:py-20">
          <span className="eyebrow text-gold">Our services</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Everything your building needs.</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Six service lines, one team, one accountable supervisor. Pick what you need —
            we'll send a free site visit and a written quote within 24 hours.
          </p>
        </div>
      </section>

      {/* ---------- Service blocks (alternating image side) ---------- */}
      <section className="section">
        <div className="container-x space-y-16 lg:space-y-24">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className={`grid gap-8 lg:gap-12 lg:grid-cols-2 items-center ${
                i % 2 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div>
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="rounded-2xl shadow-soft w-full h-[320px] sm:h-[380px] object-cover"
                />
              </div>

              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <ServiceIcon name={s.icon} />
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl text-navy-500">{s.title}</h2>
                <p className="mt-3 text-navy-300">{s.short}</p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {s.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-navy-500">
                      <span className="mt-1 grid place-items-center h-5 w-5 shrink-0 rounded-full bg-brand text-white text-[10px] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-navy-500">
                    Pricing from <span className="text-brand">{s.pricingFrom}</span>
                  </span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={business.waLink(s.waMessage)}
                    target="_blank" rel="noopener"
                    className="btn-wa text-sm"
                  >
                    Quote on WhatsApp
                  </a>
                  <a href={`tel:${business.phone.tel}`} className="btn-outline text-sm">
                    Call {business.phone.display}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Process strip ---------- */}
      <section className="section bg-navy-50/40">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-2 text-3xl sm:text-4xl text-navy-500">Four simple steps. No surprises.</h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['1', 'WhatsApp / call', 'Tell us what you need. Share rough photos if possible.'],
              ['2', 'Free site visit', 'We measure, advise on materials, and discuss your timeline.'],
              ['3', 'Written quote', 'Itemised quote within 24 hours. Fixed price. No surprises.'],
              ['4', 'Daily updates', 'WhatsApp photos every evening until handover.'],
            ].map(([n, t, d]) => (
              <li key={n} className="card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white font-bold">{n}</div>
                <h3 className="mt-4 text-lg text-navy-500">{t}</h3>
                <p className="mt-1 text-sm text-navy-300">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section bg-brand text-white text-center">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">Want a ballpark price right now?</h2>
          <p className="mt-3 max-w-xl mx-auto">
            Use our cost estimator — pick what you need, see a transparent breakdown
            in seconds. Or send us a photo on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/estimate" className="btn-secondary text-base">
              Open cost estimator
            </Link>
            <a
              href={business.waLink("Hi, I have a photo to share. Can you tell me what work is needed?")}
              target="_blank" rel="noopener"
              className="btn-wa text-base"
            >
              Send photo on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
