import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/features/auth/authSlice';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (login.fulfilled.match(res)) nav('/');
  };

  return (
    <Container className="py-4 container-max" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Login</h2>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>Login</Button>
      </Form>

      <div className="mt-3">
        Don’t have an account? <Link to="/register">Register</Link>
      </div>
    </Container>
  );
}
