import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import Container from '@/Components/UI/Container';
import SectionHeading from '@/Components/UI/SectionHeading';
import PublicLayout from '@/Layouts/PublicLayout';

/**
 * Photo gallery. Props: images. See docs/data-shapes.md.
 *
 * Categories are derived from the images rather than passed as a prop, so the
 * filter can never list a category with nothing behind it.
 */

// Display order and labels. Categories absent from the data are not rendered.
const CATEGORY_LABELS = {
    office: 'Office & premises',
    team: 'Team & advocates',
    brand: 'Firm brand',
    events: 'Events & engagements',
    milestones: 'Milestones & recognition',
};

function Tile({ image }) {
    if (image.thumb_url || image.url) {
        return (
            <img
                src={image.thumb_url ?? image.url}
                alt={image.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
            />
        );
    }

    // No photograph supplied yet — show what is meant to go here.
    return (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Photo to come
            </span>
            <span className="text-sm leading-snug text-slate-600">
                {image.caption ?? image.alt}
            </span>
        </div>
    );
}

export default function Gallery({ images = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const dialogRef = useRef(null);

    const categories = useMemo(() => {
        const present = new Set(images.map((image) => image.category));

        return Object.keys(CATEGORY_LABELS).filter((key) => present.has(key));
    }, [images]);

    const visible = useMemo(
        () =>
            activeCategory === 'all'
                ? images
                : images.filter((image) => image.category === activeCategory),
        [images, activeCategory],
    );

    // Drive the native dialog from state so Escape, the backdrop and focus
    // trapping are handled by the browser rather than reimplemented.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (lightboxIndex !== null && !dialog.open) {
            dialog.showModal();
        } else if (lightboxIndex === null && dialog.open) {
            dialog.close();
        }
    }, [lightboxIndex]);

    const step = (delta) => {
        setLightboxIndex((current) => {
            if (current === null || visible.length === 0) return current;

            return (current + delta + visible.length) % visible.length;
        });
    };

    const active = lightboxIndex === null ? null : visible[lightboxIndex];

    return (
        <>
            <Head title="Gallery" />

            <section className="border-b border-slate-100 bg-slate-50">
                <Container className="py-14 sm:py-20">
                    <Breadcrumbs
                        className="mb-8"
                        items={[
                            { label: 'Home', href: route('home') },
                            { label: 'Gallery' },
                        ]}
                    />

                    <SectionHeading
                        as="h1"
                        eyebrow="Inside the firm"
                        title="The office, the team, and the work"
                        lede="A look at where we practise and the people you will be dealing with."
                    />
                </Container>
            </section>

            <section className="py-12 sm:py-16">
                <Container>
                    {/* Filter */}
                    <div
                        role="group"
                        aria-label="Filter photographs by category"
                        className="flex flex-wrap gap-2"
                    >
                        {['all', ...categories].map((key) => {
                            const isActive = activeCategory === key;

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory(key);
                                        setLightboxIndex(null);
                                    }}
                                    aria-pressed={isActive}
                                    className={`rounded border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'border-navy-800 bg-navy-800 text-white'
                                            : 'border-slate-300 text-slate-700 hover:border-navy-300 hover:bg-navy-50'
                                    }`}
                                >
                                    {key === 'all'
                                        ? 'All photographs'
                                        : CATEGORY_LABELS[key]}
                                </button>
                            );
                        })}
                    </div>

                    <p aria-live="polite" className="mt-4 text-sm text-slate-500">
                        Showing {visible.length}{' '}
                        {visible.length === 1 ? 'photograph' : 'photographs'}
                        {activeCategory !== 'all' &&
                            ` in ${CATEGORY_LABELS[activeCategory]}`}
                        .
                    </p>

                    {/* Grid */}
                    {visible.length > 0 ? (
                        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {visible.map((image, index) => (
                                <li key={image.id}>
                                    <button
                                        type="button"
                                        onClick={() => setLightboxIndex(index)}
                                        className="group block w-full text-left"
                                    >
                                        <div className="overflow-hidden transition-opacity group-hover:opacity-90">
                                            <Tile image={image} />
                                        </div>

                                        {image.caption && (
                                            <span className="mt-2.5 block text-sm text-slate-600 group-hover:text-navy-900">
                                                {image.caption}
                                            </span>
                                        )}

                                        <span className="sr-only">
                                            {' '}
                                            — open larger view
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-10 text-sm text-slate-500">
                            No photographs in this category yet.
                        </p>
                    )}

                    <p className="mt-12 max-w-2xl border-l-2 border-slate-200 pl-4 text-xs leading-relaxed text-slate-500">
                        No photograph published here identifies a client or shows
                        client documents. Images of any identifiable person are
                        published only with their written consent.
                    </p>
                </Container>
            </section>

            {/* Lightbox */}
            <dialog
                ref={dialogRef}
                onClose={() => setLightboxIndex(null)}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                        event.preventDefault();
                        step(1);
                    }
                    if (event.key === 'ArrowLeft') {
                        event.preventDefault();
                        step(-1);
                    }
                }}
                aria-label="Photograph viewer"
                className="w-[min(60rem,92vw)] bg-transparent p-0 backdrop:bg-navy-950/85"
            >
                {active && (
                    <div className="bg-white p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="font-display text-lg text-navy-900">
                                    {active.caption ?? active.alt}
                                </h2>
                                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-slate-500">
                                    {CATEGORY_LABELS[active.category]}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setLightboxIndex(null)}
                                className="-mr-1 -mt-1 rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-navy-900"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M6 6l12 12M18 6L6 18"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4">
                            <Tile image={active} />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                <span aria-hidden="true">&larr;</span> Previous
                            </button>

                            <p className="text-sm tabular-nums text-slate-500">
                                {lightboxIndex + 1} of {visible.length}
                            </p>

                            <button
                                type="button"
                                onClick={() => step(1)}
                                className="rounded border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Next <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    </div>
                )}
            </dialog>
        </>
    );
}

Gallery.layout = (page) => <PublicLayout>{page}</PublicLayout>;
