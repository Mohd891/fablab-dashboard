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

  function isValidEmailFormat(email){
    if(!email||email.length>254||/\s/.test(email))return false;
    var parts=email.split('@');
    if(parts.length!==2)return false;
    var local=parts[0],domain=parts[1];
    if(!local||!domain||local.length>64||local[0]==='.'||local[local.length-1]==='.'||local.indexOf('..')!==-1)return false;
    if(!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local))return false;
    if(domain.length<4||domain[0]==='.'||domain[domain.length-1]==='.'||domain.indexOf('..')!==-1)return false;
    var labels=domain.split('.');
    if(labels.length<2)return false;
    for(var i=0;i<labels.length;i++){
      if(!labels[i]||labels[i].length>63||labels[i][0]==='-'||labels[i][labels[i].length-1]==='-'||!/^[A-Za-z0-9-]+$/.test(labels[i]))return false;
    }
    return /^[A-Za-z]{2,63}$/.test(labels[labels.length-1]);
  }

  function domainSuggestion(email){
    var at=email.lastIndexOf('@');
    if(at<0)return null;
    var domain=email.slice(at+1).toLowerCase();
    var common=['gmail.com','hotmail.com','outlook.com','yahoo.com','icloud.com','live.com','msn.com','proton.me','protonmail.com'];
    var best=null,bestDistance=3;
    function distance(a,b){
      var prev=[];
      for(var j=0;j<=b.length;j++)prev[j]=j;
      for(var i=1;i<=a.length;i++){
        var cur=[i];
        for(var j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
        prev=cur;
      }
      return prev[b.length];
    }
    common.forEach(function(item){var d=distance(domain,item);if(d<bestDistance){best=item;bestDistance=d}});
    return best;
  }

  form.addEventListener('submit',function(e){
    var emailInput=form.querySelector('[name="email"]');
    var passwordInput=form.querySelector('[name="password"]');
    var email=String(emailInput&&emailInput.value||'').trim().toLowerCase();
    var password=String(passwordInput&&passwordInput.value||'');

    e.preventDefault();
    e.stopImmediatePropagation();

    if(!isValidEmailFormat(email)){
      showLoginError('اكتب البريد الإلكتروني بصيغة صحيحة، مثل name@example.com.',emailInput);
      return;
    }

    var suggestion=domainSuggestion(email);
    if(suggestion&&email.split('@')[1]!==suggestion){
      showLoginError('يبدو أن نطاق البريد مكتوب بشكل غير صحيح. هل تقصد '+suggestion+'؟',emailInput);
      return;
    }

    var db=typeof loadDB==='function'?loadDB():null;
    if(!db||!Array.isArray(db.users))return;

    var account=db.users.find(function(u){
      return String(u.email||'').trim().toLowerCase()===email;
    });

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
