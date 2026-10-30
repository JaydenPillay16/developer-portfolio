# Jayden Pillay | Software Engineer

I’m a software engineer at NTT DATA, based in Johannesburg, South Africa. I build and support cloud solutions, enterprise applications, and automation workflows, with experience across AWS, Amazon Connect, Terraform, CI/CD, and Microsoft Power Platform.

This repository contains the source for my portfolio: a closer look at my experience, projects, education, certifications, and the way I approach building useful technology.

**Portfolio:** [jayden-pillay.co.za](https://jayden-pillay.co.za/) · **LinkedIn:** [Connect with me](https://www.linkedin.com/in/jayden-pillay-44947a261/) · **GitHub:** [JaydenPillay16](https://github.com/JaydenPillay16)

---

## About this portfolio

The site is designed to make my professional background easy to explore. It brings together my career journey, technical interests, selected work, and ways to get in touch in one responsive experience.

### What you’ll find

- **Experience:** Roles and work across software development, DevOps, cloud, and enterprise applications.
- **Projects:** Selected work with context about its purpose and the tools involved.
- **Technologies:** A visual overview of the languages, platforms, and tools I use.
- **Education and certifications:** My academic background and professional development.
- **Contact:** A form and professional links for opportunities and collaboration.

### Design and implementation

- Responsive layouts for desktop and mobile.
- A consistent dark navy visual identity with blue, cyan, and violet accents.
- Scroll-aware section layouts, animated transitions, and interactive cards.
- Reduced-motion support and semantic navigation.
- A component-based React application with TypeScript.

## Technology

| Technology | How it’s used |
|:---|:---|
| [React](https://react.dev/) | Building the portfolio interface from reusable components |
| [TypeScript](https://www.typescriptlang.org/) | Adding clear types to UI components and application code |
| [Vite](https://vite.dev/) | Local development and production builds |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling and visual design |
| [Motion for React](https://motion.dev/) | Scroll effects, transitions, and interaction feedback |
| [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/) | Interface and technology icons |
| [EmailJS](https://www.emailjs.com/) | Contact form message delivery |
| [GitHub](https://github.com/) and [Vercel](https://vercel.com/) | Source control and deployment |

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

Open the local address printed by Vite (usually `http://localhost:5173`).

### Available commands

| Command | Description |
|:---|:---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Type-checks and builds the production site in `dist/` |
| `npm run preview` | Serves the production build locally for review |
| `npm run lint` | Runs Oxlint on the project |

## Project structure

```text
public/
└── images/             # Certification, institution, issuer, and technology artwork
src/
├── assets/             # Imported visual assets
├── components/         # Shared interface components and contact configuration
├── sections/           # Hero, About, Experience, Projects, and other page sections
├── App.tsx             # Page composition
└── main.tsx            # Application entry point
index.html              # Page metadata and social preview settings
```

## Contact form configuration

The contact form uses EmailJS. Its service, template, and public key are configured in `src/components/config/contact.ts`. Keep the EmailJS public key restricted to the portfolio’s allowed domains and configure appropriate rate limits in EmailJS. Never put private credentials in browser code.

## Deployment

The site is hosted on Vercel and connected to this GitHub repository. A push to the configured production branch triggers a deployment. The production build command is `npm run build`, and Vite outputs the site to `dist/`.

---

## Let’s connect

- **LinkedIn:** [linkedin.com/in/jayden-pillay-44947a261](https://www.linkedin.com/in/jayden-pillay-44947a261/)
- **GitHub:** [github.com/JaydenPillay16](https://github.com/JaydenPillay16)
- **Portfolio:** [jayden-pillay.co.za](https://jayden-pillay.co.za/)

---

This repository is a portfolio and demonstration of my work. It does not include a separate open-source license.
