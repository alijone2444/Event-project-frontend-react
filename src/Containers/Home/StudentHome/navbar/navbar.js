import Header from './navfiles/header';
import SidebarComponent from './navfiles/sidebar';
import { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import constants from '../../../../Constants/constants';
import { useNavigate } from 'react-router-dom';
import createAuthenticatedRequest from '../../../../RequestwithHeader';
import LogOut from '../../../../Components/logout/logout';
import { useSelector } from 'react-redux';
import BackgroundDrawer from '../../../../images/navbackground.jpg'
function Navbar(props) {
  const [showSideBar, setshowSideBar] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logout, setlogout] = useState(false);
  const navigate = useNavigate();
  const requestInstance = createAuthenticatedRequest();
  const [usertype, setUserType] = useState(null);
  // Assuming FCMToken is your root reducer name
  const profileData = useSelector(state => state.profiledata);
  const CheckUserType = async () => {
    try {
      const response = await requestInstance.get(`${constants.BASE_URL}check-drawer`);
      if (response.data) {
        const data = response.data;
        console.log(data);
        setUserType(data);
        setLoading(false);
        return data;
      }
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
      else if (option === 'About Us') {
        navigate('/about-us')
      }
      else if (option === 'Profile') {
        navigate('/user-profile', { state: profileData });
      }
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  return (
    <div>
      <Header callbackToSidebar={handleSidebar} transparentNavbar={props.transparentNavbar} showDrawer={handleDrawer} />
      <SidebarComponent Openstatus={showSideBar} callbackClose={handleclose} usertype={usertype} />
      <Drawer title="More options" onClose={() => { setOpen(false) }} open={open} style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${BackgroundDrawer})`,
        backgroundSize: 'cover',       // Ensures the image covers the entire area
        backgroundPosition: 'center',  // Centers the image within the element
        width: '100%',
      }}>

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
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: val.name === 'Logout' ? 'red' : 'black',
                    '&:hover fieldset': {
                      borderColor: 'lightgrey',
                    }
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
