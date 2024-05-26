import React, { useEffect, useState } from 'react';
import Grupos from '/src/components/Grupos/Grupos';
import { useState, useEffect } from 'react';

const GruposPage = () => {
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/obtenerCursos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                setCursos(data.cursos);
            })
            .catch(error => {
                console.error('Error al obtener los cursos:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {cursos.map((curso) => (
                <Grupos key={curso.id} nombreGrupo={curso.nombre} id={curso.id} />
            ))}
        </div>
    );
};

export default GruposPage;
