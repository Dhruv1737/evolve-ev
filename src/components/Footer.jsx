import React, { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Vidyut-26', href: '/vidyut-26' },
  { label: 'Founders',  href: '/founders' },
  { label: 'About',     href: '/about' },
];

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function SocialLink(props) {
  const { label, href, Icon, hovered, setHovered } = props;
  const isHovered = hovered === label;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(label)}
      onMouseLeave={() => setHovered(null)}
      title={label}
      style={{
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: isHovered
          ? '1px solid rgba(46,204,55,0.6)'
          : '1px solid rgba(46,204,55,0.15)',
        borderRadius: 8,
        color: isHovered ? 'var(--green-400)' : 'var(--text-muted)',
        background: isHovered ? 'rgba(46,204,55,0.08)' : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 0 16px rgba(46,204,55,0.2)' : 'none',
      }}
    >
      <Icon />
    </a>
  );
}

function ContactRow(props) {
  const { label, value, href, Icon } = props;

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(46,204,55,0.08)',
        border: '1px solid rgba(46,204,55,0.15)',
        borderRadius: 6,
        color: 'var(--green-500)',
        flexShrink: 0,
      }}>
        <Icon />
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.2em',
          marginBottom: 3,
        }}>
          {label}
        </div>
        {href ? (
          <a
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--green-400)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {value}
          </a>
        ) : (
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

function NavItem(props) {
  const { label, href } = props;

  return (
    <li>
      <a
        href={href}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'color 0.3s ease, gap 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--green-400)';
          e.currentTarget.style.gap   = '14px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.gap   = '8px';
        }}
      >
        <span style={{
          width: 16, height: 1,
          background: 'var(--green-500)',
          display: 'inline-block',
          flexShrink: 0,
        }} />
        {label}
      </a>
    </li>
  );
}

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email) { 
      setSubscribed(true); 
      setEmail(''); 
    }
  }

  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid rgba(46,204,55,0.12)',
      background: 'linear-gradient(180deg, transparent 0%, rgba(10,26,10,0.8) 100%)',
    }}>

      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(46,204,55,0.5), transparent)',
        boxShadow: '0 0 20px rgba(46,204,55,0.3)',
      }} />

      <div className="container" style={{ padding: '80px 48px 0', margin: '0 auto', maxWidth: '1200px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr',
          gap: 60,
        }}
          className="footer-grid"
        >

          {/* ── Col 1: Brand ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <img
                src="https://evolve.nitb.in/Evolve_Logo.png"
                alt="EVOLVE"
                style={{ height: 44, filter: 'drop-shadow(0 0 10px rgba(46,204,55,0.5))' }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--green-400)',
                  letterSpacing: '0.12em',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(46,204,55,0.4)',
                }}>
                  EVOLVE
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.25em',
                  marginTop: 2,
                }}>
                  EV DAY — VIDYUT 26
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 280,
              marginBottom: 28,
            }}>
              Driving the future of electric mobility.
              Where innovation meets sustainability —
              powering the next generation of transport.
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <SocialLink
                label="LinkedIn"
                href="https://linkedin.com/company/evolve-nitb"
                Icon={IconLinkedIn}
                hovered={hoveredSocial}
                setHovered={setHoveredSocial}
              />
              <SocialLink
                label="Instagram"
                href="https://instagram.com/evolve.nitb"
                Icon={IconInstagram}
                hovered={hoveredSocial}
                setHovered={setHoveredSocial}
              />
              <SocialLink
                label="X (Twitter)"
                href="https://x.com/evolve_nitb"
                Icon={IconX}
                hovered={hoveredSocial}
                setHovered={setHoveredSocial}
              />
            </div>
          </div>

          {/* ── Col 2: Nav ── */}
          <div>
            <div className="section-label" style={{ marginBottom: 24, color: 'var(--green-400)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>Navigation</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NAV_LINKS.map((link) => (
                <NavItem key={link.label} label={link.label} href={link.href} />
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div>
            <div className="section-label" style={{ marginBottom: 24, color: 'var(--green-400)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>Contact Us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <ContactRow
                label="Email"
                value="evolve@nitb.in"
                href="mailto:evolve@nitb.in"
                Icon={IconMail}
              />
              <ContactRow
                label="Location"
                value="NIT Bhopal, MP, India"
                href={null}
                Icon={IconPin}
              />
              <ContactRow
                label="Phone"
                value="+91 98765 43210"
                href="tel:+919876543210"
                Icon={IconPhone}
              />
            </div>
          </div>

          {/* ── Col 4: Map + Newsletter ── */}
          <div>
            <div className="section-label" style={{ marginBottom: 24, color: 'var(--green-400)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>Find Us</div>

            <div style={{
              width: '100%', height: 120,
              borderRadius: 8, overflow: 'hidden',
              border: '1px solid rgba(46,204,55,0.15)',
              marginBottom: 24,
            }}>
              <iframe
                title="EVOLVE Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.3!2d77.404!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43c983e40001%3A0x2e9a6e2b5ae6e3b!2sNIT%20Bhopal!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(120deg) brightness(0.85) contrast(1.1)',
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="section-label" style={{ marginBottom: 16, color: 'var(--green-400)', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>Stay Updated</div>

            {subscribed ? (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--green-400)',
                letterSpacing: '0.1em',
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: '1rem' }}>✓</span>
                You are on the list!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{ display: 'flex' }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'rgba(15,34,16,0.5)',
                    border: '1px solid rgba(46,204,55,0.2)',
                    borderRight: 'none',
                    borderRadius: '4px 0 0 4px',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(46,204,55,0.5)'; }}
                  onBlur={(e)  => { e.target.style.borderColor = 'rgba(46,204,55,0.2)'; }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 16px',
                    background: 'var(--green-700)',
                    border: '1px solid rgba(46,204,55,0.4)',
                    borderRadius: '0 4px 4px 0',
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-600)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--green-700)'; }}
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 60,
          paddingTop: 24,
          paddingBottom: 32,
          borderTop: '1px solid rgba(46,204,55,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
          }}>
            {'\u00A9'} {new Date().getFullYear()} EVOLVE {'\u2014'} NIT BHOPAL. ALL RIGHTS RESERVED.
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{
              width: 6, height: 6,
              background: 'var(--green-500)',
              borderRadius: '50%',
              display: 'inline-block',
              boxShadow: '0 0 6px var(--green-500)',
            }} />
            VIDYUT 26 {'\u2014'} POWERED BY EVOLVE
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}