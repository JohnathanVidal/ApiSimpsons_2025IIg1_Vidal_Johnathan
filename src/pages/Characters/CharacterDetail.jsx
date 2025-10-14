import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Button,
    CardMedia
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import noImage from '../../assets/noImage.jpg';

const CharacterDetail = () => {
    const { id: characterIdentifier } = useParams();
    const navigate = useNavigate();

    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Función para simular el estado (Vivo/Muerto)
    const getStatus = (name) => {
        const deadCharacters = ["Maude Flanders", "Bleeding Gums Murphy", "Mona Simpson"];
        if (deadCharacters.includes(name)) {
            return { text: "Fallecido", color: "#E53935" };
        }
        return { text: "Vivo", color: "#4CAF50" };
    };


    useEffect(() => {
        setIsLoading(true);
        setError(false);

        fetch('https://thesimpsonsapi.com/api/characters')
            .then(response => response.json())
            .then(data => {
                const charactersArray = Array.isArray(data) ? data : data.results || [];
                const foundCharacter = charactersArray.find(char =>
                    (char.id && char.id.toString() === characterIdentifier) ||
                    (char.name && encodeURIComponent(char.name.toLowerCase().replace(/\s/g, '-')) === characterIdentifier)
                );

                if (foundCharacter) {
                    setCharacter(foundCharacter);
                } else {
                    setError(true);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener datos:", err);
                setError(true);
                setIsLoading(false);
            });
    }, [characterIdentifier]);
    // --- Manejo de Estados ---
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5, mt: 5 }}>
                <CircularProgress color="warning" />
                <Typography sx={{ ml: 2, color: 'white' }}>Cargando datos...</Typography>
            </Box>
        );
    }

    if (error || !character) {
        return (
            <Box sx={{ textAlign: 'center', p: 5, mt: 5 }}>
                <Typography variant="h5" color="#E53935">
                    ¡D'oh! Personaje no encontrado o error de carga.
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/characters')}
                    sx={{ mt: 3, bgcolor: '#FFCC00', color: 'black', '&:hover': { bgcolor: '#FFD700' } }}
                >
                    Volver a Personajes
                </Button>
            </Box>
        );
    }

    const status = getStatus(character.name);

    // Función para obtener una frase célebre al azar o una predeterminada
    const getDefaultPhrase = () => "Frase célebre no disponible.";

    const celebrePhrase =
        character.phrases && character.phrases.length > 0
            ? character.phrases[Math.floor(Math.random() * character.phrases.length)]
            : getDefaultPhrase();

    const detailImageUrl = character.id
        ? `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`
        : noImage;

    return (
        <Box
            sx={{
                p: 2,
                maxWidth: 1000,
                margin: 'auto',
                mt: 5,
            }}
        >
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/characters')}
                sx={{
                    mb: 3,
                    px: 3,
                    py: 1.2,
                    fontWeight: 'bold',
                    color: '#000000ff',
                    backgroundColor: '#ffdb0fff',
                    border: '1px solid #838181ff',
                    borderRadius: '15px',
                    boxShadow: '0px 5px 8px rgba(238, 255, 0, 0.75)',
                    transition: 'all 0.2s ease',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#fa0000e9',
                        color: '#ffffffff',
                        transform: 'scale(1.099)',
                        boxShadow: '0px 5px 8px #000',
                    },
                }}
            >
                Volver a Personajes
            </Button>


            <Paper
                elevation={10}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    p: 4,
                    border: '1px solid #787878a3',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(254, 253, 210, 0.46)',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                {/* Área de la Imagen */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 350 },
                        textAlign: 'center',
                        pr: { md: 4 },
                        mb: { xs: 3, md: 0 },
                        position: 'relative',
                        '&:hover .detail-image': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 10px 10px rgba(255, 255, 0, 0.62)'
                        }
                    }}
                >
                    <CardMedia
                        component="img"
                        image={detailImageUrl}
                        alt={`Retrato de ${character.name}`}
                        className="detail-image"
                        sx={{
                            width: 200,
                            height: 200,
                            objectFit: 'contain',
                            borderRadius: '15px',
                            border: '1px solid #949494ff',
                            padding: '10px',
                            margin: '30px auto',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                            '&:hover': {
                                transform: 'scale(1.1) rotate(5deg)',
                                rotate: '5deg',
                            }

                        }}
                    />
                </Box>

                {/* Área de Información */}
                <Box sx={{ flexGrow: 1, pt: { xs: 0, md: 2 } }}>

                    {/* Nombre Principal */}
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontFamily: 'Bangers, cursive',
                            color: '#FFCC00',
                            textShadow: '3px 3px 0px #000000ff',
                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                        }}
                    >
                        {character.name}
                    </Typography>

                    {/* Ocupación */}
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                        Ocupación: {character.occupation || "Desconocida"}
                    </Typography>

                    {/* Estado: (Vivo/Muerto) - Resaltado */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h5" sx={{ mr: 1, fontWeight: 'bold' }}>
                            Estado:
                        </Typography>
                        <Paper
                            sx={{
                                bgcolor: status.color,
                                color: 'white',
                                p: '4px 12px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
                            }}
                        >
                            {status.text}
                        </Paper>
                    </Box>

                    {/* Frase Célebre - Bloque de Cita */}
                    <Paper
                        elevation={2}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderLeft: '8px solid #E53935',
                            bgcolor: '#FFFDE7',
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="p"
                            sx={{ fontStyle: 'italic', color: '#333' }}
                        >
                            {`"${celebrePhrase}"`}
                        </Typography>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    );
}

export default CharacterDetail;