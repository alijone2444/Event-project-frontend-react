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
import createAuthenticatedRequest from "../../../RequestwithHeader";
import constants from "../../../Constants/constants";
import BroadCastComponent from "../../../Components/BroadCast/BroadcastComponent";
import { useEffect } from "react";
function AdminHomePage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [selectedType, setselectedType] = useState(['dashboard'])
  const [stats, setStats] = useState(null);
  const [UsersInfo, setUsersInfo] = useState({})
  const [Activities, setActivities] = useState([])
  const handleGoTo = (btntype) => {
    if (btntype === 'request') {
      setselectedType(['registration'])
      setSelectedMenuItem('registration')
    }
    else if (btntype === 'crousel-images-component') {
      setselectedType(['Crousel-Images'])
      setSelectedMenuItem('Crousel-Images')
    }
    else if (btntype === 'Active-users') {
      setselectedType(['society-admin'])
      setSelectedMenuItem('society-admin')
    }
  }
  const handleselect = (option) => {
    setselectedType('')
    setSelectedMenuItem(option);
  }
  const requestInstance = createAuthenticatedRequest()
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await requestInstance.get(`${constants.BASE_URL}database-stats`); // Replace with your API endpoint
        if (response.data) {
          setStats(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchActiveUsers = async () => {

      const usersResponse = await requestInstance.get(`${constants.BASE_URL}active-total-users`);
      if (usersResponse.data) {
        setUsersInfo(usersResponse.data)
      }
    };
    fetchActiveUsers()
  }, [])
  useEffect(() => {
    const fetchActiveUsers = async () => {

      const ActivityResponse = await requestInstance.get(`${constants.BASE_URL}user-activity`);
      if (ActivityResponse.data) {
        setActivities(ActivityResponse.data)
      }
    };
    fetchActiveUsers()
  }, [])

  return (
    <Grid container style={{ height: '100vh', position: 'absolute', top: 0 }} >
      <Grid item xs={2} sx={{ borderRight: '1px solid #ccc' }}>
        <AdminSidebar selectedOption={(option) => handleselect(option)} selected={selectedType} />
      </Grid>
      <Grid item xs={10}>

        {selectedMenuItem === 'dashboard' && <Dashboard GoTo={(btntype) => { handleGoTo(btntype) }} totalsize={stats} usersData={UsersInfo} Activities={Activities} />}
        {selectedMenuItem === 'events' && <EventManagementInterface />}
        {selectedMenuItem === 'registration' && <AttendeesTable name={'registration'} showSetAdminOption={false} showADDRemove={true} showTage={true} showOnlyActiveUsers={'no'} />}
        {selectedMenuItem === 'schedules' && <EventScheduler />}
        {selectedMenuItem === 'help' && <HelpAndSupport />}
        {selectedMenuItem === 'societies' && <SocietiesAdminComponent />}
        {selectedMenuItem === 'Crousel-Images' && <SetCrouselImages />}
        {selectedMenuItem === 'logout' && <LogOut pageToGo={'/admin'} />}
        {selectedMenuItem === 'society-admin' && <CreateSocietyAdmin />}
        {selectedMenuItem === 'BroadCast' && <BroadCastComponent />}
      </Grid>
    </Grid>
  )
}
export default AdminHomePage
