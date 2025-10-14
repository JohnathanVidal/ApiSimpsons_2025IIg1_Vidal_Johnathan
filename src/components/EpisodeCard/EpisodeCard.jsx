import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Chip } from '@mui/material';
import noImage from '../../assets/noImage.jpg';

const EpisodeCard = ({ data }) => {
    const imageUrl = data.id
        ? `https://cdn.thesimpsonsapi.com/1280/episode/${data.id}.webp`
        : noImage;
    
    const hoverShadow = '0px 5px 8px rgba(255, 217, 15, 0.82)';

    const handleCardClick = () => {
        console.log(`Clic en el episodio: ${data.name || 'Sin nombre'} (ID: ${data.id || 'N/A'})`);
    };

    const formattedAirdate = data.airdate ? new Date(data.airdate).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : null;

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                maxWidth: 345, 
                cursor: 'pointer',
                backgroundColor: '#ffffffff',
                border: '1px solid #ccc',
                borderRadius: '15px',
                boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.18s ease-in-out',
                overflow: 'visible',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    backgroundColor: 'rgba(255, 249, 196, 0.46)',
                    boxShadow: hoverShadow,
                }
            }}
        >
            <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

                {/* Imagen del episodio */}
                <Box sx={{
                    padding: 2,
                    height: 250,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={`Imagen del episodio ${data.name || 'Sin nombre'}`}
                        sx={{
                            width: '100%',
                            maxHeight: 200,
                            objectFit: 'cover',
                            borderRadius: '15px',
                            border: '1px solid #ccc',
                            transition: 'all 0.18s ease-in-out',
                        }}
                        onError={(e) => {
                            // se carga no Image por si la principal falla
                            e.currentTarget.src = noImage;
                        }}
                    />
                </Box>

                {/* Contenido del episodio */}
                <CardContent sx={{
                    padding: '16px 20px',
                    textAlign: 'center',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    {/* Título del episodio */}
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            mb: 1,
                            color: '#333',
                            fontFamily: 'Bangers, cursive',
                        }}
                    >
                        {data.name || 'Episodio sin nombre'}
                    </Typography>

                    {/* Temporada y episodio */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <Chip
                            label={`T${data.season || '?'}`}
                            size="small"
                            sx={{
                                backgroundColor: '#FFD90F',
                                color: '#000',
                                fontWeight: 'bold'
                            }}
                        />
                        <Chip
                            label={`Ep ${data.episode_number || '?'}`}
                            size="small"
                            sx={{
                                backgroundColor: '#E53935',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>

                    {/* Descripción del episodio */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 1, // Margen inferior para separar del pie de página
                        }}
                    >
                        {data.synopsis || 'Un episodio memorable de Los Simpson'}
                    </Typography>

                    {/* Fecha de emisión */}
                    {formattedAirdate && ( // Usamos la variable formateada
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#999',
                                fontSize: '0.8rem',
                                mt: 'auto', 
                            }}
                        >
                            Emitido: {formattedAirdate}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EpisodeCard;