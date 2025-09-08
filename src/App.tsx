import AppNavbar from '@/components/AppNavbar'
import Home from '@/pages/Home'
import ProductDetails from './pages/productDeatails'
import Cart from './pages/cart'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Category from './pages/category'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './pages/register'
export default function App() {
return (
<div>
<AppNavbar />




<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Home showOnlyProducts />} />  
  <Route path="/category/:prefix" element={<Category />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="*" element={<NotFound />} />
</Routes>
<footer className="site-footer">
  <div className="container container-max footer-wrap">
    <div className="footer-left">
      <span className="brand-dot">●</span>
      <span className="fw-semibold">My shop</span>
      <span className="footer-sep">•</span>
      <span className="text-muted">© {new Date().getFullYear()}</span>
    </div>

    <nav className="footer-links">
      <a href="/" className="f-link">Home</a>
      <a href="/products" className="f-link">Products</a>
      <a href="/category/men" className="f-link">Men</a>
      <a href="/category/women" className="f-link">Women</a>
    </nav>

    <div className="footer-social">
      <a className="icon-btn" href="https://github.com/" aria-label="GitHub">
        {/* GitHub SVG */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58V21.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.25 1.83 1.25 1.07 1.83 2.82 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.25 2.86.12 3.16.77.84 1.23 1.9 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5z"/></svg>
      </a>
      <a className="icon-btn" href="https://twitter.com/" aria-label="X">
        {/* X / Twitter SVG */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.56 7.49L22 22h-6.873l-5.36-6.88L3.756 22H1l7.07-8.07L2 2h6.873l4.86 6.24L18.244 2Zm-1.2 18h2.07L7.1 4H5.03L17.044 20Z"/></svg>
      </a>
    </div>
  </div>
</footer>



<ToastContainer position="top-right" autoClose={1500} hideProgressBar
theme="colored" />
</div>
)
}
