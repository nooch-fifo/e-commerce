import { createContext, useState, useEffect } from "react";


export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => (cartItem.id === productToAdd.id)
    );

    // if existingCartItem is found and its id matches the product id
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
        ((cartItem.id === productToAdd.id)
            // spread through all old properties of cart item but also increment quantity
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            // if cartItem does not match new product, just return the cartItem
            : cartItem)
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => (cartItem.id === cartItemToRemove.id)
    );

    // check if quantity of cartItemToRemove is 1. if so, delete it entirely from cart
    if (existingCartItem.quantity == 1) {
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
    }

    // else, return back cartItems with matching item id with decremented quantity
    return cartItems.map((cartItem) =>
    ((cartItem.id === cartItemToRemove.id)
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem)
    );
}


const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id != cartItemToClear.id);


// createContext with initial values 
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    deleteItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
})

// provider with children props & context values being set to state. state can now be passed to children components with useContext
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const deleteItemFromCart = (cartItemToRemove) => setCartItems(removeCartItem(cartItems, cartItemToRemove));

    const clearItemFromCart = (cartItemToClear) => setCartItems(clearCartItem(cartItems, cartItemToClear));

    const value = { isCartOpen, setIsCartOpen, addItemToCart, deleteItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}




// typical to have one useEffect for one functionality

// reduce function gets passed .reduce((accumulator, currentItem) => operation, number)
// where number is the starting value for the accumulator