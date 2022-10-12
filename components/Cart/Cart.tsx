import QuantityInput from "components/QuantityInput";
import { useCartState } from "hooks";
import { urlFor } from "lib/client";
import getStripe from "lib/getStripe";
import Image from "next/image";
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
                {/* <div > */}
                {urlFor(item?.product.image[0]) && (
                  <img
                    src={urlFor(item?.product.image[0])}
                    // src={"data:image/png;base64,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"}
                    alt={`${item?.product.name}`}
                    className="cart-product-image"
                    width={100}
                    height={100}
                    placeholder="blur"
                  />
                )}
                {/* </div> */}
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
