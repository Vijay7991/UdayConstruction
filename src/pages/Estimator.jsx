import { useMemo, useState } from 'react';
import SEO from '../components/SEO.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import { business, estimator, SQM_TO_SQFT } from '../data/business.js';
import {
  computeEstimate,
  formatINR,
  toSqft,
  buildWhatsAppMessage,
} from '../lib/estimate.js';

// Build the initial item-selection map from the chosen preset.
function selectionsFromPreset(preset) {
  const map = {};
  estimator.items.forEach(item => {
    map[item.id] = {
      enabled: preset.enabledByDefault.includes(item.id),
      optionId: item.defaultOption,
      count: item.defaultCount ?? 0,
    };
  });
  return map;
}

const DEFAULT_PRESET = estimator.projectPresets[2]; // 2 BHK is the most common request.

export default function Estimator() {
  // ---------------- state ----------------
  const [presetId, setPresetId] = useState(DEFAULT_PRESET.id);
  const preset = estimator.projectPresets.find(p => p.id === presetId) ?? DEFAULT_PRESET;

  const [areaInputUnit, setAreaInputUnit] = useState('sqft'); // 'sqft' | 'sqm'
  const [areaInputValue, setAreaInputValue] = useState(preset.defaultAreaSqft);
  const [selections, setSelections] = useState(() => selectionsFromPreset(preset));

  // When the user picks a different preset, reset area + selections to that preset's defaults.
  function pickPreset(id) {
    const next = estimator.projectPresets.find(p => p.id === id);
    if (!next) return;
    setPresetId(id);
    setAreaInputUnit('sqft');
    setAreaInputValue(next.defaultAreaSqft);
    setSelections(selectionsFromPreset(next));
  }

  function patchSelection(itemId, patch) {
    setSelections(prev => ({ ...prev, [itemId]: { ...prev[itemId], ...patch } }));
  }

  // ---------------- derived ----------------
  const areaSqft = useMemo(
    () => Math.max(0, toSqft(Number(areaInputValue) || 0, areaInputUnit)),
    [areaInputValue, areaInputUnit],
  );

  const estimate = useMemo(
    () => computeEstimate({ areaSqft, selections }),
    [areaSqft, selections],
  );

  const waMessage = useMemo(
    () => buildWhatsAppMessage({
      projectLabel: preset.label,
      areaSqft,
      areaInputUnit,
      areaInputValue,
      estimate,
    }),
    [preset.label, areaSqft, areaInputUnit, areaInputValue, estimate],
  );

  // ---------------- render ----------------
  return (
    <>
      <SEO
        title="Free Cost Estimator"
        description="Get an instant ₹ estimate for your renovation, painting, plumbing, electrical or waterproofing project. No signup. WhatsApp the result to us for a free site visit."
        path="/estimate"
      />

      {/* ---------- Hero ---------- */}
      <section className="bg-navy-500 text-white">
        <div className="container-x py-14 sm:py-16">
          <span className="eyebrow text-gold">Cost estimator</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Estimate your project cost in seconds.</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Pick a project type, enter the area, choose what you want to include — we'll
            give you a transparent breakdown using real Maharashtra-market rates.
          </p>
          <p className="mt-3 text-xs text-navy-200">{estimator.accuracyNote}</p>
        </div>
      </section>

      {/* ---------- Calculator ---------- */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_360px] gap-8">
          {/* --- Left column: configurator --- */}
          <div>
            {/* Step 1: project preset */}
            <Step n="1" title="Choose your project type">
              <div className="flex flex-wrap gap-2">
                {estimator.projectPresets.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pickPreset(p.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition border ${
                      presetId === p.id
                        ? 'bg-brand text-white border-brand shadow-cta'
                        : 'bg-white text-navy-500 border-navy-100 hover:border-brand'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </Step>

            {/* Step 2: area */}
            <Step n="2" title="Enter the area">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={areaInputValue}
                    onChange={e => setAreaInputValue(e.target.value)}
                    className="input-field w-32"
                    aria-label="Area"
                  />
                  <div className="inline-flex rounded-full bg-navy-50 p-1">
                    {['sqft', 'sqm'].map(u => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setAreaInputUnit(u)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          areaInputUnit === u ? 'bg-white text-navy-500 shadow' : 'text-navy-300'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                {areaInputUnit === 'sqm' && (
                  <span className="text-xs text-navy-300">
                    ≈ {Math.round(areaSqft)} sqft (1 sqm = {SQM_TO_SQFT.toFixed(2)} sqft)
                  </span>
                )}
              </div>
            </Step>

            {/* Step 3: line items */}
            <Step n="3" title="Pick what you want included">
              <div className="space-y-4">
                {estimator.items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selection={selections[item.id]}
                    onPatch={patch => patchSelection(item.id, patch)}
                    areaSqft={areaSqft}
                  />
                ))}
              </div>
            </Step>
          </div>

          {/* --- Right column: live total --- */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <TotalsPanel estimate={estimate} waMessage={waMessage} />
          </aside>
        </div>
      </section>

      {/* Mobile sticky total (only visible <lg) */}
      <MobileStickyTotal estimate={estimate} waMessage={waMessage} />

      {/* CTA / FAQ */}
      <section className="section bg-navy-50/40">
        <div className="container-x grid md:grid-cols-2 gap-8">
          <FAQ
            q="Are these prices accurate?"
            a={`These rates reflect what we actually quote in ${business.serviceAreas[0]} and surrounding areas. Final pricing depends on site conditions, finish quality and any custom work — typically within ±10% of this estimate.`}
          />
          <FAQ
            q="Why the GST line?"
            a="We're a registered, GST-billing contractor. Our written quote includes GST so there are no surprises at handover."
          />
          <FAQ
            q="Can I share this estimate with someone?"
            a="Tap 'Send on WhatsApp' to send the breakdown to yourself or a partner. The same message comes to us if you forward it for a callback."
          />
          <FAQ
            q="What if my project isn't on the list?"
            a={`Pick the closest preset and tweak. Or just call us at ${business.phone.display} — for unusual jobs we always do a free site visit before quoting.`}
          />
        </div>
      </section>
    </>
  );
}

/* =================================================================== */
/*  Sub-components                                                      */
/* =================================================================== */

function Step({ n, title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white text-sm font-bold">
          {n}
        </span>
        <h2 className="text-xl text-navy-500 font-bold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ItemCard({ item, selection, onPatch, areaSqft }) {
  const { enabled, optionId, count } = selection;
  const currentOption = item.options.find(o => o.id === optionId) ?? item.options[0];

  // Live amount for this card (so users see the impact of each toggle)
  const liveAmount = (() => {
    if (!enabled) return 0;
    const rate = currentOption?.rate ?? 0;
    if (item.scale === 'wall')   return rate * areaSqft * estimator.wallAreaMultiplier;
    if (item.scale === 'point' || item.scale === 'count') return rate * (Number(count) || 0);
    return rate * areaSqft;
  })();

  return (
    <article className={`rounded-2xl border bg-white transition ${
      enabled ? 'border-brand-200 shadow-soft' : 'border-navy-50'
    }`}>
      {/* Header: icon, label, toggle */}
      <header className="flex items-center gap-4 p-4 sm:p-5">
        <div className={`grid h-12 w-12 place-items-center rounded-xl ${
          enabled ? 'bg-brand-50 text-brand' : 'bg-navy-50 text-navy-300'
        }`}>
          <ServiceIcon name={item.icon} />
        </div>

        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-navy-500">{item.label}</h3>
          <p className="text-xs sm:text-sm text-navy-300">{item.description}</p>
        </div>

        <div className="text-right">
          {enabled && (
            <div className="text-sm font-semibold text-brand whitespace-nowrap">
              {formatINR(liveAmount)}
            </div>
          )}
          <Toggle
            on={enabled}
            onChange={v => onPatch({ enabled: v })}
            label={`Include ${item.label}`}
          />
        </div>
      </header>

      {/* Body: options + count input — only when enabled */}
      {enabled && (
        <div className="border-t border-navy-50 p-4 sm:p-5 space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">
              Choose finish
            </div>
            <div className="flex flex-wrap gap-2">
              {item.options.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onPatch({ optionId: opt.id })}
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold border transition ${
                    optionId === opt.id
                      ? 'bg-navy-500 text-white border-navy-500'
                      : 'bg-white text-navy-500 border-navy-100 hover:border-brand'
                  }`}
                >
                  {opt.label}
                  <span className="ml-1.5 opacity-70">
                    · ₹{opt.rate}{rateSuffix(item)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {(item.scale === 'point' || item.scale === 'count') && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-navy-300 block mb-2">
                {item.countLabel}
              </label>
              <div className="inline-flex items-center rounded-full border border-navy-100 overflow-hidden">
                <CountBtn onClick={() => onPatch({ count: Math.max(0, (Number(count) || 0) - 1) })}>−</CountBtn>
                <input
                  type="number" inputMode="numeric" min="0"
                  value={count}
                  onChange={e => onPatch({ count: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-16 text-center font-bold text-navy-500 outline-none py-2"
                />
                <CountBtn onClick={() => onPatch({ count: (Number(count) || 0) + 1 })}>+</CountBtn>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function rateSuffix(item) {
  return item.scale === 'point' ? ' / point'
       : item.scale === 'count' ? ' / unit'
       : ' / sqft';
}

function CountBtn({ onClick, children }) {
  return (
    <button
      type="button" onClick={onClick}
      className="px-3 py-2 text-lg font-bold text-navy-500 hover:bg-navy-50"
    >
      {children}
    </button>
  );
}

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition mt-2 ${
        on ? 'bg-brand' : 'bg-navy-100'
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
        on ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );
}

function TotalsPanel({ estimate, waMessage }) {
  const empty = estimate.lines.length === 0;
  return (
    <div className="rounded-2xl bg-white shadow-soft border border-navy-50 overflow-hidden">
      <div className="bg-navy-500 text-white px-5 py-4">
        <div className="text-xs uppercase tracking-wider text-navy-100">Estimated total</div>
        <div className="mt-1 text-3xl font-extrabold">{formatINR(estimate.total)}</div>
        <div className="text-xs text-navy-200">incl. all adders &amp; GST</div>
      </div>

      <div className="p-5 space-y-2 max-h-[40vh] overflow-y-auto">
        {empty ? (
          <p className="text-sm text-navy-300">
            Enable a few items on the left to see your estimate build up here.
          </p>
        ) : (
          <>
            {estimate.lines.map(({ item, line }) => (
              <div key={item.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-navy-500 truncate">
                  {item.label}
                  <span className="block text-xs text-navy-300">
                    {line.optionLabel} · {line.qtyLabel}
                  </span>
                </span>
                <span className="font-semibold text-navy-500 whitespace-nowrap">
                  {formatINR(line.amount)}
                </span>
              </div>
            ))}

            <div className="my-3 border-t border-navy-50" />

            <Row label="Subtotal" value={formatINR(estimate.subtotal)} />
            {estimate.adders.map(a => (
              <Row key={a.id} label={a.label} value={formatINR(a.amount)} subtle />
            ))}
            <Row label="Total" value={formatINR(estimate.total)} bold />
          </>
        )}
      </div>

      <div className="p-5 border-t border-navy-50 space-y-2">
        <a
          href={`https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(waMessage)}`}
          target="_blank" rel="noopener"
          className="btn-wa w-full"
          aria-disabled={empty}
        >
          Send on WhatsApp
        </a>
        <a
          href={`tel:${business.phone.tel}`}
          className="btn-outline w-full text-sm"
        >
          Call {business.phone.display}
        </a>
      </div>
    </div>
  );
}

function Row({ label, value, bold, subtle }) {
  return (
    <div className={`flex items-center justify-between text-sm ${
      bold ? 'text-navy-500 font-extrabold text-base pt-2 border-t border-navy-50' : ''
    } ${subtle ? 'text-navy-300' : 'text-navy-500'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function MobileStickyTotal({ estimate, waMessage }) {
  if (estimate.lines.length === 0) return null;
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-navy-100 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
      <div className="container-x py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wider text-navy-300">Estimated total</div>
          <div className="text-lg font-extrabold text-navy-500 leading-tight">
            {formatINR(estimate.total)}
          </div>
        </div>
        <a
          href={`https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(waMessage)}`}
          target="_blank" rel="noopener"
          className="btn-wa !py-2.5 !px-4 text-sm"
        >
          Send on WhatsApp
        </a>
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <article className="rounded-2xl bg-white shadow-soft border border-navy-50 p-5">
      <h3 className="font-semibold text-navy-500">{q}</h3>
      <p className="mt-2 text-sm text-navy-300">{a}</p>
    </article>
  );
}
