import React from 'react';
import './Anuncios.css';

export default function Anuncios() {
    return(
        <div className='anuncios-container'>
            <div className='anuncio-container'>
                <h3 className='anuncio-title'>Anuncio</h3>
                <p className='anuncio-text'>
                    Hemos notado que dentro de tu salon Salon 6B a tenido 
                    una semana baja, dale click a continuar para ver un 
                    nuevo plan de estudios.
                </p>
                <div className='anuncios-button-container'>
                    <button className='cerrar'>cerrar</button>
                    <button className='continuar'>continuar</button>
                </div>
            </div>
            <div className='anuncio-container'>
                <h3 className='anuncio-title'>Anuncio</h3>
                <p className='anuncio-text'>
                    Hemos notado que dentro de tu salon Salon 6B a tenido 
                    una semana baja, dale click a continuar para ver un
                </p>
                <div className='anuncios-button-container'>
                    <button className='cerrar'>cerrar</button>
                    <button className='continuar'>continuar</button>
                </div>
            </div>
        </div>
    )
}