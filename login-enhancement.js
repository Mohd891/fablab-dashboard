window.addEventListener('load',function(){
  var form=document.getElementById('loginForm');
  if(!form)return;

  // صفحة تسجيل الدخول لا تحتوي على صندوق التنبيه افتراضيًا، لذلك ننشئه هنا.
  var toastEl=document.getElementById('toast');
  if(!toastEl){
    toastEl=document.createElement('div');
    toastEl.id='toast';
    toastEl.className='toast';
    document.body.appendChild(toastEl);
  }

  form.addEventListener('submit',function(e){
    var emailInput=form.querySelector('[name="email"]');
    var passwordInput=form.querySelector('[name="password"]');
    var email=String(emailInput&&emailInput.value||'').trim().toLowerCase();
    var password=String(passwordInput&&passwordInput.value||'');
    var db=typeof loadDB==='function'?loadDB():null;
    if(!db||!Array.isArray(db.users))return;

    var account=db.users.find(function(u){
      return String(u.email||'').trim().toLowerCase()===email;
    });

    e.preventDefault();
    e.stopImmediatePropagation();

    if(!account){
      toastEl.textContent='هذا البريد الإلكتروني غير مسجل. أنشئ حساب طالب أولًا.';
      toastEl.className='toast show error';
      setTimeout(function(){toastEl.className='toast';},3000);
      if(emailInput)emailInput.focus();
      return;
    }

    if(account.password!==password||!account.active){
      toastEl.textContent='البريد الإلكتروني أو كلمة المرور غير صحيحة.';
      toastEl.className='toast show error';
      setTimeout(function(){toastEl.className='toast';},3000);
      if(passwordInput)passwordInput.focus();
      return;
    }

    if(typeof setSession==='function')setSession(account);
    location.href='portal.html';
  },true);
});
