import React, { useEffect, useState } from 'react';

export default function GroupMaximize() {
    return(
        <>
        <div className='GroupMaximize-container'>
            <NavLink
              to="/Grupos"
              className={({ isActive }) => isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'}
            >
              Mis Grupos
            </NavLink>
            <h1 className='title completo' >Tutor Tara</h1>
            <image src='./src/assets/test/foto_perfil_prueba.png' alt='foto de perfil' className='profile-image' />
        </div>
        </>
    );
}