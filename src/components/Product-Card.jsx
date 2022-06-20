import { useContext } from 'react';
import { CartContext } from '../contexts/Cart-Context';
import '../styles/product-card.scss';
import Button, { BUTTON_TYPE_CLASSES } from './Button';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCartHandler = () => addItemToCart(product);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='product-card-footer'>
                <span className='product-name'>{name}</span>
                <span className='product-price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCartHandler}>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;