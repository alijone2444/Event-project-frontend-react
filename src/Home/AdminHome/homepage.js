import AdminSidebar from "./sidebar/sidebar"
import Dashboard from "./Dashboard/dashboard";

function AdminHome(){
    return(
        <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '0 0 20%' }}>
          <AdminSidebar />
        </div>
        <div style={{ flex: '1' }}>
          <Dashboard />
        </div>
      </div>
    )
}
export default AdminHome;