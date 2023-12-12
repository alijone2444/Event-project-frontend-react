import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import imagea from '../../../../images/qawali.jpg'
import imageb from '../../../../images/sports.jpg'
import imagec from '../../../../images/concert.jpg'
import imaged from '../../../../images/conference.jpg'
import '../../../../styles/navbar_home.css'
import  {makeStyles} from '@mui/styles';
import { useMediaQuery ,createTheme} from '@mui/material';

function CarouselComponent(props){
    const classes = useStyles(); // Use the useStyles hook
  const isSmallScreen = useMediaQuery('(max-width: 600px)'); // Adjust the max-width value as needed
    
  var items = [
    {
      title: "Qawali Event",
      path: imagea,
      description: "Enjoy the mesmerizing Qawali performance at IST",
    },
    {
      title: "Conference at IST",
      path: imaged,
      description:
        "IST University's event hub serves as a vibrant platform within the university, bringing together students, faculty, and staff for conferences.",
    },
    {
      title: "Sports Event",
      path: imageb,
      description: "Hello World! Welcome to the exciting world of sports.",
    },
    {
      title: "Concert Night",
      path: imagec,
      description: "Hello World! Join us for a night of musical delight.",
    },
  ];

    return (
        <Carousel className='crousel' duration={2000} navButtonsAlwaysVisible={true}  height={"95vh"} animation={'fade'}  indicatorContainerProps={{
            style: {
                position:"absolute",
                bottom:"0",
                color:"white",
                left:"50%",
                transform:"translate(-50%,0)"  , // 3
                zIndex:1 // 5
            }
        }}
        navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
              bottom: '50px',
              top: 'unset'
          }
      }} 
        indicatorIconButtonProps={{
            ...classes.indicatorIconButtonProps,
            style: {
              ...classes.indicatorIconButtonProps.style,
              marginBottom: isSmallScreen ? '20%' : '5%', // Apply different margin based on screen size
            },
          }}>


            {
                items.map( (item, i) => <Item  key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper style={{height:"95vh"}} >
           <div style={{ position: "relative" }}>
        <img
          src={props.item.path}
          alt='.'
          style={{
            height: "95vh",
            width: "100%",
            objectFit: "cover",
          }}
        />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "95vh",
            background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as desired
          }}
        ></div>
            <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:"50%",
                        display:"flex",justifyContent:"center",flexDirection:"column"}}>
                <h1 style={{textAlign:"center",color:"white",marginBottom:'2%'}}>{props.item.title}</h1>
                <p style={{textAlign:"Center",color:"white",marginTop:0}}>{props.item.description}</p>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <Button className="CheckButton" style={{backgroundColor:"#f4373a",color:"white",maxWidth:"150px"}}>
                        Check it out!
                    </Button></div>
            </div>
        </Paper>
    )
}
const useStyles = makeStyles((theme) => ({
    // Your other styles...
    indicatorIconButtonProps: {
      style: {
        padding: '2px',
        marginBottom: '10%', // Default value for bigger screens
      },
    },
    // Your other styles...
  }));
export default CarouselComponent;