import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import noImage from '../../assets/noImage.jpg';

const LocationCard = ({ data }) => {
    const imageUrl = data.id
        ? `https://cdn.thesimpsonsapi.com/1280/location/${data.id}.webp`
        : noImage;

    const hoverShadow = '0px 5px 8px rgba(0, 112, 192, 0.82)';

    const handleCardClick = () => {
        console.log(`Clic en el lugar: ${data.name} (ID: ${data.id})`);
    };

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
                    backgroundColor: 'rgba(189, 236, 255, 0.46)',
                    boxShadow: hoverShadow,
                }
            }}
        >
            <CardActionArea>
                {/* imagen */}
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
                        alt={`Imagen de ${data.name}`}
                        // Ajustamos el tamaño de la imagen dentro de la Card
                        sx={{
                            width: '100%',
                            maxHeight: 200,
                            objectFit: 'cover',
                            borderRadius: '15px',
                            border: '1px solid #ccc',
                            transition: 'all 0.18s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
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
                            color: '#ffd80f',
                            textShadow: '2px 1px 0px #ff0f0fff',
                            fontFamily: 'Bangers, cursive',
                            textAlign: 'center'
                        }}
                    >
                        {data.name}
                    </Typography>

                    {/* Ciudad */}
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        Ciudad: {data.town || 'Desconocida'}
                    </Typography>

                    {/* Uso */}
                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                            fontStyle: 'italic',
                            textAlign: 'center',
                            marginTop: '10px'
                        }}
                    >
                        Uso: {data.use || 'N/A'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default LocationCard;