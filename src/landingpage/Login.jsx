import React, { useState } from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../provider/UserProvider';
import axios from 'axios';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState('');
  const dispatch = useUserDispatch();

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_PATH}/auth/login`, { email, password })
      .then(response => {
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
          navigate('/email/index')
        }
      }).catch(err => {
        console.log(err);
      })
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
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
