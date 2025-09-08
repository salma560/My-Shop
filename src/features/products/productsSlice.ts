
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import http from '@/api/http';
import type { RootState } from '@/store';


export type ProductRaw = {
  id: string | number;
  title: string;
  price: number | string;
  img?: string;
  image?: string;   
  image2?: string;
  description?: string;
  description2?: string;
  cat_prefix?: string;
  category?: string;
};

export type Product = {
  id: string | number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category: string;
};


const normalize = (p: ProductRaw): Product => ({
  id: p.id,
  title: p.title,
  price: typeof p.price === 'string' ? Number(p.price) : (p.price ?? 0),
  image: p.image ?? p.img ?? p.image2 ?? '',
  description: p.description ?? p.description2 ?? '',
  category: p.category ?? p.cat_prefix ?? '',
});


interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
};


export const fetchProducts = createAsyncThunk<
  Product[],
  { category?: string } | void
>('products/fetch', async (arg) => {
  const params = arg && arg.category ? { cat_prefix: arg.category } : undefined;
  const { data } = await http.get<ProductRaw[]>('/products', { params });
  return data.map(normalize);
});


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload.trim().toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load products';
      });
  },
});

export const { setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;


export const selectFilteredProducts = (state: RootState): Product[] => {
  const q = state.products.searchQuery;
  if (!q) return state.products.items;
  return state.products.items.filter((p) => {
    const hay = `${p.title ?? ''} ${p.description ?? ''} ${p.category ?? ''}`.toLowerCase();
    return hay.includes(q);
  });
};
