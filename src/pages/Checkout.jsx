// Checkout form with input validation and confirmation modal
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';

// Validation Rules 
function validate(form) {
    
    const errors = {};

    // Full Name 
    if (!form.name.trim()) {
        errors.name = 'Full name is required.';
    } else if (!/^[a-zA-Z\s]{2,}$/.test(form.name.trim())) {
        errors.name = 'Name must contain only letters (min 2 characters).';
    }

    // Email format
    if (!form.email.trim()) {
        errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Enter a valid email address (e.g. jane@example.com).';
    }

    // Phone number
    if (!form.phone.trim()) {
        errors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{9,12}$/.test(form.phone.trim().replace(/\s/g, ''))) {
        errors.phone = 'Enter a valid phone number (9–12 digits).';
    }

    // Street Address 
    if (!form.address.trim()) {
        errors.address = 'Street address is required.';
    } else if (form.address.trim().length < 5) {
        errors.address = 'Please enter a complete street address.';
    }

    // City 
    if (!form.city.trim()) {
        errors.city = 'City is required.';
    } else if (!/^[a-zA-Z\s]{2,}$/.test(form.city.trim())) {
        errors.city = 'Enter a valid city name.';
    }

    // ZIP 
    if (!form.zip.trim()) {
        errors.zip = 'ZIP code is required.';
    } else if (!/^[a-zA-Z0-9]{4,7}$/.test(form.zip.trim())) {
        errors.zip = 'Enter a valid ZIP code (4–7 characters).';
    }

    return errors;
};

// Reusable Input Field with inline error 
const Field = ({ label, name, type = 'text', placeholder, value, onChange, onBlur, error, touched, colSpan }) => (
    <div className={colSpan}>
        <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-stone)' }}>{label} <span style={{ color: 'var(--color-clay)' }}>*</span></label>
        <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
            style={{
                borderColor: touched && error ? '#e53e3e' : touched && !error ? 'var(--color-sage)' : 'var(--color-pebble)',
                background: 'var(--color-cream)',
                boxShadow: touched && error ? '0 0 0 3px rgba(229,62,62,0.1)' : touched && !error ? '0 0 0 3px rgba(124,154,126,0.15)' : 'none',
            }}
        />
        {/* Inline error message */}
        {touched && error && (<p className="mt-1 text-xs flex items-center gap-1" style={{ color: '#e53e3e' }}><span>⚠</span> {error}</p>)}

        {/* Inline success tick */}
        {touched && !error && value && (<p className="mt-1 text-xs flex items-center gap-1" style={{ color: 'var(--color-sage-dark)' }}><span>✓</span> Looks good!</p>)}
    </div>
);

// Confirmation Modal 
const ConfirmModal = ({ form, total, itemCount, onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
        <div className="w-full max-w-md rounded-3xl p-8 shadow-2xl page-enter" style={{ background: '#fff' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-5 mx-auto" style={{ background: 'var(--color-warm)' }}>🛍️</div>

            <h3 className="text-2xl font-bold text-center mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Confirm Your Order</h3>
            <p className="text-center text-sm mb-6" style={{ color: 'var(--color-stone)' }}>Please review your details before placing the order.</p>

            {/* Summary details */}
            <div className="rounded-2xl p-4 mb-5 space-y-2 text-sm" style={{ background: 'var(--color-cream)', border: '1px solid var(--color-pebble)' }}>
                {[
                    { label: '👤 Name',     value: form.name },
                    { label: '📧 Email',    value: form.email },
                    { label: '📱 Phone',    value: form.phone },
                    { label: '📍 Address',  value: `${form.address}, ${form.city} – ${form.zip}` },
                    { label: '💳 Payment',  value: form.payment === 'card' ? 'Credit / Debit Card' : form.payment === 'upi' ? 'UPI' : 'Cash on Delivery' },
                    { label: '🛒 Items',    value: `${itemCount} item${itemCount !== 1 ? 's' : ''}` },
                    { label: '💰 Total',    value: `$${total.toFixed(2)}` },
                    ].map(row => (
                    <div key={row.label} className="flex justify-between gap-4">
                        <span style={{ color: 'var(--color-stone)' }}>{row.label}</span>
                        <span className="font-medium text-right" style={{ color: 'var(--color-charcoal)' }}>{row.value}</span>
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 py-3 rounded-full font-semibold text-sm border transition-all hover:opacity-80" style={{ borderColor: 'var(--color-pebble)', color: 'var(--color-stone)' }}>
                    Edit Order
                </button>
                <button onClick={onConfirm} className="flex-1 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'var(--color-clay)' }}>
                    ✓ Place Order
                </button>
            </div>
        </div>
    </div>
);

// Main Checkout Component
function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: '', 
        email: '', 
        phone: '',
        address: '', 
        city: '', 
        zip: '',
        payment: 'card',
    });

    // Track which fields have been touched (blurred) for validation display
    const [touched, setTouched] = useState({});

    const errors = validate(form);
    const isFormValid = Object.keys(errors).length === 0;

    // Update field value and clear its error on change
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Mark field as touched when user leaves it
    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    // On Place Order click validate all fields first, then show modal
    const handleSubmit = () => {
        // Mark all fields touched to show all errors at once
        const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        if (!isFormValid) return; // Stop if any validation fails

        setShowConfirm(true); // Show confirmation modal
    };

    // User confirmed then clear cart and redirect
    const handleConfirm = () => {
        setShowConfirm(false);
        setOrderPlaced(true);
        dispatch(clearCart());
        setTimeout(() => navigate('/'), 3000);
    };

    // Order Success Screen 
    if (orderPlaced) {
        return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 page-enter">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 text-5xl" style={{ background: 'var(--color-sage)', color: '#fff' }}>✓</div>
            <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}> Order Placed! </h2>
            <p className="mb-1" style={{ color: 'var(--color-stone)' }}>Thank you, <strong>{form.name}</strong>! Your order has been confirmed.</p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-stone)' }}>A confirmation will be sent to <strong>{form.email}</strong></p>
            <p className="text-sm" style={{ color: 'var(--color-stone)' }}>Redirecting to home…</p>
            <div className="flex gap-2 mt-4">
                {[0, 1, 2].map(i => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-clay)', animation: `bounce 0.8s ${i * 0.15}s infinite` }}/>
                ))}
            </div>
            <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
        </div>
        );
    }

    // Empty Cart Guard 
    if (items.length === 0) {
        return (
            <div className="max-w-xl mx-auto px-4 py-20 text-center page-enter">
                <p className="text-5xl mb-4">🛒</p>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Your cart is empty</h2>
                <a href="/" className="underline" style={{ color: 'var(--color-sage)' }}>Go back to shopping</a>
            </div>
        );
    }

    // Checkout Form
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 page-enter">

            {/* Confirmation Modal */}
            {showConfirm && (
                <ConfirmModal form={form} total={total} itemCount={items.reduce((s, i) => s + i.quantity, 0)} onConfirm={handleConfirm} onCancel={() => setShowConfirm(false)}/>
            )}

            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}> Checkout </h1>
            <p className="text-sm mb-8" style={{ color: 'var(--color-stone)' }}> All fields marked <span style={{ color: 'var(--color-clay)' }}>*</span> are required.</p>

            <div className="grid lg:grid-cols-5 gap-8">

                {/* Form */}
                <div className="lg:col-span-3 space-y-6">

                {/* Personal Details */}
                <section className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                    <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}> Personal Details </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Full Name" name="name"  type="text" placeholder="Jane Doe" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} />
                        <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={errors.phone} touched={touched.phone} />
                        <Field label="Email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} colSpan="sm:col-span-2" />
                    </div>
                </section>

                {/* Shipping Address */}
                <section className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                    <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>Shipping Address</h3>
                    <div className="space-y-4">
                        <Field label="Street Address" name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange} onBlur={handleBlur} error={errors.address} touched={touched.address} colSpan="" />
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="City" name="city" placeholder="New York" value={form.city} onChange={handleChange} onBlur={handleBlur} error={errors.city} touched={touched.city} />
                            <Field label="ZIP Code" name="zip" placeholder="10001" value={form.zip} onChange={handleChange} onBlur={handleBlur} error={errors.zip}  touched={touched.zip} />
                        </div>
                    </div>
                </section>

                {/* Payment Method */}
                <section className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                    <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)' }}>Payment Method</h3>
                    <div className="flex flex-wrap gap-3">
                        {['card', 'upi', 'cod'].map(method => (
                            <label key={method} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium"
                                style={{
                                    borderColor: form.payment === method ? 'var(--color-charcoal)' : 'var(--color-pebble)',
                                    background: form.payment === method ? 'var(--color-charcoal)' : '#fff',
                                    color: form.payment === method ? '#fff' : 'var(--color-charcoal)',
                                }}
                            >
                                <input type="radio" name="payment" value={method} checked={form.payment === method} onChange={handleChange} className="sr-only" />
                                    {method === 'card' && '💳 Card'}
                                    {method === 'upi'  && '📱 UPI'}
                                    {method === 'cod'  && '💵 Cash on Delivery'}
                            </label>
                        ))}
                    </div>
                </section>

                {/* Validation summary banner shows only after submit attempt */}
                {Object.keys(touched).length > 0 && !isFormValid && (
                    <div className="rounded-2xl px-5 py-4 text-sm" style={{ background: '#fff5f5', border: '1px solid #feb2b2' }}>
                        <p className="font-semibold mb-1" style={{ color: '#c53030' }}>⚠ Please fix the following errors:</p>
                        <ul className="list-disc list-inside space-y-0.5" style={{ color: '#c53030' }}>
                            {Object.values(errors).map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl p-6 sticky top-24" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
                        <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>Order Summary</h3>

                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center gap-3">
                                <img src={item.thumbnail} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0" style={{ background: 'var(--color-warm)' }} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{item.title}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-stone)' }}>Qty: {item.quantity}</p>
                                </div>
                                <span className="text-sm font-semibold shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        </div>

                        <div className="pt-3 border-t mb-5" style={{ borderColor: 'var(--color-pebble)' }}>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span style={{ fontFamily: 'var(--font-display)' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Place Order button */}
                        <button onClick={handleSubmit} className="w-full py-3.5 rounded-full font-semibold text-white transition-all text-base"
                            style={{
                                background: isFormValid ? 'var(--color-clay)' : 'var(--color-stone)',
                                cursor: isFormValid ? 'pointer' : 'not-allowed',
                                opacity: isFormValid ? 1 : 0.7,
                            }}
                        >
                            {isFormValid ? 'Review & Place Order →' : 'Complete Form to Continue'}
                        </button>

                        {/* Progress hint */}
                        {!isFormValid && (
                            <p className="text-center text-xs mt-2" style={{ color: 'var(--color-stone)' }}>
                                {Object.keys(errors).length} field{Object.keys(errors).length !== 1 ? 's' : ''} remaining
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;