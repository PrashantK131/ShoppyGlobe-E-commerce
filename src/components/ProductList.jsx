// For displaying grid of products, filtered by Redux search state
import { useSelector } from 'react-redux';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';
import { selectSearchQuery } from '../store/searchSlice';

function ProductList() {

    const { products, loading, error } = useProducts();
    const searchQuery = useSelector(selectSearchQuery);

    // Filter products based on Redux search query
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Loading skeleton
    if (loading) {
        return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'var(--color-pebble)' }}>
                        <div style={{ height: '200px', background: '#ddd' }} />
                        <div className="p-4 space-y-2">
                            <div className="h-3 rounded" style={{ background: '#ccc', width: '60%' }} />
                            <div className="h-4 rounded" style={{ background: '#ccc' }} />
                            <div className="h-4 rounded" style={{ background: '#ccc', width: '80%' }} />
                        </div>
                    </div>
                ))}
        </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-20 rounded-2xl" style={{ background: '#fff5f5', border: '1px solid #ffcccc' }}>
                <p className="text-4xl mb-4">⚠️</p>
                <h3 className="text-xl font-semibold mb-2 text-red-700">Failed to load products</h3>
                <p className="text-red-500 text-sm">{error}</p>
                <p className="text-gray-500 text-xs mt-2">Please check your connection and try again.</p>
            </div>
        );
    }

    // Empty search results
    if (filteredProducts.length === 0 && searchQuery) {
        return (
            <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>No results for &ldquo;{searchQuery}&rdquo;</h3>
                <p style={{ color: 'var(--color-stone)' }} className="text-sm">Try a different search term.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Results count */}
            {searchQuery && (
                <p className="mb-4 text-sm" style={{ color: 'var(--color-stone)' }}>
                    Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
                </p>
            )}

            {/* Product Grid — unique keys required */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
