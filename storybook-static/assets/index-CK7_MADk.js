import{j as t}from"./jsx-runtime-u17CrQMm.js";import"./iframe-Dxz4Iu-O.js";import{S as b}from"./sword-tIX24kzi.js";import{c as h}from"./createLucideIcon-SZYWXtx4.js";import{S as f}from"./star-CBuiB-me.js";class m{constructor(a,n,e,s,o,l,i){this.id=a,this.name=n,this.description=e,this.category=s,this.image=o,this.typeIcon=l,this.mode=i}}class x extends m{constructor(a,n,e,s,o,l,i,p,c,d){super(a,n,e,d,s,l,o),this.atk=i,this.def=p,this.stars=c,this.monsterRarity=d}getStyle(){return this.monsterRarity==="COMUM"?`
        bg-slate-300/90
        border-slate-500
        text-slate-900
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5),_transparent_70%)]
        bg-blend-soft-light
        shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]
      `:this.monsterRarity==="RARO"?`
        bg-[#E7D3A1]/90
        border-[#8B6A2E]
        text-[#3B2A14]
        bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.35),_transparent_60%)]
        bg-blend-overlay
        shadow-inner
      `:"bg-[#4B2C7A] border-[#1E1236] text-[#F5E9FF]"}}class w extends m{getStyle(){return"bg-[#06B6D4] border-[#164E63] text-white"}}class j extends m{getStyle(){return"bg-[#E11D48] border-[#4C0519] text-white"}}class D extends m{getStyle(){return"bg-[#10B981] border-[#064E3B] text-white"}}class L extends m{getStyle(){return"bg-[#4B5563] border-[#111827] text-white"}}const y=""+new URL("attribute_ice-D7K4UQeJ.jpg",import.meta.url).href,u=""+new URL("attribute_dark-CSNyPNqs.jpg",import.meta.url).href,_=""+new URL("attribute_fire-B0OStVpt.jpg",import.meta.url).href,v=""+new URL("attribute_spell-B7-LsmDi.jpg",import.meta.url).href,N=r=>{const a={ice:y,dark:u,fire:_,spell:v,default:u};return a[r]||a.default};const S=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],C=h("shield",S),g=(r,a,n)=>{const e=a==="sm",s=a==="xs";return t.jsxs("div",{className:`
      bg-[#D9CCB9] border border-black/30 text-zinc-900
      ${s?"mt-0.5 p-0.5 min-h-0":"mt-2 p-2"}
      ${e?"min-h-0":s?"":"min-h-20"}
    `,children:[!e&&!s&&t.jsx("p",{className:"text-[9px] leading-tight font-medium italic pb-2",children:r.description}),n&&t.jsxs("div",{className:`
          mt-auto pt-1 border-t border-black/20 flex justify-end font-mono font-bold
          ${s?"text-[7px] gap-1.5 border-none pt-0 items-center":""}
          ${e?"text-[8px] gap-1 border-none":s?"":"text-[10px] gap-3"}
        `,children:[t.jsxs("div",{className:"flex items-center gap-0.5",children:[s||e?t.jsx(b,{size:s?10:14,className:"text-red-500 mx-1"}):t.jsx("span",{children:"ATK/"}),t.jsx("span",{className:`${e?"text-[10px]":s?"text-[8px]":""}`,children:r.atk})]}),t.jsxs("div",{className:"flex items-center gap-0.5",children:[s||e?t.jsx(C,{size:s?10:14,className:"text-blue-500 mx-1"}):t.jsx("span",{children:"DEF/"}),t.jsx("span",{className:`${e?"text-[10px]":s?"text-[8px]":""}`,children:r.def})]})]})]})};g.__docgenInfo={description:"",methods:[],displayName:"renderCardInfo"};function E(r){return r?r.startsWith("http")?r:`https://card-game-images.professoraantenada.com.br/${r}`:void 0}function I(r){if(!r)return;const{id:a,name:n,mode:e,description:s,imageUrl:o,attribute:l,attackPower:i,defensePower:p,stars:c,element:d}=r;switch(l?.toLowerCase()){case"monster":return new x(String(a),n,s,o,e,d,i,p,c,r.monsterRarity||"LEGENDARIO");case"spell":case"magic":return new w(String(a),n,s,"MAGICA",o,e,d);case"trap":return new j(String(a),n,s,"ARMADILHA",o,e,d);default:return new x(String(a),n,s,o,e,d,0,0,1,"COMUM")}}const k=({card:r,size:a="lg",isFaceDown:n=!1})=>{const e=typeof r.getStyle=="function"?r:I(r);if(!e)return;const s=e instanceof x,o=e.getStyle(),l={lg:"w-72 h-120 p-3",md:"w-60 h-96 p-2.5",sm:"w-48 h-72 p-2",xs:"w-28 h-40 p-1 border-2"},i=a==="xs";return n?t.jsxs("div",{className:`${l[a]} bg-[#633522] rounded-md relative flex items-center justify-center overflow-hidden shadow-2xl border border-[#7c4a35] transition-all`,children:[t.jsx("div",{className:"absolute inset-0 opacity-40",style:{backgroundImage:"repeating-linear-gradient(45deg, #2d160a 0px, #2d160a 1px, transparent 1px, transparent 10px)"}}),t.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-black/40"}),t.jsx("div",{className:"relative w-1/2 h-1/2 border-2 border-orange-400/40 rounded flex items-center justify-center rotate-45 bg-black/10",children:t.jsx("span",{className:"text-2xl font-black text-orange-400/60 -rotate-45",children:"?"})}),t.jsx("div",{className:"absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent"})]}):t.jsxs("div",{className:`
      ${o}
      ${l[a]}
      rounded-sm shadow-2xl flex flex-col relative
      transition-transform hover:z-50 cursor-pointer select-none
    `,children:[t.jsxs("div",{className:`
        flex justify-between items-center bg-white/20 rounded-sm border border-black/10
        ${i?"px-1 py-0 mb-0.5":"px-2 py-1 mb-1"}
      `,children:[t.jsx("span",{className:`
          font-black uppercase italic truncate
          ${i?"text-[7px] max-w-[70%]":a==="sm"?"text-[11px]":"text-xs"}
        `,children:e.name}),t.jsx("img",{src:N(e.typeIcon),alt:e.typeIcon,className:`${i?"w-2.5 h-2.5":"w-5 h-5"} drop-shadow-md rounded-2xl object-contain`})]}),s&&t.jsx("div",{className:`flex justify-end gap-0.5 px-1 ${i?"mb-0":"mb-1"}`,children:Array.from({length:e.stars}).map((p,c)=>t.jsx(f,{size:i?8:12,className:"text-yellow-500 fill-yellow-400 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"},c))}),t.jsx("div",{className:"flex-1 bg-zinc-900 border border-black/40 overflow-hidden shadow-inner",children:t.jsx("img",{src:E(e.image),alt:e.name,className:"w-full h-full object-cover"})}),g(e,a,s)]})};k.__docgenInfo={description:"",methods:[],displayName:"Card",props:{card:{required:!0,tsType:{name:"BaseCard"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xs"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xs"'}]},description:"",defaultValue:{value:'"lg"',computed:!1}},isFaceDown:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};export{k as C,D as E,x as M,C as S,L as T,w as a,j as b,I as m};
