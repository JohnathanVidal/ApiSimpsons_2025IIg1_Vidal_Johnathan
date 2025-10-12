import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.webp'
import Familia from '../../assets/Familia.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <header className="header">
            <img
                src={Logo}
                alt="Logo de la API de los Simpsons"
                id='logo'
                onClick={handleLogoClick} // Llama a la función al hacer clic
                style={{ cursor: 'pointer' }} // Agrega cursor: pointer para indicar que es clickeable
            />
            <img src={Familia} alt="Imagen de la familia Simpson" id='familia' />
        </header>
    )
}

export default Header