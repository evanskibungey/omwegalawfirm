import { usePage } from '@inertiajs/react';

/** "Jane Wanjiru Otieno" -> "JO". Falls back to one letter for a single name. */
function initialsOf(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * One advocate. `photo_url` is null until the firm supplies portraits, so the
 * card falls back to initials on a navy panel rather than a broken image or a
 * grey box — it reads as designed rather than missing.
 */
export default function AdvocateCard({ advocate }) {
    const { practice_areas: allAreas = [] } = usePage().props;

    const areaNames = (advocate.practice_areas ?? [])
        .map((slug) => allAreas.find((area) => area.slug === slug)?.name)
        .filter(Boolean);

    return (
        <article className="flex flex-col">
            {advocate.photo_url ? (
                <img
                    src={advocate.photo_url}
                    alt={`${advocate.name}, ${advocate.title}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                />
            ) : (
                <div
                    className="flex aspect-[4/5] w-full items-center justify-center bg-navy-800"
                    role="img"
                    aria-label={`Portrait of ${advocate.name} to follow`}
                >
                    <span
                        aria-hidden="true"
                        className="font-display text-5xl text-navy-300"
                    >
                        {initialsOf(advocate.name)}
                    </span>
                </div>
            )}

            <h3 className="mt-5 font-display text-xl text-navy-900">
                {advocate.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-teal-700">
                {advocate.title}
            </p>

            {advocate.bio && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {advocate.bio}
                </p>
            )}

            {areaNames.length > 0 && (
                <div className="mt-4 border-t border-slate-200 pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Practises in
                    </h4>
                    <ul className="mt-2 flex flex-col gap-1">
                        {areaNames.map((name) => (
                            <li key={name} className="text-sm text-slate-600">
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    );
}
