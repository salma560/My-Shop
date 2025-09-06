
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Product } from '@/types'


export type ID = string | number

interface CartState {
  items: CartItem[]
}
const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.product.id === action.payload.id)
      if (existing) existing.qty += 1
      else state.items.push({ product: action.payload, qty: 1 })
    },

    // هنا نقبل string | number
    removeFromCart: (state, action: PayloadAction<ID>) => {
      state.items = state.items.filter(i => i.product.id !== action.payload)
    },

    changeQty: (state, action: PayloadAction<{ id: ID; qty: number }>) => {
      const it = state.items.find(i => i.product.id === action.payload.id)
      if (it) it.qty = Math.max(1, action.payload.qty)
    },

    clearCart: (state) => { state.items = [] }
  }
})

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
