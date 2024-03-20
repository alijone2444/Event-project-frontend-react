import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Containers/loginForm.js'
import Home from './Containers/Home/StudentHome/home.js';
import NeonCursor from "./neonCursor.js";
import SocietiesPage from './Containers/Home/StudentHome/societies/societies.js'
import CalanderComponent from './Containers/Home/StudentHome/calander/calander.js'
import AdminHomePage from './Containers/Home/AdminHome/adminHome.js';
import EventDetailPage from './Containers/ExploreEventsPage/EventDetailPage.js';
import RequestAprovalWaitPage from './Containers/RequestApprovalPage.js/RequestApprovalwaitPage.js';
import RequireAuth from './RoutesAuthentication.js';
import userSettings from './Components/Settings/userSettings.js'
import AllEvents from './Containers/AllEvents/events.js';
function App() {
  return (
    <div>
      <NeonCursor />
      <Router>
        <Routes>
          <Route path="/" exact element={<Login showAdmin={() => { console.log() }} type={'default'} />} />
          <Route path="/request" element={<RequestAprovalWaitPage />} />
          <Route path="/Home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/eventdetail/:eventname" element={<RequireAuth><EventDetailPage /></RequireAuth>} />
          <Route path="/societies" element={<RequireAuth><SocietiesPage /></RequireAuth>} />
          <Route path="/calander" element={<RequireAuth><CalanderComponent /></RequireAuth>} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/success" element={<RequireAuth><AdminHomePage /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><userSettings /></RequireAuth>} />
          <Route path="/events" element={<RequireAuth><AllEvents /></RequireAuth>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
