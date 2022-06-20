import { useContext } from 'react';
import { ReactComponent as ShoppingBagIcon } from '../assets/shopping-bag.svg';
import { CartContext } from '../contexts/Cart-Context';
import '../styles/cart-icon.scss'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingBagIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>

        </div>
    );
}

export default CartIcon;