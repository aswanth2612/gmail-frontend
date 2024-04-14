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

const ForgotPassword = () => {
  // State
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });
  const [email, setEmail] = useState('')
  // Navigation
  const navigate = useNavigate()
  // Evetss
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '' };
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.get(import.meta.env.VITE_BACKEND_PATH + '/auth/forgot-password',
        { params: { email: formData.email } },
        { data: { email: formData.email } }).then(response => {
          if (response.data.status) {
            navigate('/resetPassword?token=' + response.data.token)
          } else {
            const newErrors = { email: '' };
            newErrors.email = 'Email is not exist.';
            setErrors(newErrors);
          }
        }).catch(err => {
        })
    }
  }
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
        <Typography component="h1" variant="h5">Forgot Password</Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
            </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                {"I already have an account? Login"}
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

export default ForgotPassword;
