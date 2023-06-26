import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

function Loginform(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      if (email && password){
        //here the backend begins
        axios.get('https://api.example.com/data',{
          params: {
            param1: 'value1',
            param2: 'value2',
          }
        })
          .then(response => {
            // Handle on successful response
            console.log(response.data);
          })
          .catch(error => {
            // Handle the error
            console.error(error);
          });
      }
    };
    return(
        <div>
            <Container maxWidth="sm" className={classes.root}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
                required
                />
                <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
                required
                />
                <Button type="submit" variant="contained" color="primary">
                Login
                </Button>
            </form>
            </Container>
        </div>
    )
}
const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '5px 10px',
  },
});
export default Loginform;