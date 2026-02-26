import{m as d,j as e}from"./animation-vendor-A5lK5uU-.js";import{l as o,r as $}from"./styled-vendor-FewTp2Xz.js";import{S as f}from"./SectionTitle-BFmgpo8B.js";import{u as x}from"./index-BnV5lh9s.js";import"./react-vendor-C1xc24pP.js";const y=[{id:"fullstack",title:"fullstack node.js",institute:{name:"education it",href:"https://www.linkedin.com/school/educacionit/"},start:{month:"January",year:"2020"},end:{month:"December",year:"2021"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Comprehensive full-stack development program covering modern JavaScript, React, Node.js, databases, REST APIs, and deployment strategies."},{id:"engineering",title:"computer systems engineering",institute:{name:"national university of technology",href:"https://www.linkedin.com/school/universidad-tecnologica-nacional/"},start:{month:"March",year:"2008"},end:{month:"December",year:"2013"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Foundation in computer science, algorithms, data structures, and software engineering principles."},{id:"business",title:"bachelor's degree in business administration",institute:{name:"institute euskal-echea",href:"https://euskalechea.com.ar/"},start:{month:"March",year:"2004"},end:{month:"December",year:"2006"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Business administration fundamentals including management, finance, and organizational behavior."}],b={educations:y},w=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:t})=>t.spacing.lg};

  @media (max-width: ${({theme:t})=>t.breakpoints.md}) {
    padding: 0 ${({theme:t})=>t.spacing.md};
  }
`;o(d.h1)`
  text-align: center;
  text-transform: uppercase;
  color: ${({theme:t})=>t.colors.text};
  margin-bottom: ${({theme:t})=>t.spacing["3xl"]};
`;const v=o.div`
  position: relative;
  padding-left: ${({theme:t})=>t.spacing["2xl"]};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({theme:t})=>t.colors.border};
  }

  @media (max-width: ${({theme:t})=>t.breakpoints.md}) {
    padding-left: ${({theme:t})=>t.spacing.lg};
  }
`,j=o(d.div)`
  position: relative;
  margin-bottom: ${({theme:t})=>t.spacing["2xl"]};
  padding-left: ${({theme:t})=>t.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: -${({theme:t})=>t.spacing["2xl"]};
    top: ${({theme:t})=>t.spacing.sm};
    width: 16px;
    height: 16px;
    border-radius: ${({theme:t})=>t.borderRadius.full};
    background: ${({theme:t})=>t.colors.secondary};
    border: 3px solid ${({theme:t})=>t.colors.background};
    box-shadow: 0 0 0 3px ${({theme:t})=>t.colors.border};
    z-index: 1;
  }

  @media (max-width: ${({theme:t})=>t.breakpoints.md}) {
    padding-left: ${({theme:t})=>t.spacing.md};

    &::before {
      left: -${({theme:t})=>t.spacing.lg};
    }
  }
`,k=o.div`
  margin-bottom: ${({theme:t})=>t.spacing.sm};

  h5 {
    color: ${({theme:t})=>t.colors.textSecondary};
    font-size: ${({theme:t})=>t.typography.fontSize.sm};
    font-weight: ${({theme:t})=>t.typography.fontWeight.medium};
    margin: 0 0 ${({theme:t})=>t.spacing.xs} 0;
  }

  h6 {
    color: ${({theme:t})=>t.colors.textTertiary};
    font-size: ${({theme:t})=>t.typography.fontSize.sm};
    font-weight: ${({theme:t})=>t.typography.fontWeight.regular};
    margin: 0;
  }
`,z=o.div`
  background: ${({theme:t})=>t.colors.surface};
  padding: ${({theme:t})=>t.spacing.lg};
  border-radius: ${({theme:t})=>t.borderRadius.lg};
  border: 1px solid ${({theme:t})=>t.colors.border};
  transition: all ${({theme:t})=>t.transitions.base};

  &:hover {
    box-shadow: ${({theme:t})=>t.shadows.md};
    transform: translateX(4px);
  }

  h4 {
    color: ${({theme:t})=>t.colors.text};
    font-size: ${({theme:t})=>t.typography.fontSize.xl};
    margin: 0 0 ${({theme:t})=>t.spacing.xs} 0;
    text-transform: capitalize;
  }

  h5 {
    margin: 0;

    a {
      color: ${({theme:t})=>t.colors.secondary};
      text-decoration: none;
      text-transform: capitalize;
      font-size: ${({theme:t})=>t.typography.fontSize.lg};
      font-weight: ${({theme:t})=>t.typography.fontWeight.semibold};
      transition: color ${({theme:t})=>t.transitions.fast};

      &:hover {
        color: ${({theme:t})=>t.colors.secondaryHover};
      }
    }
  }
`,M=()=>{const{t}=x(),{educations:i}=b,l=$.useMemo(()=>i.map((a,p)=>{const{id:n,start:r,end:s,place:c}=a,m=t(`months.${r.month}`),h=t(`months.${s.month}`),g=`${m} ${r.year} - ${h} ${s.year}`,u=`${c.province}, ${c.country}`;return e.jsxs(j,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:p*.1},children:[e.jsxs(k,{children:[e.jsx("h5",{children:g}),e.jsx("h6",{children:u})]}),e.jsxs(z,{children:[e.jsx("h4",{children:t(`education.${n}.title`)}),e.jsx("h5",{children:e.jsx("a",{href:a.institute.href,target:"_blank",rel:"noreferrer",children:t(`education.${n}.institute`)})})]})]},n)}),[i,t]);return e.jsxs(w,{children:[e.jsx(f,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:t("sections.education")}),e.jsx(v,{children:l})]})};export{M as default};
