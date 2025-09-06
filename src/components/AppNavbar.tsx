import { Navbar, Nav, Container, Badge, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
export default function AppNavbar() {
const cartCount = useAppSelector(s => s.cart.items.reduce((a, c) => a +
c.qty, 0))
const user = useAppSelector(s => s.auth.user)
const nav = useNavigate()
return (
<Navbar bg="light" expand="lg" className="mb-3 border-bottom">
<Container className="container-max">
<Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="me-auto">
<Nav.Link as={Link} to="/">Home</Nav.Link>
</Nav>
<Form className="d-flex me-3" onSubmit={(e) => { e.preventDefault();
nav(`/search`)} }>
<Form.Control type="search" placeholder="Search" className="me-2" />
<Button variant="outline-secondary">Go</Button>
</Form>

<Nav>
<Nav.Link as={Link} to="/cart">
Cart <Badge bg="secondary">{cartCount}</Badge>
</Nav.Link>
{user ? (
<Nav.Link as={Link} to="/profile">Hi, {user.name}</Nav.Link>
) : (
<Nav.Link as={Link} to="/login">Login</Nav.Link>
)}
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
)
}