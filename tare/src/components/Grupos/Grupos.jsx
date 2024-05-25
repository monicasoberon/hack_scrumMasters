import React from 'react';	
import './Grupos.css';
import StatsEstudiante from '/src/components/Grupos/StatsEstudiante.jsx';
import StatsGrupo from '/src/components/Grupos/StatsGrupo.jsx';

export default function Grupos(props) {
    return (
        <div className="grupos-container">
            <div className="grupo">
                <div className="grupo-header">
                    <h3 className="grupo-title">{props.nombreGrupo}</h3>
                </div>
                <div className="grupo-content">
                    <div className="estudiante-stats">
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                        <StatsEstudiante />
                    </div>
                    <div className="grupo-stats">
                        <StatsGrupo />
                    </div>
                </div>
            </div>
        </div>
    );
}