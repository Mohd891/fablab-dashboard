(function(){
  function forceTitle(){ document.title='فاب لاب'; }
  function addAdminLinks(){
    if(!document.body?.dataset.page?.startsWith('admin')) return;
    if(!window.portalSide||window.__adminLinksAdded)return;
    const old=window.portalSide;
    window.portalSide=function(role){
      let html=old(role);
      if(role==='admin'){
        html=html.replace('<a class="side-link" href="admin-attendance.html">الحضور</a>','<a class="side-link" href="admin-attendance.html">الحضور</a><a class="side-link" href="admin-calendar.html">التقويم السنوي</a><a class="side-link" href="admin-bookings.html">الحجوزات والمواعيد</a>');
      }
      return html;
    };
    window.__adminLinksAdded=true;
  }
  forceTitle();
  addAdminLinks();
  document.addEventListener('DOMContentLoaded',()=>{forceTitle();addAdminLinks();});
  window.addEventListener('load',()=>{forceTitle();addAdminLinks();});
})();
