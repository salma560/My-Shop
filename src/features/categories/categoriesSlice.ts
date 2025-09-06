import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {http} from './../../api/http'

export interface Category {
  id: string | number
  name: string
  prefix: string
}

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = { items: [], loading: false, error: null }

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const { data } = await http.get<Category[]>('/categories')
    return data
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load categories'
      })
  }
})

export default categoriesSlice.reducer
