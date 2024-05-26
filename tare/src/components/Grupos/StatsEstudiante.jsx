import React from 'react';
import './StatsEstudiante.css';

export default function StatsEstudiante({ nombre, promedio }) {
    
    const calif = parseFloat(promedio);
    // console.log(nombre, calif, typeof calif)
    const initial = nombre.charAt(0).toUpperCase();

    let status = 'exelente';
    if (calif < 50) {
        status = 'reprobado';
    } else if (calif < 80) {
        status = 'peligro';
    } else if (calif  < 90) {
        status = 'normal';
    }

    console.log(nombre, calif, typeof calif, status);
    return (
        <div className={`statsEstudiante-container statsEstudiante-container ${status}`}>
            <p className='statsEstudianet-text'>{initial}</p>
        </div>
    );
}