import React from 'react';
import './ModalGrupo.css';

const ModalGrupo = ({ isOpen, onClose, grupoStats, studentStats }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                <h2 className="modal-title">Group Information</h2>
                <h3 className="modal-subtitle">Group Average: {grupoStats}</h3>
                <h4 className="modal-section-title">Students</h4>
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
