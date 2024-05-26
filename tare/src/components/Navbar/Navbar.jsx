import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="profile-section">
          <img src="./src/assets/test/foto_perfil_prueba.png" alt="foto de perfil" className="profile-image" />
          <h3 className="profile-name">Julen Hoppenstedt</h3>
        </div>
        <ul className="sidebar-links">
          <li className="sidebar-link-item">
            <NavLink
              to="/Grupos"
              className={({ isActive }) => isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
            >
              Mis Grupos
            </NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink
              to="/MisArchivos"
              className={({ isActive }) => isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
            >
              Mis Archivos
            </NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink
              to="/MisExamenes"
              className={({ isActive }) => isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
            >
              Examenes
            </NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink
              to="/TutorTara"
              className={({ isActive }) => isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
            >
              Tutor Tara
            </NavLink>
          </li>
        </ul>
      </div>
      <button className="logout-button">Log-out</button>
    </nav>
  );
}
