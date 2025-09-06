import { useEffect, useMemo } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts } from '@/features/products/productsSlice'
import ProductCard from '@/components/ProductCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchCategories } from '@/features/categories/categoriesSlice'
export default function Home() {
const dispatch = useAppDispatch()
const { items: products, loading } = useAppSelector(s => s.products)
const { items: categories } = useAppSelector(s => s.categories)
useEffect(() => { dispatch(fetchProducts()); dispatch(fetchCategories()) },
[dispatch])
const top = useMemo(() => products.slice(0, 5), [products])
return (
<div>
<Swiper style={{ height: 260 }} loop modules={[Autoplay]} autoplay={{
delay: 2500 }}>
{top.map(p => (
<SwiperSlide key={p.id}>
<div className="bg-dark text-white d-flex align-items-center
justify-content-center h-100">
<h2 className="m-0">{p.title}</h2>
</div>
</SwiperSlide>
))}
</Swiper>

<Container className="container-max py-4">
<h4 className="mb-3">Shop by Category</h4>
<Row className="g-3">
  {categories.map((c) => (
    <Col key={c.id} xs={6} md={4} lg={3}>
      <LinkContainer to={`/category/${c.prefix}`} style={{ textDecoration: 'none' }}>
        <Card className="h-100">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/seed/${c.prefix}/600/400`} 
            alt={c.name}
          />
          <Card.Body>
            <Card.Title className="h6 text-dark m-0">{c.name}</Card.Title>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  ))}
</Row>
<h4 className="mb-3">Products</h4>
{loading && <p>Loading...</p>}
<Row className="g-3">
{products.map(p => (
<Col key={p.id} xs={12} sm={6} md={4}>
<ProductCard product={{ ...p, image: p.image ?? p.img ?? '' }} />
</Col>
))}
</Row>
</Container>
</div>
)
}