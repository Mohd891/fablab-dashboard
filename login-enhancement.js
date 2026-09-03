window.addEventListener('load',function(){
  var form=document.getElementById('loginForm');
  if(!form)return;

  var toastEl=document.getElementById('toast');
  if(!toastEl){
    toastEl=document.createElement('div');
    toastEl.id='toast';
    toastEl.className='toast';
    document.body.appendChild(toastEl);
  }

  function showLoginError(message,focusInput){
    toastEl.textContent=message;
    toastEl.className='toast show error';
    if(focusInput)focusInput.focus();
    clearTimeout(window.__loginToastTimer);
    window.__loginToastTimer=setTimeout(function(){
      toastEl.className='toast';
    },3000);
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
      showLoginError('هذا البريد الإلكتروني غير مسجل. أنشئ حساب طالب أولًا.',emailInput);
      return;
    }

    if(account.password!==password||!account.active){
      showLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة.',passwordInput);
      return;
    }

    if(typeof setSession==='function')setSession(account);
    location.href='portal.html';
  },true);
});
