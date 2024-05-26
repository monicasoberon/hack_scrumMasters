import React from 'react';
import './ModalGrupo.css';

const ModalGrupo = ({ isOpen, onClose, grupoStats, studentStats }) => {
    if (!isOpen) return null;

    // Round the global average
    const roundedPromedio = Number(grupoStats).toFixed(2);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                <h2 className="modal-title">Información del Grupo</h2>
                <h3 className="modal-subtitle">Promedio global: {roundedPromedio}</h3>
                <h4 className="modal-section-title">Estudiantes</h4>
                <ul className="modal-student-list">
                    {studentStats.map((item, index) => (
                        <li key={index} className="modal-student-item">{item.estudiante}: {item.promedio}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ModalGrupo;