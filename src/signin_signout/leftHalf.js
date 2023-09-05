
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import './heading.css'

const useStyles = makeStyles((theme) => ({
  root: {
    padding:"5%",
    zIndex: "1",
  },
}));

function Logindisplay() {

  const isMobile = useMediaQuery('(max-width:900px)');
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {!isMobile && 
        <div class="heading">
          <div className='thisish1'>Your University Event Hub
            <div className='thisIsSpan'> Streamline, Organize & Enjoy </div>
            <div className='description'>Streamline your university's event planning and execution with our comprehensive management system. 
            From scheduling to registration and analytics, our platform empowers you to create memorable and successful campus events effortlessly.
             Elevate your university experience with efficient event management</div>
          </div>
        </div>}
    </div>
  );
}

export default Logindisplay;
