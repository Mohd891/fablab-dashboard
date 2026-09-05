(function(){
  function init(){
    if(typeof window.renderLogin!=='function'||window.__loginAccountCheck)return;
    window.__loginAccountCheck=true;
    const original=window.renderLogin;
    window.renderLogin=function(){
      original();
      const form=document.getElementById('loginForm');
      if(!form)return;
      form.addEventListener('submit',function(e){
        const email=String(new FormData(form).get('email')||'').trim().toLowerCase();
        const db=typeof loadDB==='function'?loadDB():{users:[]};
        const exists=(db.users||[]).some(u=>String(u.email||'').trim().toLowerCase()===email);
        if(!exists && email!=='admin@fablab.local'){
          e.preventDefault();
          e.stopImmediatePropagation();
          const old=document.getElementById('loginAccountModal');
          if(old)old.remove();
          const modal=document.createElement('div');
          modal.id='loginAccountModal';
          modal.innerHTML='<div class="login-check-back"><div class="login-check-box"><button type="button" class="login-check-close">×</button><div class="login-check-icon">👤</div><h2>الحساب غير مسجل</h2><p>هذا البريد الإلكتروني غير مسجل في بوابة الطالب.</p><p>هل تريد إنشاء حساب جديد؟</p><div class="login-check-actions"><a href="register.html" class="btn primary">إنشاء حساب</a><button type="button" class="btn login-check-cancel">إلغاء</button></div></div></div>';
          document.body.appendChild(modal);
          modal.querySelector('.login-check-close').onclick=()=>modal.remove();
          modal.querySelector('.login-check-cancel').onclick=()=>modal.remove();
          modal.querySelector('.login-check-back').onclick=e=>{if(e.target===e.currentTarget)modal.remove()};
        }
      },true);
      let busy=false;
      form.addEventListener('submit',function(){
        if(busy)return;
        const email=String(new FormData(form).get('email')||'').trim().toLowerCase();
        const db=typeof loadDB==='function'?loadDB():{users:[]};
        const exists=(db.users||[]).some(u=>String(u.email||'').trim().toLowerCase()===email);
        if(email==='admin@fablab.local'||exists){
          busy=true;
          const btn=form.querySelector('button[type="submit"],button');
          if(btn){btn.disabled=true;btn.dataset.originalText=btn.textContent;btn.textContent='جاري فتح الحساب...';}
        }
      },false);
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,100);
})();
