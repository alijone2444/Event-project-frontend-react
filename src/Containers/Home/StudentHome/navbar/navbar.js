import Header from './navfiles/header'
import SidebarComponent from './navfiles/sidebar'
import { useState, useEffect } from "react";
import { Button, Drawer } from 'antd';
import constants from '../../../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import LogOut from '../../../../Components/logout/logout';

function Navbar(props) {
  const [showSideBar, setshowSideBar] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [logout, setlogout] = useState(false);
  const navigate = useNavigate();
  const requestInstance = createAuthenticatedRequest()

  const CheckUserType = async () => {
    try {
      let data;
      if (loading === true) {
        const response = await requestInstance.get(`${constants.BASE_URL}check-drawer`);
        data = response.data;
        console.log(data);
        setLoading(false);
      } // Set loading to false once the request is complete
      return data; // Return the data fetched from the backend
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false in case of error
      throw error; // Throw the error to be handled by the caller
    }
  };



  const handleSidebar = () => {
    setshowSideBar(!showSideBar);
    if (props.showstyle) {
      props.showstyle();
    }
    console.log("button");
  };

  const handleclose = () => {
    setshowSideBar(true);
    if (props.notshowstyle) {
      props.notshowstyle();
    }
    console.log("calback");
  };

  const handleDrawer = () => {
    setOpen(true);
  };
  const handleClick = async (option) => {
    try {
      const type = await CheckUserType();
      console.log(option, type);
      if (option === 'Society Admin Portal' && (type === 'admin' || 'S-Admin')) {
        console.log('nfeuia')
        navigate('/SocietyAdminPortal');
      }
      else if (option === 'Logout') {
        console.log('logout')
        setlogout(true)
      }
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  return (
    <div>
      <Header callbackToSidebar={handleSidebar} transparentNavbar={props.transparentNavbar} showDrawer={handleDrawer} />
      <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose} />
      <Drawer title="Basic Drawer" onClose={() => { setOpen(false) }} open={open}>
        {constants.settings.map((val, index) => {
          return (
            <div style={{ width: '100%', }}>
              <p key={index}>{val.description}</p>
              <Button onClick={() => { handleClick(val.name) }} style={{ border: `1px solid ${val.name === 'Logout' ? 'red' : 'grey'}`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center', width: "100%", color: val.name === 'Logout' ? 'red' : 'grey', }}>{val.name}</div>{val.Icon}</Button>
            </div>
          )
        })}

        {logout && <LogOut pageToGo={'/'} />}
      </Drawer >
    </div >
  );
}

export default Navbar;
