import React from 'react';
import './StatsGrupo.css';

export default function StatsGrupo({ promedio }) {
    const roundedPromedio = Math.round(promedio);

    let status = 'exelente';
    if (promedio < 25) {
        status = 'reprobado';
    } else if (promedio < 50) {
        status = 'peligro';
    } else if (promedio < 75) {
        status = 'normal';
    } else {
        status = 'exelente';
    }

    return (
        <div className={`container ${status}`}>
            {/* <img src="./src/assets/icon-grupo.svg" alt="" /> */}
            <p className='statsGrupo-text'>{roundedPromedio}%</p>
        </div>
    );
}