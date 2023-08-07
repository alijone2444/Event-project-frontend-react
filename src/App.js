import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './signin_signout/login.js';
// import AdminHome from './Home/AdminHome/homepage.js';
import Home from './Home/home.js';
import NeonCursor from "./neonCursor.js";
import SocietiesComponent from './societies/societies.js'
import CalanderComponent from './calander/calander.js'
import AdminHomePage from './Home/AdminHome/adminHome.js';
function App() {
  return (
    <div>
      <NeonCursor/>
      <Router>
        <Routes>
          {/* <Route path="/admin" element={<AdminHome />} /> */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/societies" element={<SocietiesComponent />} />
          <Route path="/calander" element={<CalanderComponent />} />
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
