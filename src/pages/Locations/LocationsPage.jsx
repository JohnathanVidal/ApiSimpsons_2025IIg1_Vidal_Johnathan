import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import LocationCard from '../../components/LocationCard/LocationCard';

const LocationsPage = () => {
    // Inicialización del estado como un array vacío
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://thesimpsonsapi.com/api/locations')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar datos de lugares');
                }
                return response.json();
            })
            .then(data => {
                // FIX: Aseguramos que 'data' sea un array antes de establecer el estado
                // Si la API no devuelve un array, usamos un array vacío ([]).
                const locationsArray = Array.isArray(data) ? data : [];

                setLocations(locationsArray);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener datos:", err);
                setError(err.message);
                setIsLoading(false);
                // En caso de error, aseguramos que locations sea un array vacío
                setLocations([]);
            });
    }, []);

    // --- Renderizado Condicional ---

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, mt: 5 }}>
                <CircularProgress color="warning" />
                <Typography sx={{ ml: 2, mt: 2, color: 'white' }}>Cargando lugares de Springfield...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                <Typography variant="h5" color="#E53935">
                    ¡Maldición! Error al cargar los lugares: {error}
                </Typography>
            </Box>
        );
    }

    // Si no hay datos, pero tampoco hay error (porque la API devolvió un array vacío)
    if (locations.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                <Typography variant="h5" color="white">
                    No se encontraron lugares. ¡Springfield está desierto!
                </Typography>
            </Box>
        );
    }


    // --- Vista Principal ---

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontFamily: 'Bangers, cursive',
                    color: '#FFD90F', // Amarillo
                    textShadow: '4px 4px 0px #0070c0', // Azul
                }}
            >
                Lugares Emblemáticos de Los Simpson
            </Typography>

            <Grid
                container
                spacing={4}
                justifyContent="center"
            >
                {/* Ahora locations es garantizado un array, por lo que .map() funcionará */}
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