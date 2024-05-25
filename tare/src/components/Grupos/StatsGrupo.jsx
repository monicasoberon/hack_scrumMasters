import React from 'react';
import './StatsGrupo.css'

export default function StatsGrupo({ props }) {
    let color;
    const value = 7;
    let status = 'exelente'
    if (value < 7) {
        status = 'reprobado';
    } else if (value < 8) {
        status = 'peligro';
    } else if(value < 9){
        status = 'normal';
    } else{
        status = 'exelente';
    }
    
    return (

        <div className = {`container ${status}`} >
            <img src="./src/assets/icon-grupo.svg" alt="" />
            <p className='statsGrupo-text'>23</p>
        </div>
    );
}