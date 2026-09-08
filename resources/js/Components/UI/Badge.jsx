/**
 * Small status pill. Tones are semantic, deliberately separate from the brand
 * accent — a matter "waiting on a third party" must not read as a call to action.
 *
 * Phase 2 maps matter statuses onto these tones once the firm confirms the list.
 */
const tones = {
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    brand: 'bg-navy-50 text-navy-800 ring-navy-200',
    accent: 'bg-teal-50 text-teal-800 ring-teal-200',
    warning: 'bg-amber-50 text-amber-800 ring-amber-200',
    danger: 'bg-red-50 text-red-800 ring-red-200',
    success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
};

export default function Badge({
    tone = 'neutral',
    className = '',
    children,
    ...props
}) {
    return (
        <span
            className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                tones[tone] ?? tones.neutral
            } ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
