// src/features/categories/categoriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/api/http'

export type Category = { id: string | number; title: string; prefix: string; img: string }

interface State { items: Category[]; loading: boolean; error: string | null }
const initialState: State = { items: [], loading: false, error: null }

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetch',
  async () => {
    const { data } = await http.get<Category[]>('/categories')
    return data
  }
)

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchCategories.pending, s => { s.loading = true; s.error = null })
    b.addCase(fetchCategories.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
    b.addCase(fetchCategories.rejected, (s, a) => { s.loading = false; s.error = a.error.message ?? 'Failed to load categories' })
  }
})
export default slice.reducer
