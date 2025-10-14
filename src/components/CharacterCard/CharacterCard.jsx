import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import noImage from '../../assets/noImage.jpg';

const CharacterCard = ({ data }) => {

    const imageUrl = data.id
        ? `https://cdn.thesimpsonsapi.com/500/character/${data.id}.webp`
        : noImage;
    const navigate = useNavigate();
    const characterId = data.id || encodeURIComponent(data.name.toLowerCase().replace(/\s/g, '-'));
    const handleCardClick = () => {
        navigate(`/personaje/${characterId}`);
    };
    // Sombra para hover
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

                '&:hover': {
                    transform: 'translateY(-8px)',
                    backgroundColor: 'rgba(254, 253, 210, 0.46)',
                    boxShadow: hoverShadow,
                }
            }}
        >
            <CardActionArea>
                {/* Contenedor de la Imagen */}
                <Box sx={{
                    padding: 2,
                    height: 250,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={`Retrato de ${data.name}`}
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: '15px',
                            border: '1px solid #ccc',
                            transition: 'all 0.2s ease-in-out',

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

                    {/* Frase Célebre */}
                    {/* <Typography variant="body2" sx={{ color: '#E53935', fontStyle: 'italic', textAlign: 'center' }}>
                        {data.quote || 'Frase Célebre: "Aquí iría la frase célebre"'}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CharacterCard;