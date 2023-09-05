import Loginform from "./rightHalf"
import Logindisplay from "./leftHalf"
import { makeStyles } from '@mui/styles';
import Signupform from './signup'
import { useState } from "react";
import InteractiveBackground from "../VantaCompoents/vantaLogin";
import { useMediaQuery} from '@mui/material';
import ThemeChanger from "./radioButtons";
function LoginScreen(){
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const classes = useStyles();
  const [showlogin , setshowlogin] = useState(true)
  const [hidesignup , sethidesignup] = useState(false)
  const [theme,setTheme]=useState('')
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
const handlethemeChange=(index)=>{
  console.log(theme)
  if(index==='Light'){
    setTheme(0)
  }
  else if(index==='Dark'){
    setTheme(1)
  }
  else if(index==='Alternate'){
    setTheme(2)
  }
}
  return(
    <div>
      <div className={classes.background}>
      <InteractiveBackground gettheme={theme}/>
      <div style={{position:"absolute",top:"0",left:"0",zIndex:"2"}}>
        <ThemeChanger callback={handlethemeChange}/>
      </div>
      </div>
    <div className={classes.root}>
      <div className={classes.imglg} ><Logindisplay/></div>
      <div className={classes.formlg}>
      <div>{showlogin && <Loginform onswitch={handleSwitchtoSignup}/>}</div>  
      <div >{hidesignup && <Signupform onswitch={handleSwitchtoSignin}/>}</div>
      </div>
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
    zIndex:"1"
  },
  formlg:{
    width:"40%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  background:{
    position:"absolute",
    top:0,
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