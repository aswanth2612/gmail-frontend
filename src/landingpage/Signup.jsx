import React, { useState } from 'react'
import '../App.css';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Signup = () => {
  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Navigation
  const navigate = useNavigate()
  // Evetss
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'User Name is required';
      valid = false;
    }

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
    e.preventDefault();
    if (validateForm()) {
      axios.post(import.meta.env.VITE_BACKEND_PATH + '/auth/signup',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }).then(response => {
          if (response.data.status) {
            navigate('/login')
          }
        }).catch(err => {
        })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        <Typography component="h1" variant="h5">Signup</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Full Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
            </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"I already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup;
