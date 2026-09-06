(function(){
 function add(){
  const nav=document.querySelector('.site-nav nav');if(!nav||nav.querySelector('a[href="appointments.html"]'))return;
  const a=document.createElement('a');a.href='appointments.html';a.textContent='حجز موعد';nav.appendChild(a);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(add,80));else setTimeout(add,80);
})();
