import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { business, trustStats } from '../data/business.js';

export default function About() {
  const years = new Date().getFullYear() - business.established;

  return (
    <>
      <SEO
        title="About"
        description={`${business.name} has served Maharashtra for ${years}+ years. Learn our story, our values, and the areas we serve.`}
        path="/about"
      />

      {/* Hero */}
      <section className="bg-navy-500 text-white">
        <div className="container-x py-16 sm:py-20">
          <span className="eyebrow text-gold">About us</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Built on trust, since {business.established}.</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            We're a family-run construction firm based in Pune. {years}+ years on,
            we still win most of our jobs the same way: a referral from a happy customer.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=70&auto=format"
            alt={`A ${business.name} site supervisor on a residential project`}
            loading="lazy"
            className="rounded-2xl shadow-soft w-full h-[420px] object-cover"
          />

          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-2 text-3xl sm:text-4xl text-navy-500">From a two-person team to {business.projectsCompleted}+ projects.</h2>
            <p className="mt-4 text-navy-300">
              {business.name} started as a small contracting outfit run out of a single shop on
              the main road. Word travelled — first across the lane, then across the city — that
              we showed up on time, charged what we quoted, and cleaned up before we left.
            </p>
            <p className="mt-3 text-navy-300">
              Today we run six service lines under one roof, with a permanent crew of supervisors,
              electricians, plumbers and painters. The shop is still on the same main road. The
              promise hasn't changed: an honest quote, a fixed timeline, and work that holds up.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-50/40 py-12 sm:py-16">
        <div className="container-x">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStats.map(s => (
              <div key={s.label} className="text-center rounded-2xl bg-white shadow-soft px-4 py-6">
                <dt className="text-xs uppercase tracking-wider text-navy-300">{s.label}</dt>
                <dd className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Why customers stay with us</span>
            <h2 className="mt-2 text-3xl sm:text-4xl text-navy-500">The four things we never compromise on.</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['Honest quotes', 'Itemised, written, and explained line by line. What we quote is what you pay.'],
              ['On-time delivery', 'A fixed start date and a fixed end date. Late? We cover the cost.'],
              ['Branded materials', 'Asian Paints, Anchor, Dr. Fixit, ISI-marked CPVC. No off-brand swaps.'],
              [`${business.yearsGuarantee}-year warranty`, 'In writing. If anything we did fails, we come back and fix it free.'],
            ].map(([t, d]) => (
              <article key={t} className="card p-6">
                <h3 className="text-lg text-navy-500">{t}</h3>
                <p className="mt-2 text-sm text-navy-300">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="section bg-navy-500 text-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow text-gold">Service areas</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">We work across Maharashtra.</h2>
            <p className="mt-3 text-navy-100">
              Based in Pune, with regular projects across Mumbai metro and Nashik.
              Outside this area? Get in touch — for renovation projects we can travel.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {business.serviceAreas.map(area => (
              <li key={area} className="rounded-full bg-white/10 backdrop-blur px-5 py-2 text-sm font-semibold">
                {area}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link to="/contact" className="btn-primary">Request a free site visit →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
