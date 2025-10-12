import React from 'react';
import './PaginationControls.css'; // Estilos para los controles

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {

    // Si solo hay una página, no mostramos los controles
    if (totalPages <= 1) {
        return null;
    }

    // Array para generar los botones de página
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="pagination-controls">
            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-button"
            >
                &laquo; Anterior
            </button>

            {/* Números de Página (ejemplo simplificado) */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`page-button ${number === currentPage ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-button"
            >
                Siguiente &raquo;
            </button>
        </div>
    );
};

export default PaginationControls;