import React from 'react';
import Archivo from '../../components/Archivos/Archivo';
import './MisExamenes.css';


export default function MisExamenes() {
    return (
        <>
        <h1 className='title' >Mis Examenes</h1>
        <div className='MisExamenes-container'>

            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={1} nombre={'Nombre A'}/>
            <Archivo props={3} nombre={'Nombre A'}/>
        </div>
        </>
    );
}