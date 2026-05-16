import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Vidyut 26', href: '/vidyut-26' },
  { label: 'Founders',  href: '/founders' },
  { label: 'About',      href: '/about' },
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/company/evolve-nitb',
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/evolve.nitb',
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href:  'https://x.com/evolve_nitb',
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const CONTACTS = [
  { label: 'Email', value: 'evolve@nitb.in', href: 'mailto:evolve@nitb.in' },
  { label: 'Location', value: 'NIT Bhopal, MP, India', href: null },
  { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
];

const SocialButton = ({ label, href, icon: Icon }) => {
  const [isHov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: isHov ? '1px solid rgba(184,115,51,0.45)' : 'var(--border)',
        color: isHov ? 'var(--copper-light)' : 'var(--pearl-ghost)',
        background: isHov ? 'rgba(184,115,51,0.05)' : 'transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <Icon />
    </a>
  );
};

const ContactItem = ({ label, value, href }) => {
  const [isHov, setHov] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pearl-ghost)' }}>
        {label}
      </div>
      {href ? (
        <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: isHov ? 'var(--copper-light)' : 'var(--pearl-muted)', transition: 'color 0.3s ease', lineHeight: 1.5 }}>
          {value}
        </a>
      ) : (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--pearl-muted)', lineHeight: 1.5 }}>
          {value}
        </span>
      )}
    </div>
  );
};

const FooterNavLink = ({ label, href }) => {
  const [isHov, setHov] = useState(false);
  return (
    <Link
      to={href}
      onClick={() => window.scrollTo(0, 0)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300,
        color: isHov ? 'var(--copper-light)' : 'var(--pearl-muted)', display: 'flex', alignItems: 'center', gap: isHov ? 12 : 8, transition: 'all 0.3s ease',
      }}
    >
      <div style={{ width: isHov ? 20 : 12, height: 1, background: isHov ? 'var(--copper)' : 'var(--pearl-ghost)', flexShrink: 0, transition: 'all 0.3s ease' }} />
      {label}
    </Link>
  );
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ position: 'relative', zIndex: 1, background: 'var(--charcoal-2)', borderTop: 'var(--border)' }}>
      <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,115,51,0.35), rgba(255,255,255,0.06), rgba(184,115,51,0.35), transparent)' }} />
      <div className="container" style={{ paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 64 }} className="footer-main">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <img src="https://evolve.nitb.in/Evolve_Logo.png" alt="EVOLVE" style={{ height: 36, filter: 'brightness(1.05)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--pearl)', letterSpacing: '0.06em', lineHeight: 1 }}>Evolve</div>
                <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.45rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--copper)', marginTop: 3 }}>Vidyut 26</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--pearl-muted)', lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>India's most credible student-led electric vehicle platform.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
              {SOCIALS.map(s => <SocialButton key={s.label} {...s} />)}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pearl-ghost)', marginBottom: 14 }}>Stay Updated</div>
              {subscribed ? <div style={{ color: 'var(--copper-light)', fontSize: '0.95rem' }}>You are on the list.</div> : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0, maxWidth: 300 }}>
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, padding: '10px 14px', background: 'var(--charcoal-3)', border: 'var(--border)', borderRight: 'none', color: 'var(--pearl)', outline: 'none' }} />
                  <button type="submit" style={{ padding: '10px 16px', background: 'var(--copper)', border: 'none', color: 'var(--black)', fontFamily: 'var(--font-wide)', fontSize: '0.55rem', fontWeight: 700, cursor: 'pointer' }}>Join</button>
                </form>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pearl-ghost)', marginBottom: 28, paddingBottom: 16, borderBottom: 'var(--border)' }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NAV_LINKS.map(link => <FooterNavLink key={link.label} {...link} />)}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pearl-ghost)', marginBottom: 28, paddingBottom: 16, borderBottom: 'var(--border)' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {CONTACTS.map(c => <ContactItem key={c.label} {...c} />)}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pearl-ghost)', marginBottom: 28, paddingBottom: 16, borderBottom: 'var(--border)' }}>Find Us</div>
            <div style={{ width: '100%', height: 200, overflow: 'hidden', border: 'var(--border)', marginBottom: 20, position: 'relative' }}>
              <iframe title="Map" src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) brightness(0.4)', display: 'block' }} loading="lazy" />
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--pearl-muted)', lineHeight: 1.7 }}>MANIT, Bhopal, MP — 462003</div>
          </div>
        </div>

        <div style={{ marginTop: 56, paddingTop: 24, paddingBottom: 32, borderTop: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ fontFamily: 'var(--font-wide)', fontSize: '0.52rem', color: 'var(--pearl-ghost)' }}>© {new Date().getFullYear()} Evolve — NIT Bhopal.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.5rem', color: 'var(--pearl-ghost)' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--copper)', animation: 'copperPulse 2.5s ease infinite' }} />
            Vidyut 26 — March 14-16, 2026
          </div>
          <div style={{ fontSize: '0.52rem', color: 'var(--pearl-ghost)' }}>Sustainable Luxury · Electric Future</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .footer-main { grid-template-columns: 1fr 1fr !important; gap: 48px !important; } }
        @media (max-width: 640px) { .footer-main { grid-template-columns: 1fr !important; gap: 40px !important; } }
        @keyframes copperPulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </footer>
  );
}