import AdminSidebar from "./sidebar/sidebar"
import Dashboard from "./Dashboard/dashboard";

import { Grid } from '@mui/material';

function AdminHomePage(){
    return(
        <Grid container style={{ height: '100vh' }}>
        {/* Sidebar */}
        <Grid item xs={2} sx={{ borderRight: '1px solid #ccc' }}>
          <AdminSidebar  />
        </Grid>
  
        {/* Main Content */}
        <Grid item xs={10}>
          <Dashboard />
        </Grid>
      </Grid>
    )
}
export default AdminHomePage
