import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MyLottie from './lottieComponent'

function Signupform(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimationStopped, setIsAnimationStopped] = useState(false);
    const [isSignInClicked, setIsSignInClicked] = useState(false); // New state variable
    
    const [formKey, setFormKey] = useState(0); // New state variable
    const classes = useStyles();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
   
    
    const handlePasswordClick = () => {
      console.log('Password field clicked');
      setIsAnimationStopped(true); // Stop the animation
    };
    
    const handleusernameClick= () => {
      console.log('Password field clicked');
      setIsAnimationStopped(false); // Stop the animation
    };
    const handleSignInClick = () => {
      console.log('Signup link clicked');
      setIsSignInClicked(true); // Update state variable when signup link is clicked
      setFormKey(prevKey => prevKey + 1); 
    };
    return(
        <div className={`${classes.parent} ${isSignInClicked ? classes.animateRotate : ''} `}>
            <Container maxWidth="sm" className={classes.root} style={{ width: '100%' }}>
            <div  className={classes.lottie} ><MyLottie  key={formKey} isAnimationStopped={isAnimationStopped} /></div>
            <form >
                <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onClick={handleusernameClick}
                fullWidth
                margin="normal"
                style={{zIndex:"2"}}
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: 'rgb(0, 255, 221)' } }}
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
                InputLabelProps={{ style: { color: 'rgb(0, 255, 221)' } }}
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
                InputLabelProps={{ style: { color: 'rgb(0, 255, 221)' } }}
                />
                
                <div className={classes.linklg}>
                    <p>already have an account?</p>
                    <Link  style={{color:"skyblue"}} onClick={handleSignInClick}>SignIn</Link>
                 </div>
                <div style={{}}>
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
      position:"absolute",
      zIndex:"3"
    },
    root: {
      paddingTop: '50%',
      backdropFilter: 'blur(25px)',
      borderRadius: '5%',
      padding: '10px',
      width: '100%',
      borderBottom: '1px solid white',
      
    },
    fields: {
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
      backgroundColor: 'rgb(0, 255, 221) !important',
      color: 'white !important',
      padding: '5px 10px',
      width: '100%',
      paddingBottom: '10%',
    },
    linklg: {
      color: 'rgb(0, 255, 221)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      zIndex: '1',
      position: 'absolute',
      top: '0',
    },
    animateRotate: {
      animation: '$rotateAnimation 0.7s ease-in-out forwards',
      animationDelay: '0.3s',
    },
    '@keyframes rotateAnimation': {
      '0%': {
        transform: 'translateX(0)',
        zIndex:"2"
      },
      '50%': {
        transform: 'translateX(500px)',
      },
      
    },
  });
export default Signupform;