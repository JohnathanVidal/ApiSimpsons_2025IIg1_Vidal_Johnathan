import React, { useEffect, useState } from 'react';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { CircularProgress, Typography } from '@mui/material';
import PaginationControls from '../../components/PaginationControls/PaginationControls';
import './CharactersPage.css';

const personajes_por_pagina = 10;

const CharactersPage = () => {
    const [allCharacters, setAllCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
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
            });
    }, []);

    const totalPages = Math.ceil(allCharacters.length / personajes_por_pagina);
    const startIndex = (currentPage - 1) * personajes_por_pagina;
    const endIndex = startIndex + personajes_por_pagina;
    const currentCharacters = allCharacters.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    const renderCharacters = () => {
        if (isLoading) {
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
                <div id='charactersPage'>
                    {currentCharacters.map((character, index) => (
                        <CharacterCard
                            key={character.id || character.name || index}
                            data={character}
                        />
                    ))}
                </div>
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
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontFamily: 'Bangers, cursive',
                    color: '#FFD90F',
                    textShadow: '4px 4px 0px #000',
                }}
            >
                Personajes de Los Simpson
            </Typography>
            {renderCharacters()}
        </div>
    );
}

export default CharactersPage;