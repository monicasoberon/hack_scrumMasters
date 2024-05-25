import React from 'react';
import Grupos from '/src/components/Grupos/Grupos';

const propsPrueba = [
    {
        nombreGrupo: 'Mi Grupo 1',
        id: 1,
    },
    {
        nombreGrupo: 'Mi Grupo 2',
        id: 2,
    },
    {
        nombreGrupo: 'Mi Grupo 3',
        id: 3,
    },
    {
        nombreGrupo: 'Mi Grupo 4',
        id: 4,
    },
];

export default function GruposPage() {
    
    return (
        <div>
            {propsPrueba.map((grupo) => (
                <Grupos key={grupo.id} {...grupo} />
            ))}
        </div>
    );
}