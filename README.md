# Jayden Pillay | Developer Portfolio

A modern, interactive developer portfolio showcasing my professional experience, technical skills, projects, and approach to software engineering.

Built with React, TypeScript, and Tailwind CSS, the portfolio combines a clean, responsive interface with immersive animations, thoughtful interactions, and a consistent visual identity.

**Live Portfolio:** [Add your deployed portfolio URL](#)  
**LinkedIn:** [Connect with me on LinkedIn](https://www.linkedin.com/in/jayden-pillay-44947a261/)
**GitHub:** [Explore my repositories](https://github.com/JaydenPillay16/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Portfolio Sections](#portfolio-sections)
- [Design and User Experience](#design-and-user-experience)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [About Me](#about-me)
- [License](#license)

---

## Overview

This portfolio serves as my digital professional profile, bringing together my software engineering experience, technical capabilities, selected projects, and professional background in one place.

As an Associate Software Engineer at NTT DATA, I work across cloud technologies, contact centre solutions, automation, and enterprise software. This project reflects my interest in building solutions that are not only technically sound but also intuitive, accessible, and visually engaging.

The portfolio is designed around three principles:

- **Clarity:** Present professional information in a structured, easy-to-navigate format.
- **Experience:** Use purposeful animations and interactive elements to make browsing engaging.
- **Craftsmanship:** Pay attention to typography, spacing, responsive layouts, accessibility, and implementation quality.

Rather than functioning as a static CV, the portfolio provides an interactive overview of my work, skills, and continued development as a software engineer.

## Features

### Professional Profile
- Personal introduction and professional summary.
- Career experience and educational background.
- Technical skills and technology highlights.
- Selected projects and areas of expertise.
- Social links and contact options.

### Interactive User Experience
- Responsive layouts for desktop, tablet, and mobile.
- Cinematic, scroll-driven storytelling in the About section.
- Animated content reveals and transitions.
- Interactive highlight cards with subtle motion and visual effects.
- Hover interactions and polished micro-animations.
- Light and dark theme support.
- Smooth navigation between portfolio sections.

### Contact Experience
- Contact form for professional enquiries.
- Structured email notifications with sender information and message content.
- Custom HTML email template with a consistent portfolio-inspired design.
- Reply action designed to make responding to enquiries straightforward.

### Development and Maintainability
- Component-based React architecture.
- TypeScript for stronger typing and maintainable code.
- Reusable UI components and shared styling conventions.
- Git and GitHub for source control and version history.
- Deployment workflow designed for Vercel.

---

## Technology Stack

The portfolio uses a modern frontend development stack, supported by animation, icon, version control, and deployment tools.

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | Component-based user interface development |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and improved code maintainability |
| [Vite](https://vite.dev/) | Development server and production build tooling |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling and responsive layouts |
| [Motion for React](https://motion.dev/) | Animations, scroll-driven interactions, and transitions |
| [Lucide React](https://lucide.dev/) | Consistent icons throughout the interface |
| [Git](https://git-scm.com/) | Version control |
| [GitHub](https://github.com/) | Source code hosting and repository management |
| [Vercel](https://vercel.com/) | Portfolio deployment and hosting |

**Email:** Custom HTML and CSS email template for portfolio enquiry notifications. The specific email delivery provider depends on the contact form configuration.

---

## Portfolio Sections

### 1. Hero

Introduces me as a software engineer through a prominent personal introduction, professional visual, and clear calls to action.

### 2. About

Presents my background, interests, and approach to software development through a more interactive experience.

The section uses scroll-driven transitions and animated highlight cards to communicate qualities such as creativity, curiosity, problem-solving, and continuous growth.

### 3. Experience

Highlights my professional journey, responsibilities, and experience working with enterprise software, cloud services, and automation technologies.

### 4. Technologies

Showcases the technologies, tools, and platforms I use, with a focus on cloud development, automation, and modern software engineering.

### 5. Projects

Provides a place to explore selected projects and understand their purpose, technologies, and implementation.

### 6. Contact

Provides a straightforward way for recruiters, developers, and potential collaborators to get in touch.

The accompanying email notification template follows the portfolio's visual identity, using a dark navy background, restrained indigo accents, organised sender details, and a dedicated message area.

---

## Design and User Experience

The visual direction combines a professional developer aesthetic with subtle, cinematic interactions.

**Visual identity**
- Dark navy foundations with blue, cyan, and violet accents.
- Clean typography and carefully controlled spacing.
- Subtle gradients, ambient lighting, and restrained glow effects.
- Consistent visual language across sections and interactive elements.

**Motion and interaction**
- Scroll-reactive transitions that support the content.
- Interactive cards with depth and subtle pointer effects.
- Smooth entrance animations and hover feedback.
- Motion that enhances the experience without overwhelming the content.

**Responsive design**

Layouts and interactions are designed to adapt to different screen sizes, keeping the portfolio usable across desktop and mobile devices.

**Accessibility considerations**

The implementation aims to support readable contrast, semantic structure, meaningful link labels, and reduced-motion preferences where applicable.

---

## Getting Started

Follow these steps to run the portfolio locally.

### Prerequisites

Install the following before getting started:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's dependencies.
- npm, included with Node.js.
- [Git](https://git-scm.com/).
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/).

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/developer-portfolio.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Navigate to the project

```bash
cd developer-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, typically `http://localhost:5173`.

The development server supports hot module replacement, allowing changes to appear in the browser as you work.

### 5. Create a production build

```bash
npm run build
```

This generates an optimised production build in the `dist` directory.

### 6. Preview the production build

```bash
npm run preview
```

**Note:** These commands assume the project uses the standard Vite scripts. Check `package.json` if your configured scripts differ.

---

## Project Structure

The portfolio follows a component-based structure to keep page sections, reusable UI elements, assets, and styling organised.

```text
developer-portfolio/
├── public/
│   └── images/
│       ├── issuers/
│       └── technologies/
├── src/
│   ├── components/
│   │   └── ...
│   ├── sections/
│   │   ├── About.tsx
│   │   └── ...
│   ├── assets/
│   ├── hooks/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

*This is a representative structure. Keep the directory names aligned with the actual files and folders in your repository.*

### Architecture

- **Sections:** Contain the main portfolio experiences, such as About and Experience.
- **Components:** Provide reusable interface elements and visual building blocks.
- **Assets:** Store images, technology logos, and other static resources.
- **Hooks:** Hold reusable React logic where appropriate.
- **Application entry points:** Initialise the React application and render the main app.

---

## Configuration

### Environment Variables

If the contact form or another integration requires API keys or service credentials, configure them through environment variables rather than hardcoding secrets into source files.

For Vite, client-side environment variables exposed to browser code generally use the `VITE_` prefix. **Values exposed this way are not secret.** Never place private API keys, passwords, or server-side credentials in client-exposed variables.

For example, a local `.env` file might contain placeholder configuration such as:

```dotenv
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

These are illustrative names only. Use the exact variable names required by your configured email service, if applicable.

Keep local environment files out of version control. If the project requires shared configuration, provide an `.env.example` file containing placeholder values only.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs the linter, if configured |

Available commands depend on the scripts defined in `package.json`. Confirm the exact list in your repository before relying on optional commands.

---

## Deployment

The portfolio can be deployed using [Vercel](https://vercel.com/).

### Recommended deployment workflow

1. Push the latest changes to GitHub.
2. Import the repository into Vercel, or connect the existing project to the repository.
3. Confirm the build command is `npm run build`.
4. Confirm the output directory is `dist`.
5. Configure any required environment variables in Vercel.
6. Deploy and verify the production website.

When GitHub integration is enabled, subsequent pushes to the configured production branch can trigger deployments automatically.

After deployment, test the website on desktop and mobile, check navigation and interactive sections, and submit a test contact form to verify the email workflow.

---

## Future Improvements

Potential areas for continued development include:

- Further refinements to scroll-driven storytelling and transitions.
- Additional project case studies with implementation details.
- Expanded accessibility testing and performance optimisation.
- Improved mobile interaction and animation tuning.
- More detailed project demonstrations and technical write-ups.
- Continued refinement of the contact experience and email delivery workflow.

---

## About Me

I'm Jayden Pillay, a software engineer based in Johannesburg, South Africa, with experience in cloud technologies, automation, and enterprise software development.

My professional experience includes working with AWS services, Amazon Connect, Terraform, CI/CD workflows, and Microsoft Power Platform.

I'm interested in building practical, reliable solutions while continuing to develop my skills in software engineering, cloud architecture, and modern application development.

I'm always interested in connecting with fellow developers, learning from new challenges, and exploring opportunities to build meaningful technology.

**Let's connect:**

- LinkedIn: [Add your LinkedIn profile URL](https://www.linkedin.com/)
- GitHub: [Add your GitHub profile URL](https://github.com/)
- Portfolio: [Add your live portfolio URL](#)

---

## License

Unless otherwise specified, the source code is provided for portfolio and demonstration purposes. No separate open-source licence is granted unless a `LICENSE` file is included in this repository.

