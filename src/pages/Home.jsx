// Home page displaying the product list
import ProductList from '../components/ProductList';

function Home() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 page-enter">
            
            <div className="mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                    Discover <span style={{ color: 'var(--color-clay)' }}>Curated</span> Products
                </h1>
                <p style={{ color: 'var(--color-stone)' }} className="text-base">Quality goods from around the globe, delivered to your door.</p>
            </div>

            {/* Product listing */}
            <ProductList />
        </main>
    );
};

export default Home;