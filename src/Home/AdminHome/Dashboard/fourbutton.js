import React from 'react';
import { Typography, Button } from 'antd';
import './dashboard.css'
import { DollarCircleOutlined ,ExclamationCircleOutlined,UserAddOutlined,RightOutlined} from '@ant-design/icons';


const Fourbuttons = () => {
  return (
    <div style={{ display: 'grid', gridGap: '24px', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <div className='buttonContainer' style={{ background: 'blue' }}>
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
          <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <div >View Report</div>
            <div><RightOutlined style={{color:"white"}}/></div>        
          </Button>
        </Typography>
      </div>
      <div className='buttonContainer' style={{ background: 'orange' }}>
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
          <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <div >View Report</div>
            <div><RightOutlined style={{color:"white"}}/></div>        
          </Button>
        </Typography>
      </div>
      <div className='buttonContainer' style={{ background: 'Red' }}>
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
          <Button size='large' type='link' className='buttons-text' style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <div >View Requests</div>
            <div><RightOutlined style={{color:"white"}}/></div>        
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default Fourbuttons;
