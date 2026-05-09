import { useState } from 'react';
import SEO from '../components/SEO.jsx';
import { business, services } from '../data/business.js';
import { submitLead, firebaseConfigured } from '../firebase/config.js';

const initial = { name: '', phone: '', email: '', service: '', message: '' };

// Build a friendly WhatsApp message from whatever fields the user has filled.
// Skips empty fields so the message stays clean.
function buildContactWhatsApp(form) {
  const lines = [`Hi ${business.name}, I'd like to discuss a project.`, ''];
  if (form.name)    lines.push(`*Name:* ${form.name}`);
  if (form.phone)   lines.push(`*Phone:* ${form.phone}`);
  if (form.email)   lines.push(`*Email:* ${form.email}`);
  if (form.service) {
    const s = services.find(x => x.slug === form.service);
    lines.push(`*Service:* ${s ? s.title : form.service}`);
  }
  if (form.message) {
    lines.push('');
    lines.push(`*Details:*`);
    lines.push(form.message);
  }
  lines.push('');
  lines.push('Please call me back to schedule a free site visit.');
  return lines.join('\n');
}

export default function Contact() {
  const [form, setForm]     = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  // Shared validation for both WhatsApp and Firestore submit paths.
  function validate() {
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({ state: 'error', msg: 'Please share at least your name and phone.' });
      return false;
    }
    // Indian mobile sanity (10 digits, optionally +91 / 0 prefix)
    const phoneOk = /^(\+?91)?[\s-]?[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''));
    if (!phoneOk) {
      setStatus({ state: 'error', msg: 'That phone number doesn\'t look right. Please re-check.' });
      return false;
    }
    return true;
  }

  // Send the form contents straight to WhatsApp. Works without any backend.
  function onSendWhatsApp() {
    if (!validate()) return;
    const message = buildContactWhatsApp(form);
    const url = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
    // Pop a new tab/app. Most mobile browsers will deep-link directly into WhatsApp.
    window.open(url, '_blank', 'noopener');
    setStatus({
      state: 'success',
      msg: 'WhatsApp opened with your details — tap Send to deliver it. We reply within 30 minutes.',
    });
  }

  // Submit to Firestore for a callback request (works only when Firebase is configured).
  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: 'loading', msg: '' });
    try {
      await submitLead(form);
      setStatus({
        state: 'success',
        msg: "Thanks! We'll call you back within 30 minutes during working hours.",
      });
      setForm(initial);
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Something went wrong. Please try WhatsApp or call instead.',
      });
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description={`Call, WhatsApp or email ${business.name}. Free site visit across ${business.serviceAreas.join(', ')}. Reply within 30 minutes.`}
        path="/contact"
      />

      {/* Hero */}
      <section className="bg-navy-500 text-white">
        <div className="container-x py-16 sm:py-20">
          <span className="eyebrow text-gold">Get in touch</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Free quote in 24 hours.</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Drop your name &amp; number and we'll call you back. Or reach us directly on WhatsApp,
            phone or email — whichever is easiest.
          </p>
        </div>
      </section>

      {/* Contact methods grid */}
      <section className="section">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ---- Form ---- */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl text-navy-500">Tell us what you need</h2>
            <p className="mt-2 text-sm text-navy-300">
              Fill the form, then send it on WhatsApp — we'll see your details instantly.
              Only name &amp; phone are required.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-500 mb-1">
                    Your name <span className="text-brand">*</span>
                  </label>
                  <input
                    id="name" name="name" autoComplete="name" required
                    value={form.name} onChange={update('name')}
                    className="input-field" placeholder="Anita Deshmukh"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-navy-500 mb-1">
                    Phone <span className="text-brand">*</span>
                  </label>
                  <input
                    id="phone" name="phone" type="tel" inputMode="tel"
                    autoComplete="tel" required
                    value={form.phone} onChange={update('phone')}
                    className="input-field" placeholder="98765 43210"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-500 mb-1">
                    Email <span className="text-navy-200">(optional)</span>
                  </label>
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    value={form.email} onChange={update('email')}
                    className="input-field" placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-navy-500 mb-1">
                    Service <span className="text-navy-200">(optional)</span>
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={update('service')}
                    className="input-field"
                  >
                    <option value="">Choose a service…</option>
                    {services.map(s => (
                      <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-navy-500 mb-1">
                  Project details <span className="text-navy-200">(optional)</span>
                </label>
                <textarea
                  id="message" name="message" rows="4"
                  value={form.message} onChange={update('message')}
                  className="input-field"
                  placeholder="2BHK in Kothrud, terrace leak, looking for a quote…"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={onSendWhatsApp}
                  className="btn-wa w-full sm:w-auto"
                >
                  <WaIcon /> Send on WhatsApp
                </button>

                {firebaseConfigured && (
                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="btn-outline w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status.state === 'loading' ? 'Sending…' : 'Request callback'}
                  </button>
                )}
              </div>
              <p className="text-xs text-navy-300">
                {firebaseConfigured
                  ? 'WhatsApp is fastest. "Request callback" stores your number for us to call back later.'
                  : 'WhatsApp is the fastest way to reach us — typical reply within 30 minutes.'}
              </p>

              {status.state === 'success' && (
                <p role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
                  ✓ {status.msg}
                </p>
              )}
              {status.state === 'error' && (
                <p role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                  {status.msg}
                </p>
              )}
            </form>
          </div>

          {/* ---- Direct contact cards ---- */}
          <div className="order-1 lg:order-2 space-y-4">
            <ContactCard
              accent="bg-[#25D366]"
              icon={<WaIcon />}
              title="WhatsApp"
              subtitle="Fastest. We usually reply in 30 min."
              cta="Open chat →"
              href={business.waLink("Hi, I'd like to discuss a project.")}
              external
            />
            <ContactCard
              accent="bg-brand"
              icon={<PhoneIcon />}
              title="Call"
              subtitle={`${business.phone.display} · ${business.hours.weekdays}`}
              cta="Call now →"
              href={`tel:${business.phone.tel}`}
            />
            <ContactCard
              accent="bg-navy-500"
              icon={<MailIcon />}
              title="Email"
              subtitle={business.email}
              cta="Send email →"
              href={`mailto:${business.email}`}
            />
            <ContactCard
              accent="bg-gold"
              icon={<MapIcon />}
              title="Visit our shop"
              subtitle={business.address.full}
              cta="Get directions →"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`}
              external
            />
          </div>
        </div>
      </section>

    </>
  );
}

/* ---------- Direct-contact card ---------- */
function ContactCard({ accent, icon, title, subtitle, cta, href, external }) {
  const linkProps = external ? { target: '_blank', rel: 'noopener' } : {};
  return (
    <a
      href={href} {...linkProps}
      className="card flex items-center gap-4 p-5 hover:border-brand"
    >
      <span className={`grid place-items-center h-12 w-12 rounded-xl text-white ${accent}`}>
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-base font-semibold text-navy-500">{title}</span>
        <span className="block text-sm text-navy-300">{subtitle}</span>
      </span>
      <span className="text-sm font-semibold text-brand whitespace-nowrap">{cta}</span>
    </a>
  );
}

/* ---------- Inline icons ---------- */
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 2 .5 4 1.5 5.7L0 24l6.5-1.7c1.7.9 3.6 1.4 5.5 1.4 6.3 0 11.5-5.2 11.5-11.5S18.3.5 12 .5Z"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.06 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" strokeLinejoin="round"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  );
}
function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-navy-500">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
