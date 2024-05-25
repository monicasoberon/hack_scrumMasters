import React from 'react';	
import './Grupos.css';
import StatsEstudiante from '/src/components/Grupos/StatsEstudiante.jsx';
import StatsGrupo from '/src/components/Grupos/StatsGrupo.jsx';

const dataList = [
    { props: 'G', calif: 'e' },
    { props: 'A', calif: 'n' },
    { props: 'B', calif: 'p' },
    { props: 'G', calif: 'r' },
    { props: 'A', calif: 'p' },
    { props: 'B', calif: 'n' },
    { props: 'G', calif: 'e' },
    { props: 'A', calif: 'n' },
    { props: 'B', calif: 'p' },
    { props: 'G', calif: 'r' },
    { props: 'A', calif: 'p' },
    { props: 'B', calif: 'n' }
    // Add more items as needed
  ];

export default function Grupos(props) {
    return (

        <div className="grupos-container">
            <div className="grupo">
                <div className="grupo-header">
                    <h3 className="grupo-title">{props.nombreGrupo}</h3>
                </div>
                <div className="grupo-content">

                    <div className="estudiante-stats">

                        {dataList.map((item, index) => ( 
                            <StatsEstudiante key={index} props={item.props} calif={item.calif} />
                        ))}
                    </div>

                    <div className="grupo-stats">
                        <StatsGrupo />
                    </div>
                </div>
            </div>
        </div>
    );
}