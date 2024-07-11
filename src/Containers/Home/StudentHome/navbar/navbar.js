import Header from './navfiles/header';
import SidebarComponent from './navfiles/sidebar';
import { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import constants from '../../../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import LogOut from '../../../../Components/logout/logout';

function Navbar(props) {
  const [showSideBar, setshowSideBar] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logout, setlogout] = useState(false);
  const navigate = useNavigate();
  const requestInstance = createAuthenticatedRequest();
  const [usertype, setUserType] = useState(null);

  const CheckUserType = async () => {
    try {
      const response = await requestInstance.get(`${constants.BASE_URL}check-drawer`);
      const data = response.data;
      console.log(data);
      setUserType(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    // Call CheckUserType when the component mounts
    CheckUserType();
  }, []);

  const handleSidebar = () => {
    setshowSideBar(!showSideBar);
    if (props.showstyle) {
      props.showstyle();
    }
    console.log('button');
  };

  const handleclose = () => {
    setshowSideBar(true);
    if (props.notshowstyle) {
      props.notshowstyle();
    }
    console.log('calback');
  };

  const handleDrawer = () => {
    setOpen(true);
  };

  const handleClick = async (option) => {
    try {
      if (option === 'Society Admin Portal' && (usertype === 'admin' || usertype === 'S-Admin')) {
        console.log('nfeuia');
        navigate('/SocietyAdminPortal');
      } else if (option === 'Logout') {
        console.log('logout');
        setlogout(true);
      }
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  return (
    <div>
      <Header callbackToSidebar={handleSidebar} transparentNavbar={props.transparentNavbar} showDrawer={handleDrawer} />
      <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose} usertype={usertype} />
      <Drawer title="Basic Drawer" onClose={() => { setOpen(false) }} open={open}>
        {constants.settings.map((val, index) => {
          const isSocietyAdminPortal = val.name === 'Society Admin Portal';
          const isAdminOrSAdmin = usertype === 'admin' || usertype === 'S-Admin';
          const shouldDisableButton = isSocietyAdminPortal && !isAdminOrSAdmin;

          return (
            <div style={{ width: '100%' }} key={index}>
              <p>{val.description}</p>
              <Button
                disabled={shouldDisableButton}
                onClick={() => { handleClick(val.name) }}
                style={{
                  border: `1px solid ${val.name === 'Logout' ? 'red' : 'grey'}`,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: val.name === 'Logout' ? 'red' : 'grey'
                  }}
                >
                  {val.name}
                </div>
                {val.Icon}
              </Button>
            </div>
          );
        })}

        {logout && <LogOut pageToGo={'/'} />}
      </Drawer>
    </div>
  );
}

export default Navbar;
