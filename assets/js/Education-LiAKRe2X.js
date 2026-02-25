import{m as s,j as e}from"./animation-vendor-A5lK5uU-.js";import{l as o,r as u}from"./styled-vendor-FewTp2Xz.js";import{S as x}from"./SectionTitle-BFmgpo8B.js";const f=[{id:"fullstack",title:"fullstack node.js",institute:{name:"education it",href:"https://www.linkedin.com/school/educacionit/"},start:{month:"January",year:"2020"},end:{month:"December",year:"2021"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Comprehensive full-stack development program covering modern JavaScript, React, Node.js, databases, REST APIs, and deployment strategies."},{id:"engineering",title:"computer systems engineering",institute:{name:"national university of technology",href:"https://www.linkedin.com/school/universidad-tecnologica-nacional/"},start:{month:"March",year:"2008"},end:{month:"December",year:"2013"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Foundation in computer science, algorithms, data structures, and software engineering principles."},{id:"business",title:"bachelor's degree in business administration",institute:{name:"institute euskal-echea",href:"https://euskalechea.com.ar/"},start:{month:"March",year:"2004"},end:{month:"December",year:"2006"},place:{province:"Buenos Aires",country:"Argentina"},notes:"Business administration fundamentals including management, finance, and organizational behavior."}],$={educations:f},y=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({theme:t})=>t.spacing.lg};

  @media (max-width: ${({theme:t})=>t.breakpoints.md}) {
    padding: 0 ${({theme:t})=>t.spacing.md};
  }
`;o(s.h1)`
  text-align: center;
  text-transform: uppercase;
  color: ${({theme:t})=>t.colors.text};
  margin-bottom: ${({theme:t})=>t.spacing["3xl"]};
`;const b=o.div`
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
`,w=o(s.div)`
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
`,v=o.div`
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
`,j=o.div`
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
`,A=()=>{const{educations:t}=$,c=u.useMemo(()=>t.map((d,l)=>{const{id:p,title:m,institute:n,start:i,end:a,place:r}=d,g=`${i.month} ${i.year} - ${a.month} ${a.year}`,h=`${r.province}, ${r.country}`;return e.jsxs(w,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:l*.1},children:[e.jsxs(v,{children:[e.jsx("h5",{children:g}),e.jsx("h6",{children:h})]}),e.jsxs(j,{children:[e.jsx("h4",{children:m}),e.jsx("h5",{children:e.jsx("a",{href:n.href,target:"_blank",rel:"noreferrer",children:n.name})})]})]},p)}),[t]);return e.jsxs(y,{children:[e.jsx(x,{initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:"education"}),e.jsx(b,{children:c})]})};export{A as default};
