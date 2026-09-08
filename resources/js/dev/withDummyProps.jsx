import { dummyPropsByPage } from './dummyProps';

/**
 * Dummy data is on while VITE_USE_DUMMY_DATA=true. Set it to false in Phase 3,
 * once every page is served by a real controller.
 */
export const dummyDataEnabled = import.meta.env.VITE_USE_DUMMY_DATA === 'true';

/**
 * Wraps a resolved page module so it renders with dummy props underneath the
 * real ones.
 *
 * Real props are spread LAST and therefore win. That is the whole trick: the
 * moment a controller starts sending `advocates`, the dummy value for it is
 * overridden with no change to the page component. Migration happens one prop at
 * a time, and a half-migrated page still renders correctly.
 *
 * Note this reaches the PAGE component only, not layouts. Anything a layout
 * needs — the header's practice-area menu, the footer's office details — must be
 * a real shared prop from HandleInertiaRequests::share(), because layouts read
 * usePage(), which only ever contains what the server sent.
 */
export function withDummyProps(name, pageModule) {
    if (!dummyDataEnabled) {
        return pageModule;
    }

    const buildPageProps = dummyPropsByPage[name];

    if (!buildPageProps) {
        return pageModule;
    }

    const Page = pageModule.default;

    const Wrapped = (props) => <Page {...buildPageProps()} {...props} />;

    // Inertia reads `layout` off the page component for persistent layouts, so
    // it has to survive the wrapper.
    Wrapped.layout = Page.layout;
    Wrapped.displayName = `WithDummyProps(${name})`;

    return { ...pageModule, default: Wrapped };
}
