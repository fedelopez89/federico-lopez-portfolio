import{j as r,m as l}from"./animation-vendor-A5lK5uU-.js";import{l as t,r as p}from"./styled-vendor-FewTp2Xz.js";import{a as m,S as g,b as h}from"./SectionTitle-BFmgpo8B.js";const a=e=>`/federico-lopez-portfolio/${e.replace(/^\//,"")}`,s=[{id:"real-evals-gmail",title:"Gmail Clone - REAL Evals",description:"Production-ready Gmail replica built for AI evaluation platform. Featured in The New York Times for innovative AI testing approach. Pixel-perfect recreation implementing email management, compose functionality, labels, folders, and advanced search. Built with Next.js and Material UI for optimal performance and accessibility.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-gomail.vercel.app/",imageUrl:a("/images/projects/gmail-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-dashdish",title:"DoorDash Clone - REAL Evals",description:"High-fidelity food delivery platform clone featuring restaurant browsing, menu exploration, cart management, and checkout flow. Built with Next.js and Material UI to replicate DoorDash user experience with responsive design and smooth interactions.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-dashdish.vercel.app/",imageUrl:a("/images/projects/dashdish-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-uber",title:"Uber Clone - REAL Evals",description:"Comprehensive ride-sharing platform clone with real-time map integration, route calculation, pricing estimates, and driver matching simulation. Featured in The New York Times as part of REAL Evals AI testing platform. Built with Next.js and Material UI.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-udriver.vercel.app/",imageUrl:a("/images/projects/uber-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-united",title:"United Airlines Clone - REAL Evals",description:"Full-featured airline booking platform clone replicating United Airlines flight search, seat selection, booking flow, and trip management. Implements complex multi-step forms, real-time availability, and responsive design with Next.js and Material UI.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-flyunified.vercel.app/",imageUrl:a("/images/projects/united-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"nfl-league-finder",title:"NFL League Finder - RCX Sports",description:"Advanced search and discovery platform for NFL fantasy leagues. Features comprehensive filtering, real-time league data, team rosters, player stats, and league settings explorer. Built for RCX Sports platform to enhance league discovery experience.",technologies:["React","TypeScript","Next.js","Context API","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://nfl.playrcx.com/",imageUrl:a("/images/projects/nfl-finder-opt.webp"),category:"professional"},{id:"nba-league-finder",title:"NBA League Finder - RCX Sports",description:"Search and discovery tool for NBA fantasy leagues with advanced filtering capabilities. Displays league information, team details, player rosters, and real-time statistics. Optimized for performance with thousands of leagues.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://jrnba.playrcx.com/",imageUrl:a("/images/projects/nba-finder-opt.webp"),category:"professional"},{id:"nhl-league-finder",title:"NHL League Finder - RCX Sports",description:"Comprehensive NHL fantasy league browser with filtering by league type, size, and settings. Features team analysis, player statistics, and league standings. Built with responsive design for seamless mobile and desktop experience.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://street.playrcx.com/",imageUrl:a("/images/projects/nhl-finder-opt.webp"),category:"professional"},{id:"mls-league-finder",title:"MLS League Finder - RCX Sports",description:"Soccer fantasy league discovery platform for MLS leagues. Enables users to search, filter, and explore leagues with detailed team rosters, player stats, and league configurations. Implements real-time data updates and intuitive navigation.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://go.playrcx.com/",imageUrl:a("/images/projects/mls-finder-opt.webp"),category:"professional"},{id:"factupro",title:"FactuPro - Invoice Management",description:"Complete invoice and billing management system for SMBs. Implemented invoice generation, payment tracking, client management, and automated reminders with responsive design and accessibility compliance.",technologies:["React","TypeScript","Next.js","Shadcn UI","React Hook Form","Tailwind CSS","REST API","SSR","CI/CD"],demoUrl:"https://app.factupro.es/login?from=%2F",imageUrl:a("/images/projects/factupro-opt.webp"),category:"freelance"}],u=["All","React","TypeScript","Next.js","Redux","Material UI","Chakra UI","Context API","REST API","Google Maps API","Shadcn UI","React Hook Form","Tailwind CSS","CI/CD"],f=t(l.article)`
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,x=t.div`
  width: 100%;
  height: 200px;
  background: ${({theme:e})=>e.colors.background};
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`,y=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,w=t.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.primary}20 0%,
    ${({theme:e})=>e.colors.accent}20 100%
  );

  svg {
    width: 64px;
    height: 64px;
    opacity: 0.3;
  }
`,b=t.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({theme:e})=>e.colors.primary};
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`,v=t.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({theme:e})=>e.colors.text};
`,j=t.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-bottom: 1rem;
  flex-grow: 1;
`,I=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,k=t.span`
  background: ${({theme:e})=>e.colors.primary}15;
  color: ${({theme:e})=>e.colors.primary};
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
`,S=t.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`,c=t.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.primary};
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({theme:e})=>e.colors.primaryHover};
    color: white;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary};
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,U=t(c)`
  background: transparent;
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>e.colors.primary};

  &:hover {
    background: ${({theme:e})=>e.colors.primary}10;
  }
`,C=({project:e,index:i})=>r.jsxs(f,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:i*.1},children:[r.jsxs(x,{children:[e.imageUrl?r.jsx(y,{src:e.imageUrl,alt:e.title,loading:i<2?"eager":"lazy",fetchPriority:i===0?"high":"auto",decoding:"async"}):r.jsx(w,{children:r.jsx("svg",{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"})})}),e.featured&&e.featuredLabel&&r.jsx(b,{children:e.featuredLabel})]}),r.jsx(v,{children:e.title}),r.jsx(j,{children:e.description}),r.jsx(I,{role:"list","aria-label":"Technologies used",children:e.technologies.map(n=>r.jsx(k,{role:"listitem",children:n},n))}),r.jsxs(S,{children:[e.demoUrl&&r.jsxs(c,{href:e.demoUrl,target:"_blank",rel:"noopener noreferrer","aria-label":`View live demo of ${e.title}`,children:[r.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),"Live Demo"]}),e.repoUrl&&r.jsxs(U,{href:e.repoUrl,target:"_blank",rel:"noopener noreferrer","aria-label":`View source code of ${e.title} on GitHub`,children:[r.jsx("svg",{fill:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})}),"Code"]})]})]}),T=t.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,R=t(l.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`,A=t.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({theme:e,$isActive:i})=>i?e.colors.primary:e.colors.border};
  background: ${({theme:e,$isActive:i})=>i?e.colors.primary:"transparent"};
  color: ${({theme:e,$isActive:i})=>i?"white":e.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({theme:e,$isActive:i})=>i?e.colors.primaryHover:e.colors.primary}15;
    border-color: ${({theme:e})=>e.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary};
    outline-offset: 2px;
  }
`,$=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`,L=t(l.div)`
  text-align: center;
  padding: 4rem 1rem;
  color: ${({theme:e})=>e.colors.textSecondary};

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.3;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({theme:e})=>e.colors.text};
  }

  p {
    font-size: 0.9375rem;
  }
`,M=()=>{const[e,i]=p.useState("All"),n=e==="All"?s:s.filter(o=>o.technologies.includes(e));return r.jsxs(T,{id:"projects","aria-label":"Projects showcase",children:[r.jsxs(m,{children:[r.jsx(g,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},children:"projects"}),r.jsx(h,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:"A selection of my work, including projects featured in The New York Times"})]}),r.jsx(R,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.2},role:"group","aria-label":"Filter projects by technology",children:u.map(o=>r.jsx(A,{$isActive:e===o,onClick:()=>i(o),"aria-pressed":e===o,"aria-label":`Filter by ${o}`,children:o},o))}),n.length>0?r.jsx($,{children:n.map((o,d)=>r.jsx(C,{project:o,index:d},o.id))}):r.jsxs(L,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:[r.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),r.jsx("h3",{children:"No projects found"}),r.jsx("p",{children:"Try selecting a different technology filter"})]})]})};export{M as default};
