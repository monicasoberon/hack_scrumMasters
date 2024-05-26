import React, { useEffect, useState } from 'react';
import './Grupos.css';
import StatsEstudiante from '/src/components/Grupos/StatsEstudiante.jsx';
import StatsGrupo from '/src/components/Grupos/StatsGrupo.jsx';

export default function Grupos(props) {
    const [studentStats, setStudentStats] = useState([]);
    const [grupoStats, setGrupoStats] = useState(null);

    useEffect(() => {
        const fetchStudentStats = async () => {
            try {
                const response = await fetch(`http://localhost:3001/calcularPromediosEstudiantes/${props.id}`);
                const data = await response.json();
                setStudentStats(data);
            } catch (error) {
                console.error('Error fetching student stats:', error);
            }
        };

        const fetchGrupoStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/obtenerPromedios');
                const data = await response.json();
                const cursoStats = data.find(curso => curso.curso === props.nombreGrupo);
                setGrupoStats(cursoStats ? cursoStats.promedioCurso : null);
            } catch (error) {
                console.error('Error fetching grupo stats:', error);
            }
        };

        fetchStudentStats();
        fetchGrupoStats();
    }, [props.cursoId, props.nombreGrupo]);

    console.log(studentStats, grupoStats)

    return (
        <div className="grupos-container">
            <div className="grupo">
                <div className="grupo-header">
                    <h3 className="grupo-title">{props.nombreGrupo}</h3>
                </div>

                <div className="grupo-content">
                    <div className="estudiante-stats">
                        {studentStats.map((item, index) => (
                            <StatsEstudiante key={index} nombre={item.estudiante} promedio={item.promedio} />
                        ))}
                    </div>

                    <div className="grupo-stats">
                        {grupoStats !== null && <StatsGrupo promedio={grupoStats} />}
                    </div>
                </div>
            </div>
        </div>
    );
}