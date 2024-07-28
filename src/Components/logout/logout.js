import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAuthenticatedRequest from "../../RequestwithHeader";
import constants from "../../Constants/constants";
import { logoutUser } from "../../ReduxStore/actions/userlogout";
import { useDispatch, useSelector } from "react-redux";
import { setFCMToken } from "../../ReduxStore/actions/fcmTokenState";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LogOut(props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();
  const fcmTokenState = useSelector((state) => state.fcmTokenState);

  const DeleteFcmTokenFromBackend = async () => {
    try {
      console.log('DeleteFcmTokenFromBackend token:', fcmTokenState);
      if (fcmTokenState.token) {
        const response = await requestInstance.delete(`${constants.BASE_URL}delete-fcm-token/${fcmTokenState.token}`);
        console.log('FCM Token deleted from backend:', response.data);
        if (response.data) {
          dispatch(setFCMToken(null));
        }
      } else {
        console.log('No FCM token available.');
      }
    } catch (error) {
      console.error('Error deleting FCM Token from backend:', error);
    }
  };

  useEffect(() => {
    const logout = async () => {
      try {
        await DeleteFcmTokenFromBackend();

        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        dispatch(logoutUser());

        setLoading(false);

        console.error("Logout failed");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate(props.pageToGo);
      }
    }
  }, [navigate, loading, props.pageToGo]);

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress style={{ color: 'white' }} />
        </Box>
      )}
    </>
  );
}

export default LogOut;
