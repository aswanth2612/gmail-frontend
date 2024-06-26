import React, { useState } from 'react'
import '../App.css';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom'
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const ResetPassword = () => {
  // State
  const [formData, setFormData] = useState({
    password: '',
  });
  const [errors, setErrors] = useState({
    password: '',
  });
  const [password, setPassword] = useState('')
  // Navigation
  const navigate = useNavigate()
  // Evetss
  const validateForm = () => {
    let valid = true;
    const newErrors = { password: '' };
    if (!formData.password) {
      newErrors.password = 'Password is required';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post(import.meta.env.VITE_BACKEND_PATH + '/auth/reset-password?token=' + searchParams.get("token"),
        { password: formData.password }
      ).then(response => {
        if (response.data.status) {
          navigate('/login')
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
        <Typography component="h1" variant="h5">Reset Password</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            Reset
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

export default ResetPassword;
