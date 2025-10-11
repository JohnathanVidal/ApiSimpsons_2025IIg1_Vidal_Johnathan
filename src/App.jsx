import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'


const App = () => {
  return (
    <>
      <Header />
      <div id='centro'>
      <Navbar />
      {/* Contenido principal que cambia según la ruta */}
      <main style={{ minHeight: '80%', minWidth: '80%', background: '#ff0909ff' }}>
        main
      </main>
      </div>
      <Footer />
    </>
  )
}

export default App
