import Loginform from "./rightHalf"
import Logindisplay from "./leftHalf"
import { makeStyles } from '@mui/styles';
import Signupform from './signup'
import { useState } from "react";
function LoginScreen(){
  const classes = useStyles();
  const [showlogin , setshowlogin] = useState(true)
  const [hidesignup , sethidesignup] = useState(false)
  const handleSwitchtoSignup=()=>{
    setTimeout(() => {
      sethidesignup(true)
      setshowlogin(false)  
    }, 1000); // Hide the login form after 2 seconds
  }
  const handleSwitchtoSignin=()=>{
    setTimeout(() => {
      sethidesignup(false)
      setshowlogin(true)  
    }, 1000); // Hide the login form after 2 seconds

  }
  return(
    <div className={classes.root}>
      <div className={classes.imglg} ><Logindisplay/></div>
      <div className={classes.formlg}>
      <div>{showlogin && <Loginform onswitch={handleSwitchtoSignup}/>}</div>  
      <div >{hidesignup && <Signupform onswitch={handleSwitchtoSignin}/>}</div>
      </div>
    </div>
  )
}
const useStyles = makeStyles({
  root:{
    height:"100vh",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    
  },
  imglg:{
    width:"50%",
    zIndex:"1"
  },
  formlg:{
    
    width:"50%",
    zIndex:"1",
    height:"100%",
    display:"flex",
    alignItems:"center",
  },

  '@media (max-width: 600px)': {
  root: {
    flexDirection:"column"
  },
  formlg:{
    width:"100%",
    height:"70%",
    alignItems:"flex-start",
    justifyContent:"center"
  }
  ,imglg:{
    height:"30%"
  }
}
,
'@media (max-width: 500px)': {
  formlg:{
    height:"75%",
    alignItems:"flex-start"
  }
  ,imglg:{
    height:"25%"
  }
}
})
export default LoginScreen