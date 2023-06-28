import Loginform from "./rightHalf"
import Logindisplay from "./leftHalf"
import { makeStyles } from '@mui/styles';
import MovingBackground from './animation';

function LoginScreen(){
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div className={classes.imglg} ><Logindisplay/></div>
      <div className={classes.formlg} ><Loginform/></div>
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
    justifyContent:"center"
  },
  imglg:{
    width:"50%",
    zIndex:"1"
  },
  formlg:{
    
    width:"50%",
    zIndex:"1"
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
    height:"60vh"
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