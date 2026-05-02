// ProductItem.jsx — Single product card with Add to Cart button
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../store/cartSlice';
import LazyImage from './LazyImage';
import PropTypes from 'prop-types';

function ProductItem({product}) {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const inCart = cartItems.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation when clicking button
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
        }));
    };

    // Star rating renderer
    function renderStars(rating) {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < Math.round(rating) ? 'var(--color-clay)' : 'var(--color-pebble)' }}>★</span>
        ));
    };

    return (
        <Link to={`/product/${product.id}`} className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
            {/* Product Image */}
            <div className="relative overflow-hidden" style={{ height: '200px', background: 'var(--color-warm)' }}>
                <LazyImage src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                {/* Discount badge */}
                {product.discountPercentage > 10 && (
                <span className="absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'var(--color-clay)' }}>
                    -{Math.round(product.discountPercentage)}%
                </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-xs mb-1" style={{ color: 'var(--color-stone)' }}>{product.category}</p>
                <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{product.title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3 text-sm"> {renderStars(product.rating)}
                    <span style={{ color: 'var(--color-stone)' }} className="text-xs ml-1">({product.rating})</span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>${product.price}</span>
                    <button onClick={handleAddToCart} className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200" style={inCart ? { background: 'var(--color-sage)',color: '#fff'} : { background: 'var(--color-charcoal)', color: '#fff'}}>
                        {inCart ? '✓ Added' : '+ Cart'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        category: PropTypes.string,
        rating: PropTypes.number,
        discountPercentage: PropTypes.number,
    }).isRequired,
};

export default ProductItem;
