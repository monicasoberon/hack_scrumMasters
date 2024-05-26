import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Anuncios from './components/Anuncios/Anuncios';
import MisArchivos from './pages/MisArchivos/MisArchivos';
import MisExamenes from './pages/MisExamenes/MisExamenes';
import TutorTara from './pages/TutorTara/TutorTara';
import Grupos from './pages/Grupos/GruposPage';
import GroupMaximizeTest from './pages/Test/GroupMaximize';

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
            <Route path="/MisExamenes" element={<MisExamenes />} />
            <Route path="/TutorTara" element={<TutorTara />} />
            <Route path="/GroupMaximizeTest" element={<GroupMaximizeTest />} />
          </Routes>
        </div>
        <Anuncios />
      </div>
    </Router>
  );
};

export default App;

