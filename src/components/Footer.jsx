import React, { useState } from 'react';

var NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Vidyut 26', href: '/vidyut-26' },
  { label: 'Founders',  href: '/founders' },
  { label: 'About',      href: '/about' },
];

var SOCIALS = [
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/company/evolve-nitb',
    icon:  function() {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      );
    },
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/evolve.nitb',
    icon:  function() {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      );
    },
  },
  {
    label: 'X',
    href:  'https://x.com/evolve_nitb',
    icon:  function() {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    },
  },
];

var CONTACTS = [
  {
    label: 'Email',
    value: 'evolve@nitb.in',
    href:  'mailto:evolve@nitb.in',
  },
  {
    label: 'Location',
    value: 'NIT Bhopal, Madhya Pradesh, India',
    href:  null,
  },
  {
    label: 'Phone',
    value: '+91 98765 43210',
    href:  'tel:+919876543210',
  },
];

function SocialButton(props) {
  var label      = props.label;
  var href       = props.href;
  var Icon       = props.icon;
  var [isHov, setHov] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      onMouseEnter={function() { setHov(true); }}
      onMouseLeave={function() { setHov(false); }}
      style={{
        width:          40,
        height:         40,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        border:         isHov
          ? '1px solid rgba(184,115,51,0.45)'
          : 'var(--border)',
        color:          isHov ? 'var(--copper-light)' : 'var(--pearl-ghost)',
        background:     isHov ? 'rgba(184,115,51,0.05)' : 'transparent',
        transition:     'all 0.3s ease',
      }}
    >
      <Icon />
    </a>
  );
}

function ContactItem(props) {
  var label = props.label;
  var value = props.value;
  var href  = props.href;
  var [isHov, setHov] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{
        fontFamily:    'var(--font-wide)',
        fontSize:      '0.5rem',
        fontWeight:    600,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color:         'var(--pearl-ghost)',
      }}>
        {label}
      </div>
      {href ? (
        <a
          href={href}
          onMouseEnter={function() { setHov(true); }}
          onMouseLeave={function() { setHov(false); }}
          style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '0.85rem',
            fontWeight:  300,
            color:       isHov ? 'var(--copper-light)' : 'var(--pearl-muted)',
            transition:  'color 0.3s ease',
            lineHeight:  1.5,
          }}
        >
          {value}
        </a>
      ) : (
        <span style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '0.85rem',
          fontWeight:  300,
          color:       'var(--pearl-muted)',
          lineHeight:  1.5,
        }}>
          {value}
        </span>
      )}
    </div>
  );
}

function NavLink(props) {
  var label = props.label;
  var href  = props.href;
  var [isHov, setHov] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={function() { setHov(true); }}
      onMouseLeave={function() { setHov(false); }}
      style={{
        fontFamily:  'var(--font-body)',
        fontSize:    '0.88rem',
        fontWeight:  300,
        color:       isHov ? 'var(--copper-light)' : 'var(--pearl-muted)',
        display:     'flex',
        alignItems:  'center',
        gap:         isHov ? 12 : 8,
        transition:  'all 0.3s ease',
      }}
    >
      <div style={{
        width:      isHov ? 20 : 12,
        height:     1,
        background: isHov ? 'var(--copper)' : 'var(--pearl-ghost)',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }} />
      {label}
    </a>
  );
}

export default function Footer() {
  var [email, setEmail] = useState('');
  var [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <footer style={{
      position:   'relative',
      zIndex:     1,
      background: 'var(--charcoal-2)',
      borderTop:  'var(--border)',
    }}>

      {/* Top copper reflection */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       '8%',
        right:      '8%',
        height:     1,
        background: 'linear-gradient(90deg, transparent, rgba(184,115,51,0.35), rgba(255,255,255,0.06), rgba(184,115,51,0.35), transparent)',
      }} />

      {/* ── Main grid ── */}
      <div className="container" style={{ paddingTop: 80, paddingBottom: 0 }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap:                 64,
        }}
          className="footer-main"
        >

          {/* ── Col 1: Brand ── */}
          <div>
            <div style={{
              display:     'flex',
              alignItems:  'center',
              gap:         14,
              marginBottom: 24,
            }}>
              <img
                src="https://evolve.nitb.in/Evolve_Logo.png"
                alt="EVOLVE"
                style={{
                  height: 36,
                  filter: 'brightness(1.05)',
                }}
              />
              <div>
                <div style={{
                  fontFamily:    'var(--font-serif)',
                  fontSize:      '1.2rem',
                  fontWeight:    400,
                  color:         'var(--pearl)',
                  letterSpacing: '0.06em',
                  lineHeight:    1,
                }}>
                  Evolve
                </div>
                <div style={{
                  fontFamily:    'var(--font-wide)',
                  fontSize:      '0.45rem',
                  fontWeight:    600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color:         'var(--copper)',
                  marginTop:     3,
                }}>
                  Vidyut 26
                </div>
              </div>
            </div>

            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '0.85rem',
              fontWeight:   300,
              color:        'var(--pearl-muted)',
              lineHeight:   1.8,
              maxWidth:     280,
              marginBottom: 28,
            }}>
              India's most credible student-led electric vehicle platform.
              Building the engineers who will power the next billion
              kilometres of clean mobility.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
              {SOCIALS.map(function(s) {
                return (
                  <SocialButton
                    key={s.label}
                    label={s.label}
                    href={s.href}
                    icon={s.icon}
                  />
                );
              })}
            </div>

            {/* Newsletter */}
            <div>
              <div style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.52rem',
                fontWeight:    600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         'var(--pearl-ghost)',
                marginBottom:  14,
              }}>
                Stay Updated
              </div>

              {subscribed ? (
                <div style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         10,
                  fontFamily:  'var(--font-serif)',
                  fontSize:    '0.95rem',
                  fontStyle:   'italic',
                  color:       'var(--copper-light)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  You are on the list.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  style={{ display: 'flex', gap: 0, maxWidth: 300 }}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={function(e) { setEmail(e.target.value); }}
                    style={{
                      flex:        1,
                      padding:     '10px 14px',
                      background:  'var(--charcoal-3)',
                      border:      'var(--border)',
                      borderRight: 'none',
                      color:       'var(--pearl)',
                      fontFamily:  'var(--font-body)',
                      fontSize:    '0.82rem',
                      fontWeight:  300,
                      outline:     'none',
                      cursor:      'text',
                      transition:  'border-color 0.3s ease',
                    }}
                    onFocus={function(e) {
                      e.target.style.borderColor = 'rgba(184,115,51,0.35)';
                    }}
                    onBlur={function(e) {
                      e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding:       '10px 16px',
                      background:    'var(--copper)',
                      border:        'none',
                      color:         'var(--black)',
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.55rem',
                      fontWeight:    700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                      transition:    'background 0.3s ease',
                    }}
                    onMouseEnter={function(e) {
                      e.currentTarget.style.background = 'var(--copper-light)';
                    }}
                    onMouseLeave={function(e) {
                      e.currentTarget.style.background = 'var(--copper)';
                    }}
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.52rem',
              fontWeight:    600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--pearl-ghost)',
              marginBottom:  28,
              paddingBottom: 16,
              borderBottom:  'var(--border)',
            }}>
              Navigation
            </div>
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           16,
            }}>
              {NAV_LINKS.map(function(link) {
                return (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    href={link.href}
                  />
                );
              })}
            </div>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.52rem',
              fontWeight:    600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--pearl-ghost)',
              marginBottom:  28,
              paddingBottom: 16,
              borderBottom:  'var(--border)',
            }}>
              Contact
            </div>
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           20,
            }}>
              {CONTACTS.map(function(c) {
                return (
                  <ContactItem
                    key={c.label}
                    label={c.label}
                    value={c.value}
                    href={c.href}
                  />
                );
              })}
            </div>
          </div>

          {/* ── Col 4: Map ── */}
          <div>
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.52rem',
              fontWeight:    600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color:         'var(--pearl-ghost)',
              marginBottom:  28,
              paddingBottom: 16,
              borderBottom:  'var(--border)',
            }}>
              Find Us
            </div>

            <div style={{
              width:         '100%',
              height:        200,
              overflow:      'hidden',
              border:        'var(--border)',
              marginBottom: 20,
              position:      'relative',
            }}>
              <iframe
                title="EVOLVE — NIT Bhopal"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.3!2d77.404!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c983e40001%3A0x2e9a6e2b5ae6e3b!2sNIT%20Bhopal!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{
                  border:  0,
                  filter:  'grayscale(100%) brightness(0.4) contrast(1.2)',
                  display: 'block',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div style={{
                position:       'absolute',
                inset:          0,
                background:     'rgba(184,115,51,0.06)',
                pointerEvents:  'none',
                mixBlendMode:   'multiply',
              }} />
            </div>

            <div style={{
              fontFamily:  'var(--font-body)',
              fontSize:    '0.78rem',
              fontWeight:  300,
              color:       'var(--pearl-muted)',
              lineHeight:  1.7,
            }}>
              Maulana Azad National Institute of Technology,<br />
              Bhopal, Madhya Pradesh — 462003
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          marginTop:      56,
          paddingTop:     24,
          paddingBottom:  32,
          borderTop:      'var(--border)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:             20,
        }}>

          {/* Left */}
          <div style={{
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.52rem',
            fontWeight:    600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--pearl-ghost)',
          }}>
            {'\u00A9'} {new Date().getFullYear()} Evolve {'\u2014'} NIT Bhopal.
            All rights reserved.
          </div>

          {/* Centre — live indicator */}
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         8,
            fontFamily:  'var(--font-wide)',
            fontSize:    '0.5rem',
            fontWeight:  600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:       'var(--pearl-ghost)',
          }}>
            <div style={{
              width:         5,
              height:        5,
              borderRadius: '50%',
              background:    'var(--copper)',
              boxShadow:    '0 0 6px rgba(184,115,51,0.5)',
              animation:    'copperPulse 2.5s ease infinite',
            }} />
            Vidyut 26 {'\u2014'} March 14{'\u2013'}16, 2026
          </div>

          {/* Right */}
          <div style={{
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.52rem',
            fontWeight:    600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--pearl-ghost)',
          }}>
            Sustainable Luxury {'\u00B7'} Electric Future
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @keyframes copperPulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </footer>
  );
}