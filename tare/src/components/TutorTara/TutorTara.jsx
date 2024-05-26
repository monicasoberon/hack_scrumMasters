import React from 'react';
import './TutorTara.css'

export default function TutorTara(props) {
    return (

        <div className="main-tutor">
            <div className='bubble-container'>
                <p>Holaa! Mi nombre es Tara, te puedo ayudar a hacer planes diarios con un exámen, y a corregir examenes. Solo índica la fuente de información que deseas usar: libro SEP, archivo de notas, o, describeme el tema. Si quieres que corrija un exámen, ingresa el nombre de los archivos de examenes a corregir.</p>
            </div>
            <div className="sec-2">
            <img src="./src/assets/Tara.svg" alt="Tara" />
            <div className='question'>
                <p>Describeme lo que buscas aquí. </p>
            </div>
            </div>
            <form className='form-tara' action="POST">
                <input type="text" />
                <button type='submit'><img src="./src/assets/arrow-tara.svg" alt="^" /></button>
            </form>
        </div>

    );
}