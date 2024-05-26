import React from 'react';
import './TutorTara.css'
//import 'backend/aiRoute.js'

export default function TutorTara(props) {
    return (

        <div className="main-tutor">
            <div className='bubble-container'>
                <p>Holaa! Mi nombre es Tara, puedes preguntarme lo que tu quieras. </p>
            </div>
            <div className="sec-2">
            <img src="./src/assets/Tara.svg" alt="Tara" />
            <div className='question'>
                <p>Lorem ipsum dolor sit amet, </p>
            </div>
            </div>
            <form className='form-tara' action="POST">
                <input type="text" />
                <button type='submit'><img src="./src/assets/arrow-tara.svg" alt="^" /></button>
            </form>
        </div>

    );
}