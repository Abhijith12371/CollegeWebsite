import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Events from './components/Events';
import Artists from './components/Artists';
import About from './components/About';
import Tickets from './components/Tickets';
import RegistrationForm from './components/Register';

function App() {
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Schedule  />
      <Events />
      <Artists />
      <RegistrationForm id="register"/>
      <Tickets />
    </div>
  );
}

export default App;
