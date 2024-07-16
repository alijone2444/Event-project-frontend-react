import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAuthenticatedRequest from "../../RequestwithHeader";
import constants from "../../Constants/constants";
import { logoutUser } from "../../ReduxStore/actions/userlogout";
import { useDispatch, useSelector } from "react-redux";
import { setFCMToken } from "../../ReduxStore/actions/fcmTokenState";

function LogOut(props) {
  const navigate = useNavigate();
  const [checkDeletedToken, setCheckDeletedToken] = useState(false);
  const requestInstance = createAuthenticatedRequest();
  const dispatch = useDispatch();
  const fcmTokenState = useSelector((state) => state.fcmTokenState);

  const DeleteFcmTokenFromBackend = async () => {
    try {
      console.log('DeleteFcmTokenFromBackend token:', fcmTokenState); // Ensure token is logged correctly
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

        // Clear the token from local storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        dispatch(logoutUser());

        // Update state to trigger a re-render
        setCheckDeletedToken((prev) => !prev);

        // Handle logout failure, if necessary
        console.error("Logout failed");
      } catch (error) {
        // Handle any errors that occur during logout
        console.error("Error during logout:", error);
      }
    };

    // Call the logout function when the component mounts
    logout();
  }, [dispatch]); // Only dispatch is a dependency, since checkDeletedToken is handled internally

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate(props.pageToGo);
    }
  }, [navigate, checkDeletedToken]);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default LogOut;
