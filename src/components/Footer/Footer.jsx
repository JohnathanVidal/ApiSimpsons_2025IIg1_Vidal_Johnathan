import React from 'react'
import './Footer.css'
import Logo from '../../assets/Logo.webp'

const Footer = () => {
    return (
        <footer className="footer">
            <div class="col-md-3 mb-3 d-flex flex-column align-items-center justify-content-center">
                <h5 class="fw-bold">Síguenos</h5>
                <div class="d-flex gap-3 mt-2">
                    <a href="#" class="text-white fs-5"><i class="bi bi-facebook facebook"></i></a>
                    <a href="#" class="text-white fs-5"><i class="bi bi-instagram instagram"></i></a>
                    <a href="#" class="text-white fs-5"><i class="bi bi-twitter twitter"></i></a>
                    <a href="https://github.com/JohnathanVidal" class="text-white fs-5"><i
                        class="bi bi-github github"></i></a>
                    <a href="#" class="text-white fs-5"><i class="bi bi-linkedin linkedin"></i></a>
                </div>
            </div>


            <div className="footer-content">
                <img src={Logo} alt="logo de la API de los Simpsons" id="footer-logo" />

                <div className="informacion">
                    <h4>Contacto</h4>
                    <div className="contacto">
                        <p>Johnathan Vidal Espinosa</p>
                        <span>|</span>
                        <p>Celular: 3203203445</p>
                    </div>
                    <div className="contacto">
                        <p>Email: johnathanvidal1309@gmail.com</p>
                    </div>
                </div>
            </div>

            <p className="derechos">© 2025 API SIMPSONS. Todos los derechos reservados.</p>

        </footer>
    )
}

export default Footer
