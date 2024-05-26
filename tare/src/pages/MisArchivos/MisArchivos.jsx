import React, { useState } from 'react';
import Archivo from '../../components/Archivos/Archivo';
import Modal from '../../components/Modal/Modal';
import './MisArchivos.css';


export default function MisArchivos() {
    // State to manage the visibility of the div
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle the visibility
    const toggleDiv = () => {
        setIsVisible(!isVisible);
    };
    return (
        <>
        <h1 className='title' >Mis Archivos</h1>
        <div className='MisArchivos-container'>
            <a href ='../../../libros/Competitive_programming_handbook.pdf' target="_blank" rel="noopener noreferrer"><Archivo props={2} nombre={'Competitive programming handbook.pdf'}/></a>
            <a href ='../../../libros/libro mate.pdf' target="_blank" rel="noopener noreferrer"><Archivo props={2} nombre={'Desafíos Matematicos Quinto Grado'}/></a>
            <a href ='../../../libros/Diles que no me maten.pdf' target="_blank" rel="noopener noreferrer"><Archivo props={2} nombre={'Diles que no me maten'}/></a>
            <Archivo props={2} nombre={'Proyectos Escolares'}/>
            <Archivo props={2} nombre={'Proyectos de Aula'}/>
            <Archivo props={2} nombre={'Cartografía de México y el mundo'}/>
            

            <button onClick={toggleDiv} className='openModalBtn'>
                <Archivo props={3} nombre={'Nombre A'}/>
            </button>
            {isVisible && (
                <div>
                    <Modal />
                </div>
            )}
        </div>
        </>
    );
}