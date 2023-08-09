import React from 'react';
import { Typography, Grid, Button ,useMediaQuery} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './helpsupport.css'
const HelpAndSupport = () => { 
    const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Adjust the max-width value as needed
  const topics = [
    { label: 'Getting Started', description: 'Learn how to get started with our platform.', icon: <PlayCircleOutlineIcon /> },
    { label: 'Using Features', description: 'Discover how to use our platform\'s features effectively.', icon: <HelpIcon /> },
    { label: 'Contact Support', description: 'Get in touch with our support team for assistance.', icon: <PhoneOutlined /> },
   
  ];

  return (
    <div>
        <div style={{backgroundColor:'DodgerBlue',display:'flex',alignItems:"center",justifyContent:"center",flexDirection:isSmallScreen?"column":"row"}}>
        <div style={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column",padding:"5%"}}>
         <p className='animation'>Hello 👋 How can we</p>
          <section class="animation">
            <div class="first"><div>Help you?</div></div>
            <div class="second"><div>Support you?</div></div>
            <div class="third"><div>assist you?</div></div>
            <div class="fourth"><div>advice you?</div></div>
        </section>
        </div>
          <div style={{display:"flex",alignItems:"center"}}><HelpIcon style={{color:'white',fontSize:"150px"}}/></div>
        </div>
        <div style={{padding:isSmallScreen?'5%':'2%'}}>
            <Typography variant="h6" style={{ fontWeight: 'bold',marginTop:"5%" }}>
                Topics
            </Typography>
            <Grid container spacing={2} style={{ marginTop: '10px'}}>
                {topics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                    <Button
                    variant="outlined"
                    style={{ textAlign: 'left', width: '100%' }}
                    startIcon={topic.icon}
                    >
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' ,paddingRight:"3%"}}>
                        {topic.label}
                    </Typography>
                    <Typography variant="body2">{topic.description}</Typography>
                    </Button>
                </Grid>
                ))}
            </Grid>
      </div>
    </div>
  );
};

export default HelpAndSupport;
