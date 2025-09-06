import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import type { Product } from '@/types'
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toast } from 'react-toastify'
import { http } from '@/api/http'
export default function ProductDetails() {
const { id } = useParams()
const [product, setProduct] = useState<Product | undefined>()

const [loading, setLoading] = useState(true)
const dispatch = useAppDispatch()
useEffect(() => {
let mounted = true
if (!id) return
http.get<Product>(`/products/${id}`).then(({ data }) => {
const parsed = { ...data, price: Number((data as any).price) }
if (mounted) { setProduct(parsed); setLoading(false) }
}).catch(() => setLoading(false))
return () => { mounted = false }
}, [id])
if (loading) return <Container className="py-4 container-max">Loading...</
Container>
if (!product) return <Container className="py-4 container-max">Not found</
Container>
return (
<Container className="py-4 container-max">
<Row className="g-4">
<Col md={6}><img src={product.image ?? product.img ?? ''}
alt={product.title} className="img-fluid rounded" /></Col>
<Col md={6}>
<h2>{product.title}</h2>
<p>{product.description ?? ''}</p>
<h4>${product.price}</h4>
<Button onClick={() => { dispatch(addToCart(product));
toast.success('Added to cart') }}>
Add to cart
</Button>
</Col>
</Row>
</Container>
)
}
