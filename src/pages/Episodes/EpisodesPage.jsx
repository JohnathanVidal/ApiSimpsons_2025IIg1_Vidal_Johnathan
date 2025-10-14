import React, { useEffect, useState, useMemo } from 'react';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import { CircularProgress, Typography, Box, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Button } from '@mui/material';
import PaginationControls from '../../components/PaginationControls/PaginationControls';
import './EpisodesPage.css';

const episodios_por_pagina = 12;

const EpisodesPage = () => {
    const [allEpisodes, setAllEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState('all');
    const [selectedEpisodeRange, setSelectedEpisodeRange] = useState('all');

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch('https://thesimpsonsapi.com/api/episodes')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: La API no respondió correctamente.`);
                }
                return response.json();
            })
            .then(data => {
                const episodesArray = Array.isArray(data) ? data : data.results || [];
                console.log(`Episodios cargados: ${episodesArray.length} ítems.`);
                setAllEpisodes(episodesArray);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching episodes:', err);
                setError(err.message);
                setIsLoading(false);
                setAllEpisodes([]);
            });
    }, []);

    // Obtener temporadas únicas para el filtro
    const availableSeasons = useMemo(() => {
        // Aseguramos que la temporada sea un número para el ordenamiento
        const seasons = [...new Set(allEpisodes.map(episode => parseInt(episode.season)))]
            .filter(s => !isNaN(s)) // Filtramos valores no numéricos (si existen)
            .sort((a, b) => a - b);
        return seasons;
    }, [allEpisodes]);

    const filteredEpisodes = useMemo(() => {
        let filtered = allEpisodes;

        if (selectedSeason !== 'all') {
            // Aseguramos que la comparación sea entre tipos de datos iguales (números)
            const seasonNumber = parseInt(selectedSeason);
            filtered = filtered.filter(episode => parseInt(episode.season) === seasonNumber);
        }

        // Filtrar por rango de episodios
        if (selectedEpisodeRange !== 'all') {
            const [start, end] = selectedEpisodeRange.split('-').map(Number);

            // Usamos el rango dinámicamente
            filtered = filtered.filter(episode => {
                const episodeNumber = parseInt(episode.episode_number);
                return episodeNumber >= start && episodeNumber <= end;
            });
        }

        return filtered;
    }, [allEpisodes, selectedSeason, selectedEpisodeRange]);

    // Paginación
    const totalPages = Math.ceil(filteredEpisodes.length / episodios_por_pagina);
    const startIndex = (currentPage - 1) * episodios_por_pagina;
    const endIndex = startIndex + episodios_por_pagina;
    const currentEpisodes = filteredEpisodes.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
        setCurrentPage(1);
    };

    const handleEpisodeRangeChange = (event) => {
        setSelectedEpisodeRange(event.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSelectedSeason('all');
        setSelectedEpisodeRange('all');
        setCurrentPage(1);
    };

    const renderEpisodes = () => {
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, mt: 5 }}>
                    <CircularProgress color="warning" size={60} />
                    <Typography sx={{ ml: 2, mt: 2, color: 'white' }}>
                        Los episodios de Springfield se están cargando...
                    </Typography>
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                    <Typography variant="h5" color="#E53935">
                        Error al cargar los episodios: {error}
                    </Typography>
                </Box>
            );
        }

        if (allEpisodes.length === 0 && !isLoading) {
            return (
                <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                    <Typography variant="h5" color="white">
                        No se encontraron episodios. ¡La TV de Springfield está apagada!
                    </Typography>
                </Box>
            );
        }

        if (filteredEpisodes.length === 0 && allEpisodes.length > 0) {
            return (
                <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                    <Typography variant="h5" color="white">
                        No se encontraron episodios con los filtros seleccionados.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={clearFilters}
                        sx={{
                            mt: 2,
                            backgroundColor: '#FF6B35',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#E53935',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(229, 57, 53, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Limpiar Filtros
                    </Button>
                </Box>
            );
        }

        return (
            <>
                <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    sx={{ p: 2 }}
                >
                    {currentEpisodes.map((episode, index) => (
                        <Grid item key={episode.id || episode.name || index} xs={12} sm={6} md={4} lg={3}>
                            <EpisodeCard data={episode} />
                        </Grid>
                    ))}
                </Grid>
                {totalPages > 1 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    };

    return (
        <Box sx={{ p: 4 }} id='episodes-container'>
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
                Episodios de Los Simpson
            </Typography>

            {/* Controles de filtro */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
                p: 2,
                backgroundColor: 'rgba(30, 30, 30, 0.9)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                border: '2px solid #E53935'
            }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="season-select-label" sx={{ color: '#FFFFFF' }}>Temporada</InputLabel>
                    <Select
                        labelId="season-select-label"
                        value={selectedSeason}
                        onChange={handleSeasonChange}
                        label="Temporada"
                        sx={{
                            color: '#FFFFFF',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E53935',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF5722',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF5722',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#FFFFFF',
                            },
                        }}
                    >
                        <MenuItem value="all">Todas las temporadas</MenuItem>
                        {availableSeasons.map(season => (
                            <MenuItem key={season} value={String(season)}>
                                Temporada {season}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="episode-range-label" sx={{ color: '#FFFFFF' }}>Episodios</InputLabel>
                    <Select
                        labelId="episode-range-label"
                        value={selectedEpisodeRange}
                        onChange={handleEpisodeRangeChange}
                        label="Episodios"
                        sx={{
                            color: '#FFFFFF',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E53935',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF5722',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#FF5722',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#FFFFFF',
                            },
                        }}
                    >
                        <MenuItem value="all">Todos los episodios</MenuItem>
                        <MenuItem value="1-10">Episodios 1-10</MenuItem>
                        <MenuItem value="11-20">Episodios 11-20</MenuItem>
                        <MenuItem value="21-30">Episodios 21-30</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={clearFilters}
                    sx={{
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                            backgroundColor: '#E53935',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(229, 57, 53, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    🗑 Limpiar Filtros
                </Button>

                {/* Mostrar filtros activos */}
                {(selectedSeason !== 'all' || selectedEpisodeRange !== 'all') && (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            Filtros activos:
                        </Typography>
                        {selectedSeason !== 'all' && (
                            <Chip
                                label={`Temporada ${selectedSeason}`}
                                onDelete={() => setSelectedSeason('all')}
                                sx={{
                                    backgroundColor: '#FF9800',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    '& .MuiChip-deleteIcon': {
                                        color: '#000',
                                    },
                                }}
                            />
                        )}
                        {selectedEpisodeRange !== 'all' && (
                            <Chip
                                label={`Episodios ${selectedEpisodeRange}`}
                                onDelete={() => setSelectedEpisodeRange('all')}
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    '& .MuiChip-deleteIcon': {
                                        color: '#fff',
                                    },
                                }}
                            />
                        )}
                    </Box>
                )}

                {/* Contador de resultados */}
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>
                    {filteredEpisodes.length} episodios encontrados
                </Typography>
            </Box>

            {renderEpisodes()}
        </Box>
    );
}

export default EpisodesPage;