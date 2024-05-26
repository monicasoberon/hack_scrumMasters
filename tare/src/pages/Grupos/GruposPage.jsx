import React, { useEffect, useState } from 'react';
import Grupos from '/src/components/Grupos/Grupos';

export default function GruposPage() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await fetch('http://localhost:3001/obtenerCursos');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setCursos(data.cursos);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {cursos.map((curso) => (
                <Grupos key={curso.id} nombreGrupo={curso.nombre} id={curso.id} />
            ))}
        </div>
    );
}