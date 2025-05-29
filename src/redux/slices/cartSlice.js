import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, color, quantity = 1 } = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === id && item.color === color
      );

      if (existingItemIndex >= 0) {
        // If item already exists in cart, increase quantity
        state.cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        state.cart.push({
          id,
          name,
          price,
          image,
          color,
          quantity,
        });
      }

      // Update cart count
      state.cartCount = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      const { id, color } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.id === id && item.color === color)
      );

      // Update cart count
      state.cartCount = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, color, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.id === id && item.color === color
      );

      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = quantity;
      }

      // Update cart count
      state.cartCount = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.cart = [];
      state.cartCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartCount = (state) => state.cart.cartCount;

export default cartSlice.reducer;
