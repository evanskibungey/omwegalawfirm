import { Link, usePage } from '@inertiajs/react';
import { primaryNavigation } from '@/config/navigation';
import Container from '@/Components/UI/Container';

const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`;

function ColumnHeading({ children }) {
    return (
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">
            {children}
        </h2>
    );
}

export default function SiteFooter() {
    // office and practice_areas are shared props — see docs/data-shapes.md.
    const { office, practice_areas: areas = [] } = usePage().props;
    const year = new Date().getFullYear();

    return (
        <footer className="bg-navy-900 text-navy-100">
            <Container className="py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        <p className="font-display text-2xl font-semibold text-white">
                            Omwenga
                        </p>
                        <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-teal-300">
                            &amp; Company Advocates
                        </p>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
                            {office?.tagline}
                        </p>
                    </div>

                    <div>
                        <ColumnHeading>Practice areas</ColumnHeading>
                        <ul className="flex flex-col gap-2.5">
                            {areas.map((area) => (
                                <li key={area.slug}>
                                    <Link
                                        href={route(
                                            'practice-areas.show',
                                            area.slug,
                                        )}
                                        className="text-sm text-navy-200 transition-colors hover:text-white"
                                    >
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <ColumnHeading>Explore</ColumnHeading>
                        <ul className="flex flex-col gap-2.5">
                            {primaryNavigation.map((item) => (
                                <li key={item.route}>
                                    <Link
                                        href={route(item.route)}
                                        className="text-sm text-navy-200 transition-colors hover:text-white"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <ColumnHeading>Visit or call</ColumnHeading>

                        {office?.address && (
                            <address className="text-sm not-italic leading-relaxed text-navy-200">
                                {office.address.building}
                                <br />
                                {office.address.street}
                                <br />
                                {office.address.town}, {office.address.country}
                                <br />
                                {office.address.postal}
                            </address>
                        )}

                        <ul className="mt-4 flex flex-col gap-1.5">
                            {office?.phone?.map((phone) => (
                                <li key={phone}>
                                    <a
                                        href={telHref(phone)}
                                        className="text-sm text-navy-200 transition-colors hover:text-white"
                                    >
                                        {phone}
                                    </a>
                                </li>
                            ))}
                            {office?.email && (
                                <li>
                                    <a
                                        href={`mailto:${office.email}`}
                                        className="text-sm text-navy-200 transition-colors hover:text-white"
                                    >
                                        {office.email}
                                    </a>
                                </li>
                            )}
                        </ul>

                        {office?.hours && (
                            <dl className="mt-5 flex flex-col gap-1 text-sm text-navy-300">
                                {office.hours.map((slot) => (
                                    <div
                                        key={slot.days}
                                        className="flex justify-between gap-4"
                                    >
                                        <dt>{slot.days}</dt>
                                        <dd className="tabular-nums">
                                            {slot.opens
                                                ? `${slot.opens} – ${slot.closes}`
                                                : 'Closed'}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-navy-800 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; {year} Omwenga &amp; Company Advocates. All rights
                        reserved.
                    </p>
                    <p>
                        Advocates of the High Court of Kenya. Members of the Law
                        Society of Kenya.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
