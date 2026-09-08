/**
 * Site structure. This is NOT dummy data — it is application configuration and
 * stays client-side after Phase 3, so it lives here rather than in
 * `resources/js/data`.
 *
 * Values are Ziggy route names, resolved with route() at render time, so a URL
 * change in routes/web.php never leaves a dead link here.
 */
export const primaryNavigation = [
    { name: 'Home', route: 'home' },
    { name: 'Practice Areas', route: 'practice-areas.index', hasMenu: true },
    { name: 'About Us', route: 'about' },
    { name: 'Gallery', route: 'gallery' },
    { name: 'Contact', route: 'contact' },
];
