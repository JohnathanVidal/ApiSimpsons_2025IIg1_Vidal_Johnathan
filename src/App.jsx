import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'

// Asegúrate de que las rutas de importación coincidan con tu estructura de carpetas
// (Asumo que tienes una carpeta 'pages/Characters' con los archivos dentro)
import CharactersPage from './pages/Characters/CharactersPage';
import CharacterDetail from './pages/Characters/CharacterDetail'; // ✅ Importación correcta
import LocationsPage from './pages/Locations/LocationsPage';
import EpisodesPage from './pages/Episodes/EpisodesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Header />
      <div id='container-body'>
        <NavBar />
        <Routes>
          <Route path='/characters' element={<CharactersPage />} />
          <Route path='/personaje/:id' element={<CharacterDetail />} /> 
          <Route path='/locations' element={<LocationsPage />} />
          <Route path='/episodes' element={<EpisodesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App