import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import cartReducer from '@/features/cart/cartSlice'
import productsReducer from '@/features/products/productsSlice'
import categoriesReducer from '@/features/categories/categoriesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
