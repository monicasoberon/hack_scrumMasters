import React from 'react';
import Archivo from '../../components/Archivos/Archivo';
import './MisArchivos.css';


export default function MisArchivos() {
    return (
        <>
        <h1 className='title' >Mis Archivos</h1>
        <div className='MisArchivos-container'>
            <a href ='../../../libros/Competitive_programming_handbook.pdf' target="_blank" rel="noopener noreferrer"><Archivo props={2} nombre={'Competitive programming handbook.pdf'}/></a>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={2} nombre={'Nombre A'}/>
            <Archivo props={3} nombre={'Nombre A'}/>
        </div>
        </>
    );
}