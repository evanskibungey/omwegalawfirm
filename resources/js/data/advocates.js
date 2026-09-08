/**
 * Advocate profiles — matches the `advocates` prop on Public/About and the team
 * teaser on Public/Home. See docs/data-shapes.md.
 *
 * This is genuine dummy data: in Phase 3 it comes from the database, so it lives
 * here rather than in config/site.php.
 *
 * Every record below is a PLACEHOLDER. Names, titles, bios, admission years and
 * photographs must all come from the firm — do not invent plausible-looking
 * details for real people.
 */
export const advocates = [
    {
        id: 1,
        slug: 'advocate-one',
        name: 'Advocate Name', // PLACEHOLDER
        title: 'Managing Partner', // PLACEHOLDER
        bio: 'Short professional biography supplied by the firm — background, admission year, and the kind of work this advocate leads.',
        photo_url: null, // PLACEHOLDER — awaiting portrait
        practice_areas: ['conveyancing', 'real-estate'],
        is_published: true,
        sort_order: 1,
    },
    {
        id: 2,
        slug: 'advocate-two',
        name: 'Advocate Name', // PLACEHOLDER
        title: 'Associate Advocate', // PLACEHOLDER
        bio: 'Short professional biography supplied by the firm — background, admission year, and the kind of work this advocate leads.',
        photo_url: null,
        practice_areas: ['civil-litigation', 'insurance-law'],
        is_published: true,
        sort_order: 2,
    },
];
