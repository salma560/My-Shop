// src/components/ProductCard.tsx
import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import type { Product } from '@/types'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toast } from 'react-toastify'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const handleAdd = () => {
    dispatch(addToCart(product))
    toast.success('Added to cart')
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <strong>${product.price}</strong>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleAdd}>Add</Button>

            <LinkContainer to={`/product/${product.id}`}>
              <Button variant="outline-secondary">Details</Button>
            </LinkContainer>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
