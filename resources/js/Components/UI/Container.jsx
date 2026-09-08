/**
 * The single horizontal rhythm for the public site. Every full-width band uses
 * this for its inner content so edges line up down the whole page.
 */
export default function Container({ className = '', children }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
            {children}
        </div>
    );
}
