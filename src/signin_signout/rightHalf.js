import { useState ,useEffect} from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MyLottie from './lottieComponent';
import { useNavigate } from 'react-router-dom';


function Loginform({ onswitch }){

  //const classes1 = useStyles();
 useEffect(() => {
  // Apply the gradient background to the body element
  document.body.style.background = 'linear-gradient(to bottom, white 5%, #EAF6FF 10%, #EAF6FF)';

  // Set the left border color to white
  document.body.style.borderLeft = '5% solid white';

  // Clean up the background style when the component is unmounted
  return () => {
    document.body.style.background = '';
    document.body.style.borderLeft = '';
  };
}, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimationStopped, setIsAnimationStopped] = useState(false);
    const [isSignUpClicked, setIsSignUpClicked] = useState(false); // New state variable
    const [error,seterror] = useState(false)
    const classes = useStyles();
    const navigate = useNavigate()
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setIsAnimationStopped(true); // Stop the animation

    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
  
      if (email && password && password.length > 6){
        //here the backend begins
        console.log("pass check ok")
        axios.get('http://localhost:3002/login',{
          params: {
            username: email,
            password: password,
          }
        })
          .then(response => {
            // Handle on successful response
            console.log(response.data);
            if(response.data.success===true){
              navigate('/Home')
            }
            
          })
          .catch(error => {
            // Handle the error
              seterror(true)
              navigate('/login')
            console.error(error);
          });
      }
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
      setIsSignUpClicked(true); 
      onswitch() // Update state variable when signup link is clicked
    };
    return(
    <div className={`${classes.parent} ${isSignUpClicked ? classes.animateRotate : ''} `}>

            <Container maxWidth="sm" className={classes.root}>
            <div  className={classes.lottie} >
              <MyLottie  isAnimationStopped={isAnimationStopped} />
              </div>
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
                <div className={classes.linklg}>
                    <p>don't have an account?</p>
                    <Link style={{color:"#0195db"}} onClick={handleSignUpClick}>Signup</Link>
                 </div>
                 {error && <p className={classes.errorText}>incorrect password or username</p>}
                <div className={classes.new} >
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
  parent: {
    paddingRight: '10%',
    paddingLeft: '10%',
    animation: '$root 2s ease-in-out',
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  root: {
    backdropFilter: 'blur(25px)',
    borderRadius: '5%',
    width: '100%',
    backgroundColor:'white',
    border: '5% solid white',

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
  },
  linklg: {
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    paddingTop:"5%"
  },
  new:{
    paddingBottom:"10%",
    paddingTop:"10%"
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '0',
    animation: '$blink 1s infinite',
  },
  form:{
marginTop:"40%"
  },
  animateRotate: {
    animation: '$rotateAnimation 2s ease-in-out forwards',
    animationDelay: '0.3s',
  },
  '@keyframes rotateAnimation': {
    '0%': {
      transform: 'rotateY(0deg)',
    },
    '100%': {
      transform: 'rotateY(1turn)',
      opacity: 0,
    },
    
  },
  
  '@keyframes root': {
    '0%': {
      opacity:"0.5",
    },
    '50%': {
      opacity:"0.7",
    },
    '100%': {
      opacity:"1",
    },
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
  '@media (max-width: 500px)': {
    root:{
      height:"100%",
          },
          new:{
            paddingTop:"5%",
          }
  }
});

export default Loginform;