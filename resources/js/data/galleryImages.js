/**
 * Gallery images — matches the `images` prop on Public/Gallery.
 * See docs/data-shapes.md.
 *
 * Genuine dummy data: in Phase 3 these come from the `gallery_images` table.
 *
 * Every `url` is null because no photographs have been supplied yet. The grid
 * renders a labelled placeholder tile in that case, so the layout, the category
 * filter and the lightbox can all be reviewed before the shoot happens — and so
 * it is obvious at a glance which photographs are still outstanding.
 *
 * Subjects are taken from the shot list in proposal section 4.2.
 */
export const galleryImages = [
    // Office & premises
    {
        id: 1,
        url: null,
        thumb_url: null,
        alt: 'Reception area with branded wall signage',
        caption: 'Reception, Daima Towers',
        category: 'office',
        sort_order: 1,
    },
    {
        id: 2,
        url: null,
        thumb_url: null,
        alt: 'The main boardroom set for a client meeting',
        caption: 'Boardroom',
        category: 'office',
        sort_order: 2,
    },
    {
        id: 3,
        url: null,
        thumb_url: null,
        alt: 'Private meeting room used for consultations',
        caption: 'Consultation room',
        category: 'office',
        sort_order: 3,
    },
    {
        id: 4,
        url: null,
        thumb_url: null,
        alt: 'Exterior of Daima Towers on Uganda Road',
        caption: 'Daima Towers, Uganda Road',
        category: 'office',
        sort_order: 4,
    },

    // Team & advocates
    {
        id: 5,
        url: null,
        thumb_url: null,
        alt: 'Portrait of the managing partner',
        caption: 'Managing Partner',
        category: 'team',
        sort_order: 5,
    },
    {
        id: 6,
        url: null,
        thumb_url: null,
        alt: 'Portrait of an associate advocate',
        caption: 'Associate Advocate',
        category: 'team',
        sort_order: 6,
    },
    {
        id: 7,
        url: null,
        thumb_url: null,
        alt: 'The full team photographed outside the office',
        caption: 'The team',
        category: 'team',
        sort_order: 7,
    },

    // Firm brand
    {
        id: 8,
        url: null,
        thumb_url: null,
        alt: 'The firm roll-up banner used at events',
        caption: 'Roll-up banner',
        category: 'brand',
        sort_order: 8,
    },
    {
        id: 9,
        url: null,
        thumb_url: null,
        alt: 'Branded stationery and letterhead',
        caption: 'Stationery',
        category: 'brand',
        sort_order: 9,
    },

    // Events & engagements
    {
        id: 10,
        url: null,
        thumb_url: null,
        alt: 'An advocate speaking at a legal seminar',
        caption: 'Seminar',
        category: 'events',
        sort_order: 10,
    },
    {
        id: 11,
        url: null,
        thumb_url: null,
        alt: 'The firm at a community outreach day',
        caption: 'Community outreach',
        category: 'events',
        sort_order: 11,
    },

    // Milestones & recognition
    {
        id: 12,
        url: null,
        thumb_url: null,
        alt: 'Law Society of Kenya membership certificate',
        caption: 'Law Society of Kenya membership',
        category: 'milestones',
        sort_order: 12,
    },
    {
        id: 13,
        url: null,
        thumb_url: null,
        alt: 'A contract signing ceremony at the office',
        caption: 'Signing ceremony',
        category: 'milestones',
        sort_order: 13,
    },
];
