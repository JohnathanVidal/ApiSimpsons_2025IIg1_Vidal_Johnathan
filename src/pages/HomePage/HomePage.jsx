import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
    return (
        <Box
            sx={{
                p: 5,
                textAlign: 'center',
                color: 'white',
                mt: 10,
                minHeight: '60vh'
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontFamily: 'Bangers, cursive',
                    color: '#FFCC00',
                    textShadow: '5px 5px 0px #000000ff',
                    mb: 3
                }}
            >
                ¡BIENVENIDO A SPRINGFIELD!
            </Typography>
            <Typography
                variant="h5"
                sx={{ maxWidth: 800, margin: 'auto' }}
            >
                Explora el universo de Los Simpson: personajes, lugares y episodios, todo consumido desde una API pública en React.
            </Typography>
        </Box>
    );
};

export default HomePage;