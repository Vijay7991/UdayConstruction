// =============================================================================
// SINGLE SOURCE OF TRUTH for the entire site.
// Edit this file → name, phone, services, projects, testimonials, estimator
// rates all update.
// =============================================================================

// ----- Phone helpers --------------------------------------------------------
// Keep one canonical number. tel: needs no spaces; wa.me needs digits only.
const PHONE_E164 = '+918097125551';      // shown to users
const PHONE_TEL  = '+918097125551';      // for tel: links
const PHONE_WA   = '918097125551';       // for wa.me links (no +)

const waLink = (msg) =>
  `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(msg)}`;

// ----- Site origin ----------------------------------------------------------
// Update once domain is final. Used by SEO + sitemap.
export const SITE_ORIGIN = 'https://udayconstruction.in';

// ----- Business -------------------------------------------------------------
export const business = {
  name: 'Uday Construction',
  tagline: 'Honest contractors. On-time delivery. 5-year workmanship guarantee.',
  shortName: 'Uday',
  established: 2014,           // used to compute "X+ years" automatically
  projectsCompleted: 850,
  happyCustomers: 700,
  yearsGuarantee: 5,

  phone: {
    display: '+91 80971 25551',
    tel: PHONE_TEL,
    e164: PHONE_E164,
  },
  whatsapp: {
    number: PHONE_WA,
    defaultMessage:
      "Hi Uday Construction, I'd like a free quote for a project. My name is ",
    link: waLink("Hi Uday Construction, I'd like a free quote for a project."),
  },
  email: 'hello@udayconstruction.in',

  address: {
    street: 'Shop No. 12, Main Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    country: 'India',
    full: 'Shop No. 12, Main Road, Pune, Maharashtra 411001, India',
  },

  serviceAreas: ['Pune', 'Mumbai', 'Thane', 'Navi Mumbai', 'Nashik'],

  hours: {
    weekdays: 'Mon – Sat: 9:00 AM – 8:00 PM',
    sunday: 'Sunday: By appointment',
  },

  // TODO: replace with the iframe `src` from Google Maps > Share > Embed a map.
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121060.06241199566!2d73.7244925!2d18.5204303!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000',

  social: {
    instagram: 'https://www.instagram.com/',
    facebook:  'https://www.facebook.com/',
    justdial:  'https://www.justdial.com/',
  },

  // Helpers exposed to components
  waLink,
};

// ----- Services -------------------------------------------------------------
// Keep exactly 6 to match the homepage grid (3×2 desktop, 2×3 mobile).
export const services = [
  {
    slug: 'painting',
    title: 'Interior & Exterior Painting',
    short: 'Premium Asian Paints / Berger finish with putty + primer + 2 coats.',
    icon: 'paint',
    features: [
      'Asian Paints / Berger / Dulux',
      'Putty + primer + 2 finish coats',
      'Furniture covering & cleanup',
      'Texture, stencil & wall art',
    ],
    pricingFrom: '₹18 / sq.ft',
    image:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&q=70&auto=format',
    waMessage: 'Hi, I need a quote for painting work.',
  },
  {
    slug: 'plumbing',
    title: 'Plumbing & Water Solutions',
    short: 'Leak fixing, full re-piping, bathroom plumbing, motor & tank work.',
    icon: 'wrench',
    features: [
      'CPVC / UPVC certified pipes',
      'Bathroom & kitchen overhaul',
      'Leak detection & repair',
      'Motor, tank & sump installation',
    ],
    pricingFrom: '₹500 / visit',
    image:
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&q=70&auto=format',
    waMessage: 'Hi, I need a plumber for ',
  },
  {
    slug: 'electrical',
    title: 'Electrical Works',
    short: 'Wiring, switchboards, fan/light fitting, MCB upgrades.',
    icon: 'bolt',
    features: [
      'ISI-marked copper wiring',
      'Modular switchboards (Anchor, Legrand)',
      'Fan, light & geyser installation',
      'MCB / RCCB safety upgrades',
    ],
    pricingFrom: '₹600 / visit',
    image:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=70&auto=format',
    waMessage: 'Hi, I need an electrician for ',
  },
  {
    slug: 'civil-repair',
    title: 'Civil Repair',
    short: 'Plastering, cracks, slab repair, chajja & seepage fixing.',
    icon: 'hammer',
    features: [
      'Wall & ceiling plastering',
      'Crack injection & filling',
      'Slab & chajja repair',
      'Seepage diagnosis',
    ],
    pricingFrom: 'Quote on visit',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=70&auto=format',
    waMessage: 'Hi, I need civil repair work for ',
  },
  {
    slug: 'renovation',
    title: 'Full Home Renovation',
    short: 'Turnkey 1BHK / 2BHK / 3BHK renovation. One team, fixed timeline.',
    icon: 'home',
    features: [
      'Single point of contact',
      'Civil + electrical + plumbing + paint',
      'Modular kitchen & wardrobes',
      '45–90 day delivery',
    ],
    pricingFrom: '₹1.2 L onwards',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=70&auto=format',
    waMessage: 'Hi, I want to renovate my home. ',
  },
  {
    slug: 'waterproofing',
    title: 'Waterproofing',
    short: 'Terrace, bathroom, basement & external wall waterproofing.',
    icon: 'shield',
    features: [
      'Dr. Fixit & Sika certified',
      'Terrace china-mosaic / membrane',
      'Bathroom box waterproofing',
      '5-year written warranty',
    ],
    pricingFrom: '₹65 / sq.ft',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=70&auto=format',
    waMessage: 'Hi, I need waterproofing for ',
  },
];

// ----- Portfolio -----------------------------------------------------------
// Each project: a before/after pair. Use any CDN (Cloudinary recommended).
export const projects = [
  {
    id: 1,
    title: '3BHK Renovation, Kothrud',
    service: 'renovation',
    location: 'Pune',
    duration: '52 days',
    before:
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=70&auto=format',
    summary: 'Stripped-down old flat to a modern minimalist 3BHK with modular kitchen.',
  },
  {
    id: 2,
    title: 'Terrace Waterproofing, Baner',
    service: 'waterproofing',
    location: 'Pune',
    duration: '6 days',
    before:
      'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=70&auto=format',
    summary: '1,800 sq.ft terrace, china-mosaic + membrane. 5-year warranty issued.',
  },
  {
    id: 3,
    title: 'Exterior Painting, Thane',
    service: 'painting',
    location: 'Thane',
    duration: '14 days',
    before:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=70&auto=format',
    summary: '6-storey building, weather-shield paint, completed before monsoon.',
  },
  {
    id: 4,
    title: 'Bathroom Plumbing Overhaul, Wakad',
    service: 'plumbing',
    location: 'Pune',
    duration: '8 days',
    before:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=70&auto=format',
    summary: 'Re-piped with CPVC, new fittings, leakage-free for 2 years and counting.',
  },
  {
    id: 5,
    title: 'Office Wiring, Hinjewadi',
    service: 'electrical',
    location: 'Pune',
    duration: '11 days',
    before:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=70&auto=format',
    summary: '4,000 sq.ft office, full re-wiring, modular switches, RCCB protection.',
  },
  {
    id: 6,
    title: 'Slab Crack Repair, Aundh',
    service: 'civil-repair',
    location: 'Pune',
    duration: '5 days',
    before:
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=900&q=70&auto=format',
    after:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=70&auto=format',
    summary: 'Structural crack injection + plaster + paint. No recurrence in 18 months.',
  },
];

// ----- Testimonials --------------------------------------------------------
export const testimonials = [
  {
    name: 'Anita Deshmukh',
    role: 'Homeowner, Kothrud',
    rating: 5,
    text: 'They renovated our 3BHK in 7 weeks flat. No surprise costs, no delays. The site supervisor sent daily photos on WhatsApp.',
  },
  {
    name: 'Rohit Patil',
    role: 'Society Chairman, Thane',
    rating: 5,
    text: 'We got 3 quotes for exterior painting. Uday Construction was not the cheapest but they finished before monsoon and the building still looks new.',
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Homeowner, Baner',
    rating: 5,
    text: 'My terrace had been leaking for years. Their team fixed it in a week and gave a 5-year written warranty. Worth every rupee.',
  },
  {
    name: 'Mahesh Joshi',
    role: 'Office Owner, Hinjewadi',
    rating: 5,
    text: 'Re-wired our entire office over a long weekend. Polite team, clean work, honest billing. Will use them again.',
  },
];

// ----- Trust badges -------------------------------------------------------
// Computed in one place so we never get stale numbers between pages.
export const trustStats = [
  { label: 'Years Experience', value: `${new Date().getFullYear() - business.established}+` },
  { label: 'Projects Completed', value: `${business.projectsCompleted}+` },
  { label: 'Happy Customers',    value: `${business.happyCustomers}+` },
  { label: 'Workmanship Warranty', value: `${business.yearsGuarantee} yrs` },
];

// ===========================================================================
// COST ESTIMATOR
// All rates in ₹ (INR). Flat rates that real Maharashtra contractors quote;
// edit any value and the calculator updates everywhere.
//
// `scale` decides how the rate is multiplied:
//   'area'  → rate × floor area in sqft
//   'wall'  → rate × wall area (we approximate wall area as floor × 3)
//   'point' → rate × number of points the user enters
//   'count' → rate × number of fixtures the user enters
//
// Each item has a list of options. Setting `rate: 0` makes that option a
// "Skip" option (no contribution to the total).
// ===========================================================================
export const SQM_TO_SQFT = 10.7639;

export const estimator = {
  // Project presets pre-fill a sensible default area + which items to enable.
  projectPresets: [
    {
      id: 'single-room',
      label: 'Single room',
      defaultAreaSqft: 120,
      enabledByDefault: ['flooring', 'walls', 'electrical', 'lighting'],
    },
    {
      id: '1bhk',
      label: '1 BHK renovation',
      defaultAreaSqft: 450,
      enabledByDefault: ['flooring', 'walls', 'ceiling', 'electrical', 'lighting', 'plumbing'],
    },
    {
      id: '2bhk',
      label: '2 BHK renovation',
      defaultAreaSqft: 750,
      enabledByDefault: ['flooring', 'walls', 'ceiling', 'electrical', 'lighting', 'plumbing'],
    },
    {
      id: '3bhk',
      label: '3 BHK renovation',
      defaultAreaSqft: 1100,
      enabledByDefault: ['flooring', 'walls', 'ceiling', 'electrical', 'lighting', 'plumbing'],
    },
    {
      id: 'office',
      label: 'Office / shop',
      defaultAreaSqft: 600,
      enabledByDefault: ['flooring', 'walls', 'ceiling', 'electrical', 'lighting'],
    },
    {
      id: 'custom',
      label: 'Custom',
      defaultAreaSqft: 100,
      enabledByDefault: ['walls'],
    },
  ],

  // Rough "wall area = floor × this" multiplier. Sane for typical 10 ft ceilings.
  wallAreaMultiplier: 3,

  items: [
    {
      id: 'flooring',
      label: 'Flooring',
      icon: 'tile',
      description: 'Tile / marble / wooden laminate including labour & grouting.',
      scale: 'area',
      options: [
        { id: 'vitrified', label: 'Vitrified tiles',  rate: 75 },
        { id: 'ceramic',   label: 'Ceramic tiles',    rate: 55 },
        { id: 'marble',    label: 'Italian marble',   rate: 220 },
        { id: 'wooden',    label: 'Wooden laminate',  rate: 110 },
      ],
      defaultOption: 'vitrified',
    },
    {
      id: 'ceiling',
      label: 'False ceiling',
      icon: 'ceiling',
      description: 'POP or gypsum, includes design + finish + paint.',
      scale: 'area',
      options: [
        { id: 'pop',     label: 'POP ceiling',     rate: 85 },
        { id: 'gypsum',  label: 'Gypsum ceiling',  rate: 120 },
        { id: 'designer',label: 'Designer ceiling',rate: 180 },
      ],
      defaultOption: 'pop',
    },
    {
      id: 'walls',
      label: 'Wall painting',
      icon: 'paint',
      description: 'Putty + primer + 2 coats. Wall area ≈ floor × 3.',
      scale: 'wall',
      options: [
        { id: 'tractor', label: 'Asian Tractor (basic)',  rate: 18 },
        { id: 'apex',    label: 'Asian Apex (premium)',   rate: 32 },
        { id: 'royale',  label: 'Royale (luxury)',        rate: 55 },
      ],
      defaultOption: 'apex',
    },
    {
      id: 'electrical',
      label: 'Electrical wiring',
      icon: 'bolt',
      description: 'Per electrical point: copper wire + modular switch + labour.',
      scale: 'point',
      countLabel: 'Number of electrical points',
      options: [
        { id: 'standard', label: 'Anchor (standard)',  rate: 450 },
        { id: 'premium',  label: 'Legrand (premium)',  rate: 650 },
      ],
      defaultOption: 'standard',
      defaultCount: 12,
    },
    {
      id: 'lighting',
      label: 'Lighting fixtures',
      icon: 'bulb',
      description: 'Panel lights, fancy fixtures, ceiling fans.',
      scale: 'count',
      countLabel: 'Number of fixtures',
      options: [
        { id: 'basic',    label: 'Basic LED panels',   rate: 1200 },
        { id: 'designer', label: 'Designer fixtures',  rate: 2800 },
      ],
      defaultOption: 'basic',
      defaultCount: 6,
    },
    {
      id: 'plumbing',
      label: 'Plumbing',
      icon: 'wrench',
      description: 'CPVC piping + fixture installation per plumbing point.',
      scale: 'point',
      countLabel: 'Number of plumbing points',
      options: [
        { id: 'cpvc', label: 'CPVC standard', rate: 1800 },
        { id: 'upvc', label: 'UPVC premium',  rate: 2500 },
      ],
      defaultOption: 'cpvc',
      defaultCount: 4,
    },
    {
      id: 'waterproofing',
      label: 'Waterproofing',
      icon: 'shield',
      description: 'Membrane + coating, with written warranty.',
      scale: 'area',
      options: [
        { id: 'standard', label: 'Standard membrane',     rate: 65 },
        { id: 'drfixit',  label: 'Dr. Fixit premium',     rate: 95 },
      ],
      defaultOption: 'standard',
    },
    {
      id: 'civil',
      label: 'Civil repair / plaster',
      icon: 'hammer',
      description: 'Crack repair, plastering, finish. Per sqft of treated area.',
      scale: 'area',
      options: [
        { id: 'patch',    label: 'Crack patching',    rate: 35 },
        { id: 'replaster',label: 'Full re-plastering',rate: 60 },
      ],
      defaultOption: 'patch',
    },
  ],

  // Final adders applied in order, each on the running subtotal.
  adders: [
    { id: 'cleanup', label: 'Site cleanup & debris removal', pct: 0.03 },
    { id: 'gst',     label: 'GST (18%)',                     pct: 0.18 },
  ],

  // Accuracy disclaimer surfaced on the page.
  accuracyNote:
    'Estimates are typically within ±10% of the final quote. The exact price is confirmed after a free site visit.',
};
