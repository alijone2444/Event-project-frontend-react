import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Containers/loginForm.js'
import Home from './Containers/Home/StudentHome/home.js';
import NeonCursor from "./neonCursor.js";
import SocietiesComponent from './Containers/Home/StudentHome/societies/societies.js'
import CalanderComponent from './Containers/Home/StudentHome/calander/calander.js'
import AdminHomePage from './Containers/Home/AdminHome/adminHome.js';
import EventDetailPage from './Containers/ExploreEventsPage/EventDetailPage.js';
import RequestAprovalWaitPage from './Containers/RequestApprovalPage.js/RequestApprovalwaitPage.js';
function App() {
  return (
    <div>
      <NeonCursor/>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login showAdmin={()=>{console.log()}} type={'default'}/>} />
          <Route path="/request" element={<RequestAprovalWaitPage/>} />
          <Route path="/Home" element={<Home />} />
          <Route path="/eventdetail/:eventname" element={<EventDetailPage />} />
          <Route path="/societies" element={<SocietiesComponent />} />
          <Route path="/calander" element={<CalanderComponent />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/success" element={<AdminHomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
