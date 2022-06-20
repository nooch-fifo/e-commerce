import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/Cart-Context';
import '../styles/cart-dropdown.scss';
import Button from './Button';
import CartItem from './Cart-Item';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <span className='empty-message'>Your Cart is Empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
        </div>
    )
}

export default CartDropdown;
// create context to store (1): value representing if icon is open or not (boolean value = state set to false. onClickHandler changing to open/true) & (2): values of items in cart