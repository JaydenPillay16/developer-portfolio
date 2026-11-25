# Jayden Pillay | Software Engineer

I’m a software engineer at NTT DATA, based in Johannesburg, South Africa. I build and support cloud solutions, enterprise applications, and automation workflows, with experience across AWS, Amazon Connect, Terraform, CI/CD, and Microsoft Power Platform.

This repository contains the source for my portfolio, including my experience, projects, skills, education, certifications, and ways to get in touch.

**Portfolio:** [jayden-pillay.co.za](https://jayden-pillay.co.za/) · **LinkedIn:** [Connect with me](https://www.linkedin.com/in/jayden-pillay-44947a261/) · **GitHub:** [JaydenPillay16](https://github.com/JaydenPillay16)

## About the portfolio

The portfolio uses a dark navy, cobalt blue, and cool white visual system. Its responsive sections present my background and work with a focus on readable content, accessible interactions, and restrained motion.

- **About:** My background and approach to engineering.
- **Skills:** Languages, cloud services, platforms, and tools.
- **Experience:** A timeline of my professional work.
- **Projects:** Selected technical work and systems.
- **Education and certifications:** My academic background and professional development.
- **Contact:** An EmailJS form and professional links.

## Technology

| Technology | How it’s used |
|:---|:---|
| [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) | Component-based interface and application code |
| [Vite](https://vite.dev/) | Local development and production builds |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling |
| [GSAP](https://gsap.com/) and ScrollTrigger | Timelines and scroll-linked section animations |
| [Three.js](https://threejs.org/) | The optional WebGL light sweep behind the hero portrait |
| [Motion for React](https://motion.dev/) | Interface transitions and interaction feedback |
| [Lucide React](https://lucide.dev/) and React Icons | Interface and technology icons |
| [EmailJS](https://www.emailjs.com/) | Contact form message delivery |
| [GitHub](https://github.com/) and [Vercel](https://vercel.com/) | Source control and deployment |

The hero uses a transparent portrait cutout and a CSS halo. The Three.js sweep loads lazily on larger screens, pauses when it is off-screen or the tab is hidden, and is skipped when reduced motion is enabled. The site provides static fallbacks for reduced motion and unsupported WebGL.

## Run it locally

### Requirements

- Node.js and npm
- Git

### Setup

```bash
git clone https://github.com/JaydenPillay16/developer-portfolio.git
cd developer-portfolio
npm ci
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

### Available commands

| Command | Description |
|:---|:---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks and builds the production site in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs Oxlint on the project |

## Project structure

```text
public/
├── fonts/              # Locally hosted Space Grotesk and DM Sans fonts
└── images/             # Portrait, certification, institution, issuer, and technology artwork
src/
├── assets/             # Imported brand assets
├── components/         # Shared interface components and hero animation
├── sections/           # Hero, About, Skills, Experience, Projects, and other sections
├── App.tsx             # Page composition and scroll animation setup
└── scrollMotion.ts     # GSAP ScrollTrigger effects and hero-to-About handoff
index.html              # Page metadata and social preview settings
```

## Contact form configuration

The contact form uses EmailJS. Its service, template, and public key are configured in `src/components/config/contact.ts`. Keep the EmailJS public key restricted to the portfolio’s allowed domains and configure appropriate rate limits in EmailJS. Never put private credentials in browser code.

## Deployment

The site is hosted on Vercel and connected to this GitHub repository. A push to the configured production branch triggers a deployment. The production build command is `npm run build`, and Vite outputs the site to `dist/`.

## Let’s connect

- **LinkedIn:** [linkedin.com/in/jayden-pillay-44947a261](https://www.linkedin.com/in/jayden-pillay-44947a261/)
- **GitHub:** [github.com/JaydenPillay16](https://github.com/JaydenPillay16)
- **Portfolio:** [jayden-pillay.co.za](https://jayden-pillay.co.za/)

This repository is a portfolio and demonstration of my work. It does not include a separate open-source license.
