import { makeStyles } from '@mui/styles';
import { Card, CardMedia } from '@mui/material';
import Image from '../images/ist_logo.png';

function Logindisplay() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.media}>
        <img src={Image} alt='.' className={classes.image} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    zIndex: "1",
    height: "70vh",
  },
  media: {
    paddingTop:"10%",
    paddingLeft: "10%",
    opacity: 0.5,
    display:"flex",
    alignItems:"center",
    height: "70vh",
  },
  image: {
    maxWidth: "100%", // Set the maximum width of the image
    maxHeight: "100%", // Set the maximum height of the image
  },

  '@media (max-width: 600px)': {
    media:{
        height:"auto"
    }
}
  
}));

export default Logindisplay;
