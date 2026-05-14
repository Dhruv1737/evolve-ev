import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

var NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'Vidyut 26', path: '/vidyut-26' },
  { label: 'Founders',  path: '/founders' },
  { label: 'About',     path: '/about' },
];

export default function Navbar() {
  var location   = useLocation();
  var scrolled   = useState(false);
  var isScrolled     = scrolled[0];
  var setScrolled    = scrolled[1];

  var menuState  = useState(false);
  var menuOpen       = menuState[0];
  var setMenuOpen    = menuState[1];

  var indicatorRef = useRef(null);
  var linkRefs     = useRef([]);

  // ── Scroll detection ──
  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  // ── Close menu on route change ──
  useEffect(function() {
    setMenuOpen(false);
  }, [location.pathname]);

  // ── Lock body scroll ──
  useEffect(function() {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return function() { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Slide indicator ──
  useEffect(function() {
    var activeIdx = NAV_LINKS.findIndex(function(l) {
      return l.path === location.pathname;
    });
    var el        = linkRefs.current[activeIdx];
    var indicator = indicatorRef.current;
    if (el && indicator) {
      indicator.style.left  = el.offsetLeft + 'px';
      indicator.style.width = el.offsetWidth + 'px';
    }
  }, [location.pathname]);

  return (
    <>
      {/* ── Main nav ── */}
      <nav style={{
        position:        'fixed',
        top: 0, left: 0, right: 0,
        zIndex:          8000,
        padding:         isScrolled ? '14px 0' : '22px 0',
        background:      isScrolled
          ? 'rgba(12,12,14,0.88)'
          : 'transparent',
        backdropFilter:  isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        transition:      'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>

        {/* Glass reflection line */}
        <div style={{
          position:   'absolute',
          bottom: 0, left: 0, right: 0,
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(184,115,51,0.25) 30%, rgba(255,255,255,0.06) 50%, rgba(184,115,51,0.25) 70%, transparent 100%)',
          opacity:    isScrolled ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }} />

        <div className="container" style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{
            display:     'flex',
            alignItems:  'center',
            gap:         14,
            flexShrink:  0,
          }}>
            <img
              src="https://evolve.nitb.in/Evolve_Logo.png"
              alt="EVOLVE"
              style={{
                height:     isScrolled ? 32 : 38,
                width:      'auto',
                transition: 'height 0.4s ease',
                filter:     'brightness(1.1)',
              }}
            />
            
          </Link>

          {/* ── Desktop links ── */}
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         4,
            position:    'relative',
          }}
            className="desktop-nav"
          >
            {/* Sliding indicator */}
            <div ref={indicatorRef} style={{
              position:   'absolute',
              bottom:     -4,
              height:     1,
              background: 'linear-gradient(90deg, transparent, var(--copper), transparent)',
              transition: 'left 0.4s cubic-bezier(0.25,0.46,0.45,0.94), width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
              opacity:    0.7,
            }} />

            {NAV_LINKS.map(function(link, i) {
              var isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={function(el) { linkRefs.current[i] = el; }}
                  style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.65rem',
                    fontWeight:    600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color:         isActive ? 'var(--pearl)' : 'var(--pearl-muted)',
                    padding:       '8px 20px',
                    transition:    'color 0.3s ease',
                    position:      'relative',
                  }}
                  onMouseEnter={function(e) {
                    if (!isActive) e.currentTarget.style.color = 'var(--pearl-dim)';
                  }}
                  onMouseLeave={function(e) {
                    if (!isActive) e.currentTarget.style.color = 'var(--pearl-muted)';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* CTA */}
            <Link to="/vidyut-26" style={{ marginLeft: 20 }}>
              <button className="btn-primary" style={{
                padding:  '10px 24px',
                fontSize: '0.6rem',
              }}>
                <span>Register</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={function() { setMenuOpen(function(o) { return !o; }); }}
            className="hamburger"
            style={{
              display:    'none',
              flexDirection: 'column',
              gap:        6,
              background: 'none',
              border:     'none',
              cursor:     'none',
              padding:    8,
              zIndex:     9100,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(function(i) {
              return (
                <span key={i} style={{
                  display:         'block',
                  width:           i === 1 ? (menuOpen ? 16 : 24) : 24,
                  height:          1,
                  background:      'var(--pearl-dim)',
                  transition:      'all 0.35s ease',
                  transformOrigin: 'center',
                  transform:
                    i === 0 && menuOpen ? 'translateY(7px) rotate(45deg)' :
                    i === 2 && menuOpen ? 'translateY(-7px) rotate(-45deg)' :
                    i === 1 && menuOpen ? 'scaleX(0) translateX(8px)' : 'none',
                }} />
              );
            })}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div style={{
        position:      'fixed',
        inset:         0,
        zIndex:        7500,
        background:    'rgba(10,10,11,0.98)',
        backdropFilter:'blur(24px)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        justifyContent:'center',
        gap:           4,
        opacity:        menuOpen ? 1 : 0,
        pointerEvents:  menuOpen ? 'all' : 'none',
        transition:    'opacity 0.4s ease',
      }}>

        {/* Corner accents */}
        {['tl','tr','bl','br'].map(function(c) {
          return (
            <div key={c} style={{
              position: 'absolute',
              top:    c.startsWith('t') ? 32 : 'auto',
              bottom: c.startsWith('b') ? 32 : 'auto',
              left:   c.endsWith('l')   ? 32 : 'auto',
              right:  c.endsWith('r')   ? 32 : 'auto',
              width: 28, height: 28,
              borderTop:    c.startsWith('t') ? '1px solid rgba(184,115,51,0.25)' : 'none',
              borderBottom: c.startsWith('b') ? '1px solid rgba(184,115,51,0.25)' : 'none',
              borderLeft:   c.endsWith('l')   ? '1px solid rgba(184,115,51,0.25)' : 'none',
              borderRight:  c.endsWith('r')   ? '1px solid rgba(184,115,51,0.25)' : 'none',
            }} />
          );
        })}

        <div style={{
          fontFamily:    'var(--font-wide)',
          fontSize:      '0.55rem',
          fontWeight:    600,
          letterSpacing: '0.35em',
          color:         'var(--pearl-ghost)',
          textTransform: 'uppercase',
          marginBottom:  40,
        }}>
          Navigation
        </div>

        {NAV_LINKS.map(function(link, i) {
          var isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={function() { setMenuOpen(false); }}
              style={{
                fontFamily:    'var(--font-serif)',
                fontSize:      'clamp(2.8rem, 8vw, 4.5rem)',
                fontWeight:    300,
                fontStyle:     'italic',
                color:         isActive ? 'var(--copper-light)' : 'var(--pearl-dim)',
                letterSpacing: '0.02em',
                lineHeight:    1.2,
                opacity:       menuOpen ? 1 : 0,
                transform:     menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition:    'opacity 0.4s ease ' + (i * 0.06) + 's, transform 0.4s ease ' + (i * 0.06) + 's, color 0.3s ease',
              }}
              onMouseEnter={function(e) {
                if (!isActive) e.currentTarget.style.color = 'var(--pearl)';
              }}
              onMouseLeave={function(e) {
                if (!isActive) e.currentTarget.style.color = 'var(--pearl-dim)';
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          to="/vidyut-26"
          onClick={function() { setMenuOpen(false); }}
          style={{
            marginTop:  44,
            opacity:    menuOpen ? 1 : 0,
            transform:  menuOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease 0.28s, transform 0.4s ease 0.28s',
          }}
        >
          <button className="btn-primary">
            <span>Register for Vidyut 26</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}