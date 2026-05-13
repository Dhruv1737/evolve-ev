import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'Vidyut-26', path: '/vidyut-26' },
  { label: 'Founders',  path: '/founders' },
  { label: 'About',     path: '/about' },
];

export default function Navbar() {
  const location  = useLocation();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(0);
  const indicatorRef = useRef(null);
  const navLinksRef  = useRef([]);

  // ── Shrink navbar on scroll ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Track active link ──
  useEffect(() => {
    const idx = NAV_LINKS.findIndex(l => l.path === location.pathname);
    setActiveIndex(idx >= 0 ? idx : 0);
    setMenuOpen(false);
  }, [location.pathname]);

  // ── Move sliding indicator under active link ──
  useEffect(() => {
    const el = navLinksRef.current[activeIndex];
    const indicator = indicatorRef.current;
    if (el && indicator) {
      indicator.style.left  = el.offsetLeft + 'px';
      indicator.style.width = el.offsetWidth + 'px';
    }
  }, [activeIndex]);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        padding: scrolled ? '10px 0' : '18px 0',
        background: scrolled
          ? 'rgba(5, 10, 5, 0.92)'
          : 'rgba(5, 10, 5, 0.4)',
        backdropFilter:         'blur(20px)',
        WebkitBackdropFilter:   'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(46,204,55,0.15)'
          : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow: scrolled
          ? '0 4px 40px rgba(0,0,0,0.6)'
          : 'none',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              {/* Glow ring behind logo */}
              <div style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46,204,55,0.15) 0%, transparent 70%)',
                animation: 'pulse-glow 3s ease infinite',
              }} />
              <img
                src="https://evolve.nitb.in/Evolve_Logo.png"
                alt="EVOLVE"
                style={{
                  height: scrolled ? 38 : 46,
                  width: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'height 0.4s ease',
                  filter: 'drop-shadow(0 0 8px rgba(46,204,55,0.4))',
                }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: scrolled ? '1.4rem' : '1.7rem',
                color: 'var(--green-400)',
                letterSpacing: '0.12em',
                lineHeight: 1,
                transition: 'font-size 0.4s ease',
                textShadow: '0 0 20px rgba(46,204,55,0.4)',
              }}>
                EVOLVE
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.25em',
                marginTop: 2,
              }}>
                EV DAY — VIDYUT 26
              </div>
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            position: 'relative',
          }}
            className="desktop-nav"
          >
            {/* Sliding underline indicator */}
            <div ref={indicatorRef} style={{
              position: 'absolute',
              bottom: -4,
              height: 1,
              background: 'linear-gradient(90deg, transparent, var(--green-400), transparent)',
              transition: 'left 0.4s cubic-bezier(0.25,0.46,0.45,0.94), width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
              boxShadow: '0 0 8px var(--green-400)',
            }} />

            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={el => navLinksRef.current[i] = el}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isActive
                      ? 'var(--green-400)'
                      : 'var(--text-secondary)',
                    padding: '8px 18px',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    textShadow: isActive
                      ? '0 0 12px rgba(46,204,55,0.5)'
                      : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--green-300)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* CTA Button */}
            <Link to="/vidyut-26" style={{ marginLeft: 16 }}>
              <button className="btn-glow" style={{ padding: '10px 24px', fontSize: '0.65rem' }}>
                <span>Register Now</span>
              </button>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: 8,
              zIndex: 9100,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: i === 1 && menuOpen ? 20 : 26,
                height: 2,
                background: 'var(--green-400)',
                borderRadius: 2,
                transformOrigin: 'center',
                transition: 'all 0.3s ease',
                transform:
                  i === 0 && menuOpen ? 'translateY(7px) rotate(45deg)' :
                  i === 2 && menuOpen ? 'translateY(-7px) rotate(-45deg)' :
                  i === 1 && menuOpen ? 'scaleX(0)' : 'none',
                boxShadow: '0 0 6px rgba(46,204,55,0.4)',
                marginLeft: i === 1 ? 'auto' : 0,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8500,
        background: 'rgba(5,10,5,0.97)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.35s ease',
      }}>
        {/* Decorative corner lines */}
        {['top-left','top-right','bottom-left','bottom-right'].map(corner => (
          <div key={corner} style={{
            position: 'absolute',
            [corner.includes('top')    ? 'top'    : 'bottom']: 32,
            [corner.includes('left')   ? 'left'   : 'right']:  32,
            width: 40, height: 40,
            borderTop:    corner.includes('top')    ? '1px solid rgba(46,204,55,0.3)' : 'none',
            borderBottom: corner.includes('bottom') ? '1px solid rgba(46,204,55,0.3)' : 'none',
            borderLeft:   corner.includes('left')   ? '1px solid rgba(46,204,55,0.3)' : 'none',
            borderRight:  corner.includes('right')  ? '1px solid rgba(46,204,55,0.3)' : 'none',
          }} />
        ))}

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.3em',
          marginBottom: 32,
        }}>
          NAVIGATION
        </div>

        {NAV_LINKS.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                color: isActive ? 'var(--green-400)' : 'var(--text-secondary)',
                letterSpacing: '0.08em',
                textShadow: isActive ? '0 0 30px rgba(46,204,55,0.5)' : 'none',
                transition: 'all 0.25s ease',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: menuOpen ? `${i * 0.07}s` : '0s',
                lineHeight: 1.2,
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          to="/vidyut-26"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 32,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.3s ease',
            transitionDelay: menuOpen ? '0.3s' : '0s',
          }}
        >
          <button className="btn-glow">
            <span>Register Now</span>
          </button>
        </Link>
      </div>

      {/* ── Responsive styles injected ── */}
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