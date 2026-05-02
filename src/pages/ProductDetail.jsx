// Detailed product view fetched by route param
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../store/cartSlice';
import LazyImage from '../components/LazyImage';

function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const inCart = cartItems.some(item => item.id === Number(id));

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    // Fetch product details based on dynamic route param
    useEffect(() => {
        let cancelled = false;

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if (!res.ok) throw new Error(`Product not found (HTTP ${res.status})`);
                const data = await res.json();
                if (!cancelled) {
                    setProduct(data);
                    setActiveImage(0);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProduct();
        return () => { cancelled = true; };
    }, [id]); // Re-fetch when id param changes

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 page-enter">
                <div className="animate-pulse grid sm:grid-cols-2 gap-8">
                    <div className="rounded-2xl" style={{ height: 400, background: 'var(--color-pebble)' }} />
                    <div className="space-y-4">
                        {[200, 140, 80, 120, 60].map((w, i) => (
                            <div key={i} className="h-5 rounded" style={{ background: 'var(--color-pebble)', width: w }} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20 text-center page-enter">
                <p className="text-5xl mb-4">😕</p>
                <h2 className="text-2xl font-semibold mb-2 text-red-600">Failed to load product</h2>
                <p className="text-red-400 mb-6">{error}</p>
                <Link to="/" className="underline" style={{ color: 'var(--color-sage)' }}>← Back to products</Link>
            </div>
        );
    }

    const images = product.images?.length ? product.images : [product.thumbnail];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 page-enter">
            {/* Navigation */}
            <nav className="text-sm mb-6" style={{ color: 'var(--color-stone)' }}>
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <span style={{ color: 'var(--color-charcoal)' }}>{product.title}</span>
            </nav>

            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
                {/* Image gallery */}
                <div>
                    <div className="rounded-2xl overflow-hidden mb-3" style={{ background: 'var(--color-warm)', height: 380 }}>
                        <LazyImage src={images[activeImage]} alt={product.title} className="w-full h-full object-contain"/>
                    </div>
                    {/* Thumbnail strip */}
                    {images.length > 1 && (
                        <div className="flex gap-2 flex-wrap">
                            {images.map((img, i) => (
                                <button key={i} onClick={() => setActiveImage(i)} className="rounded-lg overflow-hidden transition-all"
                                    style={{ width: 60, height: 60, border: i === activeImage ? '2px solid var(--color-clay)' : '2px solid transparent', background: 'var(--color-warm)'}}
                                >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product details */}
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'var(--color-pebble)', color: 'var(--color-stone)' }}>{product.category}</span>

                    <h1 className="text-3xl font-bold mt-3 mb-2 leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{product.title}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} style={{ color: i < Math.round(product.rating) ? 'var(--color-clay)' : 'var(--color-pebble)' }}>★</span>
                            ))}
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-stone)' }}>{product.rating} · {product.stock} in stock</span>
                    </div>

                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-stone)' }}>{product.description}</p>

                    {/* Price */}
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>${product.price}</span>
                        {product.discountPercentage > 0 && (
                            <span className="text-sm mb-1 px-2 py-0.5 rounded-full" style={{ background: 'var(--color-clay)', color: '#fff' }}>-{Math.round(product.discountPercentage)}% OFF</span>
                        )}
                    </div>

                    {/* Add to cart */}
                    <button 
                        onClick={() =>
                            dispatch(addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                thumbnail: product.thumbnail,
                            }))
                        }
                        className="w-full py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 mb-3"
                        style={{ background: inCart ? 'var(--color-sage)' : 'var(--color-charcoal)' }}
                    >
                        {inCart ? '✓ Added to Cart' : 'Add to Cart'}
                    </button>

                    {/* Brand & warranty */}
                    {product.brand && (
                        <p className="text-sm" style={{ color: 'var(--color-stone)' }}><span className="font-medium">Brand:</span> {product.brand}</p>
                    )}
                    {product.warrantyInformation && (
                        <p className="text-sm mt-1" style={{ color: 'var(--color-stone)' }}><span className="font-medium">Warranty:</span> {product.warrantyInformation}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;