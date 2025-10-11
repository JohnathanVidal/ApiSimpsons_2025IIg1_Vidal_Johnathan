import React from 'react'
import './Footer.css'
import Logo from '../../assets/Logo.webp'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={Logo} alt="logo de la API de los Simpsons" id="footer-logo" />

                <div className="footer-info">
                    <h4>Contacto</h4>
                    <div className="contacto">
                        <p>Johnathan Vidal Espinosa</p>
                        <span>|</span>
                        <p>Celular: 3203203445</p>
                    </div>
                </div>
            </div>

            <p className="derechos">© 2025 API SIMPSONS. Todos los derechos reservados.</p>
        </footer>
    )
}

export default Footer
