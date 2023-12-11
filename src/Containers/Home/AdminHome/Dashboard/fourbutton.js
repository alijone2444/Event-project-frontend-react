import React from 'react';
import { Typography, Button } from 'antd';
import './dashboard.css'
import { DollarCircleOutlined ,ExclamationCircleOutlined,UserAddOutlined,RightOutlined} from '@ant-design/icons';
import { Grid } from '@mui/material';

const Fourbuttons = (props) => {
  return (
    
    <Grid container spacing={1} style={{padding:"5%"}}>
      <Grid item xs={6} md={4} lg={4}>
        <div className='buttonContainer' style={{ background: '#4d5299' }}>
          <Typography>
              <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
              <div style={{display:"flex",flexDirection:"column",width:"70%",textAlign:"center"}}>
                  <Typography className='buttons-text' strong>
                      View Report
                  </Typography>
                  <Typography className='buttons-text'>value</Typography>
            </div>
            <div style={{width:"30%",padding:"5%",display:"flex",alignItems:"center"}}>
              <DollarCircleOutlined style={{fontSize:"5vw",color:"white"}}/>
            </div>
            </div>
            <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",padding:0,width:"100%"}} onClick={()=>{props.fourbuttonPressed('report')}}>
              <div >View Report</div>
              <div><RightOutlined style={{color:"white"}}/></div>        
            </Button>
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6} md={4} lg={4}>
        <div className='buttonContainer' style={{ background: '#f08c29' }}>
          <Typography>
              <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
              <div style={{display:"flex",flexDirection:"column",width:"80%",textAlign:"center"}}>
                  <Typography className='buttons-text' strong>
                      Users added
                  </Typography>
                  <Typography className='buttons-text'>value</Typography>
            </div>
            <div style={{width:"30%",padding:"5%",display:"flex",alignItems:"center"}}>
              <UserAddOutlined style={{fontSize:"5vw",color:"white"}}/>
            </div>
            </div>
            <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",padding:0,width:"100%"}} onClick={()=>{props.fourbuttonPressed('users')}}>
              <div >View Report</div>
              <div><RightOutlined style={{color:"white"}}/></div>        
            </Button>
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <div className='buttonContainer' style={{ background: '#ff4d4d' }}>
          <Typography>
              <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
              <div style={{display:"flex",flexDirection:"column",width:"80%",textAlign:"center"}}>
                  <Typography className='buttons-text' strong>
                      Pending Requests
                  </Typography>
                  <Typography className='buttons-text'>value</Typography>
            </div>
            <div style={{width:"30%",padding:"5%",display:"flex",alignItems:"center"}}>
              <ExclamationCircleOutlined style={{fontSize:"5vw",color:"white"}}/>
            </div>
            
            </div>
            <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",padding:0,width:"100%"}} onClick={()=>{props.fourbuttonPressed('request')}}>
              <div >View Requests</div>
              <div><RightOutlined style={{color:"white"}}/></div>        
            </Button>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Fourbuttons;
