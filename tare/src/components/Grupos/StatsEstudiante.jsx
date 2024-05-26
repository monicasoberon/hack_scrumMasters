import React from 'react';
import '/src/components/Grupos/StatsEstudiante.css';

export default function statsEstudiante({props, calif}) {
    let status = 'exelente'

    if(calif === 'e'){
        status = 'exelente'

    }else if(calif === 'n'){
        status = 'normal'

    }else if(calif === 'p'){
        status = 'peligro'

    }else{
        status = 'reprobado'

    }

    return (
        <div className={`statsEstudiante-container ${status}`}>
            <p className='statsEstudianet-text'>{props}</p>
        </div>
    );

}