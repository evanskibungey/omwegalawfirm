import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { primaryNavigation } from '@/config/navigation';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';

function Wordmark() {
    // TODO: replace with the firm's supplied logo file once it arrives.
    return (
        <Link
            href={route('home')}
            className="group flex flex-col leading-none"
            aria-label="Omwenga & Company Advocates — home"
        >
            <span className="font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                Omwenga
            </span>
            <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-teal-700 sm:text-[0.68rem]">
                &amp; Company Advocates
            </span>
        </Link>
    );
}

function PracticeAreasMenu({ areas, current }) {
    const [open, setOpen] = useState(false);
    const wrapper = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };
        const onPointerDown = (event) => {
            if (!wrapper.current?.contains(event.target)) setOpen(false);
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onPointerDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [open]);

    return (
        <div ref={wrapper} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-haspopup="true"
                className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors ${
                    current ? 'text-teal-700' : 'text-slate-700 hover:text-navy-900'
                }`}
            >
                Practice Areas
                <svg
                    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded border border-slate-200 bg-white p-2 shadow-lg">
                    <Link
                        href={route('practice-areas.index')}
                        onClick={() => setOpen(false)}
                        className="block rounded px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50"
                    >
                        All practice areas
                    </Link>

                    <hr className="my-2 border-slate-100" />

                    {areas.map((area) => (
                        <Link
                            key={area.slug}
                            href={route('practice-areas.show', area.slug)}
                            onClick={() => setOpen(false)}
                            className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-navy-50 hover:text-navy-900"
                        >
                            {area.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SiteHeader() {
    // practice_areas is a shared prop — available on every page. See
    // docs/data-shapes.md; served by HandleInertiaRequests::share() from Phase 3.
    const { practice_areas: areas = [] } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const isCurrent = (routeName) =>
        typeof route !== 'undefined' && route().current(routeName);

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <Container>
                <div className="flex h-20 items-center justify-between gap-6">
                    <Wordmark />

                    <nav
                        className="hidden items-center gap-7 lg:flex"
                        aria-label="Primary"
                    >
                        {primaryNavigation.map((item) =>
                            item.hasMenu ? (
                                <PracticeAreasMenu
                                    key={item.route}
                                    areas={areas}
                                    current={isCurrent('practice-areas.*')}
                                />
                            ) : (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    className={`py-2 text-sm font-medium transition-colors ${
                                        isCurrent(item.route)
                                            ? 'text-teal-700'
                                            : 'text-slate-700 hover:text-navy-900'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ),
                        )}
                    </nav>

                    <div className="hidden lg:block">
                        <Button href={route('contact')} variant="primary">
                            Request a consultation
                        </Button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((value) => !value)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        className="-mr-2 inline-flex items-center justify-center rounded p-2 text-navy-800 hover:bg-navy-50 lg:hidden"
                    >
                        <span className="sr-only">
                            {mobileOpen ? 'Close menu' : 'Open menu'}
                        </span>
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            aria-hidden="true"
                        >
                            {mobileOpen ? (
                                <path
                                    strokeLinecap="round"
                                    d="M6 6l12 12M18 6L6 18"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    d="M4 7h16M4 12h16M4 17h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </Container>

            {mobileOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-slate-200 bg-white lg:hidden"
                >
                    <Container className="py-4">
                        <nav
                            className="flex flex-col gap-1"
                            aria-label="Primary, mobile"
                        >
                            {primaryNavigation.map((item) => (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    onClick={() => setMobileOpen(false)}
                                    className={`rounded px-3 py-2.5 text-sm font-medium ${
                                        isCurrent(item.route)
                                            ? 'bg-navy-50 text-teal-700'
                                            : 'text-slate-700 hover:bg-navy-50'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {areas.length > 0 && (
                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                    Our practice areas
                                </p>
                                {areas.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={route(
                                            'practice-areas.show',
                                            area.slug,
                                        )}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded px-3 py-2 text-sm text-slate-600 hover:bg-navy-50 hover:text-navy-900"
                                    >
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <Button
                            href={route('contact')}
                            variant="primary"
                            className="mt-5 w-full"
                            onClick={() => setMobileOpen(false)}
                        >
                            Request a consultation
                        </Button>
                    </Container>
                </div>
            )}
        </header>
    );
}
