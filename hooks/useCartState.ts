import { toast } from "react-hot-toast";
import { CartItem, CartOperationType } from "models";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeCartItem,
  changeCartItemQuantity,
  toggleShowCart,
  resetCart,
} from "redux/states/cart.state";
import { RootState } from "redux/store";

export const useCartState = () => {
  const dispatch = useDispatch();
  const { totalQuantities, showCart, totalPrice, cartItems } = useSelector(
    (state: RootState) => ({
      totalQuantities: state.cart.totalQuantities,
      showCart: state.cart.showCart,
      totalPrice: state.cart.totalPrice,
      cartItems: state.cart.cartItems,
    })
  );

  const addItem = (newCartItem: CartItem) => {
    dispatch(addToCart(newCartItem));
  };

  const toggleCart = () => {
    dispatch(toggleShowCart());
  };

  const removeItem = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  const clearCart = () => {
    dispatch(resetCart());
  };

  return {
    addItem,
    totalQuantities,
    toggleCart,
    showCart,
    totalPrice,
    cartItems,
    removeItem,
    clearCart,
  };
};
