import AdminSidebar from "./sidebar/sidebar"
import Dashboard from "./Dashboard/dashboard";
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import EventManagementInterface from "./AdminEvents/AdminEvents";
import AttendeesTable from "./registrations/registration";
import EventScheduler from "./schedules/schedules";
import HelpAndSupport from "./Help/help_support";
import LogOut from "../../../Components/logout/logout";
import SocietiesAdminComponent from "../../../Components/adminSociety/adminSocietyComponent";
import CreateSocietyAdmin from "../../../Components/CreateSocietyAdmin/CreateSocietyAdmin";
import SetCrouselImages from "../../../Components/Crousel-Images/setCrouselImages";

function AdminHomePage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [selectedType, setselectedType] = useState(['dashboard'])
  const handleGoTo = (btntype) => {
    if (btntype === 'request') {
      setselectedType(['registration'])
      setSelectedMenuItem('registration')

    }
  }
  const handleselect = (option) => {
    setselectedType('')
    setSelectedMenuItem(option);
  }
  return (
    <Grid container style={{ height: '100vh', position: 'absolute', top: 0 }} >
      <Grid item xs={2} sx={{ borderRight: '1px solid #ccc' }}>
        <AdminSidebar selectedOption={(option) => handleselect(option)} selected={selectedType} />
      </Grid>
      <Grid item xs={10}>

        {selectedMenuItem === 'dashboard' && <Dashboard GoTo={(btntype) => { handleGoTo(btntype) }} />}
        {selectedMenuItem === 'events' && <EventManagementInterface />}
        {selectedMenuItem === 'registration' && <AttendeesTable name={'registration'} showSetAdminOption={false} showADDRemove={true} showTage={true} />}
        {selectedMenuItem === 'schedules' && <EventScheduler />}
        {selectedMenuItem === 'help' && <HelpAndSupport />}
        {selectedMenuItem === 'societies' && <SocietiesAdminComponent />}
        {selectedMenuItem === 'Crousel-Images' && <SetCrouselImages />}
        {selectedMenuItem === 'logout' && <LogOut pageToGo={'/admin'} />}
      </Grid>
    </Grid>
  )
}
export default AdminHomePage
