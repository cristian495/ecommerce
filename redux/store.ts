import { configureStore } from "@reduxjs/toolkit";
import { Cart } from "models/Cart";
import { cartSlice } from "./states/cart.state";

export interface AppStore {
  cart: Cart;
}

export const store = configureStore<AppStore>({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
