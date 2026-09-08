import SiteFooter from '@/Components/Public/SiteFooter';
import SiteHeader from '@/Components/Public/SiteHeader';

/**
 * Shell for every public-facing page.
 *
 * Applied as a persistent layout — pages set `Page.layout = (page) =>
 * <PublicLayout>{page}</PublicLayout>` — so the header keeps its state and the
 * page does not remount between visits.
 */
export default function PublicLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
            >
                Skip to content
            </a>

            <SiteHeader />

            <main id="main" className="flex-1">
                {children}
            </main>

            <SiteFooter />
        </div>
    );
}
