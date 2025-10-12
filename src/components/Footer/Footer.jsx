import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './Footer.css';
import Logo from '../../assets/Logo.webp';

const Footer = () => {
    return (
        <footer className="footer">
            <Box
                className="social-section"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 1, // Padding suave para esta sección
                    mb: 2, // Margen inferior
                }}
            >
                <Typography
                    variant="h6"
                    component="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: '#ffd900ff',
                        textShadow: '2px 1px 0px #000',
                        fontFamily: 'Bangers, cursive',
                    }}
                >
                    ¡Síguenos en las Redes!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <a href="#" className="social-link"><FacebookIcon sx={{ color: '#1877F2' }} /></a>
                    <a href="#" className="social-link"><InstagramIcon sx={{ color: '#E4405F' }} /></a>
                    <a href="#" className="social-link"><TwitterIcon sx={{ color: '#1DA1F2' }} /></a>
                    <a href="https://github.com/JohnathanVidal" className="social-link"><GitHubIcon sx={{ color: 'black' }} /></a>
                    <a href="#" className="social-link"><LinkedInIcon sx={{ color: '#0A66C2' }} /></a>
                </Box>
            </Box>

            <div className="footer-content">
                <img src={Logo} alt="logo de la API de los Simpsons" id="footer-logo" />

                <div className="informacion">
                    <h4>Contacto 1</h4>
                    <div className="contacto">
                        <p>Johnathan Vidal</p>
                        <span>|</span>
                        <p>Celular: 3203203445</p>
                    </div>
                    <div className="contacto">
                        <p>Email: johnathanvidal1309@gmail.com</p>
                    </div>
                </div>

                <div className="informacion">
                    <h4>Contacto 2</h4>
                    <div className="contacto">
                        <p>Daniel Rueda</p>
                        <span>|</span>
                        <p>Celular: 3124860459</p>
                    </div>
                    <div className="contacto">
                        <p>Email: ingedanieluseche@gmail.com</p>
                    </div>
                </div>
            </div>

            <p className="derechos">© 2025 API SIMPSONS. Todos los derechos reservados.</p>

        </footer>
    )
}

export default Footer;