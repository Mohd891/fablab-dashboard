(function(){
  var started=Date.now(), MIN=550;
  var style=document.createElement('style');
  style.textContent='.__fablab_page_loading{position:fixed;inset:0;z-index:2147483647;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;opacity:1;visibility:visible;transition:opacity .18s ease,visibility .18s ease}.__fablab_page_loading.hide{opacity:0;visibility:hidden;pointer-events:none}.__fablab_loader{width:30px;height:30px;border:3px solid rgba(25,118,210,.16);border-top-color:#1976d2;border-radius:50%;animation:__fablab_spin .65s linear infinite}@keyframes __fablab_spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
  function show(){
    if(document.getElementById('__fablab_page_loading')) return;
    var box=document.createElement('div'); box.id='__fablab_page_loading'; box.className='__fablab_page_loading'; box.setAttribute('aria-label','جارٍ تحميل الصفحة'); box.innerHTML='<div class="__fablab_loader"></div>';
    (document.body||document.documentElement).appendChild(box);
  }
  function hide(){
    var box=document.getElementById('__fablab_page_loading'); if(!box) return;
    var wait=Math.max(0,MIN-(Date.now()-started));
    setTimeout(function(){box.classList.add('hide');setTimeout(function(){box.remove()},220)},wait);
  }
  show();
  if(document.readyState==='complete') hide(); else window.addEventListener('load',hide,{once:true});
  setTimeout(hide,5000);
})();
