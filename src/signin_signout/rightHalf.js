import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        <div className={classes.parent}>
            <Container maxWidth="sm" className={classes.root}>
            <h2 style={{paddingBottom:"10%",color:"rgb(0, 255, 221)"}}>Signin</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: 'rgb(0, 255, 221)' } }}
                />
                <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: 'rgb(0, 255, 221)' } }}
                />
                <div className={classes.linklg}>
                    <p>don't have an account?</p>
                    <Link to="/path" style={{color:"skyblue"}}>Signup</Link>
                 </div>
                <div style={{paddingTop:"10%",paddingBottom:"10%"}}>
                    <Button type="submit" variant="contained"  className={classes.buttonlg}>
                    Login
                    </Button>
                </div>
            </form>
            </Container>
        </div>
    )
}
const useStyles = makeStyles({
    parent:{
        paddingRight:"10%",
        paddingLeft:"10%", 
    }
    ,
  root: {
    backdropFilter: "blur(25px)",
    zIndex:"1",
    borderRadius:"5%",
    padding: '10px',
    width:"100%",
    borderBottom:"1px solid white"
  },  fields: {
    color: 'white',
    '& input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
  buttonlg: {
    backgroundColor:"rgb(0, 255, 221) !important",
    color: 'white !important',
    padding: '5px 10px',
    width:"100%",
    paddingBottom:"10%"
},
linklg:{
    color:"rgb(0, 255, 221)",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center ",
    alignItems:'center',
}
,
});
export default Loginform;