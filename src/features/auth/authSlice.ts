import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@/api/http';

export type User = { id: number | string; name: string; email: string; password?: string };

type AuthState = { user: User | null; loading: boolean; error: string | null };

const loadUser = (): User | null => {
  try { const u = localStorage.getItem('auth_user'); return u ? JSON.parse(u) : null; } catch { return null; }
};
const saveUser = (u: User | null) => {
  u ? localStorage.setItem('auth_user', JSON.stringify(u)) : localStorage.removeItem('auth_user');
};

const initialState: AuthState = { user: loadUser(), loading: false, error: null };


export const register = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    
    const { data: exists } = await http.get<User[]>('/users', { params: { email: payload.email } });
    if (exists.length) return rejectWithValue('Email already exists');

    const { data } = await http.post<User>('/users', payload);
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message || 'Register failed');
  }
});


export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.get<User[]>('/users', { params: payload });
    if (!data.length) return rejectWithValue('Invalid email or password');
    return data[0];
  } catch (e: any) {
    return rejectWithValue(e?.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(s) { s.user = null; saveUser(null); },
  },
  extraReducers: (b) => {
    b.addCase(register.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(register.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; saveUser(a.payload); });
    b.addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Register failed'; });

    b.addCase(login.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; saveUser(a.payload); });
    b.addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Login failed'; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
