import AppNavbar from '@/components/AppNavbar'
import Home from '@/pages/Home'
import ProductDetails from './pages/productDeatails'
import Cart from './pages/cart'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Category from './pages/category'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
export default function App() {
return (
<div>
<AppNavbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/category/:prefix" element={<Category />} />
<Route path="/product/:id" element={<ProductDetails />} />
<Route path="/cart" element={<Cart />} />
<Route path="/login" element={<Login />} />
<Route path="*" element={<NotFound />} />
</Routes>
<ToastContainer position="top-right" autoClose={1500} hideProgressBar
theme="colored" />
</div>
)
}
