import { Head, usePage } from '@inertiajs/react';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import PracticeAreaCard from '@/Components/Public/PracticeAreaCard';
import SectionHeading from '@/Components/UI/SectionHeading';
import PublicLayout from '@/Layouts/PublicLayout';

/**
 * Index of the firm's seven practice areas.
 *
 * Declares no page props of its own — `practice_areas` is a shared prop from
 * config/site.php. See docs/data-shapes.md.
 */
export default function PracticeAreas() {
    const { practice_areas: areas = [] } = usePage().props;

    return (
        <>
            <Head title="Practice Areas" />

            <section className="border-b border-slate-100 bg-slate-50">
                <Container className="py-14 sm:py-20">
                    <Breadcrumbs
                        className="mb-8"
                        items={[
                            { label: 'Home', href: route('home') },
                            { label: 'Practice Areas' },
                        ]}
                    />

                    <SectionHeading
                        as="h1"
                        eyebrow="What we do"
                        title="Seven areas of practice"
                        lede="The firm advises individuals, businesses and lenders across property, litigation and commercial work. Choose an area to see what it covers and how we approach it."
                    />
                </Container>
            </section>

            <section className="py-16 sm:py-20">
                <Container>
                    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {areas.map((area) => (
                            <PracticeAreaCard key={area.slug} area={area} />
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-navy-900">
                <Container className="py-14">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div className="max-w-xl">
                            <h2 className="font-display text-2xl text-white sm:text-3xl">
                                Not sure which applies to you?
                            </h2>
                            <p className="mt-3 text-navy-100">
                                Describe the situation in your own words. We will
                                tell you which area it falls under and what the
                                next step involves.
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

PracticeAreas.layout = (page) => <PublicLayout>{page}</PublicLayout>;
