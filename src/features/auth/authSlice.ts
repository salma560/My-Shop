import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '@/api/http'

export type User = { id: string | number; name: string; email: string }
type Credentials = { email: string; password: string }

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

const loadUser = (): User | null => {
  try { const r = localStorage.getItem('auth_user'); return r ? JSON.parse(r) : null } catch { return null }
}
const saveUser = (u: User | null) => { u ? localStorage.setItem('auth_user', JSON.stringify(u)) : localStorage.removeItem('auth_user') }

const initialState: AuthState = { user: loadUser(), loading: false, error: null }

export const login = createAsyncThunk<User, Credentials>(
  'auth/login',
  async (creds, { rejectWithValue }) => {
    const { data } = await http.get<User[]>('/users', { params: creds })
    if (!data.length) return rejectWithValue('Invalid email or password') as any
    return data[0]
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(login.pending, s => { s.loading = true; s.error = null })
    b.addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; saveUser(a.payload) })
    b.addCase(login.rejected, (s, a) => { s.loading = false; s.error = (a.payload as string) || a.error.message || 'Login failed' })
  }
})

export default authSlice.reducer
