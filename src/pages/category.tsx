import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import ProductCard from '@/components/ProductCard'
import { fetchProducts } from '@/features/products/productsSlice'
export default function Category() {
const { prefix } = useParams()
const dispatch = useAppDispatch()
const { items, loading } = useAppSelector(s => s.products)
useEffect(() => { dispatch(fetchProducts()) }, [dispatch])
const filtered = items.filter(p => (p.cat_prefix || p.category) === prefix)
return (
<Container className="container-max py-4">
<h3 className="mb-3 text-capitalize">{prefix}</h3>
{loading && <p>Loading...</p>}
<Row className="g-3">
{filtered.map(p => (
<Col key={p.id} xs={12} sm={6} md={4}>
<ProductCard product={{ ...p, image: p.image ?? p.img ?? '' }} />
</Col>
))}
</Row>
</Container>
)
}