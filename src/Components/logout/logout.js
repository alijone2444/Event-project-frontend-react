import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAuthenticatedRequest from "../../RequestwithHeader";
import constants from "../../Constants/constants";
function LogOut(props) {
  const navigate = useNavigate();
  const [checkDeletedToken, setCheckDeletedToken] = useState(false);
    const requestInstance = createAuthenticatedRequest()
  useEffect(() => {
    const logout = async () => {
      try {
        // Make a POST request to the logout endpoint
        const response = await requestInstance.post(`${constants.BASE_URL}logout`);

        // Assuming your server sends a success message upon successful logout
        if (response.data.success) {
          // Clear the token from local storage
          localStorage.removeItem("authToken");

          // Update state to trigger a re-render
          setCheckDeletedToken(!checkDeletedToken);
        } else {
          // Handle logout failure, if necessary
          console.error("Logout failed");
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error during logout:", error);
      }
    };

    // Call the logout function when the component mounts
    logout();
  }, [checkDeletedToken]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate(props.pageToGo);
    }
  }, [checkDeletedToken]);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default LogOut;