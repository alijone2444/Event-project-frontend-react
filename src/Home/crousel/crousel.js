import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import imagea from '../../images/crousel1.jpg'
import imageb from '../../images/crousel2.webp'
import imagec from '../../images/crousel3.jpg'
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
        <Carousel className='crousel' height={"90vh"} animation={'fade'}>
            {
                items.map( (item, i) => <Item  key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper style={{height:"80vh",zIndex:"-1",borderLeft:"2px solid white"}} >
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
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as desired
          }}
        ></div>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"50%",
                        display:"flex",justifyContent:"center",flexDirection:"column"}}>
                <h1 style={{textAlign:"center",color:"white",marginBottom:'2%'}}>{props.item.title}</h1>
                <p style={{textAlign:"Center",color:"white",marginTop:0}}>{props.item.description}</p>
                <div style={{display:"flex",justifyContent:"center"}}><Button className="CheckButton" style={{backgroundColor:"#f4373a",color:"white",maxWidth:"150px"}}>
                    Check it out!
                </Button></div>
            </div>
        </Paper>
    )
}
export default CarouselComponent;