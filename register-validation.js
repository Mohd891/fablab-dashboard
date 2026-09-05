(function(){
  function init(){
    const form=document.getElementById('registerForm');
    if(!form||form.dataset.validationReady)return;
    form.dataset.validationReady='1';
    const fields={
      name:{el:form.elements.name,msg:'اكتب الاسم الكامل، ويجب أن يحتوي على كلمتين على الأقل وبينهما مسافة.'},
      phone:{el:form.elements.phone,msg:'رقم الجوال غير صحيح. يجب أن يكون رقمًا سعوديًا من 10 خانات مثل 05xxxxxxxx.'},
      email:{el:form.elements.email,msg:'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@example.com.'},
      age:{el:form.elements.age,msg:'أدخل عمرًا صحيحًا من 7 إلى 80.'},
      gender:{el:form.elements.gender,msg:'اختر الجنس.'},
      password:{el:form.elements.password,msg:'كلمة المرور يجب ألا تقل عن 6 أحرف.'}
    };
    function show(field,msg){
      const el=field.el;
      let box=el.parentElement.querySelector('.register-field-error');
      if(!box){box=document.createElement('small');box.className='register-field-error';el.parentElement.appendChild(box)}
      box.textContent=msg||'';box.style.display=msg?'block':'none';box.style.cssText+=';color:#d93025;margin-top:6px;font-size:13px';
      el.setAttribute('aria-invalid',msg?'true':'false');el.setCustomValidity(msg||'');
    }
    function valid(){
      let ok=true;
      const name=fields.name.el.value.trim().replace(/\s+/g,' ');
      if(name.split(' ').filter(Boolean).length<2||name.split(' ').some(x=>x.length<2)){show(fields.name,fields.name.msg);ok=false}else show(fields.name,'');
      const phone=fields.phone.el.value.replace(/[\s()-]/g,'');
      if(!/^(05\d{8}|\+9665\d{8}|9665\d{8})$/.test(phone)){show(fields.phone,fields.phone.msg);ok=false}else show(fields.phone,'');
      if(!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(fields.email.el.value.trim())){show(fields.email,fields.email.msg);ok=false}else show(fields.email,'');
      const age=Number(fields.age.el.value);
      if(!Number.isInteger(age)||age<7||age>80){show(fields.age,fields.age.msg);ok=false}else show(fields.age,'');
      if(!fields.gender.el.value){show(fields.gender,fields.gender.msg);ok=false}else show(fields.gender,'');
      if(fields.password.el.value.length<6){show(fields.password,fields.password.msg);ok=false}else show(fields.password,'');
      return ok;
    }
    Object.values(fields).forEach(field=>field.el.addEventListener('input',()=>{const box=field.el.parentElement.querySelector('.register-field-error');if(box&&box.textContent)valid()}));
    form.addEventListener('submit',function(e){if(!valid()){e.preventDefault();e.stopImmediatePropagation();const bad=form.querySelector('[aria-invalid="true"]');bad&&bad.focus();}},true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,100);
})();