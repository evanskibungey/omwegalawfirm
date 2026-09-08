import { Head } from '@inertiajs/react';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import Button from '@/Components/UI/Button';
import Container from '@/Components/UI/Container';
import PracticeAreaCard from '@/Components/Public/PracticeAreaCard';
import PublicLayout from '@/Layouts/PublicLayout';

/**
 * One template, seven pages. Everything specific to an area arrives in `area`,
 * so adding or reordering areas is a config change in config/site.php and never
 * a component change.
 *
 * Props: area, related. See docs/data-shapes.md.
 */

function AwaitingCopy({ areaName }) {
    return (
        <div className="border-l-2 border-teal-600 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-navy-900">
                Page copy still to come
            </p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">
                The firm is supplying the full description for {areaName} — what
                the work covers, how a matter typically runs, and what a client
                should prepare. The layout around it is finished and under
                review.
            </p>
        </div>
    );
}

export default function PracticeArea({ area, related = [] }) {
    return (
        <>
            <Head title={area.name} />

            <section className="border-b border-slate-100 bg-slate-50">
                <Container className="py-14 sm:py-20">
                    <Breadcrumbs
                        className="mb-8"
                        items={[
                            { label: 'Home', href: route('home') },
                            {
                                label: 'Practice Areas',
                                href: route('practice-areas.index'),
                            },
                            { label: area.name },
                        ]}
                    />

                    <h1 className="max-w-3xl font-display text-3xl leading-tight text-navy-900 sm:text-4xl lg:text-5xl">
                        {area.name}
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                        {area.summary}
                    </p>
                </Container>
            </section>

            <section className="py-16 sm:py-20">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
                        <div>
                            {area.body_html ? (
                                /*
                                 * body_html comes from config/site.php — authored by
                                 * the developer from the firm's copy, never by an end
                                 * user. If this ever becomes editable in the admin
                                 * dashboard it must be sanitised before storage.
                                 */
                                <div
                                    className="prose-firm"
                                    dangerouslySetInnerHTML={{
                                        __html: area.body_html,
                                    }}
                                />
                            ) : (
                                <AwaitingCopy areaName={area.name} />
                            )}
                        </div>

                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="border border-slate-200 bg-white p-6">
                                <h2 className="font-display text-xl text-navy-900">
                                    Speak to an advocate
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    Tell us what you need help with. We will come
                                    back to you with the next step and what it
                                    involves.
                                </p>
                                <Button
                                    href={`${route('contact')}?area=${area.slug}`}
                                    variant="primary"
                                    className="mt-5 w-full"
                                >
                                    Request a consultation
                                </Button>
                            </div>
                        </aside>
                    </div>
                </Container>
            </section>

            {related.length > 0 && (
                <section className="border-t border-slate-100 bg-slate-50 py-16">
                    <Container>
                        <h2 className="font-display text-2xl text-navy-900">
                            Related areas
                        </h2>

                        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <PracticeAreaCard key={item.slug} area={item} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
}

PracticeArea.layout = (page) => <PublicLayout>{page}</PublicLayout>;
