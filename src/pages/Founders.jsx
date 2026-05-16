import React, { useEffect, useRef, useState } from 'react';

// Custom hook to detect when an element enters the viewport
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

const FOUNDERS = [
  {
    number:   '01',
    name:     'Yash Atlani',
    role:     'Chief Executive Officer',
    tag:      'Visionary',
    image:    'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrYashAtlani.jpg&w=1920&q=75',
    quote:    'The electric revolution is not coming — it is already here. Our job is to make sure India leads it, not follows it.',
    bio:      [
      'Yash Atlani is the founding force behind EVOLVE. A final-year Mechanical Engineering student at NIT Bhopal, he spent three years building what began as a small campus exhibition into India\'s most recognised student-led electric vehicle conclave. The story of EVOLVE is, in many ways, the story of Yash\'s refusal to accept that ambition must wait for permission.',
      'Under his leadership, annual footfall grew from under 500 to over 5,000 attendees. He forged the sponsorship relationships that gave Vidyut its financial foundation, recruited a 200-member volunteer team, and positioned EVOLVE as a platform that industry professionals take seriously.',
      'Beyond Vidyut, Yash sits on two national student EV policy advisory groups and was named among Forbes India\'s top 30 student innovators in 2025. He is currently developing the EVOLVE EV Research Grant — a fund that will seed student-led electric mobility projects across India.',
    ],
    skills:   ['Strategic Leadership', 'Industry Partnerships', 'EV Policy', 'Organisational Design'],
    email:    'yash@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/yashatlani',
  },
  {
    number:   '02',
    name:     'Ayush Jain',
    role:     'Chief Technology Officer',
    tag:      'Engineer',
    image:    'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrAyushJain.jpg&w=1920&q=75',
    quote:    'Every great electric vehicle starts with a great battery. We are engineering the cells that will power the next billion kilometres.',
    bio:      [
      'Ayush Jain is the technical conscience of EVOLVE. An Electronics and Communication Engineering student with a deep specialisation in power electronics and battery management systems, Ayush leads all technical programming at Vidyut — from engineering workshops and battery symposiums to Speed Trials infrastructure.',
      'He has personally mentored over 40 student teams across three editions of Vidyut, guiding them from initial concept to working EV prototype. His research on adaptive BMS algorithms for lithium-ion cells has been presented at two national conferences and cited in an IIT Bombay review paper.',
      'Ayush believes that the greatest barrier to India\'s EV transition is not technology or capital — it is the shortage of engineers who truly understand the full stack of electric mobility. Everything he does at EVOLVE is designed to close that gap.',
    ],
    skills:   ['Battery Systems', 'Power Electronics', 'BMS Architecture', 'Technical Mentorship'],
    email:    'ayush@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/ayushjain',
  },
  {
    number:   '03',
    name:     'Aman Sharma',
    role:     'Chief Operations Officer',
    tag:      'Architect',
    image:    'https://evolve.nitb.in/_next/image?url=%2FTeam%2FFounders%2FMrAmanSharma_1.jpg&w=1920&q=75',
    quote:    'A great idea without great execution is just a story. We build the systems that turn vision into something real.',
    bio:      [
      'Aman Sharma is the operational precision behind EVOLVE\'s reputation for flawless execution. As the person responsible for turning ambitious ideas into events that actually happen — on time, on budget, and to a standard that leaves corporate partners impressed — Aman has mastered the art of making complexity look effortless.',
      'He has coordinated with over 30 corporate partners, managed a volunteer team of 200 students across concurrent tracks, and single-handedly designed the operational framework that allowed Vidyut 25 to run three simultaneous event streams over two days without a single major incident.',
      'Aman is deeply interested in the economics of EV adoption in rural India. He is currently researching how last-mile electric logistics can transform supply chains in tier-3 cities, and plans to publish his findings through EVOLVE\'s new research initiative in 2026.',
    ],
    skills:   ['Event Operations', 'Logistics Architecture', 'Sponsor Relations', 'Systems Design'],
    email:    'aman@evolve.nitb.in',
    linkedin: 'https://linkedin.com/in/amansharma',
  },
];

const MISSION = [
  {
    title: 'Our Mission',
    desc:  'To accelerate India\'s transition to electric mobility by giving student engineers the platform, resources, and connections they need to build what comes next.',
  },
  {
    title: 'Our Vision',
    desc:  'An India where every road is powered by clean energy, every engineer thinks sustainability-first, and every campus drives innovation in electric transport.',
  },
  {
    title: 'Our Promise',
    desc:  'To make Vidyut the most credible student EV platform in Asia — the launchpad for India\'s next generation of electric mobility entrepreneurs and researchers.',
  },
];

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

function ContactLink({ href, label, icon: Icon }) {
  const [isHov, setHov] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            8,
        padding:        '10px 18px',
        background:     isHov ? 'rgba(184,115,51,0.06)' : 'transparent',
        border:         isHov ? '1px solid rgba(184,115,51,0.4)' : '1px solid rgba(255,255,255,0.06)',
        fontFamily:     'var(--font-wide)',
        fontSize:       '0.55rem',
        fontWeight:     600,
        letterSpacing:  '0.18em',
        textTransform:  'uppercase',
        color:          isHov ? 'var(--copper-light)' : 'var(--pearl-ghost)',
        textDecoration: 'none',
        transition:     'all 0.3s ease',
        whiteSpace:     'nowrap',
      }}
    >
      <Icon />
      {label}
    </a>
  );
}

function FounderCard({ founder, index, visible }) {
  const [isHov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:  'var(--charcoal-2)',
        border:      '1px solid rgba(255,255,255,0.06)',
        marginBottom: 2,
        overflow:    'hidden',
        opacity:     visible ? 1 : 0,
        transform:   visible ? 'translateY(0)' : 'translateY(40px)',
        transition:  `opacity 0.8s ease ${index * 0.12}s, transform 0.8s ease ${index * 0.12}s`,
      }}
      className="founder-card"
    >
      <div style={{
        height:     2,
        background: 'linear-gradient(90deg, var(--copper), transparent)',
        opacity:    isHov ? 0.6 : 0.2,
        transition: 'opacity 0.5s ease',
      }} />

      <div className={`founder-body founder-body-${index}`} style={{ display: 'flex', flexDirection: 'row' }}>
        
        {/* Image column */}
        <div className="founder-img-col" style={{ position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
          <img
            src={founder.image}
            alt={founder.name}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              objectPosition: 'top center',
              filter:     isHov ? 'brightness(0.55) contrast(1.1) saturate(0.5)' : 'brightness(0.42) contrast(1.15) saturate(0.35)',
              transform:  isHov ? 'scale(1.04)' : 'scale(1)',
              transition: 'all 0.9s ease',
              display:    'block',
            }}
          />
          <div style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(180deg, rgba(10,10,11,0.1) 40%, rgba(10,10,11,0.92) 100%)',
          }} />
          <div style={{
            position:      'absolute',
            top:           20,
            left:          20,
            fontFamily:    'var(--font-wide)',
            fontSize:      '0.52rem',
            fontWeight:    600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'var(--copper-light)',
            padding:       '5px 12px',
            background:    'rgba(10,10,11,0.85)',
            border:        '1px solid rgba(184,115,51,0.3)',
          }}>
            {founder.tag}
          </div>
          <div style={{
            position:      'absolute',
            bottom:        -20,
            right:         10,
            fontFamily:    'var(--font-serif)',
            fontSize:      '8rem',
            fontWeight:    300,
            lineHeight:    1,
            color:         'rgba(184,115,51,0.07)',
            userSelect:    'none',
            pointerEvents: 'none',
          }}>
            {founder.number}
          </div>
          <div style={{
            position: 'absolute',
            bottom:   0,
            left:     0,
            right:    0,
            padding:  '36px 24px 24px',
            background: 'linear-gradient(0deg, rgba(10,10,11,0.95) 0%, transparent 100%)',
          }}>
            <div style={{
              fontFamily:  'var(--font-serif)',
              fontSize:    'clamp(1.3rem, 2vw, 1.8rem)',
              fontWeight:  300,
              color:       'var(--pearl)',
              lineHeight:  1.1,
              marginBottom: 6,
            }}>
              {founder.name}
            </div>
            <div style={{
              fontFamily:    'var(--font-wide)',
              fontSize:      '0.52rem',
              fontWeight:    600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'var(--copper)',
            }}>
              {founder.role}
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="founder-content-col" style={{
          padding:        '40px 40px',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          flex:           1,
          background:     isHov ? 'var(--charcoal-3)' : 'var(--charcoal-2)',
          transition:     'background 0.5s ease',
        }}>
          <div style={{
            fontFamily:   'var(--font-serif)',
            fontSize:     'clamp(0.95rem, 1.5vw, 1.2rem)',
            fontWeight:   300,
            fontStyle:    'italic',
            color:        'var(--copper-pale)',
            lineHeight:   1.65,
            marginBottom: 24,
            paddingLeft:  16,
            borderLeft:   '2px solid rgba(184,115,51,0.3)',
          }}>
            {founder.quote}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {founder.bio.map((para, i) => (
              <p key={i} style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.85rem',
                fontWeight:  300,
                color:       i === 0 ? 'var(--pearl-dim)' : 'var(--pearl-muted)',
                lineHeight:  1.82,
                margin:      0,
              }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{
            display:      'flex',
            flexWrap:     'wrap',
            gap:          8,
            paddingTop:   20,
            marginBottom: 24,
            borderTop:    '1px solid rgba(255,255,255,0.06)',
          }}>
            {founder.skills.map((skill) => (
              <span key={skill} style={{
                fontFamily:    'var(--font-wide)',
                fontSize:      '0.5rem',
                fontWeight:    600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--pearl-muted)',
                padding:       '5px 10px',
                background:    'var(--charcoal-4)',
                border:        '1px solid rgba(255,255,255,0.06)',
              }}>
                {skill}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <ContactLink href={`mailto:${founder.email}`} label="Email" icon={MailIcon} />
            <ContactLink href={founder.linkedin} label="LinkedIn" icon={LinkedInIcon} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Founders() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsRef, cardsVisible] = useReveal(0.05);
  const [missionRef, missionVisible] = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      
      {/* HERO SECTION */}
      <section style={{
        minHeight:     '65vh',
        display:       'flex',
        alignItems:    'flex-end',
        position:      'relative',
        overflow:      'hidden',
        paddingTop:    120,
        paddingBottom: 72,
      }}>
        {[20, 40, 60, 80].map((pos) => (
          <div key={pos} style={{
            position:      'absolute',
            top: 0, bottom: 0,
            left:          `${pos}%`,
            width:         1,
            background:    'linear-gradient(180deg, transparent, rgba(184,115,51,0.05), transparent)',
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          position:      'absolute',
          inset:         0,
          background:    'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(184,115,51,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{
            position:      'absolute',
            top:           -40,
            right:         0,
            fontFamily:    'var(--font-serif)',
            fontSize:      'clamp(8rem, 18vw, 18rem)',
            fontWeight:    300,
            lineHeight:    1,
            color:         'rgba(184,115,51,0.05)',
            userSelect:    'none',
            pointerEvents: 'none',
            opacity:       heroVisible ? 1 : 0,
            transition:    'opacity 1s ease 0.5s',
          }}>
            3
          </div>

          <div style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease 0.1s',
            marginBottom: 24,
          }}>
            <span className="badge">The People Behind EVOLVE</span>
          </div>

          <div style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s ease 0.2s',
            marginBottom: 32,
          }}>
            <h1 style={{
              fontFamily:    'var(--font-serif)',
              fontSize:      'clamp(3.5rem, 10vw, 9.5rem)',
              fontWeight:    300,
              lineHeight:    0.92,
              letterSpacing: '-0.01em',
              margin:        0,
            }}>
              <span style={{ display: 'block', color: 'var(--pearl-muted)' }}>Meet the</span>
              <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--copper-light)' }}>Founders</span>
            </h1>
          </div>

          <div className="founders-hero-bottom" style={{
            opacity:    heroVisible ? 1 : 0,
            transform:  heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s ease 0.35s',
          }}>
            <div className="founders-hero-inner" style={{ display: 'flex', gap: 80, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <p style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '1rem',
                fontWeight:  300,
                color:       'var(--pearl-muted)',
                lineHeight:  1.8,
                maxWidth:    500,
                margin:      0,
              }}>
                Three engineers. One shared obsession with electric mobility.
                EVOLVE was born from late nights in the lab, bold ideas on
                whiteboards, and an unshakeable belief that India's students
                could build the future of transport.
              </p>

              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                {[
                  { value: '3',    label: 'Co-Founders'    },
                  { value: '2021', label: 'Year Founded'   },
                  { value: '26+',  label: 'Editions Built' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily:  'var(--font-serif)',
                      fontSize:    '2.4rem',
                      fontWeight:  300,
                      color:       'var(--copper-light)',
                      lineHeight:  1,
                      marginBottom: 6,
                    }}>{stat.value}</div>
                    <div style={{
                      fontFamily:    'var(--font-wide)',
                      fontSize:      '0.5rem',
                      fontWeight:    600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color:         'var(--pearl-ghost)',
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            marginTop:  56,
            height:     1,
            background: 'linear-gradient(90deg, rgba(184,115,51,0.3), rgba(255,255,255,0.06), transparent)',
            opacity:    heroVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.65s',
          }} />
        </div>
      </section>

      {/* FOUNDER CARDS SECTION */}
      <section className="section" ref={cardsRef}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 40 }}>Core Team</div>
          {FOUNDERS.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              index={i}
              visible={cardsVisible}
            />
          ))}
        </div>
      </section>

      {/* MISSION STRIP SECTION */}
      <section className="section-sm" ref={missionRef} style={{
        borderTop:  '1px solid rgba(255,255,255,0.06)',
        background: 'var(--charcoal-2)',
      }}>
        <div className="container">
          <div className="mission-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'center' }}>
            
            {/* Left Box */}
            <div style={{
              opacity:    missionVisible ? 1 : 0,
              transform:  missionVisible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'all 0.7s ease',
            }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>What Drives Us</div>
              <h2 style={{
                fontFamily:  'var(--font-serif)',
                fontSize:    'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight:  300,
                color:       'var(--pearl)',
                lineHeight:  1.05,
                margin:      0,
              }}>
                Built on <span style={{ fontStyle: 'italic', color: 'var(--copper-light)' }}>conviction,</span><br />not convention.
              </h2>
            </div>

            {/* Right Box */}
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              opacity:       missionVisible ? 1 : 0,
              transform:     missionVisible ? 'translateX(0)' : 'translateX(24px)',
              transition:    'all 0.7s ease 0.15s',
            }}>
              {MISSION.map((item, i) => (
                <div key={item.title} className="mission-row" style={{
                  display:      'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap:          24,
                  padding:      '28px 0',
                  borderBottom: i < MISSION.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  alignItems:   'start',
                }}>
                  <div style={{
                    fontFamily:    'var(--font-wide)',
                    fontSize:      '0.55rem',
                    fontWeight:    600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--copper)',
                    paddingTop:    3,
                    lineHeight:    1.4,
                  }}>{item.title}</div>
                  <p style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    '0.88rem',
                    fontWeight:  300,
                    color:       'var(--pearl-muted)',
                    lineHeight:  1.8,
                    margin:      0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Global CSS Layout Overrides */}
      <style>{`
        .founder-card .founder-body { flex-direction: row; }
        .founder-card .founder-img-col { width: 340px; min-height: 520px; flex-shrink: 0; }
        .founder-card .founder-content-col { padding: 48px 48px; }

        @media (max-width: 1024px) {
          .founder-card .founder-img-col { width: 260px; min-height: 460px; }
          .founder-card .founder-content-col { padding: 36px 32px; }
        }
        @media (max-width: 700px) {
          .founder-card .founder-body { flex-direction: column !important; }
          .founder-card .founder-img-col { width: 100% !important; min-height: 300px !important; max-height: 340px; }
          .founder-card .founder-content-col { padding: 28px 24px !important; }
        }
        @media (max-width: 900px) {
          .mission-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .mission-row { grid-template-columns: 120px 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 500px) {
          .mission-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .founders-hero-inner { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}