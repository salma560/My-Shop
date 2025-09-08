import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register } from '@/features/auth/authSlice';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { loading, error, user } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(register(form));
    if (register.fulfilled.match(res)) nav('/');
  };

  return (
    <Container className="py-4 container-max" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Create account</h2>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        </Form.Group>
        <Button type="submit" disabled={loading}>Sign up</Button>
      </Form>
    </Container>
  );
}
