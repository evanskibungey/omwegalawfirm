/**
 * The heading block that opens every section of the public site.
 *
 * The eyebrow is optional and should name the section, not decorate it — it is
 * the only place small uppercase type is used, so it stays meaningful.
 */
export default function SectionHeading({
    eyebrow,
    title,
    lede,
    align = 'left',
    as: Heading = 'h2',
    tone = 'light',
    className = '',
}) {
    const centered = align === 'center';

    const titleTone = tone === 'dark' ? 'text-white' : 'text-navy-900';
    const ledeTone = tone === 'dark' ? 'text-navy-100' : 'text-slate-600';
    const eyebrowTone = tone === 'dark' ? 'text-teal-300' : 'text-teal-700';

    return (
        <div
            className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}
        >
            {eyebrow && (
                <p
                    className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${eyebrowTone}`}
                >
                    {eyebrow}
                </p>
            )}

            <Heading
                className={`font-display text-3xl leading-tight sm:text-4xl ${titleTone}`}
            >
                {title}
            </Heading>

            {lede && (
                <p className={`mt-4 text-base leading-relaxed ${ledeTone}`}>
                    {lede}
                </p>
            )}
        </div>
    );
}
