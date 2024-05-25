import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Anuncios from './components/Anuncios/Anuncios';
import MisArchivos from './pages/MisArchivos/MisArchivos';
import Grupos from './pages/Grupos/GruposPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header/>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/Grupos" element={<Grupos />} />
            <Route path="/MisArchivos" element={<MisArchivos />} />
          </Routes>
        </div>
        <Anuncios />
      </div>
    </Router>
  );
};

export default App;

