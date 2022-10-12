import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Cart, CartItem, CartOperationType, ProductType } from "models";

const initialCartState: Cart = {
  showCart: false,
  cartItems: [],
  totalPrice: 0.0,
  totalQuantities: 0,
  qty: 1,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    resetCart: (state) => {
      state = initialCartState;
    },
    toggleShowCart: (state) => {
      state.showCart = !state.showCart;
    },
    incQty: (state) => {
      state.qty++;
    },
    decQty: (state) => {
      //   state.qty -= 1;
      state.qty = state.qty - 1 < 1 ? 1 : (state.qty -= 1);
    },
    addToCart: (state, { payload }: { payload: CartItem }) => {
      const { product: productAdded, quantity } = payload;

      let newCartItems = state.cartItems;
      const newTotalQuantities = state.totalQuantities + quantity;
      const newTotalPrice = state.totalPrice + productAdded.price * quantity;

      const isProductInCart = state.cartItems.find(
        (item) => item.product._id === productAdded._id
      );
      if (isProductInCart) {
        newCartItems = state.cartItems.map((item) => {
          if (item.product._id === productAdded._id) {
            return {
              product: productAdded,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      } else {
        newCartItems.push({ product: productAdded, quantity: quantity });
      }

      state.totalQuantities = newTotalQuantities;
      state.totalPrice = parseFloat(newTotalPrice.toFixed(2));
      state.cartItems = newCartItems;
    },

    removeCartItem: (state, { payload: productId }: { payload: string }) => {
      const productFound = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (!productFound) return;

      const newCartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
      state.cartItems = newCartItems;
      state.totalPrice = parseFloat(
        (state.totalPrice - productFound.product.price).toFixed(2)
      );
      state.totalQuantities = state.totalQuantities - productFound.quantity;
    },

    changeCartItemQuantity: (state, { payload }) => {
      type Payload = { productId: string; operation: CartOperationType };
      const { productId, operation }: Payload = payload;

      const cartItemFound = state.cartItems.find(
        (item) => item.product._id === productId
      );
      const cartItemFoundIndex = state.cartItems.findIndex(
        (item) => item.product._id === productId
      );

      if (!cartItemFound) return;

      if (operation === CartOperationType.increment) {
        state.cartItems[cartItemFoundIndex] = {
          product: cartItemFound.product,
          quantity: cartItemFound.quantity + 1,
        };
        state.totalPrice = parseFloat(
          (state.totalPrice + cartItemFound.product.price).toFixed(2)
        );
        state.totalQuantities = state.totalQuantities + 1;
      } else if (operation === CartOperationType.decrement) {
        if (cartItemFound.quantity > 1) {
          state.cartItems[cartItemFoundIndex] = {
            product: cartItemFound.product,
            quantity: cartItemFound.quantity - 1,
          };
          state.totalPrice = parseFloat(
            (state.totalPrice - cartItemFound.product.price).toFixed(2)
          );
          state.totalQuantities = state.totalQuantities - 1;
        }
      }
    },
  },
});

export const {
  toggleShowCart,
  incQty,
  decQty,
  addToCart,
  removeCartItem,
  changeCartItemQuantity,
  resetCart
} = cartSlice.actions;
export default cartSlice.reducer;
