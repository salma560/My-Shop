import { Container, Table, Button, Form } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { changeQty, clearCart, removeFromCart } from '@/features/cart/cartSlice'
import { toast } from 'react-toastify'
13
export default function Cart() {
const { items } = useAppSelector(s => s.cart)
const dispatch = useAppDispatch()
const total = items.reduce((a, c) => a + c.qty * c.product.price, 0)
return (
<Container className="container-max py-4">
<h3 className="mb-3">Your Cart</h3>
{items.length === 0 ? (
<p>Cart is empty</p>
) : (
<>
<Table bordered hover>
<thead>
<tr>
<th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</
th><th></th>
</tr>
</thead>
<tbody>
{items.map(it => (
<tr key={it.product.id}>
<td>{it.product.title}</td>
<td>${it.product.price}</td>
<td style={{maxWidth: 100}}>
<Form.Control type="number" min={1} value={it.qty}
onChange={(e) => dispatch(changeQty({ id: it.product.id,
qty: Number(e.target.value) }))} />
</td>
<td>${(it.qty * it.product.price).toFixed(2)}</td>
<td>
<Button variant="outline-danger" size="sm" onClick={() =>
dispatch(removeFromCart(it.product.id))}>Remove</Button>
</td>
</tr>
))}
</tbody>
</Table>
<div className="d-flex justify-content-between align-items-center">
<h5>Total: ${total.toFixed(2)}</h5>
<div className="d-flex gap-2">
<Button variant="outline-secondary" onClick={() =>
dispatch(clearCart())}>Clear</Button>
<Button onClick={() => toast.info('Checkout not implemented yet')}
>Checkout</Button>
</div>
</div>
</>
)}
</Container>
)
}
