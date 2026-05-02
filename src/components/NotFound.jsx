// For 404 page (unknown routes)
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NotFound() {

    const location = useLocation();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 page-enter">
            {/* Error code */}
            <h1 className="font-bold leading-none mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem, 20vw, 14rem)', color: 'var(--color-pebble)', lineHeight: 1}}>404</h1>

            {/* Error details */}
            <div className="mb-6 px-4 py-2 rounded-lg text-sm font-mono" style={{ background: 'var(--color-warm)', color: 'var(--color-stone)' }}>
                <span style={{ color: 'var(--color-clay)' }}>Error:</span> Route not found &mdash;{' '}
                <code style={{ color: 'var(--color-charcoal)' }}>{location.pathname}</code>
            </div>

            <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Page Not Found</h2>
            <p className="mb-8 max-w-md" style={{ color: 'var(--color-stone)' }}>
                The page you're looking for doesn't exist or has been moved. 
                Check the URL or head back to the homepage.
            </p>

            {/* Error Details Box */}
            <div className="mb-8 p-4 rounded-xl text-left text-sm w-full max-w-sm" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>Error Details</p>
                <div style={{ color: 'var(--color-stone)' }} className="space-y-1">
                    <p><span className="font-medium">Status Code:</span> 404 Not Found</p>
                    <p><span className="font-medium">Requested Path:</span> <code className="text-xs">{location.pathname}</code></p>
                    <p><span className="font-medium">Description:</span> The requested resource could not be located on this server.</p>
                </div>
            </div>

            <Link to="/"
                className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'var(--color-charcoal)' }}
            >
                ← Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
