import { useState ,useEffect} from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MyLottie from './lottieComponent'


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
            <div  className={classes.lottie} ><MyLottie  isAnimationStopped={isAnimationStopped} /></div>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Email"
                type="email"
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
  '@media (max-width: 500px)': {
    root:{
      height:"100%",
          },
          new:{
            paddingTop:"15%",
          }
  }
});

export default Loginform;