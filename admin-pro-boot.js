(()=>{
  const style=document.createElement('style');
  style.id='admin-pro-boot-style';
  style.textContent='body[data-page="admin"]{visibility:hidden!important}';
  document.head.appendChild(style);
  const reveal=()=>{document.body.style.visibility='visible';};
  const ready=()=>!!document.querySelector('.adm2');
  const observer=new MutationObserver(()=>{if(ready()){observer.disconnect();reveal();}});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{if(!ready()){observer.disconnect();reveal();}},5000);
})();
