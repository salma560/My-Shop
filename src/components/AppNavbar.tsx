import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button, Badge, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/features/products/productsSlice';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import { logout } from '@/features/auth/authSlice';
import { toast } from 'react-toastify';


export default function AppNavbar() {
  const cartCount = useAppSelector((s) => s.cart.items.reduce((a, c) => a + c.qty, 0));
  const user = useAppSelector((s) => s.auth.user);

  const categories = useAppSelector((s) => s.categories.items);
  const catLoading = useAppSelector((s) => s.categories.loading);

  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  const urlQ = new URLSearchParams(loc.search).get('q') ?? '';
  const [q, setQ] = useState(urlQ);

  useEffect(() => {
    if (!categories.length && !catLoading) dispatch(fetchCategories());
  }, [categories.length, catLoading, dispatch]);

  
  useEffect(() => {
    dispatch(setSearchQuery(urlQ));
  }, [urlQ, dispatch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/?q=${encodeURIComponent(q)}`);
    dispatch(setSearchQuery(q));
  };

  return (
   <Navbar bg="white" expand="lg" className="nav-glass mb-3 sticky-top py-2">
  <Container className="container-max">
    <Navbar.Brand as={Link} to="/">
  <img width="64" height="64" src="https://img.icons8.com/sf-black-filled/64/shopping-cart.png" alt="shopping-cart"/>
  My shop
</Navbar.Brand>


    <Navbar.Toggle aria-controls="main-nav" />
    <Navbar.Collapse id="main-nav">
      {/* LEFT */}
      <Nav className="me-auto align-items-lg-center gap-lg-2">
        <Nav.Link as={Link} to="/" className="nav-link-clean">Home</Nav.Link>
        <Nav.Link as={Link} to="/products" className="nav-link-clean">Products</Nav.Link>

        <NavDropdown title="Categories" id="nav-categories" className="nav-dd">
          {catLoading && <NavDropdown.Item disabled>Loading…</NavDropdown.Item>}
          {!catLoading && categories.length === 0 && (
            <NavDropdown.Item disabled>No categories</NavDropdown.Item>
          )}
          {!catLoading && categories.map((c) => (
            <NavDropdown.Item key={String(c.id)} as={Link} to={`/category/${c.prefix}`}>
              {c.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>

      
      <Form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={onSubmit}>
        <Form.Control
          type="search"
          placeholder="Search products…"
          className="search-pill me-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button variant="dark" className="btn-pill">Go</Button>
      </Form>

      {/* RIGHT */}
      <Nav className="align-items-lg-center">
        <Nav.Link as={Link} to="/cart" className="nav-link-clean">
          <span className="cart-chip">Cart <span className="chip-badge">{cartCount}</span></span>
        </Nav.Link>

        <NavDropdown
          title={user ? `Hi, ${user.name}` : 'Account'}
          id="nav-account"
          align="end"
          className="nav-dd"
        >
          {user ? (
            <>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { dispatch(logout()); nav('/'); }}>
                Logout
              </NavDropdown.Item>
            </>
          ) : (
            <>
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
