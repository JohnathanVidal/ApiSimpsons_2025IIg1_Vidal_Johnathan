import React from 'react';
import { Box, Typography } from '@mui/material';
import NubesFondo from '../../assets/nubes.jpg';

const HomePage = () => {
    return (
        <Box
            sx={{
                p: 5,
                textAlign: 'center',
                color: 'white',
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', 

                backgroundImage: `url(${NubesFondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',

                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    zIndex: 1,
                    borderRadius: '4px'
                },
            }}
        >
            {/* El Box de contenido (zIndex: 2) es lo que se centra dentro del Box padre */}
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center'
            }}>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontFamily: 'Bangers, cursive',
                        color: '#FFCC00',
                        textShadow: '5px 5px 0px #000',
                        mb: 3
                    }}
                >
                    ¡BIENVENIDO A SPRINGFIELD!
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        maxWidth: 800,
                        margin: 'auto',
                        textShadow: '2px 2px 0px #000',
                        color: '#FFF'
                    }}
                >
                    En esta API podrás encontrar información detallada sobre los personajes, episodios y ubicaciones de la icónica serie de televisión llamada "Los Simpson". Puedes explorar datos interesantes, curiosidades y mucho más sobre la Familia Simpson y Springfield.
                    <br />
                    Esta API fue hecha usando los datos de la API publica de los simpson https://thesimpsonsapi.com/
                    <br /><br />
                    DISFRUTA DE TU VISITA!
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;