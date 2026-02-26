import{m as o,j as t}from"./animation-vendor-A5lK5uU-.js";import{e as d,c}from"./dateCalculations-psY9vaM7.js";import{l as i}from"./styled-vendor-FewTp2Xz.js";import{S as m}from"./SectionTitle-BFmgpo8B.js";import{u as g}from"./index-BnV5lh9s.js";import"./react-vendor-C1xc24pP.js";const y=i.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,h=i(o.div)`
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
`,x=i(o.div)`
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
`,u=i(o.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({theme:e})=>e.spacing.lg};
  margin: ${({theme:e})=>e.spacing.xl} 0;

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({theme:e})=>e.spacing.md};
    margin: ${({theme:e})=>e.spacing.lg} 0;
  }
`,f=i(o.div)`
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
`,$=i.div`
  font-size: ${({theme:e})=>e.typography.fontSize["3xl"]};
  font-weight: ${({theme:e})=>e.typography.fontWeight.bold};
  color: ${({theme:e})=>e.colors.primary};
  margin-bottom: ${({theme:e})=>e.spacing.xs};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSize["2xl"]};
  }
`,b=i.div`
  font-size: ${({theme:e})=>e.typography.fontSize.sm};
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: ${({theme:e})=>e.typography.fontWeight.medium};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSize.xs};
  }
`;i(o.div)`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.spacing.md};
  justify-content: center;
  margin-top: ${({theme:e})=>e.spacing.xl};
`;i(o.span)`
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
`;const M=()=>{const{t:e}=g(),{experiences:s}=d,a=s.find(r=>r.id==="fullstackFreelance"),n=a?c(a.start.month,a.start.year):"7+",l=[{number:n,label:e("aboutMe.stats.yearsExperience")},{number:"7+",label:e("aboutMe.stats.enterpriseClients")},{number:"100%",label:e("aboutMe.stats.remote")}];return t.jsxs(y,{children:[t.jsx(m,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:e("sections.aboutme")}),t.jsxs(x,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:.1},children:[t.jsx("p",{dangerouslySetInnerHTML:{__html:e("aboutMe.intro")}}),t.jsx("p",{dangerouslySetInnerHTML:{__html:e("aboutMe.experience",{years:n})}}),t.jsx("p",{children:e("aboutMe.passion")})]}),t.jsx(u,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6,delay:.2},children:l.map((r,p)=>t.jsxs(f,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:.3+p*.1},children:[t.jsx($,{children:r.number}),t.jsx(b,{children:r.label})]},r.label))}),t.jsxs(h,{initial:{opacity:0,scale:.9},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.5,delay:.6},children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"20",height:"20",children:t.jsx("path",{d:"M12 2L3.5 20.5L13.5 16L21 20.5L12 2Z"})}),t.jsxs("span",{children:[e("aboutMe.featured").split("<link>")[0],t.jsx("a",{href:"https://www.linkedin.com/posts/svanweelden_silicon-valley-builds-amazon-and-gmail-copycats-activity-7404333944894398465-CIyW/",target:"_blank",rel:"noopener noreferrer",children:"The New York Times"}),e("aboutMe.featured").split("</link>")[1]]})]})]})};export{M as default};
