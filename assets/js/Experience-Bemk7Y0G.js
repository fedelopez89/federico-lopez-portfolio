import{m as s,j as o}from"./animation-vendor-A5lK5uU-.js";import{e as g,a as h}from"./dateCalculations-psY9vaM7.js";import{S as x}from"./SectionTitle-BFmgpo8B.js";import{l as n}from"./styled-vendor-FewTp2Xz.js";import{u as $}from"./index-BnV5lh9s.js";import"./react-vendor-C1xc24pP.js";const f=n.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,u=n.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({theme:e})=>e.spacing["3xl"]};

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    margin-bottom: ${({theme:e})=>e.spacing["2xl"]};
  }
`;n(s.h1)`
  text-transform: uppercase;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`;const y=n.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({theme:e})=>e.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({theme:e})=>e.colors.primaryHover};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary};
    outline-offset: 2px;
  }

  i {
    font-size: 16px;
  }
`,b=n.div`
  position: relative;
  padding-left: ${({theme:e})=>e.spacing["2xl"]};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({theme:e})=>e.colors.border};
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding-left: ${({theme:e})=>e.spacing.lg};
  }
`,w=n(s.div)`
  position: relative;
  margin-bottom: ${({theme:e})=>e.spacing["2xl"]};
  padding-left: ${({theme:e})=>e.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: -${({theme:e})=>e.spacing["2xl"]};
    top: ${({theme:e})=>e.spacing.sm};
    width: 16px;
    height: 16px;
    border-radius: ${({theme:e})=>e.borderRadius.full};
    background: ${({theme:e})=>e.colors.primary};
    border: 3px solid ${({theme:e})=>e.colors.background};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.colors.border};
    z-index: 1;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding-left: ${({theme:e})=>e.spacing.md};

    &::before {
      left: -${({theme:e})=>e.spacing.lg};
    }
  }
`,v=n.div`
  margin-bottom: ${({theme:e})=>e.spacing.sm};

  h5 {
    color: ${({theme:e})=>e.colors.textSecondary};
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
    font-weight: ${({theme:e})=>e.typography.fontWeight.medium};
    margin: 0 0 ${({theme:e})=>e.spacing.xs} 0;
  }

  h6 {
    color: ${({theme:e})=>e.colors.textTertiary};
    font-size: ${({theme:e})=>e.typography.fontSize.sm};
    font-weight: ${({theme:e})=>e.typography.fontWeight.regular};
    margin: 0;
  }
`,j=n.div`
  background: ${({theme:e})=>e.colors.surface};
  padding: ${({theme:e})=>e.spacing.lg};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  border: 1px solid ${({theme:e})=>e.colors.border};
  transition: all ${({theme:e})=>e.transitions.base};

  &:hover {
    box-shadow: ${({theme:e})=>e.shadows.md};
    transform: translateX(4px);
  }

  h4 {
    color: ${({theme:e})=>e.colors.text};
    font-size: ${({theme:e})=>e.typography.fontSize.xl};
    margin: 0 0 ${({theme:e})=>e.spacing.xs} 0;
    text-transform: capitalize;
  }

  h5 {
    margin: 0 0 ${({theme:e})=>e.spacing.md} 0;

    a {
      color: ${({theme:e})=>e.colors.primary};
      text-decoration: none;
      text-transform: capitalize;
      font-size: ${({theme:e})=>e.typography.fontSize.lg};
      font-weight: ${({theme:e})=>e.typography.fontWeight.semibold};
      transition: color ${({theme:e})=>e.transitions.fast};

      &:hover {
        color: ${({theme:e})=>e.colors.primaryHover};
      }
    }
  }

  p {
    color: ${({theme:e})=>e.colors.textSecondary};
    line-height: ${({theme:e})=>e.typography.lineHeight.relaxed};
    margin: 0;
  }
`,E=()=>{const{t:e}=$(),{experiences:c}=g,l=r=>{const{start:i,end:t}=r,a=e(`months.${i.month}`),p=t.active?e("time.present"):`${e(`months.${t.month}`)} ${t.year}`,m=h(r);return`${a} ${i.year} - ${p} (${m})`},d=r=>{const{place:i}=r;return i.remote?e("time.remote"):`${i.province}, ${i.country}`};return o.jsxs(f,{children:[o.jsx(x,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:e("sections.experience")}),o.jsx(u,{children:o.jsxs(y,{href:"./pdf/Resume_LOPEZ_Federico.pdf",download:"Resume_LOPEZ_Federico.pdf",target:"_blank",rel:"noreferrer","aria-label":"Download Resume PDF",children:[o.jsx("svg",{width:"20",height:"20",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:o.jsx("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),e("buttons.downloadResume")]})}),o.jsx(b,{children:c.map((r,i)=>{const{id:t,company:a}=r;return o.jsxs(w,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:i*.1},children:[o.jsxs(v,{children:[o.jsx("h5",{children:l(r)}),o.jsx("h6",{children:d(r)})]}),o.jsxs(j,{children:[o.jsx("h4",{children:e(`experience.${t}.role`)}),o.jsx("h5",{children:a.href?o.jsx("a",{href:a.href,target:"_blank",rel:"noreferrer",children:e(`experience.${t}.company`)}):e(`experience.${t}.company`)}),o.jsx("p",{children:e(`experience.${t}.notes`)})]})]},t)})})]})};export{E as default};
