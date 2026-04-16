import React, { Suspense, useMemo } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PerformanceIndicator from './components/PerformanceIndicator';
import { shouldDisableHeavyEffects } from './utils/performanceOptimizer';
import './App.css';

const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'));

const App = () => {
  const showParticles = useMemo(() => !shouldDisableHeavyEffects(), []);

  return (
    <div className="App">
      {showParticles && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}
      <PerformanceIndicator />
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
