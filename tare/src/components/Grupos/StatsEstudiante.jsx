import React from 'react';
import './StatsEstudiante.css';

const getLetterGrade = (calif) => {
    if (calif >= 90) {
        return 'A';
    } else if (calif >= 80) {
        return 'B';
    } else if (calif >= 70) {
        return 'C';
    } else if (calif >= 60) {
        return 'D';
    } else {
        return 'F';
    }
};

export default function StatsEstudiante({ nombre, promedio }) {
    const calif = parseFloat(promedio);
    const letterGrade = getLetterGrade(calif);

    let status = 'exelente';
    if (calif > 75) {
        status = 'exelente';
    } else if (calif > 50) {
        status = 'normal';
    } else if (calif > 25) {
        status = 'peligro';
    } else {
        status = 'reprobado';
    }

    return (
        <div className={`statsEstudiante-container ${status}`}>
            <p className='statsEstudiante-text'>{letterGrade}</p>
        </div>
    );
}