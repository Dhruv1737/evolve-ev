import React, { useEffect, useRef, useState } from 'react';

function useReveal(threshold) {
  var t = threshold || 0.12;
  var ref = useRef(null);
  var [visible, setVisible] = useState(false);

  useEffect(function() {
    var node = ref.current;
    if (!node) return;

    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: t });

    observer.observe(node);
    return function() { observer.disconnect(); };
  }, [t]);

  return [ref, visible];
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function IconQuote() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.15 }}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  );
}

var FOUNDERS = [
  {
    name: 'Yash Atlani',
    role: 'Chief Executive Officer',
    tag: 'VISIONARY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    quote: 'The electric revolution is not coming. It is already here. Our job is to make sure India leads it, not follows it.',
    bio1: 'Yash Atlani is the driving force behind EVOLVE, the student body that transformed a small campus exhibition into India\'s largest student-run electric vehicle conclave.',
    bio2: 'Under his leadership, EVOLVE grew its annual footfall from under 500 to over 5,000 attendees, secured title sponsorships from leading EV companies.',
    skills: ['Strategic Leadership', 'EV Policy', 'Industry Partnerships', 'Product Vision'],
    email: 'yash@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/yashatlani',
    number: '01',
  },
  {
    name: 'Ayush Jain',
    role: 'Chief Technology Officer',
    tag: 'INNOVATOR',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    quote: 'Every great EV starts with a great battery. We are engineering the cells that will power the next billion kilometres.',
    bio1: 'Ayush Jain is the technical backbone of EVOLVE. A Electronics and Communication Engineering student with a deep specialisation in power electronics.',
    bio2: 'He has personally mentored over 40 student teams across three editions of Vidyut, helping them design and build working EV prototypes from scratch.',
    skills: ['Battery Systems', 'Power Electronics', 'BMS Design', 'Technical Mentorship'],
    email: 'ayush@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/ayushjain',
    number: '02',
  },
  {
    name: 'Aman Sharma',
    role: 'Chief Operations Officer',
    tag: 'ARCHITECT',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    quote: 'A great idea without great execution is just a dream. We build the systems that turn vision into reality, one event at a time.',
    bio1: 'Aman Sharma is the operational engine of EVOLVE. Responsible for turning ambitious ideas into flawlessly executed events.',
    bio2: 'Aman has coordinated with over 30 corporate partners and managed a volunteer team of 200 students.',
    skills: ['Event Operations', 'Logistics', 'Sponsor Relations', 'Team Management'],
    email: 'aman@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/amansharma',
    number: '03',
  },
];

function FounderCard(props) {
  var founder = props.founder;
  var index = props.index;
  var visible = props.visible;

  var [hovered, setHovered] = useState(false);
  var isEven = index % 2 === 0;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        border: '1px solid rgba(46,204,55,0.12)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.7s ease ' + (index * 0.15) + 's',
      }}
      className="founder-card"
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
    >
      {/* Image side */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 480,
        order: isEven ? 0 : 1,
      }}>
        <img
          src={founder.image}
          alt={founder.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            filter: 'brightness(0.65) saturate(0.6) hue-rotate(40deg)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.7s ease, filter 0.5s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: isEven
            ? 'linear-gradient(90deg, rgba(5,10,5,0.3) 0%, rgba(5,10,5,0.7) 100%)'
            : 'linear-gradient(270deg, rgba(5,10,5,0.3) 0%, rgba(5,10,5,0.7) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -20, right: 20,
          fontFamily: 'var(--font-display)',
          fontSize: '9rem', lineHeight: 1,
          color: 'rgba(46,204,55,0.06)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {founder.number}
        </div>
        <div style={{
          position: 'absolute', top: 24,
          left: isEven ? 24 : 'auto',
          right: isEven ? 'auto' : 24,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'var(--green-400)',
          letterSpacing: '0.25em',
          padding: '5px 14px',
          background: 'rgba(5,10,5,0.85)',
          border: '1px solid rgba(46,204,55,0.35)',
          borderRadius: 100,
        }}>
          {founder.tag}
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '40px 28px 28px',
          background: 'linear-gradient(0deg, rgba(5,10,5,0.95) 0%, transparent 100%)',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textShadow: hovered ? '0 0 20px rgba(46,204,55,0.4)' : 'none',
            transition: 'text-shadow 0.4s ease',
          }}>
            {founder.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--green-500)',
            letterSpacing: '0.2em',
            marginTop: 6,
          }}>
            {founder.role}
          </div>
        </div>
      </div>

      {/* Content side */}
      <div style={{
        padding: '48px 48px',
        background: 'rgba(10,26,10,0.5)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        order: isEven ? 1 : 0,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 24, right: 24 }}>
          <IconQuote />
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: 'var(--green-300)',
          lineHeight: 1.7,
          marginBottom: 28,
          paddingLeft: 16,
          borderLeft: '2px solid var(--green-700)',
        }}>
          {founder.quote}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          marginBottom: 16,
        }}>
          {founder.bio1}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.8,
          marginBottom: 28,
        }}>
          {founder.bio2}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {founder.skills.map(function(skill) {
            return (
              <span key={skill} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: 'var(--green-400)',
                letterSpacing: '0.12em',
                padding: '4px 12px',
                background: 'rgba(46,204,55,0.06)',
                border: '1px solid rgba(46,204,55,0.18)',
                borderRadius: 100,
                textTransform: 'uppercase',
              }}>
                {skill}
              </span>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={'mailto:' + founder.email}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              border: '1px solid rgba(46,204,55,0.2)',
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={function(e) {
              e.currentTarget.style.color = 'var(--green-400)';
              e.currentTarget.style.borderColor = 'rgba(46,204,55,0.5)';
              e.currentTarget.style.background = 'rgba(46,204,55,0.06)';
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'rgba(46,204,55,0.2)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <IconMail />
            EMAIL
          </a>
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              border: '1px solid rgba(46,204,55,0.2)',
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={function(e) {
              e.currentTarget.style.color = 'var(--green-400)';
              e.currentTarget.style.borderColor = 'rgba(46,204,55,0.5)';
              e.currentTarget.style.background = 'rgba(46,204,55,0.06)';
            }}
            onMouseLeave={function(e) {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'rgba(46,204,55,0.2)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <IconLinkedIn />
            LINKEDIN
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Founders() {
  var [heroVisible, setHeroVisible] = useState(false);
  var [cardsRef, cardsVisible] = useReveal(0.1);
  var [missionRef, missionVisible] = useReveal();

  useEffect(function() {
    var t = setTimeout(function() { setHeroVisible(true); }, 100);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <section style={{
        minHeight: '60vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: 120, paddingBottom: 80,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,83,26,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {[15, 35, 65, 85].map(function(pos) {
          return (
            <div key={pos} style={{
              position: 'absolute', top: 0, bottom: 0,
              left: pos + '%', width: 1,
              background: 'linear-gradient(180deg, transparent, rgba(46,204,55,0.06), transparent)',
              pointerEvents: 'none',
            }} />
          );
        })}

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <span className="badge" style={{ marginBottom: 28, display: 'inline-flex' }}>
              The People Behind EVOLVE
            </span>
          </div>

          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '0.03em',
              marginBottom: 28,
            }}>
              <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '40%', fontFamily: 'var(--font-mono)', letterSpacing: '0.3em', marginBottom: 16 }}>
                MEET THE
              </span>
              <span style={{ display: 'block', color: 'var(--green-400)', textShadow: '0 0 60px rgba(46,204,55,0.3)' }}>
                FOUND
              </span>
              <span style={{ display: 'block', color: 'var(--text-primary)', WebkitTextStroke: '1px rgba(46,204,55,0.2)' }}>
                ERS
              </span>
            </h1>
          </div>

          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.35s',
            maxWidth: 600,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}>
              Three engineers. One shared obsession with electric mobility.
              EVOLVE was born from late nights, bold ideas, and an unshakeable
              belief that India's students could build the future of transport.
            </p>
          </div>

          <div style={{
            display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0,
            transition: 'all 0.7s ease 0.5s',
          }}>
            {[
              { value: '3',    label: 'Co-Founders' },
              { value: '26+',  label: 'Editions Organised' },
              { value: '5K+',  label: 'Lives Impacted' },
              { value: '2021', label: 'Founded' },
            ].map(function(stat) {
              return (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    color: 'var(--green-400)',
                    lineHeight: 1,
                    textShadow: '0 0 20px rgba(46,204,55,0.3)',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.58rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.2em',
                    marginTop: 4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" ref={cardsRef}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: 48 }}>
            Core Team
          </div>
          {FOUNDERS.map(function(founder, i) {
            return (
              <FounderCard
                key={founder.name}
                founder={founder}
                index={i}
                visible={cardsVisible}
              />
            );
          })}
        </div>
      </section>

      <section className="section-sm" ref={missionRef} style={{
        borderTop: '1px solid rgba(46,204,55,0.1)',
        borderBottom: '1px solid rgba(46,204,55,0.1)',
        background: 'rgba(10,26,10,0.3)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 2,
          }} className="mission-grid">
            {[
              { icon: '⚡', title: 'Our Mission', desc: 'To accelerate India\'s transition to electric mobility by empowering student engineers.' },
              { icon: '🌱', title: 'Our Vision', desc: 'A India where every road is powered by clean energy, and every engineer thinks sustainability-first.' },
              { icon: '🚀', title: 'Our Promise', desc: 'To make Vidyut the launchpad for India\'s next generation of EV entrepreneurs.' },
            ].map(function(item, i) {
              return (
                <div key={item.title} className="card" style={{
                  padding: '48px 40px',
                  opacity: missionVisible ? 1 : 0,
                  transform: missionVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.6s ease ' + (i * 0.12) + 's',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{item.icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    color: 'var(--green-400)',
                    letterSpacing: '0.1em',
                    marginBottom: 14,
                  }}>
                    {item.title}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                  }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .badge { padding: 4px 12px; background: rgba(46,204,55,0.1); border: 1px solid rgba(46,204,55,0.2); border-radius: 100px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--green-400); }
        @media (max-width: 900px) {
          .founder-card     { grid-template-columns: 1fr !important; }
          .founder-img-side { min-height: 300px !important; order: 0 !important; }
          .mission-grid     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
