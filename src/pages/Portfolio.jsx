import { useMemo, useState } from 'react';
import SEO from '../components/SEO.jsx';
import { business, projects, services } from '../data/business.js';

const ALL = 'all';

export default function Portfolio() {
  const [filter, setFilter] = useState(ALL);

  const filtered = useMemo(
    () => filter === ALL ? projects : projects.filter(p => p.service === filter),
    [filter],
  );

  return (
    <>
      <SEO
        title="Portfolio"
        description="Before & after photos of recent construction, painting, plumbing, electrical and waterproofing projects across Maharashtra."
        path="/portfolio"
      />

      {/* Header */}
      <section className="bg-navy-500 text-white">
        <div className="container-x py-16 sm:py-20">
          <span className="eyebrow text-gold">Recent work</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">Before &amp; after.</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Tap any photo to flip between the before and the after.
            Filter by service to see what we've delivered recently.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-navy-50 bg-white">
        <div className="container-x py-5 flex flex-wrap gap-2">
          <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)}>
            All projects
          </FilterChip>
          {services.map(s => (
            <FilterChip
              key={s.slug}
              active={filter === s.slug}
              onClick={() => setFilter(s.slug)}
            >
              {s.title.split(' ')[0]}
            </FilterChip>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="text-navy-300">No projects in this category yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand text-white text-center">
        <div className="container-x">
          <h2 className="text-3xl sm:text-4xl">Want results like these?</h2>
          <p className="mt-3 max-w-xl mx-auto">
            Free site visit. Written quote in 24 hours. {business.yearsGuarantee}-year warranty.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={business.waLink("Hi, I saw your portfolio. Can you visit my site?")}
              target="_blank" rel="noopener"
              className="btn-wa text-base"
            >
              WhatsApp us
            </a>
            <a href={`tel:${business.phone.tel}`} className="btn-secondary text-base">
              Call {business.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------- Project card with before/after toggle ------------------- */
function ProjectCard({ project }) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <article className="card flex flex-col">
      {/* Image stage */}
      <button
        type="button"
        onClick={() => setShowAfter(s => !s)}
        aria-label={`Show ${showAfter ? 'before' : 'after'} photo of ${project.title}`}
        className="relative block w-full aspect-[4/3] overflow-hidden focus-visible:ring-2 focus-visible:ring-brand"
      >
        <img
          src={project.before}
          alt={`${project.title} — before`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={project.after}
          alt={`${project.title} — after`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            showAfter ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Label badge */}
        <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${
          showAfter ? 'bg-brand text-white' : 'bg-white text-navy-500'
        }`}>
          {showAfter ? 'AFTER' : 'BEFORE'}
        </span>

        {/* Tap hint (only first time-ish via opacity on hover) */}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 text-white text-[11px] px-3 py-1">
          Tap to flip
        </span>
      </button>

      {/* Meta */}
      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-navy-300">
          <span className="font-semibold uppercase tracking-wider text-brand">
            {services.find(s => s.slug === project.service)?.title.split(' ')[0] ?? project.service}
          </span>
          <span>{project.location} · {project.duration}</span>
        </div>
        <h3 className="mt-2 text-lg text-navy-500">{project.title}</h3>
        <p className="mt-1 text-sm text-navy-300">{project.summary}</p>
      </div>
    </article>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-brand text-white shadow-cta'
          : 'bg-navy-50 text-navy-500 hover:bg-navy-100'
      }`}
    >
      {children}
    </button>
  );
}
