import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch } from '@/store/hooks';
import type { Product } from '@/features/products/productsSlice';
import { addToCart } from '@/features/cart/cartSlice';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const handleAdd = () => dispatch(addToCart(product));

  const imgSrc = product.image && product.image.trim().length
    ? product.image
    : '/placeholder.png';

  return (
    <Card className="h-100 shadow-card card-hover">
      <div className="ratio-box">
        <img
          src={imgSrc}
          alt={product.title}
          className="card-img-fit"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.png'; }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-semibold mb-2 line-clamp-1">
          {product.title}
        </Card.Title>
        <Card.Text className="text-muted mb-3 line-clamp-2">
          {product.description}
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>${product.price}</strong>
          <div className="d-flex gap-2">
            <Button variant="primary" className="btn-pill" onClick={handleAdd}>Add</Button>
            <LinkContainer to={`/product/${product.id}`}>
              <Button variant="outline-secondary" className="btn-pill">Details</Button>
            </LinkContainer>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
