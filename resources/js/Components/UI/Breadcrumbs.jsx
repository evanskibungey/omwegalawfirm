import { Link } from '@inertiajs/react';

/**
 * Trail back up the site. `items` is ordered root-first; the last entry is the
 * current page and renders as text rather than a link.
 *
 * Phase 4 adds BreadcrumbList structured data alongside this.
 */
export default function Breadcrumbs({ items = [], className = '' }) {
    if (items.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            {isLast ? (
                                <span
                                    aria-current="page"
                                    className="font-medium text-navy-800"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-teal-700"
                                    >
                                        {item.label}
                                    </Link>
                                    <span
                                        aria-hidden="true"
                                        className="text-slate-300"
                                    >
                                        /
                                    </span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
