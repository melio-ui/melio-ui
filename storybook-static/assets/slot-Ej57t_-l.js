import{j as c}from"./jsx-runtime-bkLU2cdM.js";import{R as i}from"./index-eK40FDle.js";import{u as d}from"./use-merged-ref-IdjoZWBX.js";function a(n,o){const e={...o};return Object.keys(o).forEach(t=>{const s=n[t],r=o[t];/^on[A-Z]/.test(t)?s&&r?e[t]=(...f)=>{s(...f),r(...f)}:s&&(e[t]=s):t==="style"?e[t]={...s,...r}:t==="className"&&(e[t]=[s,r].filter(Boolean).join(" "))}),{...n,...e}}const l=i.forwardRef((n,o)=>{const{children:e,...t}=n,s=d(o,e.ref);return i.isValidElement(e)?i.cloneElement(e,{...a(t,e.props),ref:o?s:e.ref}):c.jsx(c.Fragment,{children:e})});l.displayName="Slot";const j=l;l.__docgenInfo={description:"",methods:[],displayName:"Slot"};export{j as S};
