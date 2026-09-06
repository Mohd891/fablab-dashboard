(function(){
  function update(){
    if(document.body?.dataset?.page!=='home') return;
    document.querySelectorAll('.hero-actions a').forEach(function(a){
      var text=(a.textContent||'').trim();
      if(text.includes('سجل كطالب')){
        a.textContent='تسجيل الدخول / إنشاء حساب';
        a.href='login.html';
        a.classList.remove('outline');
        a.classList.add('primary');
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',update); else update();
  window.addEventListener('load',update);
})();
