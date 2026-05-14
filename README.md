# ⚡ EVOLVE — EV Day | Vidyut 26

> India's largest student-led electric vehicle conclave, built and run by EVOLVE at NIT Bhopal.

![EVOLVE](https://evolve.nitb.in/Evolve_Logo.png)

---

## 🌐 Live Preview

https://evolve-ev.vercel.app/

---

## 📸 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, stats, event highlights, CTA |
| Vidyut 26 | `/vidyut-26` | Events, timeline, sponsors, register form |
| Founders | `/founders` | Yash Atlani, Ayush Jain, Aman Sharma |
| About | `/about` | Story, timeline, values, team, join us |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build tool and dev server |
| React Router v6 | Client-side routing |
| Framer Motion | Animations |
| Google Fonts | Bebas Neue, Orbitron, Exo 2, Space Mono |
| CSS Variables | Theming and design tokens |
| Vanilla CSS | All styling — no Tailwind or CSS-in-JS |

---

## 🎨 Design System

### Color Palette

--black       #050a05    Page background
--dark        #0a1a0a    Card backgrounds
--green-500   #2ecc37    Primary green
--green-400   #4ddd57    Headings and highlights
--accent      #00ff41    Cursor glow and effects
--text-primary   #e8faea    Body text
--text-secondary #9ecfa5    Subtext
--text-muted     #4a7a50    Labels and captions

### Typography

Bebas Neue    — Display headings (hero titles)
Orbitron      — Section headings and nav
Exo 2         — Body text and paragraphs
Space Mono    — Labels, tags, monospace elements

## 📁 Project Structure

evolve-ev/
├── index.html                  ← Entry HTML with fonts and loader
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Sticky nav with slide indicator
│   │   ├── Footer.jsx          ← Contact, socials, map, newsletter
│   │   └── CustomCursor.jsx    ← Green glowing custom cursor
│   ├── pages/
│   │   ├── Home.jsx            ← Hero, stats, highlights, CTA
│   │   ├── Vidyut26.jsx        ← Events, timeline, register form
│   │   ├── Founders.jsx        ← Founder profiles and mission
│   │   └── About.jsx           ← Story, values, team, join us
│   ├── styles/
│   │   └── globals.css         ← All CSS variables and utilities
│   ├── App.jsx                 ← Router, particles, page transitions
│   └── main.jsx                ← React entry point
├── package.json
└── vite.config.js

 ✨ Features

- ⚡ **Custom green glowing cursor** with hover expand effect
- 🌀 **Page transitions** — smooth fade and slide between routes
- 🎯 **Scroll reveal animations** — sections animate in on scroll
- 📊 **Animated counters** — numbers count up when in viewport
- 🖼️ **Canvas background** — drifting radial glows on hero
- 🌐 **Embedded Google Map** — green-filtered to match theme
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🔤 **Glitch text effect** — on hero headline
- 🔄 **Spinning orbital rings** — on home hero visual
- 📋 **Register form** — with success state on Vidyut 26 page
- 📧 **Newsletter signup** — in footer with subscribed state
- 🍔 **Mobile menu** — full screen overlay with animated hamburger
- 🌑 **Noise + grid texture** — subtle background depth layers
- 💡 **Loading screen** — pulsing logo with progress bar
