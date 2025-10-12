import React, { useEffect, useState } from 'react';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import CircularProgress from '@mui/material/CircularProgress';
import PaginationControls from '../../components/PaginationControls/PaginationControls'; // Necesitas este componente
import './CharactersPage.css';
// Si usas Navigate para algo global, pero es más común usar Link o useNavigate
// import { useNavigate } from 'react-router-dom'; 

const CHARACTERS_PER_PAGE = 10; // 10 personajes por página, según el requisito 

const CharactersPage = () => {
    const [allCharacters, setAllCharacters] = useState([]); // Todos los datos de la API
    const [currentPage, setCurrentPage] = useState(1);       // Página actual
    const [isLoading, setIsLoading] = useState(true);        // Control de carga [cite: 68]
    // const navigate = useNavigate(); // Inicializar navigate

    useEffect(() => {
        setIsLoading(true);
        // Usa la corrección de lógica para la API
        fetch('https://thesimpsonsapi.com/api/characters')
            .then(response => response.json())
            .then(data => {
                const charactersArray = Array.isArray(data) ? data : data.results || [];
                setAllCharacters(charactersArray);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
                // Aquí se puede implementar el control de errores (opcional) [cite: 67]
            });
    }, []);

    // 1. Lógica de Paginación
    const totalPages = Math.ceil(allCharacters.length / CHARACTERS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
    const endIndex = startIndex + CHARACTERS_PER_PAGE;
    const currentCharacters = allCharacters.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0); 
        }
    };
    
    const renderCharacters = () => {
        if (isLoading) {
            // Loader o animación de carga [cite: 68]
            return (
                <div className="loader-center">
                    <CircularProgress color="warning" size={60} />
                    <p>Cargando Springfield...</p>
                </div>
            );
        }

        if (allCharacters.length === 0 && !isLoading) {
            return <p className="error-message">No se pudieron cargar los personajes. Inténtalo de nuevo más tarde.</p>;
        }

        return (
            <>
                {/* Contenedor de las tarjetas */}
                <div id='charactersPage'> 
                    {currentCharacters.map((character, index) => (
                        // Usamos index como fallback key si el id no existe
                        <CharacterCard 
                            key={character.id || character.name || index} 
                            data={character} 
                        />
                    ))}
                </div>

                {/* Controles de Paginación  */}
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };

    return (
        <div id='characters-container'>
            {renderCharacters()}
        </div>
    );
}

export default CharactersPage;