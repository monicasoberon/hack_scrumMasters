import React from 'react'
import './Archivo.css'

/*
PDF = 1
Examen = 2
Agregar = 3
*/

export default function({props, nombre}){
    let url = ""

    if (props === 1){
        url = "./src/assets/examen-icon.svg"
    }else if (props === 2){
        url = "./src/assets/pdf-icon.svg"
    }else{
        url = "./src/assets/add-icon.svg"
        nombre = ""
    }

    return(
        <>
        <div className = 'examen-component'>
            <div className = 'block icon-innershadow'>
                <img src={url} alt="Examen"/>
            </div>

            <p>{nombre}</p>
        </div>
        </>
    )
}