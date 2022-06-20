import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../components/Cart-Icon";
import CartDropdown from "../components/CartDropdown";

import { CartContext } from "../contexts/Cart-Context";
import { UserContext } from "../contexts/User-Context";

import { ReactComponent as Logo } from "../assets/crown.svg";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from '../styles/navbar.style'

import { signOutUser } from "../utilities/firebase-utils";

const Navbar = () => {
    // since useContext is accessing & changing state, it causes React to re-render
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <Logo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/login'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {/* truthy conditional logic: if cart is open, return cart dropdown */}
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navbar;

// Fragment purpose: React's rule of a component must have a single, top-level parent container/div
// Fragments allow this rule to be satisfied without rendering additional html divs