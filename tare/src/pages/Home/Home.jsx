import React from 'react';
import Archivo from '../../components/Archivos/Archivo';

export default function Home() {
    return (
        <div>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre B'}/>
            <Archivo props={3} nombre={'Nombre A'}/>
        </div>
    );
}