<div align="center">

# 🚀 Federico López - Senior Frontend Engineer Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://fedelopez89.github.io/federico-lopez-portfolio)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**Modern, high-performance portfolio built with cutting-edge technologies**

_Showcasing 16 years of IT experience with 7+ years specializing in modern frontend development_

[View Live Demo](https://fedelopez89.github.io/federico-lopez-portfolio) • [Report Bug](https://github.com/fedelopez89/federico-lopez-portfolio/issues) • [Request Feature](https://github.com/fedelopez89/federico-lopez-portfolio/issues)

</div>

---

## ✨ Highlights

🎯 **[Featured in The New York Times](https://www.linkedin.com/posts/svanweelden_silicon-valley-builds-amazon-and-gmail-copycats-activity-7404333944894398465-CIyW/)** - Recognized for exceptional frontend engineering contributions  
⚡ **Lightning Fast** - FCP: 320ms, TTFB: 20ms (Web Vitals Core)  
🎨 **Modern Architecture** - React 19, TypeScript 5.9, Component-Driven Design  
♿ **Accessible** - WCAG 2.1 compliant with semantic HTML  
📱 **Responsive** - Mobile-first, works seamlessly across all devices  
🌗 **Theme Support** - Smooth dark/light mode with system preference detection

---

## 🛠️ Tech Stack

### Core

![React](https://img.shields.io/badge/React-19.2.4-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)

### Styling & Animation

![Styled Components](https://img.shields.io/badge/Styled_Components-6.3.9-DB7093?logo=styled-components&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.34-0055FF?logo=framer&logoColor=white)

### Tools & Optimization

![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E?logo=prettier&logoColor=black)
![Web Vitals](https://img.shields.io/badge/Web_Vitals-5.1-brightgreen)

---

## 🏆 Featured Projects

### 🌟 AI Evaluation Platform Clones (Featured in NYT)

Production-ready replicas built for REAL Evals AI testing platform:

- **Gmail Clone** - Full email management with labels, search, compose | [Demo](https://real-gomail.vercel.app/)
- **DoorDash Clone** - Restaurant browsing, cart, checkout | [Demo](https://real-dashdish.vercel.app/)
- **Uber Clone** - Real-time maps, route calculation | [Demo](https://real-udriver.vercel.app/)
- **United Airlines** - Flight search, seat selection, booking | [Demo](https://real-flyunified.vercel.app/)

**Tech**: React, TypeScript, Next.js, Material UI, Redux

### 🏈 RCX Sports League Finders

Enterprise search platforms for fantasy sports leagues:

- **NFL League Finder** - [nfl.playrcx.com](https://nfl.playrcx.com/)
- **NBA League Finder** - [jrnba.playrcx.com](https://jrnba.playrcx.com/)
- **NHL League Finder** - [street.playrcx.com](https://street.playrcx.com/)
- **MLS League Finder** - [go.playrcx.com](https://go.playrcx.com/)

**Tech**: React, TypeScript, Next.js, Context API, Chakra UI, Google Maps API, REST API

### 💼 FactuPro - Invoice Management SaaS

Complete billing system for SMBs with payment tracking and automation.  
[Live Demo](https://app.factupro.es/login)

**Tech**: Next.js, Shadcn UI, React Hook Form, Tailwind CSS, SSR, CI/CD

---

## 📊 Performance Metrics

```
Lighthouse Score (Desktop):
  Performance: ████████████████████ 98/100
  Accessibility: ██████████████████ 100/100
  Best Practices: ████████████████ 100/100
  SEO: ████████████████████████ 100/100

Core Web Vitals:
  FCP (First Contentful Paint): 320ms ✅
  LCP (Largest Contentful Paint): <1.5s ✅
  CLS (Cumulative Layout Shift): 0.05 ✅
  TTFB (Time to First Byte): 20ms ✅
```

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 or yarn >= 1.22.0
```

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/fedelopez89/federico-lopez-portfolio.git
cd federico-lopez-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
# 🎉 Open http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Available Scripts

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start Vite dev server on http://localhost:5173 |
| `npm run build`        | Build for production (optimized bundle)        |
| `npm run preview`      | Preview production build locally               |
| `npm run lint`         | Run ESLint with auto-fix                       |
| `npm run format`       | Format code with Prettier                      |
| `npm run format:check` | Check code formatting                          |
| `npm run type-check`   | TypeScript type checking (no emit)             |
| `npm run deploy`       | Deploy to GitHub Pages                         |

---

## 🏗️ Project Architecture

```
resume/
├── 📁 public/              # Static assets
│   ├── images/             # Image assets
│   └── pdf/                # Resume PDF
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── Header/         # Navigation & hero
│   │   ├── Footer/         # Footer component
│   │   ├── Main/           # Main layout wrapper
│   │   ├── Sections/       # Content sections
│   │   │   ├── AboutMe/    # Introduction section
│   │   │   ├── Skills/     # Skills showcase
│   │   │   ├── Experience/ # Work history
│   │   │   └── Education/  # Academic background
│   │   ├── layout/         # Layout utilities
│   │   │   └── ScrollToTop/# Scroll-to-top button
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx  # Button component
│   │   │   ├── Card.tsx    # Card component
│   │   │   ├── Badge.tsx   # Badge component
│   │   │   ├── Image.tsx   # Lazy-loaded image
│   │   │   └── ...         # Other UI primitives
│   │   └── ThemeToggle/    # Dark/light mode toggle
│   ├── 📁 context/         # React Context
│   │   └── ThemeContext.tsx # Theme provider & hook
│   ├── 📁 data/            # JSON data
│   │   ├── skills.ts       # Skills data
│   │   ├── experience.json # Work experience
│   │   ├── education.json  # Education history
│   │   └── contactme.json  # Contact information
│   ├── 📁 hooks/           # Custom React hooks
│   │   ├── useScrollToTop.ts
│   │   └── useNavbarScroll.ts
│   ├── 📁 styles/          # Styling
│   │   ├── theme.ts        # Theme configuration
│   │   ├── GlobalStyles.ts # Global CSS
│   │   └── styled.d.ts     # Styled-components types
│   ├── 📁 types/           # TypeScript definitions
│   ├── 📁 utils/           # Utility functions
│   │   └── reportWebVitals.ts # Performance monitoring
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── .editorconfig           # Editor configuration
├── .prettierrc             # Prettier config
├── eslint.config.js        # ESLint configuration
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies & scripts
```

---

## 🎨 Key Features

### 🎭 **Design System**

- Custom theme with dark/light mode support
- Consistent spacing, typography, and color scales
- Reusable component library with TypeScript interfaces

### ⚡ **Performance Optimizations**

- **Code Splitting**: React.lazy() for route-based splitting
- **Lazy Loading**: IntersectionObserver for images
- **Bundle Optimization**: Manual chunks for vendor libraries
- **Tree Shaking**: Dead code elimination with Vite
- **Asset Optimization**: Compressed images and fonts preloading

### 🎬 **Smooth Animations**

- Framer Motion for declarative animations
- Scroll-triggered reveals with `whileInView`
- Optimized for 60fps performance

### 🧪 **Developer Experience**

- TypeScript strict mode for type safety
- ESLint + Prettier for code quality
- Hot Module Replacement (HMR) with Vite
- Path aliases (`@/`) for clean imports

### 📱 **Accessibility**

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management

---

## 🌐 Browser Support

| Browser | Version            |
| ------- | ------------------ |
| Chrome  | Last 2 versions ✅ |
| Firefox | Last 2 versions ✅ |
| Safari  | Last 2 versions ✅ |
| Edge    | Last 2 versions ✅ |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/fedelopez89/federico-lopez-portfolio/issues).

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

## 👤 About Me

<div align="center">

**Federico López**  
_Senior Frontend Engineer_

🎯 **16 Years IT Experience** | 7+ Years Modern Frontend Development  
🌟 **Featured in The New York Times** for innovative AI evaluation platform  
🌍 **100% Remote** | Working with global clients across 3 continents  
💼 **7+ Enterprise Clients** | Bonzzu, Science37, Vrio, REAL Evals

### Specializations

`React` `TypeScript` `Next.js` `Redux` `Performance Optimization` `Component Architecture`

### Career Highlights

- 🏢 **Senior Frontend Engineer @ Bonzzu** (2022 - Present)
- 🎨 **Built 4 production clones featured by NYT** for REAL Evals
- 🏈 **Developed 4 fantasy sports platforms** for RCX Sports
- 💰 **Created enterprise invoicing SaaS** from scratch (FactuPro)
- 🏦 **6+ years in fintech** (ICBC, BBVA) building mission-critical systems

[![LinkedIn](https://img.shields.io/badge/LinkedIn-federicoglopez-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/federicoglopez/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-success?style=for-the-badge&logo=vercel)](https://fedelopez89.github.io/federico-lopez-portfolio)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fede.lopez89@gmail.com)

</div>

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Built with React, TypeScript & Vite

</div>
