import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setCredentials,
  useRegisterMutation,
} from '../../features/auth/authSlice';

// Styles
import { Button } from '../../css/Button.styled';
import { Form, CenterWrapper } from './StyledAuth';
import { Input } from '../../css/StyledInput';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [register] = useRegisterMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [password2, setPassword2] = useState('');

  const { email, password, first_name, last_name } = formData;

  const onChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));


  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error(`Password don't match`);
    }

    const userProfile = await register(formData).unwrap();
    dispatch(setCredentials(userProfile));
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
        <h1>Register a account</h1>
        <label htmlFor='first_name'> First Name</label>
        <Input
          type='text'
          name='first_name'
          id='first_name'
          placeholder='First Name'
          autoComplete='off'
          value={first_name}
          onChange={onChange}
          required
        />

        <label htmlFor='last_name'> Last Name</label>
        <Input
          type='text'
          name='last_name'
          id='last_name'
          placeholder='Last Name'
          autoComplete='off'
          value={last_name}
          onChange={onChange}
          required
        />

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

        <label htmlFor='password2'> Confirm Password</label>
        <Input
          type='password'
          id='password2'
          placeholder='Confirm Password'
          autoComplete='off'
          onChange={({ target: { value } }) => setPassword2(value)}
          value={password2}
          required
        />

        <Button>Create Account</Button>
        <span>
          By signing up, you agree to the Terms of Use and Privacy Policy
        </span>
      </Form>
    </CenterWrapper>
  );
}

export default Register;
