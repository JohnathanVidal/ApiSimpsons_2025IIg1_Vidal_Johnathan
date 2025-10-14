import React from 'react';
import './PaginationControls.css'; 

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    // No mostrar controles si solo hay una página
    if (totalPages <= 1) {
        return null;
    }
    // Array para generar los botones de página
    const NumeroPagina = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="pagination-controls">
            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="boton_pagina"
            >
                &laquo; Anterior
            </button>

            {/* Números de Página (ejemplo simplificado) */}
            {NumeroPagina.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`boton_pagina ${number === currentPage ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="boton_pagina"
            >
                Siguiente &raquo;
            </button>
        </div>
    );
};

export default PaginationControls;