import React from 'react';
import './Modal.css';

export default function Modal() {

  return (
    <div className="centeredDiv">
        <form>
            <input type="file"/>Buscar Archivo
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};
