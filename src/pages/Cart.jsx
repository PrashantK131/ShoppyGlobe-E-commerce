// Shopping cart page
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cartSlice';
import CartItem from '../components/CartItem';

function Cart() {

    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center page-enter">
                <p className="text-6xl mb-4">🛒</p>
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Your cart is empty</h2>
                <p className="mb-8" style={{ color: 'var(--color-stone)' }}>Looks like you haven't added anything yet.</p>
                <Link to="/" className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90" style={{ background: 'var(--color-charcoal)' }}>
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 page-enter">
            <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                Shopping Cart
                <span className="text-lg font-normal ml-3" style={{ color: 'var(--color-stone)' }}>
                    ({items.length} item{items.length !== 1 ? 's' : ''})
                </span>
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart items list */}
                <div className="lg:col-span-2 space-y-3">
                    {items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Order summary sidebar */}
                <div className="rounded-2xl p-6 h-fit sticky top-24" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Order Summary</h3>
                    <div className="space-y-2 mb-4">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm" style={{ color: 'var(--color-stone)' }}>
                                <span className="truncate mr-2">{item.title} ×{item.quantity}</span>
                                <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-3 border-t flex justify-between font-bold text-lg" style={{ borderColor: 'var(--color-pebble)' }}>
                        <span>Total</span>
                        <span style={{ fontFamily: 'var(--font-display)' }}>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="mt-5 block text-center py-3 rounded-full font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'var(--color-charcoal)' }}>
                        Proceed to Checkout
                    </Link>
                    <Link to="/" className="mt-3 block text-center text-sm hover:underline" style={{ color: 'var(--color-stone)' }}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;