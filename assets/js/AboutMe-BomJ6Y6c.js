import{m as o,j as i}from"./animation-vendor-A5lK5uU-.js";import{e as d,c}from"./dateCalculations-psY9vaM7.js";import{l as r}from"./styled-vendor-FewTp2Xz.js";import{S as p}from"./SectionTitle-BFmgpo8B.js";const m=r.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,g=r(o.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    135deg,
    ${({theme:e})=>e.colors.primary} 0%,
    ${({theme:e})=>e.colors.accent} 100%
  );
  color: white;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  font-weight: ${({theme:e})=>e.typography.fontWeight.semibold};
  font-size: ${({theme:e})=>e.typography.fontSize.sm};
  margin-bottom: ${({theme:e})=>e.spacing.xl};
  box-shadow: ${({theme:e})=>e.shadows.lg};

  svg {
    flex-shrink: 0;
  }

  a {
    color: white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
    transition: opacity ${({theme:e})=>e.transitions.fast};

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSize.xs};
    padding: 0.625rem 1.25rem;
  }
`,h=r(o.div)`
  p {
    color: ${({theme:e})=>e.colors.textSecondary};
    line-height: ${({theme:e})=>e.typography.lineHeight.relaxed};
    margin-bottom: ${({theme:e})=>e.spacing.lg};
    font-size: ${({theme:e})=>e.typography.fontSize.lg};

    @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
      font-size: ${({theme:e})=>e.typography.fontSize.base};
    }

    strong {
      color: ${({theme:e})=>e.colors.primary};
      font-weight: ${({theme:e})=>e.typography.fontWeight.semibold};
    }
  }
`,y=r(o.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};
  margin: ${({theme:e})=>e.spacing.xl} 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({theme:e})=>e.spacing.md};
    margin: ${({theme:e})=>e.spacing.lg} 0;
  }
`,x=r(o.div)`
  text-align: center;
  padding: ${({theme:e})=>e.spacing.md};
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  transition: all ${({theme:e})=>e.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({theme:e})=>e.shadows.lg};
    border-color: ${({theme:e})=>e.colors.primary};
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: ${({theme:e})=>e.spacing.sm};
  }
`,f=r.div`
  font-size: ${({theme:e})=>e.typography.fontSize["3xl"]};
  font-weight: ${({theme:e})=>e.typography.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin-bottom: ${({theme:e})=>e.spacing.xs};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSize["2xl"]};
  }
`,u=r.div`
  font-size: ${({theme:e})=>e.typography.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: ${({theme:e})=>e.typography.fontWeight.medium};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSize.xs};
  }
`;r(o.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  justify-content: center;
  margin-top: ${({theme:e})=>e.spacing.xl};
`;r(o.span)`
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.primary}15;
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>e.colors.primary}30;
  border-radius: ${({theme:e})=>e.borderRadius.base};
  font-size: ${({theme:e})=>e.typography.fontSize.sm};
  font-weight: ${({theme:e})=>e.typography.fontWeight.medium};
  cursor: default;
  transition: all ${({theme:e})=>e.transitions.fast};

  &:hover {
    background: ${({theme:e})=>e.colors.primary}25;
    border-color: ${({theme:e})=>e.colors.primary};
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0.375rem 0.75rem;
    font-size: ${({theme:e})=>e.typography.fontSize.xs};
  }
`;const j=()=>{const{experiences:e}=d,n=e.find(t=>t.id==="fullstackFreelance"),a=n?c(n.start.month,n.start.year):"7+",s=[{number:a,label:"Years Experience"},{number:"7+",label:"Enterprise Clients"},{number:"100%",label:"Remote"}];return i.jsxs(m,{children:[i.jsx(p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:"about me"}),i.jsxs(h,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:.1},children:[i.jsxs("p",{children:["Hi! I'm ",i.jsx("strong",{children:"Federico López"}),", a Senior Frontend Engineer specializing in building ",i.jsx("strong",{children:"high-performance"}),","," ",i.jsx("strong",{children:"scalable"}),", and ",i.jsx("strong",{children:"user-centric"})," web applications with ",i.jsx("strong",{children:"React"}),", ",i.jsx("strong",{children:"TypeScript"}),", and ",i.jsx("strong",{children:"Next.js"}),"."]}),i.jsxs("p",{children:["With ",i.jsxs("strong",{children:[a," years of IT experience"]})," and"," ",i.jsx("strong",{children:"7+ years focused on modern frontend development"}),", I've delivered impactful solutions for global companies in wellness, sports, fintech, and healthcare—reaching millions of users worldwide."]}),i.jsx("p",{children:"Passionate about clean architecture, reusable components, and solving complex UX challenges. I thrive in remote Agile environments, collaborating with cross-functional teams to drive product excellence."})]}),i.jsx(y,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:.2},children:s.map((t,l)=>i.jsxs(x,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:.3+l*.1},children:[i.jsx(f,{children:t.number}),i.jsx(u,{children:t.label})]},t.label))}),i.jsxs(g,{initial:{opacity:0,scale:.9},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.5,delay:.6},children:[i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"20",height:"20",children:i.jsx("path",{d:"M12 2L3.5 20.5L13.5 16L21 20.5L12 2Z"})}),i.jsxs("span",{children:["Featured in"," ",i.jsx("a",{href:"https://www.linkedin.com/posts/svanweelden_silicon-valley-builds-amazon-and-gmail-copycats-activity-7404333944894398465-CIyW/",target:"_blank",rel:"noopener noreferrer",children:"The New York Times"})]})]})]})};export{j as default};
