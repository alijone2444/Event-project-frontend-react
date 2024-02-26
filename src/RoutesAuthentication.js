import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  
    const authCookie =localStorage.getItem('authToken');
    if (!authCookie) {
      // Redirect to the login page if not authenticated
      return <Navigate to="/" />;
    }
  
    return children;
  };
  export default RequireAuth