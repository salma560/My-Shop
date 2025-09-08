import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import http from '@/api/http';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { toast } from 'react-toastify';
import type { Product, ProductRaw } from '@/features/products/productsSlice';



type ProductApi = {
  id: string | number;
  title: string;
  price: string | number;
  img?: string;
  image?: string;
  description?: string;
  cat_prefix?: string;
  category?: string;
};

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    let mounted = true;
    if (!id) return;

    http
      .get<ProductApi>(`/products/${id}`)
      .then(({ data }) => {
        if (!mounted) return;

        const normalized: Product = {
          id: data.id,
          title: data.title,
          price: typeof data.price === 'string' ? Number(data.price) : (data.price ?? 0),
          image: data.image ?? data.img ?? '',
          description: data.description ?? '',
          category: data.category ?? data.cat_prefix ?? '',
        };

        setProduct(normalized);
      })
      .catch(() => {
        toast.error('Product not found');
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <Container className="py-4 container-max">Loading...</Container>;
  }

  if (!product) {
    return <Container className="py-4 container-max">Not found</Container>;
  }

  const handleAdd = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  return (
    <Container className="py-4 container-max">
      <Row className="g-4">
        <Col md={6}>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
            }}
          />
        </Col>

        <Col md={6}>
          <h2 className="mb-3">{product.title}</h2>
          {product.description && <p>{product.description}</p>}
          <h4 className="mb-3">${product.price}</h4>

          <Button variant="primary" onClick={handleAdd}>
            Add to cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
