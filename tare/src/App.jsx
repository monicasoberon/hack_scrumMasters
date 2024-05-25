import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home/Home';
import Grupos from './pages/Grupos/Grupos';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Grupos" element={<Grupos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
