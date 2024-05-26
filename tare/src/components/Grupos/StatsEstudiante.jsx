// import React from 'react';
// import './StatsEstudiante.css';

// export default function StatsEstudiante({ nombre, promedio }) {
    
//     const calif = parseFloat(promedio);
//     // console.log(nombre, calif, typeof calif)
//     const initial = nombre.charAt(0).toUpperCase();

//     let status = 'exelente';
//     if (calif < 50) {
//         status = 'reprobado';
//     } else if (calif < 80) {
//         status = 'peligro';
//     } else if (calif  < 90) {
//         status = 'normal';
//     }

//     console.log(nombre, calif, typeof calif, status);
//     return (
//         <div className={`statsEstudiante-container statsEstudiante-container ${status}`}>
//             <p className='statsEstudianet-text'>{initial}</p>
//         </div>
//     );
// }

import React, { useState } from 'react';
import './StatsEstudiante.css';
import ModalEstudiante from './ModalEstudiante.jsx';

export default function StatsEstudiante({ nombre, promedio }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const calif = parseFloat(promedio);
    const initial = nombre.charAt(0).toUpperCase();

    let status = 'exelente';
    if (calif < 50) {
        status = 'reprobado';
    } else if (calif < 80) {
        status = 'peligro';
    } else if (calif < 90) {
        status = 'normal';
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className={`statsEstudiante-container statsEstudianet-text ${status}`} onClick={handleOpenModal}>
                <p className='statsEstudiante-text'>{initial}</p>
            </div>
            <ModalEstudiante isOpen={isModalOpen} onClose={handleCloseModal} studentName={nombre} />
        </div>
    );
}
