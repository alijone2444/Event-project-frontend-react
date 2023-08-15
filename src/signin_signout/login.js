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
    width:"60%",
  },
  formlg:{
    width:"40%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },

  '@media (max-width: 900px)': {
  root: {
    flexDirection:"column"
  },
  formlg:{
    display:"flex",
    alignItems:"center",
    height:"100%",
    width:"100%",
    justifyContent:"center"
  }
  ,imglg:{
    height:"0%",
  }
}
,

})
export default LoginScreen