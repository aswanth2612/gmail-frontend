import React, { useState, lazy, useEffect } from 'react'
import '../App.css';
import { useNavigate, Link, Navigate, RouterProvider } from 'react-router-dom';
import { useUserDispatch } from '../provider/UserProvider';
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SuspenseLoader from '../components/common/SuspenseLoader';
import UserProvider from '../provider/UserProvider';
import { FormControl } from '@mui/material';
import { useCookies } from 'react-cookie';

const ErrorComponent = lazy(() => import('../components/common/ErrorComponent'));

const Login = () => {
  const [cookies, setCookie] = useCookies(['username', 'email', 'token']);
  const [user, setUser] = useState('');
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      axios.post(import.meta.env.VITE_BACKEND_PATH + '/auth/login',
        { email: formData.email, password: formData.password })
        .then(response => {
          const newErrors = { email: '', password: '' };
          if (response.data.status) {
            setUser({
              username: response.data.username,
              email: response.data.email,
              token: response.data.token
            });
            dispatch({
              type: 'set',
              username: response.data.username,
              email: response.data.email,
              token: response.data.token
            });
            setCookie("username", response.data.username);
            setCookie("email", response.data.email);
            setCookie("token", response.data.token);
            navigate('/email/index')
          } else {
            if (response.data.error_code === 'AS001') {
              newErrors.email = 'Email Address Not Found';
              newErrors.password = ' ';
            } else if (response.data.error_code === 'AS002') {
              newErrors.password = 'Password is Incorrect!!!';
            }
            setErrors(newErrors);
          }
        }).catch(err => {
          console.log(err);
          navigate("/error");
        })
    }
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  useEffect(() => {
    if (cookies.token && cookies.token != '') {
      navigate("/emails/index");
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.rememberMe} onChange={handleChange} name="rememberMe" color="primary" />}
            label="Remember Me"
            sx={{ mt: 1, textAlign: 'left' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;
