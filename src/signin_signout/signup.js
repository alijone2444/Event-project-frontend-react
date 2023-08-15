import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';

import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MyLottie from './lottieComponent'
import axios from 'axios';

function Signupform({onswitch}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimationStopped, setIsAnimationStopped] = useState(false);
    const [isSignInClicked, setIsSignInClicked] = useState(false); // New state variable
  
    console.log(isAnimationStopped,"adaw")
    const classes = useStyles();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setIsAnimationStopped(true); // Stop the animation
    };
   
    
    const handlePasswordClick = () => {
      console.log('Password field clicked');
      setIsAnimationStopped(true); // Stop the animation
    };
    
    const handleusernameClick= () => {
      console.log('Password field clicked');
      setIsAnimationStopped(false); // Stop the animation
    };
    const handleSignUpClick = () => {
      console.log('Signup link clicked');
      setIsSignInClicked(true); 
      onswitch()
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
  
      if (email && password && password.length > 6){
        //here the backend begins
        console.log("pass check ok")
        axios.post('http://localhost:3001/signup', {
          email: email,
          password: password,
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
    <div className={`${classes.parent} ${isSignInClicked ? classes.animateRotate : ''} `}>
            <Container maxWidth="sm" className={classes.root} >
            <div  className={classes.lottie} ><MyLottie  isAnimationStopped={isAnimationStopped} /></div>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                label="User name"
                type="User name"
                value={email}
                onChange={handleEmailChange}
                onClick={handleusernameClick}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: '#0195db' } }}
                />
                <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onClick={handlePasswordClick}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: '#0195db' } }}
                />
                <TextField
                label="Confirm Password"
                type="password"
                value={password}
                onClick={handlePasswordClick}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: '#0195db' } }}
                />
                
                <div className={classes.linklg}>
                    <p>already have an account?</p>
                    <Link  style={{color:"#0195db"}} onClick={handleSignUpClick}>SignIn</Link>
                 </div>
                <div className={classes.new}>
                    <Button type="submit" variant="contained"  className={classes.buttonlg}>
                    Signup
                    </Button>
                </div>
            </form>
            </Container>
        </div>
    )
}const useStyles = makeStyles({
    parent: {
      paddingRight: '10%',
      paddingLeft: '10%',
    animation: '$root 2s ease-in-out',
    },
    root: {
      backdropFilter: 'blur(25px)',
      borderRadius: '5%',
      width: '100%',
      border: '1px solid lightgrey',
    
    },
    form:{
      marginTop:"40%"
    },
    fields: {
      color: 'black',
      '& input': {
        color: 'black',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0195db',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0195db',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#0195db',
      },
    },
    buttonlg: {
      backgroundColor: '#0195db !important',
      color: 'white !important',
      padding: '5px 10px',
      width: '100%',
      paddingBottom: '10%',
    },
    linklg: {
      color: 'black',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    new:{
      paddingTop:"10%",
      paddingBottom:"10%",
    },
    lottie: {
      paddingTop:"5%"
    },
    animateRotate: {
      animation: '$rotateAnimation 2s ease-in-out forwards',
      animationDelay: '0.3s',
    },
    '@keyframes rotateAnimation': {
      '0%': {
        transform: ' rotateY(0deg) ',
      },
      '100%': {
        transform: ' rotateY(1turn) ',
      },
    },
    
    '@keyframes root': {
      '0%': {
        opacity:"0.5",
        backdropFilter: 'blur(15px)',
      },
      '50%': {
        opacity:"0.7",
        backdropFilter: 'blur(15px)',
      },
      '100%': {
        opacity:"1",
        backdropFilter: 'blur(15px)',
      },
    },
    
  '@media (max-width: 500px)': {
    root:{
      height:"100%",
          },
          new:{
            paddingTop:"15%",
          }
  }
  });
export default Signupform;