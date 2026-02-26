import{j as t,m as c}from"./animation-vendor-A5lK5uU-.js";import{l as r,r as u}from"./styled-vendor-FewTp2Xz.js";import{u as g}from"./index-BnV5lh9s.js";import{a as f,S as x,b as y}from"./SectionTitle-BFmgpo8B.js";import"./react-vendor-C1xc24pP.js";const a=e=>`/federico-lopez-portfolio/${e.replace(/^\//,"")}`,m=[{id:"real-evals-gmail",title:"Gmail Clone - REAL Evals",description:"Production-ready Gmail replica built for AI evaluation platform. Featured in The New York Times for innovative AI testing approach. Pixel-perfect recreation implementing email management, compose functionality, labels, folders, and advanced search. Built with Next.js and Material UI for optimal performance and accessibility.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-gomail.vercel.app/",imageUrl:a("/images/projects/gmail-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-dashdish",title:"DoorDash Clone - REAL Evals",description:"High-fidelity food delivery platform clone featuring restaurant browsing, menu exploration, cart management, and checkout flow. Built with Next.js and Material UI to replicate DoorDash user experience with responsive design and smooth interactions.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-dashdish.vercel.app/",imageUrl:a("/images/projects/dashdish-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-uber",title:"Uber Clone - REAL Evals",description:"Comprehensive ride-sharing platform clone with real-time map integration, route calculation, pricing estimates, and driver matching simulation. Featured in The New York Times as part of REAL Evals AI testing platform. Built with Next.js and Material UI.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-udriver.vercel.app/",imageUrl:a("/images/projects/uber-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"real-evals-united",title:"United Airlines Clone - REAL Evals",description:"Full-featured airline booking platform clone replicating United Airlines flight search, seat selection, booking flow, and trip management. Implements complex multi-step forms, real-time availability, and responsive design with Next.js and Material UI.",technologies:["React","TypeScript","Next.js","Material UI","Redux"],demoUrl:"https://real-flyunified.vercel.app/",imageUrl:a("/images/projects/united-clone-opt.webp"),featured:!0,featuredLabel:"Featured in The New York Times",category:"freelance"},{id:"nfl-league-finder",title:"NFL League Finder - RCX Sports",description:"Advanced search and discovery platform for NFL fantasy leagues. Features comprehensive filtering, real-time league data, team rosters, player stats, and league settings explorer. Built for RCX Sports platform to enhance league discovery experience.",technologies:["React","TypeScript","Next.js","Context API","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://nfl.playrcx.com/",imageUrl:a("/images/projects/nfl-finder-opt.webp"),category:"professional"},{id:"nba-league-finder",title:"NBA League Finder - RCX Sports",description:"Search and discovery tool for NBA fantasy leagues with advanced filtering capabilities. Displays league information, team details, player rosters, and real-time statistics. Optimized for performance with thousands of leagues.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://jrnba.playrcx.com/",imageUrl:a("/images/projects/nba-finder-opt.webp"),category:"professional"},{id:"nhl-league-finder",title:"NHL League Finder - RCX Sports",description:"Comprehensive NHL fantasy league browser with filtering by league type, size, and settings. Features team analysis, player statistics, and league standings. Built with responsive design for seamless mobile and desktop experience.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://street.playrcx.com/",imageUrl:a("/images/projects/nhl-finder-opt.webp"),category:"professional"},{id:"mls-league-finder",title:"MLS League Finder - RCX Sports",description:"Soccer fantasy league discovery platform for MLS leagues. Enables users to search, filter, and explore leagues with detailed team rosters, player stats, and league configurations. Implements real-time data updates and intuitive navigation.",technologies:["React","TypeScript","Next.js","Context API","REST API","Google Maps API","Chakra UI"],demoUrl:"https://go.playrcx.com/",imageUrl:a("/images/projects/mls-finder-opt.webp"),category:"professional"},{id:"factupro",title:"FactuPro - Invoice Management",description:"Complete invoice and billing management system for SMBs. Implemented invoice generation, payment tracking, client management, and automated reminders with responsive design and accessibility compliance.",technologies:["React","TypeScript","Next.js","Shadcn UI","React Hook Form","Tailwind CSS","REST API","SSR","CI/CD"],demoUrl:"https://app.factupro.es/login?from=%2F",imageUrl:a("/images/projects/factupro-opt.webp"),category:"freelance"}],b=["All","React","TypeScript","Next.js","Redux","Material UI","Chakra UI","Context API","REST API","Google Maps API","Shadcn UI","React Hook Form","Tailwind CSS","CI/CD"],w=r(c.article)`
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
`,v=r.div`
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
`,j=r.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,I=r.div`
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
`,S=r.span`
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
`,k=r.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({theme:e})=>e.colors.text};
`,U=r.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin-bottom: 1rem;
  flex-grow: 1;
`,C=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,T=r.span`
  background: ${({theme:e})=>e.colors.primary}15;
  color: ${({theme:e})=>e.colors.primary};
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
`,R=r.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`,h=r.a`
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
`,$=r(h)`
  background: transparent;
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>e.colors.primary};

  &:hover {
    background: ${({theme:e})=>e.colors.primary}10;
  }
`,A=({project:e,index:i})=>{const{t:n}=g(),s=e.id.replace(/-/g,""),o=n(`projects.${s}.title`,{defaultValue:e.title}),l=n(`projects.${s}.description`,{defaultValue:e.description}),d=e.featured?n("projects.nytLabel"):"";return t.jsxs(w,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:i*.1},children:[t.jsxs(v,{children:[e.imageUrl?t.jsx(j,{src:e.imageUrl,alt:e.title,loading:i<2?"eager":"lazy",fetchPriority:i===0?"high":"auto",decoding:"async"}):t.jsx(I,{children:t.jsx("svg",{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"})})}),e.featured&&d&&t.jsx(S,{children:d})]}),t.jsx(k,{children:o}),t.jsx(U,{children:l}),t.jsx(C,{role:"list","aria-label":"Technologies used",children:e.technologies.map(p=>t.jsx(T,{role:"listitem",children:p},p))}),t.jsxs(R,{children:[e.demoUrl&&t.jsxs(h,{href:e.demoUrl,target:"_blank",rel:"noopener noreferrer","aria-label":`View live demo of ${e.title}`,children:[t.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),n("buttons.liveDemo")]}),e.repoUrl&&t.jsxs($,{href:e.repoUrl,target:"_blank",rel:"noopener noreferrer","aria-label":`View source code of ${e.title} on GitHub`,children:[t.jsx("svg",{fill:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})}),n("buttons.code")]})]})]})},L=r.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,P=r(c.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`,M=r.button`
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
`,N=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`,F=r(c.div)`
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
`,G=()=>{const{t:e}=g(),[i,n]=u.useState("All"),s=i==="All"?m:m.filter(o=>o.technologies.includes(i));return t.jsxs(L,{id:"projects","aria-label":"Projects showcase",children:[t.jsxs(f,{children:[t.jsx(x,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},children:e("sections.projects")}),t.jsx(y,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:e("projects.subtitle")})]}),t.jsx(P,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.2},role:"group","aria-label":e("projects.filterLabel"),children:b.map(o=>t.jsx(M,{$isActive:i===o,onClick:()=>n(o),"aria-pressed":i===o,"aria-label":`Filter by ${o}`,children:o},o))}),s.length>0?t.jsx(N,{children:s.map((o,l)=>t.jsx(A,{project:o,index:l},o.id))}):t.jsxs(F,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.3},children:[t.jsx("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),t.jsx("h3",{children:e("projects.emptyState.title")}),t.jsx("p",{children:e("projects.emptyState.description")})]})]})};export{G as default};
