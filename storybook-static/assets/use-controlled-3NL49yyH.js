import{r as e}from"./index-eK40FDle.js";function a(o,s){const{current:t}=e.useRef(o!==void 0),[r,n]=e.useState(s),c=o!==void 0?o:r,i=e.useCallback(u=>{t||n(u)},[t]);return e.useEffect(()=>{!t&&o!==void 0&&console.error("제어되지 않는 입력을 제어하도록 변경하려고 합니다. More info: https://reactjs.org/link/controlled-components")},[o,t]),[c,i]}export{a as u};
