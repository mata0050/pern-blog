import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import { Button } from '../../css/Button.styled';
import { Form, CenterWrapper } from './StyledAuth';
import { Input } from '../../css/StyledInput';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setCredentials,
  useLoginMutation,
} from '../../features/auth/authSlice';


function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  if (error) {
    toast.error(error.data.message);
  }

  const onChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const userProfile = await login(formData).unwrap();
    dispatch(setCredentials(userProfile));
    localStorage.setItem('user', JSON.stringify(userProfile));
    navigate('/');
  };

  useEffect(() => {
    if (user) return navigate('/');
  }, [navigate, user]);

  return (
    <CenterWrapper>
      <Form onSubmit={(e) => onSubmit(e)}>
        <h1>Sign In</h1>
        <label htmlFor='email'> Email</label>
        <Input
          type='email'
          name='email'
          id='email'
          placeholder='Email Address'
          autoComplete='off'
          value={email}
          onChange={onChange}
          required
        />

        <label htmlFor='password'> Password</label>
        <Input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          autoComplete='off'
          onChange={onChange}
          value={password}
          required
        />

        <Button>Sign in</Button>
        <span>
          By signing up, you agree to the Terms of Use and Privacy Policy
        </span>

        <Link to='/register'>Create your free account</Link>
      </Form>
    </CenterWrapper>
  );
}

export default Login;
