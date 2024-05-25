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
          <img src="./src/assets/test/foto_perfil_prueba.png" alt="foto de perfil" className="profile-image" />
          <h3 className="profile-name">Julen Hoppenstedt</h3>
        </div>
        <ul className="sidebar-links">
          <li className="sidebar-link-item">
            <NavLink to="/Grupos"><button className="sidebar-link">Mis Grupos</button></NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink to="/Grupos"><button className="sidebar-link">Mis Archivos</button></NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink to="/Grupos"><button className="sidebar-link">Examenes</button></NavLink>
          </li>
          <li className="sidebar-link-item">
            <NavLink to="/Grupos"><button className="sidebar-link">Tutor Tara</button></NavLink>
          </li>
        </ul>
      </div>
      <button className='logout-button'>Log-out</button>
    </nav>
  );
}