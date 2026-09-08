/**
 * Page name -> the props that page's controller will eventually return.
 *
 * This is the ONLY module allowed to import from `resources/js/data`. Everything
 * else receives data as Inertia props, which is what makes the Phase 3 swap a
 * controller change rather than a component rewrite.
 *
 * Only database-backed entities appear here. Static site config — office details
 * and the practice-area list — is shared from config/site.php by
 * HandleInertiaRequests::share(), because the header and footer read it through
 * usePage() on every page and that only ever sees server props.
 *
 * Each entry is a factory so the data is rebuilt per visit rather than shared by
 * reference — a page that mutates a prop must not poison the next one.
 */
import { advocates } from '../data/advocates';
import { galleryImages } from '../data/galleryImages';

export const dummyPropsByPage = {
    'Public/Home': () => ({
        advocates,
        gallery_preview: galleryImages.slice(0, 4),
    }),

    'Public/About': () => ({
        advocates,
    }),

    'Public/Gallery': () => ({
        images: galleryImages,
    }),
};
