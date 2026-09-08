import { Head } from '@inertiajs/react';
import AdvocateCard from '@/Components/Public/AdvocateCard';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import SectionHeading from '@/Components/UI/SectionHeading';
import PublicLayout from '@/Layouts/PublicLayout';

/**
 * About the firm. Props: advocates. See docs/data-shapes.md.
 *
 * Mission, vision and values are the firm's own words, quoted from proposal
 * section 2 — not copy invented for the website.
 */

const values = [
    {
        name: 'Professionalism',
        detail: 'Work handled to the standard the matter deserves, every time.',
    },
    {
        name: 'Result oriented',
        detail: 'Advice measured by the outcome it produces, not the hours it fills.',
    },
    {
        name: 'Expertise',
        detail: 'Depth in the areas we practise, and candour about the ones we do not.',
    },
    {
        name: 'Excellent client service',
        detail: 'Calls returned, questions answered, and no surprises on progress.',
    },
    {
        name: 'Innovation',
        detail: 'Better ways of working, including how we keep you informed.',
    },
    {
        name: 'Integrity',
        detail: 'Straight answers, including the ones a client would rather not hear.',
    },
];

export default function About({ advocates = [] }) {
    return (
        <>
            <Head title="About Us" />

            <section className="border-b border-slate-100 bg-slate-50">
                <Container className="py-14 sm:py-20">
                    <Breadcrumbs
                        className="mb-8"
                        items={[
                            { label: 'Home', href: route('home') },
                            { label: 'About Us' },
                        ]}
                    />

                    <h1 className="max-w-3xl font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
                        A practice built on doing the work properly.
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                        Omwenga &amp; Company Advocates is a growing legal
                        practice in Eldoret, advising individuals, businesses and
                        lenders across property, litigation and commercial
                        matters.
                    </p>
                </Container>
            </section>

            {/* Mission & vision — the firm's own words */}
            <section className="py-16 sm:py-20">
                <Container>
                    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
                        <div className="border-t-2 border-teal-600 pt-6">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                                Our mission
                            </h2>
                            <blockquote className="mt-4 font-display text-2xl leading-snug text-navy-900">
                                &ldquo;We aim to deliver efficient, helpful,
                                responsive and professional services to our
                                clients.&rdquo;
                            </blockquote>
                        </div>

                        <div className="border-t-2 border-navy-200 pt-6">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                Our vision
                            </h2>
                            <blockquote className="mt-4 font-display text-2xl leading-snug text-navy-900">
                                &ldquo;To create better everyday life for our
                                clients by providing quality legal service as per
                                their needs.&rdquo;
                            </blockquote>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values */}
            <section className="bg-slate-50 py-16 sm:py-20">
                <Container>
                    <SectionHeading
                        eyebrow="What we stand for"
                        title="Six things we hold ourselves to"
                    />

                    <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {values.map((value) => (
                            <div
                                key={value.name}
                                className="border-t border-slate-200 pt-4"
                            >
                                <dt className="font-display text-lg text-navy-900">
                                    {value.name}
                                </dt>
                                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {value.detail}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            {/* The advocates */}
            <section className="py-16 sm:py-20">
                <Container>
                    <SectionHeading
                        eyebrow="Who you will work with"
                        title="The advocates"
                        lede="You deal with the advocate handling your matter, not a call centre."
                    />

                    {advocates.length > 0 ? (
                        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                            {advocates.map((advocate) => (
                                <AdvocateCard
                                    key={advocate.id}
                                    advocate={advocate}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="mt-8 text-sm text-slate-500">
                            Advocate profiles will appear here once the firm
                            supplies them.
                        </p>
                    )}

                    <div className="mt-12 border-l-2 border-teal-600 bg-slate-50 p-6">
                        <p className="text-sm font-semibold text-navy-900">
                            Profiles awaiting the firm
                        </p>
                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">
                            The cards above are placeholders. Real names, titles,
                            biographies, admission details and portraits all come
                            from the firm — the layout is finished and under
                            review.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="bg-navy-900">
                <Container className="py-14">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="max-w-xl">
                            <h2 className="font-display text-2xl text-white sm:text-3xl">
                                Work with us
                            </h2>
                            <p className="mt-3 text-navy-100">
                                Tell us what you need. We will point you to the
                                right advocate and explain what happens next.
                            </p>
                        </div>
                        <Button
                            href={route('contact')}
                            variant="accent"
                            size="lg"
                            className="shrink-0"
                        >
                            Request a consultation
                        </Button>
                    </div>
                </Container>
            </section>
        </>
    );
}

About.layout = (page) => <PublicLayout>{page}</PublicLayout>;
