import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './signin_signout/login.js';
import Home from './Home/home.js';
import NeonCursor from "./neonCursor.js";
import SocietiesComponent from './societies/societies.js'
import CalanderComponent from './calander/calander.js'

function App() {
  return (
    <div className="App">
      <NeonCursor/>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/societies" element={<SocietiesComponent />} />
          <Route path="/calander" element={<CalanderComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
