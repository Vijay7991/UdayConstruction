// Pure calculation logic for the cost estimator. Kept separate from the page so
// it's easy to unit-test and easy to reuse (e.g. if we later want to share a
// quote via URL or PDF).
//
// All amounts are returned as numbers in ₹. Format only at the render layer.

import { estimator, SQM_TO_SQFT } from '../data/business.js';

/** Indian-style currency formatter: 125400 → "₹1,25,400". */
export const formatINR = (n) =>
  '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n || 0));

export const toSqft = (value, unit) =>
  unit === 'sqm' ? value * SQM_TO_SQFT : value;

/**
 * Compute one item's contribution.
 * @param {object} item        — config from estimator.items
 * @param {object} selection   — { enabled, optionId, count }
 * @param {number} areaSqft    — project area in sqft
 * @returns {{ amount:number, qty:number, qtyLabel:string, optionLabel:string, rate:number }}
 */
export function lineCost(item, selection, areaSqft) {
  if (!selection?.enabled) return null;

  const opt = item.options.find(o => o.id === selection.optionId)
            ?? item.options.find(o => o.id === item.defaultOption)
            ?? item.options[0];
  const rate = opt?.rate ?? 0;

  let qty, qtyLabel;
  switch (item.scale) {
    case 'wall':
      qty = areaSqft * estimator.wallAreaMultiplier;
      qtyLabel = `${Math.round(qty)} sqft wall`;
      break;
    case 'point':
    case 'count':
      qty = Math.max(0, Number(selection.count) || 0);
      qtyLabel = `${qty} ${item.scale === 'point' ? 'points' : 'units'}`;
      break;
    case 'area':
    default:
      qty = areaSqft;
      qtyLabel = `${Math.round(qty)} sqft`;
      break;
  }

  return {
    amount: qty * rate,
    qty,
    qtyLabel,
    optionLabel: opt?.label ?? '',
    rate,
  };
}

/**
 * Compute the entire estimate.
 * @param {object} state — { areaSqft, selections: { [itemId]: { enabled, optionId, count } } }
 */
export function computeEstimate(state) {
  const { areaSqft, selections } = state;

  const lines = estimator.items
    .map(item => ({ item, line: lineCost(item, selections[item.id], areaSqft) }))
    .filter(x => x.line);

  const subtotal = lines.reduce((s, x) => s + x.line.amount, 0);

  // Adders apply on the running subtotal (compounding the way GST does in real bills).
  let running = subtotal;
  const adderLines = estimator.adders.map(a => {
    const amount = running * a.pct;
    running += amount;
    return { ...a, amount };
  });

  return {
    lines,
    subtotal,
    adders: adderLines,
    total: running,
  };
}

/** Build a multi-line WhatsApp message summarising the estimate. */
export function buildWhatsAppMessage({ projectLabel, areaSqft, areaInputUnit, areaInputValue, estimate }) {
  const ln = [];
  ln.push(`Hi, I'd like a quote for the following work:`);
  ln.push(``);
  ln.push(`*Project:* ${projectLabel}`);
  ln.push(`*Area:* ${areaInputValue} ${areaInputUnit} (${Math.round(areaSqft)} sqft)`);
  ln.push(``);
  ln.push(`*Scope:*`);
  estimate.lines.forEach(({ item, line }) => {
    ln.push(`• ${item.label} — ${line.optionLabel} (${line.qtyLabel}) = ${formatINR(line.amount)}`);
  });
  ln.push(``);
  ln.push(`Subtotal: ${formatINR(estimate.subtotal)}`);
  estimate.adders.forEach(a => ln.push(`${a.label}: ${formatINR(a.amount)}`));
  ln.push(`*Estimated total: ${formatINR(estimate.total)}*`);
  ln.push(``);
  ln.push(`Please call me back to confirm and book a free site visit.`);
  return ln.join('\n');
}
