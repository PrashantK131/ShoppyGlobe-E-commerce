// Custom hook for fetching products from DummyJSON API
import { useState, useEffect } from 'react';

function useProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false; // Prevents state update on unmounted or removed components

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('https://dummyjson.com/products?limit=30');
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                const data = await res.json();
                if (!cancelled) setProducts(data.products);
            } catch (err) {
                if (!cancelled) setError(err.message || 'Failed to fetch products.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProducts();
        return () => { cancelled = true; }; 
    }, []);

    return { products, loading, error };
};

export default useProducts;
