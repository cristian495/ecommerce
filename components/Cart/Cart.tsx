import QuantityInput from "components/QuantityInput";
import { useCartState } from "hooks";
import { urlFor } from "lib/client";
import getStripe from "lib/getStripe";
import Link from "next/link";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { removeItem, totalQuantities, cartItems, toggleCart, totalPrice } =
    useCartState();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/jon",
      },
      body: JSON.stringify({ cartItems }),
    });
    if (response.status === 500) return;
    const data = await response.json();
    console.log(data);
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => toggleCart()}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => toggleCart()}
                className="btn"
              >
                Continue shoping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={`${item.product._id}`}>
                <img
                  src={urlFor(item?.product.image[0])}
                  alt={`${item?.product.name}`}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.product.name}</h5>
                    <h4>${item.product.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <QuantityInput productId={item.product._id} />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => removeItem(item.product._id)}
                >
                  <TiDeleteOutline />
                </button>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
