import React, { useEffect, useRef, useState } from 'react';

// --- Custom Hook for Reveal Animations ---
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// --- Data Structures ---
const FOUNDERS = [
  {
    number: '01',
    name: 'Yash Atlani',
    role: 'Chief Executive Officer',
    tag: 'Visionary',
    image: 'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrYashAtlani.jpg&w=1920&q=75',
    quote: 'The electric revolution is not coming — it is already here. Our job is to make sure India leads it, not follows it.',
    bio: [
      'Yash Atlani is the founding force behind EVOLVE. A final-year Mechanical Engineering student at NIT Bhopal, he spent three years building what began as a small campus exhibition into India\'s most recognised student-led electric vehicle conclave.',
      'Under his leadership, annual footfall grew from under 500 to over 5,000 attendees. He forged the sponsorship relationships that gave Vidyut its financial foundation.',
    ],
    skills: ['Strategic Leadership', 'Industry Partnerships', 'EV Policy', 'Organisational Design'],
    email: 'yash@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/yashatlani',
  },
  {
    number: '02',
    name: 'Ayush Jain',
    role: 'Chief Technology Officer',
    tag: 'Engineer',
    image: 'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrAyushJain.jpg&w=1920&q=75',
    quote: 'Every great electric vehicle starts with a great battery. We are engineering the cells that will power the next billion kilometres.',
    bio: [
      'Ayush Jain is the technical conscience of EVOLVE. An Electronics and Communication Engineering student with a deep specialisation in power electronics.',
      'He has personally mentored over 40 student teams across three editions of Vidyut, guiding them from initial concept to working EV prototype.',
    ],
    skills: ['Battery Systems', 'Power Electronics', 'BMS Architecture', 'Technical Mentorship'],
    email: 'ayush@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/ayushjain',
  },
  {
    number: '03',
    name: 'Aman Sharma',
    role: 'Chief Operations Officer',
    tag: 'Architect',
    image: 'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrAmanSharma_1.jpg&w=1920&q=75',
    quote: 'A great idea without great execution is just a story. We build the systems that turn vision into something real.',
    bio: [
      'Aman Sharma is the operational precision behind EVOLVE\'s reputation for flawless execution.',
      'He has coordinated with over 30 corporate partners and managed a volunteer team of 200 students across concurrent tracks.',
    ],
    skills: ['Event Operations', 'Logistics Architecture', 'Sponsor Relations', 'Systems Design'],
    email: 'aman@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/amansharma',
  }
];

const VALUES = [
  { title: 'Our Mission', desc: 'To accelerate India\'s transition to electric mobility by giving student engineers the platform and resources they need.' },
  { title: 'Our Vision', desc: 'An India where every road is powered by clean energy and every engineer thinks sustainability-first.' },
  { title: 'Our Promise', desc: 'To make Vidyut the most credible student EV platform in Asia — the launchpad for the next generation.' }
];

// --- Sub-Component: Founder Card ---
function FounderCard({ founder, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div 
      className="founder-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '4rem',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      {/* Image Panel */}
      <div style={{
        position: 'relative',
        minHeight: '580px',
        order: isEven ? 0 : 1,
        overflow: 'hidden'
      }}>
        <img 
          src={founder.image} 
          alt={founder.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered ? 'grayscale(0) brightness(0.8)' : 'grayscale(1) brightness(0.5)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 1.2s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: isEven ? '2rem' : 'auto',
          right: isEven ? 'auto' : '2rem',
          zIndex: 2
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'white', margin: 0 }}>{founder.name}</h3>
          <p style={{ fontFamily: 'var(--font-wide)', color: 'var(--copper)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{founder.role}</p>
        </div>
      </div>

      {/* Content Panel */}
      <div style={{
        padding: '4rem',
        background: 'var(--charcoal-2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        order: isEven ? 1 : 0
      }}>
        <p style={{ fontStyle: 'italic', color: 'var(--copper-pale)', fontSize: '1.2rem', marginBottom: '2rem' }}>"{founder.quote}"</p>
        {founder.bio.map((p, i) => (
          <p key={i} style={{ color: 'var(--pearl-dim)', lineHeight: '1.8', marginBottom: '1rem', fontSize: '0.9rem' }}>{p}</p>
        ))}
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {/* FIXED: Added missing <a> tags and valid hrefs */}
          <a href={`mailto:${founder.email}`} style={{ color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1.2rem', fontSize: '0.7rem', textTransform: 'uppercase' }}>
            Email
          </a>
          <a href={founder.linkedin} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1.2rem', fontSize: '0.7rem', textTransform: 'uppercase' }}>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function Founders() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsRef, cardsVisible] = useReveal(0.05);
  const [missionRef, missionVisible] = useReveal(0.1);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--charcoal-1)', color: 'var(--pearl)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '160px 0 80px', position: 'relative' }}>
        <div className="container">
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(4rem, 10vw, 8rem)', 
            lineHeight: '0.9',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease'
          }}>
            The <span style={{ fontStyle: 'italic', color: 'var(--copper)' }}>Architects</span> <br /> of EVOLVE
          </h1>
        </div>
      </section>

      {/* Founders Cards Section */}
      <section ref={cardsRef} style={{ paddingBottom: '100px' }}>
        <div className="container">
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.name} founder={f} index={i} visible={cardsVisible} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>Our Shared <br /> <span style={{ color: 'var(--copper)' }}>Conviction</span></h2>
          </div>
          <div>
            {VALUES.map((v, i) => (
              <div key={i} style={{ marginBottom: '3rem', opacity: missionVisible ? 1 : 0, transition: `all 0.8s ease ${i * 0.2}s` }}>
                <h4 style={{ color: 'var(--copper)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{v.title}</h4>
                <p style={{ color: 'var(--pearl-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        @media (max-width: 968px) {
          .founder-row { grid-template-columns: 1fr !important; }
          .founder-row > div { order: unset !important; }
        }
      `}</style>
    </main>
  );
}