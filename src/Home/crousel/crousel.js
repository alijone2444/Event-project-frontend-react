import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import imagea from '../../images/crousel1.jpg'
import imageb from '../../images/crousel2.webp'
import imagec from '../../images/crousel3.jpg'
import imaged from '../../images/ist.jpg'
import '../../styles/navbar_home.css'

function CarouselComponent(props)
{
    var items = [
        {
            title:"IST HUB",
            path: imagea,
            description: "Probably the most random thing you have ever seen!"
        },
        {
            title:"About IST",
            path: imaged,
            description: "IST University's event hub serves as a vibrant platform within the university, bringing together students, faculty, and staff."
        }
        ,
        {
            title:"",
            path: imageb,
            description: "Hello World!"
        }
        ,
        {
            title:"",
            path: imagec,
            description: "Hello World!"
        }
    ]

    return (
        <Carousel className='crousel' height={"100vh"} animation={'fade'}  indicatorContainerProps={{
            style: {
                position:"absolute",
                bottom:"0",
                color:"white",
                left:"50%",
                transform:"translate(-50%,0)"  , // 3
                zIndex:1 // 5
            }
        }}
        indicatorIconButtonProps={{
            style: {
                padding: '2px',  
            }
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
        <Paper style={{height:"100vh",borderLeft:"2px solid white"}} >
           <div style={{ position: "relative" }}>
        <img
          src={props.item.path}
          alt='.'
          style={{
            height: "100vh",
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
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as desired
          }}
        ></div>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"50%",
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
export default CarouselComponent;