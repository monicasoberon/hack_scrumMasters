import React, { useState } from 'react';
import './TutorTara.css';

export default function TutorTara(props) {
    const [textoParrafo, setTextoParrafo] = useState('¡Hola! Yo soy tu asistente Tara, te puedo brindar plan diario y un examen para tus lecciones, tambien puedo corregir examenes. Indica la fuente de tu información: libros SEP, notas o prompt');

    const handleClick = () => {
      setTextoParrafo(`Para una primera clase de programación competitiva basada en el libro "Competitive Programming Handbook", podemos planificar las primeras tres sesiones cubriendo los temas iniciales del libro. Aquí tienes una planeación sugerida:
      Sesión 1: Introducción y Complejidad Temporal
      Objetivo: Familiarizarse con conceptos básicos y entender la importancia de la eficiencia en los algoritmos.
      Temas a cubrir:
      Introducción:
      ¿Qué es la programación competitiva?
      Lenguajes de programación recomendados para concursos.
      Entrada y salida:
      Métodos rápidos de entrada y salida.
      Complejidad temporal:
      Reglas de cálculo de complejidades y diversas clases de complejidad.
      Estimación de la eficiencia: cómo evaluar la eficiencia de un algoritmo.
      Suma de subarreglos máximos: un problema clásico para entender la aplicación de complejidades.
      Actividad: Resolver problemas básicos que involucren la medición de la complejidad temporal de diferentes algoritmos.
      
      Sesión 2: Ordenación
      Objetivo: Entender diferentes métodos de ordenación y su importancia en la programación competitiva.
      Temas a cubrir:
      Teoría de la ordenación:
      Panorámica de algoritmos clave (quicksort, mergesort, etc.)
      Ordenación en C++:
      Uso de las funciones de ordenación estándar.
      Búsqueda binaria:
      Implementación y aplicaciones.
      Actividad: Implementar y comparar diferentes algoritmos de ordenación y realizar búsquedas binarias en listas ordenadas.
      
      Sesión 3: Estructuras de datos
      Objetivo: Familiarizarse con estructuras de datos esenciales y su uso eficiente en problemas competitivos.
      Temas a cubrir:
      Arreglos dinámicos:
      Vectores en C++.
      Estructuras de conjuntos:
      conjuntos y mapas.
      Iteradores y rangos:
      Uso eficaz de iteradores.
      Otras estructuras:
      Reseñar algunas estructuras adicionales como pilas, colas y listas ligadas.
      Comparación con algoritmos de ordenación.
      Actividad: Resolver problemas que requieran el uso de diferentes estructuras de datos para mejorar la eficiencia de la solución.
      
      Recursos
      Lectura requerida: Capítulos correspondientes del libro "Competitive Programming Handbook" .
      Práctica en línea: Resolver problemas de plataformas como Codeforces o AtCoder que traten sobre los temas presentados.
      Estos tres temas iniciales darán una buena base para los estudiantes e introducirán los conceptos fundamentales que se expandirán en clases posteriores.`);
    };

    return (
        <div className="main-tutor">
            <div className='bubble-container'>
                <p id='response'>{textoParrafo}</p>
            </div>
            <div className="sec-2">
                <img src="./src/assets/Tara.svg" alt="Tara" />
                <div className='question'>
                    <p>Descríbeme lo que buscas aquí.</p>
                </div>
            </div>
            <div className='form-tara'>
                <input
                    type="text"

                />
                <button onClick={handleClick}>
                    <img src="./src/assets/arrow-tara.svg" alt="^" />
                </button>
            </div>
        </div>
    );
}
