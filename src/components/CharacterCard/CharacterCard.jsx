import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import noImage from '../../assets/noImage.jpg'; // Imagen por defecto si falta la imagen

const CharacterCard = ({ data }) => {

    // FIX IMAGEN: Construye el URL completo de la CDN usando el ID del personaje
    // Esta es la forma más fiable: Base + Tamaño + Ruta + ID + Extensión.
    const imageUrl = data.id
        ? `https://cdn.thesimpsonsapi.com/500/character/${data.id}.webp`
        : noImage;
    // 1. Lógica de Navegación
    const navigate = useNavigate();
    // Crea un ID seguro para la URL. Utilizamos el ID si existe, si no, el nombre normalizado.
    const characterId = data.id || encodeURIComponent(data.name.toLowerCase().replace(/\s/g, '-'));
    const handleCardClick = () => {
        // Redirigir a la vista de detalle
        // Asegúrate de que la ruta aquí coincida con la ruta definida en tu App.jsx (e.g., /personajes/:id)
        navigate(`/personaje/${characterId}`);
    };
    // 2. Estilos y Sombra de Hover Requerida
    const hoverShadow = '0px 5px 8px rgba(182, 189, 45, 0.82)';
    return (
        <Card
            onClick={handleCardClick}
            sx={{
                width: 345,
                cursor: 'pointer',
                backgroundColor: '#ffffffff',
                border: '1px solid #ccc',
                borderRadius: '15px',
                boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.18s ease-in-out',
                overflow: 'visible',
                // Estilo de la Card en hover: Levantamiento y Sombra
                '&:hover': {
                    transform: 'translateY(-8px)',
                    backgroundColor: 'rgba(254, 253, 210, 0.46)',
                    boxShadow: hoverShadow,
                }
            }}
        >
            <CardActionArea>
                {/* Contenedor para la imagen de perfil */}
                <Box sx={{
                    padding: 2,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CardMedia
                        component="img"
                        // USO DEL NUEVO imageUrl CON ID
                        image={imageUrl}
                        alt={`Retrato de ${data.name}`}
                        sx={{
                            // Propiedades para el "cuadro de perfil"
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: '15px',
                            border: '1px solid #ccc',
                            transition: 'all 0.2s ease-in-out',

                            // Estilo de la Imagen en hover: Escala, Rotación y Sombra
                            '&:hover': {
                                transform: 'scale(1.2) rotate(5deg)',
                                boxShadow: hoverShadow,
                                zIndex: 10,
                            }
                        }}
                    />
                </Box>

                {/* Contenido de la Tarjeta */}
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            color: 'black',
                            textShadow: '1px 1px 0px white',
                            fontFamily: 'Bangers, cursive',
                            textAlign: 'center'
                        }}
                    >
                        {data.name}
                    </Typography>

                    {/* Ocupación */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        {data.occupation}
                    </Typography>

                    {/* Frase Célebre - Mantenemos comentada la frase célebre aquí */}
                    {/* <Typography variant="body2" sx={{ color: '#E53935', fontStyle: 'italic', textAlign: 'center' }}>
                        {data.quote || 'Frase Célebre: "Aquí iría la frase célebre"'}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CharacterCard;