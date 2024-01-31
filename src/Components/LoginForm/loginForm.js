import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import '@fontsource/roboto/400.css';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,seterror] = useState(false)
  const navigate = useNavigate();
  const classes = useStyles();

 // ... other imports

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:3002/login', {
      username: email,
      password: password,
    });

    // Handle the response on successful login
    console.log(response.data);

    if (response.data.success === true) {
      navigate('/Home');
    } else {
      // Handle unsuccessful login
      // For example, display an error message to the user
      console.error('Login failed:', response.data.message);
    }
  } catch (error) {
    // Handle the error
    // For example, redirect to a login page or display an error message
    console.error('Error:', error);
    seterror(true)
  }
};

  return (
    <Container maxWidth="sm" style={{ width: "100%" }}>
      <Paper elevation={3} style={{ padding: '20px', backdropFilter: 'blur(5px)', background: 'transparent' }}>
        <Typography variant="h5" gutterBottom style={{ padding: "5%", textAlign: "center", fontFamily: 'roboto', fontWeight: '400', color: "blue" }}>
          IST EMS
        </Typography>
        <Typography variant="h6" gutterBottom style={{ color: "grey", padding: "5%", paddingTop: 0, paddingBottom: "10%", textAlign: "center", fontSize: '1em' }}>
          Life is an event, make it memorable
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} marginBottom={5}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} marginBottom={3}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <div style={{ textAlign: 'center' }}>
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </Grid>
            
            <Grid item xs={12}  marginBottom={1}>
            {error && <p className={classes.errorText}>incorrect password or username</p>}
            </Grid>
          </Grid>
          
         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: '5%' }}
            
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const useStyles = makeStyles({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: '0',
    marginBottom: '0',
    animation: '$blink 1s infinite',
  },
  '@keyframes blink': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  
});
export default LoginForm;
