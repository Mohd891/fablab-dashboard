(function(){
  const DB_KEY='fablab_demo_v1';
  const slug=s=>String(s||'').trim().toLowerCase().replace(/[ً-ٟ]/g,'').replace(/[^a-z0-9\u0600-\u06ff]+/g,'.').replace(/^\.+|\.+$/g,'').slice(0,28);
  function db(){try{return JSON.parse(localStorage.getItem(DB_KEY)||'{}')}catch{return {}}}
  function save(x){localStorage.setItem(DB_KEY,JSON.stringify(x))}
  function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
  function current(){try{return JSON.parse(localStorage.getItem('fablab_session_v1')||'null')}catch{return null}}
  function init(){
    if(document.body?.dataset?.page!=='admin-people')return;
    const s=current(); if(!s || s.role!=='admin')return;
    const main=document.querySelector('.portal-main')||document.querySelector('main'); if(!main || document.getElementById('employeeAccountManager'))return;
    const wrap=document.createElement('section'); wrap.className='portal-card'; wrap.id='employeeAccountManager';
    wrap.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:15px;flex-wrap:wrap"><div><span class="eyebrow">EMPLOYEE ACCOUNTS</span><h2 style="margin:7px 0">إدارة حسابات الموظفين</h2><p class="muted">أضف موظفًا جديدًا، وسيُنشأ له حساب دخول داخلي. البريد الشخصي والجوال يظلان فارغين حتى يكمل الموظف بياناته.</p></div></div>
      <form id="newEmployeeForm" style="margin-top:18px"><div class="form-row"><label>اسم الموظف<input name="name" required placeholder="مثال: أحمد محمد"></label><label>القسم / التخصص<input name="department" required placeholder="مثال: الإلكترونيات"></label></div><div class="form-row"><label>كلمة المرور المؤقتة<input name="password" type="password" minlength="6" required placeholder="6 أحرف أو أرقام على الأقل"></label><label>الجوال <span style="color:#9aa4b2">(اختياري)</span><input name="phone" placeholder="يترك فارغًا إذا لم يُدخل بعد"></label></div><button class="btn primary" type="submit">إضافة حساب الموظف</button></form>
      <div id="employeeAccountsList" style="margin-top:22px"></div>`;
    main.appendChild(wrap);
    render();
    wrap.querySelector('#newEmployeeForm').addEventListener('submit',function(e){
      e.preventDefault(); const fd=new FormData(e.currentTarget),name=String(fd.get('name')||'').trim(),department=String(fd.get('department')||'').trim(),password=String(fd.get('password')||'');
      if(!name||!department||password.length<6)return;
      const x=db(); x.users=Array.isArray(x.users)?x.users:[];
      if(x.users.some(u=>u.role==='employee'&&u.name.trim()===name)){alert('يوجد حساب موظف بهذا الاسم بالفعل.');return;}
      let base=slug(name)||'employee', email=base+'@fablab.local', n=2; while(x.users.some(u=>u.email===email)) email=base+(n++)+'@fablab.local';
      x.users.push({id:Date.now(),name,email,password,role:'employee',active:true,department,phone:String(fd.get('phone')||'').trim(),contactEmail:'',createdAt:new Date().toISOString()});
      save(x); e.currentTarget.reset(); render(); alert('تم إنشاء حساب الموظف بنجاح.\nحساب الدخول: '+email);
    });
    function render(){
      const x=db(), list=(x.users||[]).filter(u=>u.role==='employee');
      wrap.querySelector('#employeeAccountsList').innerHTML=list.length?`<div style="display:grid;gap:9px">${list.map(u=>`<div style="border:1px solid #e5eaf1;border-radius:12px;padding:13px;background:#fafbfd"><b>${esc(u.name)}</b><div style="font-size:11px;color:#7c8798;margin-top:4px">${esc(u.department||'غير محدد')} · ${esc(u.email)}</div></div>`).join('')}</div>`:'<div class="empty">لا توجد حسابات موظفين.</div>';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('load',init);
})();
