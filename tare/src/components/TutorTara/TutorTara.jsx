import React from 'react';
import './TutorTara.css'

export default function TutorTara(props) {
    return (

        <div className="main-tutor">
            <div className='bubble-container'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
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