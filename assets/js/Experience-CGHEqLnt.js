import{m as l,j as e}from"./animation-vendor-A5lK5uU-.js";import{e as m,a as g}from"./dateCalculations-psY9vaM7.js";import{S as h}from"./SectionTitle-BFmgpo8B.js";import{l as i}from"./styled-vendor-FewTp2Xz.js";const x=i.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:o})=>o.spacing.lg};

  @media (max-width: ${({theme:o})=>o.breakpoints.md}) {
    padding: 0 ${({theme:o})=>o.spacing.md};
  }
`,$=i.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({theme:o})=>o.spacing["3xl"]};

  @media (max-width: ${({theme:o})=>o.breakpoints.sm}) {
    margin-bottom: ${({theme:o})=>o.spacing["2xl"]};
  }
`;i(l.h1)`
  text-transform: uppercase;
  color: ${({theme:o})=>o.colors.text};
  margin: 0;
`;const f=i.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({theme:o})=>o.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({theme:o})=>o.colors.primaryHover};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:o})=>o.colors.primary};
    outline-offset: 2px;
  }

  i {
    font-size: 16px;
  }
`,u=i.div`
  position: relative;
  padding-left: ${({theme:o})=>o.spacing["2xl"]};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({theme:o})=>o.colors.border};
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.md}) {
    padding-left: ${({theme:o})=>o.spacing.lg};
  }
`,y=i(l.div)`
  position: relative;
  margin-bottom: ${({theme:o})=>o.spacing["2xl"]};
  padding-left: ${({theme:o})=>o.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: -${({theme:o})=>o.spacing["2xl"]};
    top: ${({theme:o})=>o.spacing.sm};
    width: 16px;
    height: 16px;
    border-radius: ${({theme:o})=>o.borderRadius.full};
    background: ${({theme:o})=>o.colors.primary};
    border: 3px solid ${({theme:o})=>o.colors.background};
    box-shadow: 0 0 0 3px ${({theme:o})=>o.colors.border};
    z-index: 1;
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.md}) {
    padding-left: ${({theme:o})=>o.spacing.md};

    &::before {
      left: -${({theme:o})=>o.spacing.lg};
    }
  }
`,b=i.div`
  margin-bottom: ${({theme:o})=>o.spacing.sm};

  h5 {
    color: ${({theme:o})=>o.colors.textSecondary};
    font-size: ${({theme:o})=>o.typography.fontSize.sm};
    font-weight: ${({theme:o})=>o.typography.fontWeight.medium};
    margin: 0 0 ${({theme:o})=>o.spacing.xs} 0;
  }

  h6 {
    color: ${({theme:o})=>o.colors.textTertiary};
    font-size: ${({theme:o})=>o.typography.fontSize.sm};
    font-weight: ${({theme:o})=>o.typography.fontWeight.regular};
    margin: 0;
  }
`,w=i.div`
  background: ${({theme:o})=>o.colors.surface};
  padding: ${({theme:o})=>o.spacing.lg};
  border-radius: ${({theme:o})=>o.borderRadius.lg};
  border: 1px solid ${({theme:o})=>o.colors.border};
  transition: all ${({theme:o})=>o.transitions.base};

  &:hover {
    box-shadow: ${({theme:o})=>o.shadows.md};
    transform: translateX(4px);
  }

  h4 {
    color: ${({theme:o})=>o.colors.text};
    font-size: ${({theme:o})=>o.typography.fontSize.xl};
    margin: 0 0 ${({theme:o})=>o.spacing.xs} 0;
    text-transform: capitalize;
  }

  h5 {
    margin: 0 0 ${({theme:o})=>o.spacing.md} 0;

    a {
      color: ${({theme:o})=>o.colors.primary};
      text-decoration: none;
      text-transform: capitalize;
      font-size: ${({theme:o})=>o.typography.fontSize.lg};
      font-weight: ${({theme:o})=>o.typography.fontWeight.semibold};
      transition: color ${({theme:o})=>o.transitions.fast};

      &:hover {
        color: ${({theme:o})=>o.colors.primaryHover};
      }
    }
  }

  p {
    color: ${({theme:o})=>o.colors.textSecondary};
    line-height: ${({theme:o})=>o.typography.lineHeight.relaxed};
    margin: 0;
  }
`,D=()=>{const{experiences:o}=m,c=r=>{const{start:t,end:a}=r,s=a.active?"Present":`${a.month} ${a.year}`,n=g(r);return`${t.month} ${t.year} - ${s} (${n})`},d=r=>{const{place:t}=r;return t.remote?"Remote":`${t.province}, ${t.country}`};return e.jsxs(x,{children:[e.jsx(h,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:"experience"}),e.jsx($,{children:e.jsxs(f,{href:"./pdf/Resume_LOPEZ_Federico.pdf",download:"Resume_LOPEZ_Federico.pdf",target:"_blank",rel:"noreferrer","aria-label":"Download Resume PDF",children:[e.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),"DOWNLOAD RESUME"]})}),e.jsx(u,{children:o.map((r,t)=>{const{id:a,rol:s,company:n,notes:p}=r;return e.jsxs(y,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:t*.1},children:[e.jsxs(b,{children:[e.jsx("h5",{children:c(r)}),e.jsx("h6",{children:d(r)})]}),e.jsxs(w,{children:[e.jsx("h4",{children:s}),e.jsx("h5",{children:n.href?e.jsx("a",{href:n.href,target:"_blank",rel:"noreferrer",children:n.name}):n.name}),e.jsx("p",{children:p})]})]},a)})})]})};export{D as default};
