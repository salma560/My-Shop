// src/pages/login.tsx
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 chars').required('Required'),
})

export default function Login() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((s) => s.auth)
  const nav = useNavigate()

  return (
    <Container className="container-max py-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Login</h3>

      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await dispatch(login(values)).unwrap()
            toast.success('Welcome!')
            nav('/')
          } catch (e: any) {
            toast.error(e?.message || 'Login failed')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={loading || isSubmitting}>
              {(loading || isSubmitting) && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
