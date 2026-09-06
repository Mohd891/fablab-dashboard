(function(){
  var started=Date.now();
  var style=document.createElement('style');
  style.textContent='.__fablab_page_loading{position:fixed;inset:0;z-index:2147483647;background:rgba(255,255,255,.92);display:flex;align-items:center;justify-content:center;opacity:1;visibility:visible;transition:opacity .18s ease,visibility .18s ease}.__fablab_page_loading.hide{opacity:0;visibility:hidden;pointer-events:none}.__fablab_loader{width:28px;height:28px;border:3px solid rgba(25,118,210,.18);border-top-color:#1976d2;border-radius:50%;animation:__fablab_spin .65s linear infinite}@keyframes __fablab_spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
  var box=document.createElement('div'); box.className='__fablab_page_loading'; box.setAttribute('aria-label','جارٍ تحميل الصفحة'); box.innerHTML='<div class="__fablab_loader"></div>';
  function show(){ if(document.body && !box.parentNode) document.body.appendChild(box); }
  function hide(){ if(!box.parentNode) return; var wait=Math.max(0,180-(Date.now()-started)); setTimeout(function(){box.classList.add('hide');setTimeout(function(){if(box.parentNode)box.remove()},220)},wait); }
  if(document.body) show(); else document.addEventListener('DOMContentLoaded',show,{once:true});
  window.addEventListener('load',hide,{once:true});
  setTimeout(hide,5000);
})();
