import React, { useEffect, useState } from 'react';
import './Grupos.css';
import StatsEstudiante from '/src/components/Grupos/StatsEstudiante.jsx';
import StatsGrupo from '/src/components/Grupos/StatsGrupo.jsx';

const dataList = [
    { props: 'G', calif: 'e' },
    { props: 'A', calif: 'n' },
    { props: 'B', calif: 'p' },
    { props: 'G', calif: 'r' },
    { props: 'A', calif: 'p' },
    { props: 'B', calif: 'n' },
    { props: 'G', calif: 'e' },
    { props: 'A', calif: 'n' },
    { props: 'B', calif: 'p' },
    { props: 'G', calif: 'r' },
    { props: 'A', calif: 'p' },
    { props: 'B', calif: 'n' }
    // Add more items as needed
  ];

export default function Grupos(props) {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/obtenerDatos?maestroId=${props.id}`);
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setDatos(data.resultados);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDatos();
    }, [props.id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(datos);

    return (

        <div className="grupos-container">
            <div className="grupo">
                <div className="grupo-header">
                    <h3 className="grupo-title">{props.nombre}</h3>
                </div>

                <div className="grupo-content">

                    <div className="estudiante-stats">

                        {dataList.map((item, index) => ( 
                            <StatsEstudiante key={index} props={item.props} calif={item.calif} />
                        ))}
                    </div>

                    <div className="grupo-stats">
                        <StatsGrupo />
                    </div>
                </div>
            </div>
        </div>
    );
}