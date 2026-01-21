import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.role.selectedRole);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate(`/${role.toLowerCase()}`);
    }
  };

  if (!role) navigate('/');

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Form className="p-4 shadow w-50" onSubmit={handleSubmit}>
        <h3 className="mb-3">Login as {role}</h3>

        <Form.Control
          className="mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit" className="w-100">Login</Button>

        <div className="mt-3 text-center">
          <Link to="/forgot-password">Forgot Password?</Link><br />
          <Link to="/register">New User? Register</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
