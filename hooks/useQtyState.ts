import { CartOperationType } from "models";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCartItemQuantity,
  decQty,
  incQty,
} from "redux/states/cart.state";
import { RootState } from "redux/store";

export const useQtyState = () => {
  const dispatch = useDispatch();
  const { currentQty, cartItems } = useSelector((state: RootState) => ({
    currentQty: state.cart.qty,
    cartItems: state.cart.cartItems,
  }));

  const increment = () => {
    dispatch(incQty());
  };
  const decrement = () => {
    dispatch(decQty());
  };

  const changeQuantityByProductId = (
    productId: string,
    operation: CartOperationType
  ) => {
    dispatch(changeCartItemQuantity({ productId, operation }));
  };

  const quantityByProductId = (productId: string) => {
    return cartItems.find((item) => item.product._id === productId)?.quantity;
  };

  return {
    increment,
    decrement,
    currentQty,
    changeQuantityByProductId,
    quantityByProductId,
  };
};
