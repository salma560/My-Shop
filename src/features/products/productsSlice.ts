import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from '@/api/http'
import type { Product } from '@/types'
interface ProductsState {
items: Product[]

loading: boolean
error?: string
}
const initialState: ProductsState = { items: [], loading: false }
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
const { data } = await http.get<Product[]>('/products')

return data.map(p => ({ ...p, price: Number(p.price) }))
})
const productsSlice = createSlice({
name: 'products',
initialState,
reducers: {},
extraReducers: (b) => {
b.addCase(fetchProducts.pending, (s) => { s.loading = true; s.error =
undefined })
.addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.items =
a.payload })
.addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error =
a.error.message })
}
})
export default productsSlice.reducer