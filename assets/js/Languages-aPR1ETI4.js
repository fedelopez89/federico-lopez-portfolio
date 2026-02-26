import{j as r,m as n}from"./animation-vendor-A5lK5uU-.js";import{l as a}from"./styled-vendor-FewTp2Xz.js";import{a as t,S as s,b as l}from"./SectionTitle-BFmgpo8B.js";import{u as c}from"./index-BnV5lh9s.js";import"./react-vendor-C1xc24pP.js";const d=[{id:"spanish",name:"Spanish",proficiency:"Native",level:100},{id:"english",name:"English",proficiency:"Advanced",level:85}],p=a.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing.lg};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    padding: 0 ${({theme:e})=>e.spacing.md};
  }
`,m=a.div`
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
`,g=a(n.article)`
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
`,u=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`,x=a.h3`
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
`,h=a.span`
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({theme:e,$level:i})=>i===100?`${e.colors.primary}20`:`${e.colors.accent}20`};
  color: ${({theme:e,$level:i})=>i===100?e.colors.primary:e.colors.accent};
`,y=a.div`
  position: relative;
  width: 100%;
  height: 8px;
  background: ${({theme:e})=>e.colors.background};
  border-radius: 4px;
  overflow: hidden;
`,f=a(n.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.colors.primary} 0%,
    ${({theme:e})=>e.colors.accent} 100%
  );
  border-radius: 4px;
`,v=a.p`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-weight: 500;
`,L=()=>{const{t:e}=c();return r.jsxs(p,{id:"languages","aria-label":"Languages",children:[r.jsxs(t,{children:[r.jsx(s,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},children:e("sections.languages")}),r.jsx(l,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:.1},children:e("languages.subtitle")})]}),r.jsx(m,{children:d.map((i,o)=>r.jsxs(g,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:o*.1},children:[r.jsxs(u,{children:[r.jsx(x,{children:e(`languages.${i.id}.name`)}),r.jsx(h,{$level:i.level,children:e(`languages.${i.id}.proficiency`)})]}),r.jsx(y,{role:"progressbar","aria-valuenow":i.level,"aria-valuemin":0,"aria-valuemax":100,"aria-label":`${e(`languages.${i.id}.name`)} proficiency`,children:r.jsx(f,{$level:i.level,initial:{width:0},whileInView:{width:`${i.level}%`},viewport:{once:!0},transition:{duration:1,delay:o*.1+.3,ease:"easeOut"}})}),r.jsxs(v,{children:[i.level,"%"]})]},i.name))})]})};export{L as default};
