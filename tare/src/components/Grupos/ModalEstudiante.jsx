import React, { useEffect, useState } from 'react';
import './ModalEstudiante.css';

const ModalEstudiante = ({ isOpen, onClose, studentName }) => {
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        if (isOpen && studentName) {
            const fetchStudentInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/obtenerInfoEstudiante/${studentName}`);
                    const data = await response.json();
                    setStudentInfo(data);
                } catch (error) {
                    console.error('Error fetching student info:', error);
                }
            };

            fetchStudentInfo();
        }
    }, [isOpen, studentName]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                {studentInfo ? (
                    <>
                        <h2 className="modal-title">{studentInfo.nombreEstudiante}</h2>
                        <h4 className="modal-section-title">Asignaciones y Calificaciones</h4>
                        <ul className="modal-student-list">
                            {studentInfo.calificaciones.map((item, index) => (
                                <li key={index} className="modal-student-item">
                                    {item.nombreAsignacion}: {item.calificacion}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Cargando información del estudiante...</p>
                )}
            </div>
        </div>
    );
};

export default ModalEstudiante;
