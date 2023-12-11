import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };
const navigate = useNavigate()
  return (
    <Container maxWidth="sm" style={{width:"100%",}}>
      <Paper elevation={3} style={{ padding: '20px',backdropFilter:'blur(5px)',background:'transparent' }}>
        <Typography variant="h5" gutterBottom style={{padding:"5%",textAlign:"Center",fontFamily:'Brush Script MT, Brush Script Std, cursive',color:"blue"}}>
          IST HUB
        </Typography>
        {/* Welcome to 'IST HUB' */}
        <Typography variant="h6" gutterBottom style={{color:"grey",padding:"5%",paddingTop:0,paddingBottom:"10%",textAlign:"Center",fontSize:'1em'}}>
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
              />
            </Grid>
            <Grid item xs={12}  marginBottom={5}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
              />
            </Grid>
            
          <Grid item xs={12}  marginBottom={5}>
                <div style={{ textAlign: 'center' }}>
                <a href="/forgot-password">Forgot Password?</a>
                </div>
        </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: '5%' }}
            onClick={()=>{navigate('/home')}}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
