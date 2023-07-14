import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './signin_signout/login.js';
import Home from './Home/home.js';
import NeonCursor from "./neonCursor.js";

function App() {
  return (
    <div className="App">
      <NeonCursor/>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
