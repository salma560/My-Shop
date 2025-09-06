import { Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function NotFound() {
  return (
    <Container className="py-5 d-flex flex-column align-items-center text-center">
      <h1 className="display-4 fw-bold">404</h1>
      <p className="lead mb-4">
        The page you are looking for does not exist.
      </p>
      <div className="d-flex gap-2">
        <LinkContainer to="/">
          <Button variant="primary">Go Home</Button>
        </LinkContainer>
        <LinkContainer to="/cart">
          <Button variant="outline-secondary">View Cart</Button>
        </LinkContainer>
      </div>
    </Container>
  )
}
