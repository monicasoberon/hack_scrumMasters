import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({props}) {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        <div className="profile-section">
          {/* <img src={props.fotoPerfil} alt="foto de perfil" className="profile-image" />
          <h3 className="profile-name">{props.nombre}</h3> */}
          <img src="./src/assets/test/foto_perfil_prueba.svg" alt="foto de perfil" className="profile-image" />
          <h3 className="profile-name">Julen Hoppenstedt Mandiola</h3>
        </div>
        <ul className="sidebar-links">
          <li className="sidebar-link-item">
            <NavLink to="/" className="sidebar-link">Home</NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink to="/Grupos" className="sidebar-link">Grupos</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}