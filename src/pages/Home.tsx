import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, selectFilteredProducts } from '@/features/products/productsSlice';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import ProductCard from '@/components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';



type Props = { showOnlyProducts?: boolean };

export default function Home({ showOnlyProducts = false }: Props) {
  const dispatch = useAppDispatch();
  const { items: categories, loading: cLoading } = useAppSelector(s => s.categories);
  const products = useAppSelector(selectFilteredProducts);
  const pLoading = useAppSelector(s => s.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
    if (!showOnlyProducts) dispatch(fetchCategories());
  }, [dispatch, showOnlyProducts]);

  return (
    <Container className="py-4">
      {!showOnlyProducts && (
        <>
    <div className="title-leftbar">
  <div className="bar" />
  <h2> Shop By Category</h2>
</div>


          {cLoading ? <p>Loading…</p> : (
            <Row className="g-3 mb-4">
              {categories.map(c => (
                <Col key={String(c.id)} xs={6} md={3} lg={2}>
                  <Link to={`/category/${c.prefix}`} className="text-decoration-none">
                    <img src={c.img} alt={c.title} className="img-fluid rounded-4 cat-thumb" />
<div className="mt-2 text-center text-dark fw-medium">{c.title}</div>

                    
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

     <div className="title-leftbar">
  <div className="bar" />
  <h2>Products</h2>
</div>


      {pLoading ? <p>Loading…</p> : (
        <Row className="g-3">
          {products.map(p => (
            <Col key={String(p.id)} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

