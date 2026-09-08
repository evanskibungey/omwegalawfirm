import { Head } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import PracticeAreaCard from '@/Components/Public/PracticeAreaCard';
import SectionHeading from '@/Components/UI/SectionHeading';
import PublicLayout from '@/Layouts/PublicLayout';

/**
 * Skeleton homepage — proves the design system and layout shell end to end.
 * The full hero imagery, advocate profiles and gallery strip land later in
 * Phase 1, once the firm supplies photographs and final copy.
 *
 * Reads props only. Never imports from resources/js/data.
 */

// The firm's own values, from proposal section 2.
const values = [
    'Professionalism',
    'Result oriented',
    'Expertise',
    'Excellent client service',
    'Innovation',
    'Integrity',
];

export default function Home({ practice_areas: areas = [] }) {
    return (
        <>
            <Head title="Advocates in Eldoret" />

            {/* Hero */}
            <section className="bg-navy-900">
                <Container className="py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                            Daima Towers, Uganda Road, Eldoret
                        </p>
                        <h1 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                            Considered legal counsel for the decisions that
                            matter.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                            We aim to deliver efficient, helpful, responsive and
                            professional services to our clients — across
                            conveyancing, land, litigation, corporate and banking
                            matters.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Button
                                href={route('contact')}
                                variant="accent"
                                size="lg"
                            >
                                Request a consultation
                            </Button>
                            <Button
                                href={route('practice-areas.index')}
                                variant="on-dark"
                                size="lg"
                            >
                                Our practice areas
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Practice areas */}
            <section className="border-b border-slate-100 py-20 sm:py-24">
                <Container>
                    <SectionHeading
                        eyebrow="What we do"
                        title="Seven areas of practice"
                        lede="Whether you are transferring title, defending a claim or structuring a facility, the work is handled by an advocate who knows the ground."
                    />

                    <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {areas.map((area) => (
                            <PracticeAreaCard key={area.slug} area={area} />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Values */}
            <section className="bg-slate-50 py-20 sm:py-24">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
                        <SectionHeading
                            eyebrow="How we work"
                            title="Better everyday life for our clients"
                            lede="Our vision is to provide quality legal service shaped around what each client actually needs — not a template applied to everyone."
                        />

                        <ul className="grid grid-cols-1 gap-x-8 gap-y-5 self-center sm:grid-cols-2">
                            {values.map((value) => (
                                <li
                                    key={value}
                                    className="flex items-baseline gap-3 border-b border-slate-200 pb-4"
                                >
                                    <span
                                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                                        aria-hidden="true"
                                    />
                                    <span className="text-[0.95rem] font-medium text-navy-900">
                                        {value}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            {/* Closing call to action */}
            <section className="bg-teal-800">
                <Container className="py-16">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="max-w-xl">
                            <h2 className="font-display text-2xl text-white sm:text-3xl">
                                Speak to an advocate
                            </h2>
                            <p className="mt-3 text-teal-50">
                                Tell us briefly what you need. We will come back
                                to you with the next step and what it involves.
                            </p>
                        </div>
                        <Button
                            href={route('contact')}
                            variant="on-dark"
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

Home.layout = (page) => <PublicLayout>{page}</PublicLayout>;
