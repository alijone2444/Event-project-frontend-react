import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Containers/loginForm.js'
// import AdminHome from './Home/AdminHome/homepage.js';
import Home from './Containers/Home/StudentHome/home.js';
import NeonCursor from "./neonCursor.js";
import SocietiesComponent from './Containers/Home/StudentHome/societies/societies.js'
import CalanderComponent from './Containers/Home/StudentHome/calander/calander.js'
import AdminHomePage from './Containers/Home/AdminHome/adminHome.js';
import EventDetailPage from './Containers/ExploreEventsPage/EventDetailPage.js';
function App() {
  return (
    <div>
      <NeonCursor/>
      <Router>
        <Routes>
          {/* <Route path="/admin" element={<AdminHome />} /> */}
          <Route path="/" exact element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/eventname" element={<EventDetailPage />} />
          <Route path="/societies" element={<SocietiesComponent />} />
          <Route path="/calander" element={<CalanderComponent />} />
          <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
