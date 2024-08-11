import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { AuthContext } from './Authcontext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

const Login =() =>{

  const { login } = React.useContext(AuthContext);

  
 var navigate=useNavigate()

 const [error, setError] = React.useState('');
 const [success, setSuccess] = React.useState('');

 const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const formData = Object.fromEntries(data.entries());
  console.log(formData)
  axios.post('http://localhost:3010/login', formData)
  .then((res) => {
   console.log(res);
   if (res.status === 200 && res.data.token) {
    {
      const decodedToken = jwtDecode(res.data.token);
      const authData = { 
        token: res.data.token, 
        isAdmin: decodedToken.isAdmin, 
        userId: decodedToken.id 
      };
      login(authData);
      alert(res.data.message)
      setSuccess("Login Succesfull")
    navigate('/')
   }
    } else {
      alert('Login failed');
      setError("Login Failed")
  }
})
    .catch((err)=>{
      console.log(err)
    })
    console.log(data);
  


  
  

  };



  return (
    <div className='sign-background' >
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color:"black"}}>
            Sign in
          </Typography>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login 
            </Button>
            <Grid container style={{justifyContent:"center"}}>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
            <Snackbar
  open={!!error}
  autoHideDuration={6000}
  onClose={() => setError('')}
  message={error}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top center
/>
<Snackbar
  open={!!success}
  autoHideDuration={6000}
  onClose={() => setSuccess('')}
  message={success}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top center

/>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default Login