import React from 'react';
import Archivo from '../../components/Archivos/Archivo';
import './MisArchivos.css';


export default function MisArchivos() {
    return (
        <div className='MisArchivos-container'>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={3} nombre={'Nombre A'}/>
        </div>
    );
}