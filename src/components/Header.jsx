// Header.jsx — Navigation bar with cart icon and search
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';
import PropTypes from 'prop-types';

function Header({ onSearchChange, searchValue }) {

    const cartCount = useSelector(selectCartCount);

    return (
        <header style={{ background: 'var(--color-charcoal)', fontFamily: 'var(--font-body)'}} className="sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }} className="text-2xl shrink-0 hover:opacity-80 transition-opacity">
                    Shoppy<span style={{ color: 'var(--color-clay)' }}>Globe</span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-md hidden sm:block">
                    <input type="text" placeholder="Search products…" value={searchValue} onChange={e => onSearchChange(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-cream)', borderColor: 'rgba(255,255,255,0.2)'}}
                        className="w-full px-4 py-2 rounded-full border text-sm placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                    />
                </div>

                {/* Nav Links */}
                <nav className="flex items-center gap-5">
                    <NavLink to="/" style={({ isActive }) => ({color: isActive ? 'var(--color-clay)' : 'var(--color-cream)',fontWeight: isActive ? '600' : '400'})}
                        className="text-sm hidden sm:block hover:opacity-80 transition-opacity"
                    >
                        Home
                    </NavLink>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative flex items-center gap-1.5 group"  style={{ color: 'var(--color-cream)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10M7 13H5.4M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"/>
                        </svg>
                        {cartCount > 0 && (
                        <span key={cartCount} style={{ background: 'var(--color-clay)' }}
                            className="badge-pop absolute -top-2 -right-2 text-white text-xs font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1"
                        >
                            {cartCount}
                        </span>
                        )}
                    </Link>
                </nav>
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden px-4 pb-3">
                <input type="text" placeholder="Search products…" value={searchValue} onChange={e => onSearchChange(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-cream)', borderColor: 'rgba(255,255,255,0.2)'}}
                    className="w-full px-4 py-2 rounded-full border text-sm placeholder-gray-400 focus:outline-none focus:border-white"
                />
            </div>
        </header>
    );
};

Header.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
};

export default Header;