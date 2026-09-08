import { Link } from '@inertiajs/react';

/**
 * One practice area, as it appears in a grid. Used by the homepage, the practice
 * areas index, and the "related areas" strip on a detail page — so the three
 * cannot drift apart.
 */
export default function PracticeAreaCard({ area, className = '' }) {
    return (
        <Link
            href={route('practice-areas.show', area.slug)}
            className={`group flex flex-col border-t-2 border-slate-200 pt-5 transition-colors hover:border-teal-600 ${className}`}
        >
            <h3 className="font-display text-lg text-navy-900">{area.name}</h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {area.summary}
            </p>

            <span className="mt-4 text-sm font-medium text-teal-700 group-hover:text-teal-800">
                Learn more
                <span aria-hidden="true"> &rarr;</span>
            </span>
        </Link>
    );
}
