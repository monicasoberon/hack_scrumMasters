import React from 'react';
import './Modal.css';

export default function Modal() {

  return (
    <div className="centeredDiv">
        <form action="POST" className='fileform'>
            <input type="file" className='fileinput'></input>
            <button type="submit" className='subButton'>Submit</button>
        </form>
    </div>
  );
};
