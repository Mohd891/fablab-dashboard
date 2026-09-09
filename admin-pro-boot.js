(()=>{
  const style=document.createElement('style');
  style.id='admin-pro-boot-style';
  style.textContent='body[data-page="admin"]{visibility:hidden!important} body[data-page="admin"] .dash-pro{visibility:visible!important}';
  document.head.appendChild(style);
  const reveal=()=>{document.body.style.visibility='visible';document.documentElement.classList.remove('admin-pro-loading');};
  const ready=()=>!!document.querySelector('.dash-pro');
  const observer=new MutationObserver(()=>{if(ready()){observer.disconnect();reveal();}});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>{if(!ready()){observer.disconnect();reveal();}},5000);
})();
