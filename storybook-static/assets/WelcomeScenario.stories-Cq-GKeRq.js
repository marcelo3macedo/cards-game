import{j as e}from"./jsx-runtime-u17CrQMm.js";function a({onStart:o}){return e.jsxs("div",{className:"flex flex-col items-center justify-center h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-black",children:[e.jsx("h1",{className:"text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 mb-8 tracking-tighter uppercase italic",children:"Rei dos Duelos"}),e.jsxs("button",{onClick:o,className:"group relative px-8 py-3 font-bold text-white transition-all duration-300",children:[e.jsx("div",{className:"absolute inset-0 bg-blue-600 skew-x-[-20deg] group-hover:bg-blue-500 group-hover:scale-105 transition-all"}),e.jsx("span",{className:"relative uppercase tracking-widest",children:"Iniciar Duelo"})]}),e.jsx("p",{className:"mt-10 text-zinc-500 text-sm animate-pulse",children:"Pressione para conectar ao servidor"})]})}a.__docgenInfo={description:"",methods:[],displayName:"WelcomeScenario",props:{onStart:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const n={title:"Scenarios/WelcomeScenario",component:a,parameters:{layout:"fullscreen"},argTypes:{onStart:{action:"clicked"}}},r={args:{onStart:()=>console.log("Duelo Iniciado!")}},t={args:{...r.args},parameters:{viewport:{defaultViewport:"mobile1"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    onStart: () => console.log("Duelo Iniciado!")
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...t.parameters?.docs?.source}}};const i=["Default","MobileView"];export{r as Default,t as MobileView,i as __namedExportsOrder,n as default};
