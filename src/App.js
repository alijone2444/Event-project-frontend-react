import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './signin_signout/login.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
