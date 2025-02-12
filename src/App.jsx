import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import EpisodesPage from './components/Episodes';
import CharactersPage from './components/Characters';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/episodes" element={<EpisodesPage />} />
                    <Route path="/characters" element={<CharactersPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;