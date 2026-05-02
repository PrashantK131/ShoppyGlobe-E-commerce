// For Individual item in the shopping cart
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import PropTypes from 'prop-types';

function CartItem({item}) {

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl transition-all" style={{ background: '#fff', border: '1px solid var(--color-pebble)' }}>
        {/* Product thumbnail */}
        <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-xl shrink-0" style={{ background: 'var(--color-warm)' }}/>

        {/* Item info */}
        <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-snug truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>{item.title}</h4>
            <p className="text-sm mt-1 font-semibold" style={{ color: 'var(--color-clay)' }}>${item.price.toFixed(2)}</p>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 mt-2">
                <button onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-colors disabled:opacity-30"
                    style={{ background: 'var(--color-pebble)', color: 'var(--color-charcoal)' }}
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))} 
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                    style={{ background: 'var(--color-charcoal)', color: '#fff' }}
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>

        {/* Subtotal + Remove */}
        <div className="text-right shrink-0">
            <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))} className="mt-2 text-xs hover:underline transition-colors" style={{ color: 'var(--color-stone)' }} aria-label="Remove item">
            Remove
            </button>
        </div>
    </div>
  );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartItem;