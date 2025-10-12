import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import LocationCard from '../../components/LocationCard/LocationCard';

const LocationsPage = () => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://thesimpsonsapi.com/api/locations')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: La API no respondió correctamente.`);
                }
                return response.json();
            })
            .then(data => {
                const locationsArray = Array.isArray(data.results) ? data.results :
                    Array.isArray(data) ? data : [];
                console.log(`Lugares cargados: ${locationsArray.length} ítems. (API Original)`);
                setLocations(locationsArray);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("ERROR al obtener datos:", err);
                setError(err.message);
                setIsLoading(false);
                setLocations([]);
            });
    }, []);

    // --- Renderizado Condicional ---

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, mt: 5 }}>
                <CircularProgress color="warning" />
                <Typography sx={{ ml: 2, mt: 2, color: 'white' }}>Los luagres de Springfield se están cargando...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                <Typography variant="h5" color="#E53935">
                    Error al cargar los lugares: {error}
                </Typography>
            </Box>
        );
    }

    if (locations.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                <Typography variant="h5" color="white">
                    No se encontraron lugares. ¡Springfield se encuentra desierto!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontFamily: 'Bangers, cursive',
                    color: '#FFD90F',
                    textShadow: '4px 4px 0px #000000ff',
                }}
            >
                Lugares Emblemáticos de Los Simpson
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
            >
                {locations.map((location) => (
                    <Grid item key={location.id} xs={12} sm={6} md={4} lg={3}>
                        <LocationCard data={location} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default LocationsPage;