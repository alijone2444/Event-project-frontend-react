import { useState ,useEffect} from 'react';
import { TextField, Button, Container,FormControl,Select,InputLabel,MenuItem} from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MyLottie from './lottieComponent';
import { useNavigate } from 'react-router-dom';

function Loginform({ onswitch }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnimationStopped, setIsAnimationStopped] = useState(false);
    const [isSignUpClicked, setIsSignUpClicked] = useState(false); // New state variable
    const [userType,setUserType] = useState('Student')
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
    const handleUserType = (e) => {
      setUserType(e.target.value)
      console.log(e.target.value)
      setIsAnimationStopped(false); // Stop the animation
    };
    const handlestate = ()=>{
      setIsAnimationStopped(false); // Stop the animation
    }

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
                <FormControl fullWidth 
                  className={classes.fields}>
                  <InputLabel id="demo-simple-select-label" style={{ color: 'white'}}>User Type</InputLabel>
                  <Select
                  style={{background:"transparent",color:'white'}}
                  className={classes.fields}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userType}
                    label="User Type"
                    onChange={handleUserType}
                    onClick={handlestate}
                  >
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Society President'}>Society President</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                label="User name"
                type="User name"
                value={email}
                style={{background:"transparent"}}
                onChange={handleEmailChange}
                onClick={handleusernameClick}
                fullWidth
                margin="normal"
                required
                className={classes.fields}
                InputLabelProps={{ style: { color: 'white' } }}
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
                InputLabelProps={{ style: { color: 'white' } }}
                />
                <div className={classes.linklg}>
                    <p>Don't have an account?&nbsp;</p>
                    <Link style={{color:"white"}} onClick={handleSignUpClick}>Signup</Link>
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
    backdropFilter: 'blur(25px) ',
    backgroundImage:'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)',
    borderRadius: '5%',
    width: '100%',
    border: '1px solid white',
  
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
    backgroundColor: 'white !important',
    color: 'black !important',
    padding: '5px 10px',
    width: '100%',
  },
  linklg: {
    color: 'white',
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
    marginTop: '0',
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