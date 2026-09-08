import { Link } from '@inertiajs/react';

/**
 * One button for the public site, rendering as an Inertia <Link> when given
 * `href`, an <a> for external links, and a <button> otherwise — so a call to
 * action looks identical whether it navigates or submits.
 *
 * Corners are kept tight (rounded, not rounded-lg) — a softer radius reads as
 * consumer app rather than law firm.
 */
const variants = {
    primary:
        'bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 shadow-sm',
    accent: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-sm',
    outline:
        'border border-navy-200 text-navy-800 hover:border-navy-300 hover:bg-navy-50 active:bg-navy-100',
    ghost: 'text-navy-800 hover:bg-navy-50 active:bg-navy-100',
    'on-dark':
        'border border-white/25 text-white hover:bg-white/10 active:bg-white/15',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    href,
    external = false,
    className = '',
    children,
    ...props
}) {
    const classes = [
        'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
    ].join(' ');

    if (href && external) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
