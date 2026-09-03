window.addEventListener('load',function(){
  var form=document.getElementById('loginForm');
  if(!form)return;
  form.addEventListener('submit',function(e){
    var emailInput=form.querySelector('[name="email"]');
    var passwordInput=form.querySelector('[name="password"]');
    var email=String(emailInput&&emailInput.value||'').trim().toLowerCase();
    var password=String(passwordInput&&passwordInput.value||'');
    if(typeof loadDB!=='function'||typeof toast!=='function')return;
    var db=loadDB();
    var account=db.users.find(function(u){return String(u.email||'').toLowerCase()===email;});
    e.preventDefault();
    e.stopImmediatePropagation();
    if(!account){
      toast('هذا البريد الإلكتروني غير مسجل. أنشئ حساب طالب أولًا.','error');
      if(emailInput)emailInput.focus();
      return;
    }
    if(account.password!==password||!account.active){
      toast('البريد الإلكتروني أو كلمة المرور غير صحيحة.','error');
      if(passwordInput)passwordInput.focus();
      return;
    }
    setSession(account);
    location.href='portal.html';
  },true);
});
