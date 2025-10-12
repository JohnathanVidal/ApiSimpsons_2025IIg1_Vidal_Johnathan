import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import HomePage from './pages/HomePage/HomePage';
import CharactersPage from './pages/Characters/CharactersPage';
import CharacterDetail from './pages/Characters/CharacterDetail';
import LocationsPage from './pages/Locations/LocationsPage';
import EpisodesPage from './pages/Episodes/EpisodesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Header />
        <div id='container-body'>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/characters' element={<CharactersPage />} />
            <Route path='/personaje/:id' element={<CharacterDetail />} />
            <Route path='/locations' element={<LocationsPage />} />
            <Route path='/episodes' element={<EpisodesPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  )
}

export default App