import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import Field from '@/Components/UI/Field';
import PublicLayout from '@/Layouts/PublicLayout';

const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`;

/** Reads ?area=conveyancing, set by the CTA on each practice-area page. */
function areaFromQuery() {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('area') ?? '';
}

function OfficeDetails({ office }) {
    return (
        <div className="border border-slate-200 bg-white p-6">
            <h2 className="font-display text-xl text-navy-900">The office</h2>

            <address className="mt-4 text-sm not-italic leading-relaxed text-slate-600">
                {office.address.building}
                <br />
                {office.address.street}
                <br />
                {office.address.town}, {office.address.county}
                <br />
                {office.address.postal}
                <br />
                {office.address.country}
            </address>

            <dl className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6">
                <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Telephone
                    </dt>
                    <dd className="mt-1 flex flex-col gap-1">
                        {office.phone.map((phone) => (
                            <a
                                key={phone}
                                href={telHref(phone)}
                                className="text-sm text-teal-700 hover:text-teal-800"
                            >
                                {phone}
                            </a>
                        ))}
                    </dd>
                </div>

                <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Email
                    </dt>
                    <dd className="mt-1">
                        <a
                            href={`mailto:${office.email}`}
                            className="text-sm text-teal-700 hover:text-teal-800"
                        >
                            {office.email}
                        </a>
                    </dd>
                </div>

                <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Opening hours
                    </dt>
                    <dd className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                        {office.hours.map((slot) => (
                            <div
                                key={slot.days}
                                className="flex justify-between gap-4"
                            >
                                <span>{slot.days}</span>
                                <span className="tabular-nums text-slate-500">
                                    {slot.opens
                                        ? `${slot.opens} – ${slot.closes}`
                                        : 'Closed'}
                                </span>
                            </div>
                        ))}
                    </dd>
                </div>
            </dl>
        </div>
    );
}

function OfficeMap({ office }) {
    if (office.map_embed_url) {
        return (
            <iframe
                title={`Map showing ${office.address.building}, ${office.address.street}`}
                src={office.map_embed_url}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border border-slate-200"
            />
        );
    }

    return (
        <div className="flex h-72 flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-navy-900">
                Map to be added
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                We will embed the map once the firm confirms the exact pin for{' '}
                {office.address.building} on {office.address.street}.
            </p>
        </div>
    );
}

export default function Contact() {
    const { office, practice_areas: areas = [], flash } = usePage().props;
    const successRef = useRef(null);

    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            name: '',
            email: '',
            phone: '',
            practice_area: areaFromQuery(),
            message: '',
        });

    // Move focus to the confirmation so screen reader users are told it worked.
    useEffect(() => {
        if (wasSuccessful) {
            successRef.current?.focus();
        }
    }, [wasSuccessful]);

    const submit = (event) => {
        event.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact" />

            <section className="border-b border-slate-100 bg-slate-50">
                <Container className="py-14 sm:py-20">
                    <Breadcrumbs
                        className="mb-8"
                        items={[
                            { label: 'Home', href: route('home') },
                            { label: 'Contact' },
                        ]}
                    />

                    <h1 className="font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
                        Request a consultation
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                        Tell us briefly what you need help with. We will come back
                        to you with the next step and what it involves — or call
                        the office directly if the matter is urgent.
                    </p>
                </Container>
            </section>

            <section className="py-16 sm:py-20">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
                        <div>
                            {flash?.success && (
                                <div
                                    ref={successRef}
                                    tabIndex={-1}
                                    role="status"
                                    className="mb-8 border-l-2 border-teal-600 bg-teal-50 p-5"
                                >
                                    <p className="text-sm font-semibold text-teal-900">
                                        Thank you — your enquiry has been sent.
                                    </p>
                                    <p className="mt-1 text-sm text-teal-800">
                                        {flash.success}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={submit} noValidate className="max-w-xl">
                                <div className="flex flex-col gap-6">
                                    <Field
                                        id="name"
                                        label="Your name"
                                        required
                                        error={errors.name}
                                    >
                                        {(field) => (
                                            <input
                                                {...field}
                                                type="text"
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <Field
                                            id="email"
                                            label="Email"
                                            error={errors.email}
                                        >
                                            {(field) => (
                                                <input
                                                    {...field}
                                                    type="email"
                                                    autoComplete="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>

                                        <Field
                                            id="phone"
                                            label="Phone"
                                            error={errors.phone}
                                        >
                                            {(field) => (
                                                <input
                                                    {...field}
                                                    type="tel"
                                                    autoComplete="tel"
                                                    placeholder="+254"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            'phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>

                                    <p className="-mt-2 text-xs text-slate-500">
                                        Give us an email address or a phone
                                        number — whichever you would rather be
                                        reached on.
                                    </p>

                                    <Field
                                        id="practice_area"
                                        label="What is this about?"
                                        error={errors.practice_area}
                                    >
                                        {(field) => (
                                            <select
                                                {...field}
                                                value={data.practice_area}
                                                onChange={(e) =>
                                                    setData(
                                                        'practice_area',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    I&rsquo;m not sure
                                                </option>
                                                {areas.map((area) => (
                                                    <option
                                                        key={area.slug}
                                                        value={area.slug}
                                                    >
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </Field>

                                    <Field
                                        id="message"
                                        label="How can we help?"
                                        required
                                        error={errors.message}
                                        help="Please do not include confidential documents or sensitive personal details in this form."
                                    >
                                        {(field) => (
                                            <textarea
                                                {...field}
                                                rows={6}
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        'message',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Sending…'
                                                : 'Send enquiry'}
                                        </Button>

                                        <p className="text-xs text-slate-500">
                                            Sending this form does not create an
                                            advocate&ndash;client relationship.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <aside className="flex flex-col gap-6">
                            <OfficeDetails office={office} />
                            <OfficeMap office={office} />
                        </aside>
                    </div>
                </Container>
            </section>
        </>
    );
}

Contact.layout = (page) => <PublicLayout>{page}</PublicLayout>;
