import Cart from "components/Cart";
import { useCartState } from "hooks";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  const { totalQuantities, toggleCart, showCart } = useCartState();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/"> JSM Headphone</Link>
      </p>
      <button type="button" className="cart-icon" onClick={() => toggleCart()}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
