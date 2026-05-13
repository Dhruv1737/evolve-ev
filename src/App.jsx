import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './styles/globals.css';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home     from './pages/Home';
import Vidyut26 from './pages/Vidyut26';
import Founders from './pages/Founders';
import About    from './pages/About';

// ── Floating ambient particles ──
function Particles() {
  const particles = React.useRef(
    [...Array(22)].map(() => ({
      size:  Math.random() * 3 + 1,
      left:  Math.random() * 100,
      top:   Math.random() * 100,
      alpha: Math.random() * 0.45 + 0.08,
      dur:   Math.random() * 9 + 5,
      delay: Math.random() * 7,
    }))
  ).current;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0, overflow: 'hidden'
    }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width:  p.size + 'px',
          height: p.size + 'px',
          background: `rgba(46, 204, 55, ${p.alpha})`,
          borderRadius: '50%',
          left:  p.left + '%',
          top:   p.top  + '%',
          animation: `float ${p.dur}s ease-in-out infinite`,
          animationDelay: p.delay + 's',
          boxShadow: '0 0 8px rgba(46,204,55,0.5)',
        }} />
      ))}
    </div>
  );
}

// ── Page transition wrapper ──
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setFading(true);
      const t = setTimeout(() => {
        setDisplayLocation(location);
        setFading(false);
        window.scrollTo(0, 0);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
    <main style={{
      position: 'relative',
      zIndex: 1,
      opacity:   fading ? 0 : 1,
      transform: fading ? 'translateY(12px)' : 'translateY(0)',
      transition: 'opacity 0.28s ease, transform 0.28s ease',
      minHeight: '100vh',
    }}>
      <Routes location={displayLocation}>
        <Route path="/"           element={<Home />} />
        <Route path="/vidyut-26"  element={<Vidyut26 />} />
        <Route path="/founders"   element={<Founders />} />
        <Route path="/about"      element={<About />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      {/* Fixed background layers */}
      <div className="noise" />
      <div className="grid-bg" />
      <Particles />

      {/* Cursor */}
      <CustomCursor />

      {/* Layout */}
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}