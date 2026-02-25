import{j as i,m as o}from"./animation-vendor-A5lK5uU-.js";import{l as r}from"./styled-vendor-FewTp2Xz.js";import{a as n,S as t,b as s}from"./SectionTitle-BFmgpo8B.js";const c=[{name:"Spanish",proficiency:"Native",level:100},{name:"English",proficiency:"Advanced",level:85}],l=r.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,d=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`,p=r(o.article)`
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,m=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`,g=r.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '🌐';
    font-size: 1.75rem;
  }
`,x=r.span`
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({theme:e,$level:a})=>a===100?`${e.colors.primary}20`:`${e.colors.accent}20`};
  color: ${({theme:e,$level:a})=>a===100?e.colors.primary:e.colors.accent};
`,u=r.div`
  position: relative;
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.background};
  border-radius: 4px;
  overflow: hidden;
`,h=r(o.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.primary} 0%,
    ${({theme:e})=>e.colors.accent} 100%
  );
  border-radius: 4px;
`,y=r.p`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 500;
`,b=()=>i.jsxs(l,{id:"languages","aria-label":"Languages",children:[i.jsxs(n,{children:[i.jsx(t,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},children:"languages"}),i.jsx(s,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:"Professional communication across multiple languages"})]}),i.jsx(d,{children:c.map((e,a)=>i.jsxs(p,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:a*.1},children:[i.jsxs(m,{children:[i.jsx(g,{children:e.name}),i.jsx(x,{$level:e.level,children:e.proficiency})]}),i.jsx(u,{role:"progressbar","aria-valuenow":e.level,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`${e.name} proficiency`,children:i.jsx(h,{$level:e.level,initial:{width:0},whileInView:{width:`${e.level}%`},viewport:{once:!0},transition:{duration:1,delay:a*.1+.3,ease:"easeOut"}})}),i.jsxs(y,{children:[e.level,"% Proficiency"]})]},e.name))})]});export{b as default};
