import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DataDemo from './components/DataDemo';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navigation />
            <Hero />
            <Skills />
            <Experience />
            <Achievements />
            <Projects />
            <DataDemo />
            <Contact />
        </div>
    );
}

export default App;
