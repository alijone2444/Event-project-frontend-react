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
import { RequireAuth } from './RoutesAuthentication.js';
import { RequireAdminAuth } from './RoutesAuthentication.js';
import userSettings from './Components/Settings/userSettings.js'
import AllEvents from './Containers/AllEvents/events.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import SocietyAdminPortal from './Containers/SocietyAdminPortal/SocietyAdminPortal.js';
import ProfilePage from './Containers/Profile/profilepage.js';
import AboutSocietyPage from './Containers/exploresocieties/societypage.js';
import PageWrapper from './Components/functions/scrollZeroZerol.js';
import AboutPage from './Containers/AboutUs/aboutUs.js';
import NotFound from './Components/notfoundPage/notFound.js';
import SearchedProfile from './Containers/searchedProfile/searchedprofile.js';
import SocietyPanel from './Components/adminSociety/societyPanel.js';
import UniversityMap from './Containers/testingMap/testing.js'
function App() {


  return (
    <SkeletonTheme baseColor="#CCCCCC" highlightColor="#E5E5E5">
      <Router>
        <PageWrapper>
          <Routes>
            <Route path="/" exact element={<Login showAdmin={() => { console.log() }} type={'default'} />} />
            <Route path="/request" element={<RequestAprovalWaitPage />} />
            <Route path="/Home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/eventdetail/:eventname" element={<RequireAuth><EventDetailPage /></RequireAuth>} />
            <Route path="/societies" element={<RequireAuth><SocietiesPage /></RequireAuth>} />
            <Route path="/calander" element={<RequireAuth><CalanderComponent /></RequireAuth>} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/success" element={<RequireAdminAuth><AdminHomePage /></RequireAdminAuth>} />
            <Route path="/settings" element={<RequireAuth><userSettings /></RequireAuth>} />
            <Route path="/events" element={<RequireAuth><AllEvents /></RequireAuth>} />
            <Route path="/SocietyAdminPortal" element={<RequireAuth><SocietyAdminPortal /></RequireAuth>} />
            <Route path="/user-profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
            <Route path=":type/society-page" element={<RequireAuth><AboutSocietyPage /></RequireAuth>} />
            <Route path=":type/:subtype/society-page" element={<RequireAuth><AboutSocietyPage /></RequireAuth>} />
            <Route path="/about-us" element={<RequireAuth><AboutPage /></RequireAuth>} />
            <Route path="/SearchedProfile" element={<RequireAuth><SearchedProfile /></RequireAuth>} />
            <Route path="/sub-admin-panel" element={<RequireAuth><SocietyPanel /></RequireAuth>} />
            <Route path="/testing-map" element={<RequireAuth><UniversityMap /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
