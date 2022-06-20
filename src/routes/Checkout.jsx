import { useContext } from 'react';
import CheckoutItem from '../components/Checkout-Item';
import { CartContext } from '../contexts/Cart-Context';
import '../styles/checkout.scss';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='checkout-title-block'>
                    <span>Product</span>
                </div>
                <div className='checkout-title-block'>
                    <span>Description</span>
                </div>
                <div className='checkout-title-block'>
                    <span>Quantity</span>
                </div>
                <div className='checkout-title-block'>
                    <span>Unit Price</span>
                </div>
                <div className='checkout-title-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => (
                    <CheckoutItem key={item.id} cartItem={item} />
                ))
            }
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )

}

export default Checkout;