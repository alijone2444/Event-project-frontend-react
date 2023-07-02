import Loginform from "./rightHalf"
import Logindisplay from "./leftHalf"
import { makeStyles } from '@mui/styles';
import MovingBackground from './animation';
import Signupform from './signup'

function LoginScreen(){
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div className={classes.imglg} ><Logindisplay/></div>
      <div className={classes.formlg}>
      <div  ><Loginform/></div>  
      <div ><Signupform/></div>
      </div>
      <MovingBackground/>
      
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
    position:"relative",
    width:"50%",
    zIndex:"1",
    height:"80vh"
  },

  '@media (max-width: 600px)': {
  root: {
    flexDirection:"column"
  },
  formlg:{
    width:"80%",
    height:"70vh"
  }
  ,imglg:{
    height:"30vh"
  }
}
,
'@media (max-width: 500px)': {
  formlg:{
    height:"75vh"
  }
  ,imglg:{
    height:"25vh"
  }
}
})
export default LoginScreen