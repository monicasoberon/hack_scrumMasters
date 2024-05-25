import React from 'react';

export default function StatsGrupo({ props }) {
    let color;
    const value = 35;

    if (value <= 10) {
        color = 'red';
    } else if (value <= 20) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    const style = {
        backgroundColor: color,
    };

    return (
        <div className='statsGrupo-container' style={style}>
            <p className='statsGrupo-text'>23</p>
        </div>
    );
}