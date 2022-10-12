import { ProductType } from "models";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface Cart {
  showCart: boolean;
  cartItems: Array<CartItem>;
  totalPrice: number;
  totalQuantities: number;
  qty: number;
}

export enum CartOperationType {
  increment = 1,
  decrement = 0,
}
