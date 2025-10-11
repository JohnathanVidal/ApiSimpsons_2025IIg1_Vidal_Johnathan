import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.webp'
import Familia from '../../assets/Familia.png'

const Header = () => {
    return (
        <header className="header">
            <img src={Logo} alt="Logo de la API de los Simpsons" id='logo' />
            <img src={Familia} alt="Imagen de la familia Simpson" id='familia' />
        </header>
    )
}

export default Header
