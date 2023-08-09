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

    const handleselect =(option)=>{
        console.log(option,"selected")
        setSelectedMenuItem(option);
    }
    return(
        <Grid container style={{ height: '100vh' }}>
        <Grid item xs={2} sx={{ borderRight: '1px solid #ccc' }}>
          <AdminSidebar  selectedOption={(option)=>handleselect(option)}/>
        </Grid>
        <Grid item xs={10}>
        {selectedMenuItem === 'dashboard' && <Dashboard />}
        {selectedMenuItem === 'events' && <EventManagementInterface />}
        {selectedMenuItem === 'registration' && <AttendeesTable />}
        {selectedMenuItem === 'schedules' && <EventScheduler />}
        {selectedMenuItem === 'help' && <HelpAndSupport />}
        </Grid>
      </Grid>
    )
}
export default AdminHomePage
