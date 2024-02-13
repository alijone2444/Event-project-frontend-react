import React from 'react';
import { Result, Button, Spin } from 'antd';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  messageContainer: {
    textAlign: 'center',
  },
  description:{
    paddingRight:'5%',
    paddingLeft:'5%'
    ,background:'white'
  }
}));

const RequestApprovalPage = () => {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <div className={classes.messageContainer}>
          <Typography variant="h6" style={{color:'black',background:'white'}}>Request sent successfully!</Typography>
          <Typography style={{color:'black',background:'white'}}>
          Please wait until the admin approves your request.
          </Typography>
          <Typography className={classes.description}>
          Your request is currently being reviewed by our Security Assurance Team. We appreciate your patience as we prioritize security measures. Rest assured, we are working diligently to process your request. For any urgent inquiries, please contact our support team for assistance.          </Typography>
          
          <Button style={{margin:'2%',color:'#0376ec'}} variant="outlined" href="/">
            Go back to log In
          </Button>
        </div>
      </div>
    );
  
};

export default RequestApprovalPage;
