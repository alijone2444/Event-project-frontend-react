import AdminSidebar from "./sidebar/sidebar"
import Dashboard from "./Dashboard/dashboard";
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import EventManagementInterface from "./AdminEvents/AdminEvents";
import AttendeesTable from "./registrations/registration";
import EventScheduler from "./schedules/schedules";
import HelpAndSupport from "./Help/help_support";

function AdminHomePage(){
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [selectedType,setselectedType]=useState(['dashboard'])
    const handleGoTo = (btntype) =>{
      if(btntype==='request'){
        setselectedType(['registration'])
        setSelectedMenuItem('registration')
        
      }
      // else if(BtnType==='report'){
      //   setSelectedMenuItem('registration')
      // }
      // else if(BtnType==='users'){
      //   props.GoTo('users')
      // }
    }
    const handleselect =(option)=>{
        setselectedType('')
        setSelectedMenuItem(option);
    }
    return(
        <Grid container style={{ height: '100vh' }}>
        <Grid item xs={2} sx={{ borderRight: '1px solid #ccc' }}>
          <AdminSidebar  selectedOption={(option)=>handleselect(option)} selected={selectedType}/>
        </Grid>
        <Grid item xs={10}>
        {selectedMenuItem === 'dashboard' && <Dashboard GoTo={(btntype)=>{handleGoTo(btntype)}}/>}
        {selectedMenuItem === 'events' && <EventManagementInterface />}
        {selectedMenuItem === 'registration' && <AttendeesTable />}
        {selectedMenuItem === 'schedules' && <EventScheduler />}
        {selectedMenuItem === 'help' && <HelpAndSupport />}
        </Grid>
      </Grid>
    )
}
export default AdminHomePage
