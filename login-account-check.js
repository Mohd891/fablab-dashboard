(function(){
  const STAFF_ACCOUNTS=[
    {id:101,name:'سعد السلمان',department:'الطباعة ثلاثية الأبعاد',email:'saad.3d@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:102,name:'أسماء أبوضيف',department:'الروبوتات',email:'asmaa.robotics@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:103,name:'يوسف علي',department:'الإلكترونيات',email:'yousef.electronics@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:104,name:'أحمد طارق',department:'القص بالليزر',email:'ahmed.laser@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:105,name:'سعد المبرزي',department:'الخشب',email:'saad.wood@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:106,name:'آمال الصياح',department:'الكيدز لاب والفينيل',email:'amal.kids@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:107,name:'نوف البوعبيد',department:'البرامج والمشاريع',email:'nouf.programs@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:108,name:'فوزي العيسى',department:'الطباعة ثلاثية الأبعاد والقص بالليزر',email:'fawzi.advisor@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:109,name:'زكي اللويم',department:'الإدارة',email:'zaki.director@fablab.local',contactEmail:'',phone:'',role:'admin'},
    {id:110,name:'محمد الرمضان',department:'الإدارة',email:'mohammed.admin@fablab.local',contactEmail:'',phone:'',role:'employee'},
    {id:111,name:'نور العامر',department:'الاستقبال',email:'nour.reception@fablab.local',contactEmail:'',phone:'',role:'employee'}
  ];
  function ensureStaffAccounts(){
    if(typeof loadDB!=='function'||typeof saveDB!=='function')return;
    const db=loadDB();db.users=db.users||[];let changed=false;
    STAFF_ACCOUNTS.forEach(staff=>{
      let u=db.users.find(x=>x.id===staff.id||String(x.email||'').toLowerCase()===staff.email.toLowerCase());
      if(!u){db.users.push({...staff,password:'',active:true});changed=true}
      else{
        const patch={name:staff.name,department:staff.department,role:staff.role,active:true,contactEmail:u.contactEmail??'',phone:u.phone??'',email:staff.email};
        Object.keys(patch).forEach(k=>{if(u[k]!==patch[k]){u[k]=patch[k];changed=true}});
      }
    });
    if(changed)saveDB(db);
  }
  ensureStaffAccounts();
  function init(){
    if(typeof window.renderLogin!=='function'||window.__loginAccountCheck)return;
    window.__loginAccountCheck=true;
    const original=window.renderLogin;
    window.renderLogin=function(){
      ensureStaffAccounts();
      original();
      const form=document.getElementById('loginForm');
      if(!form)return;
      form.addEventListener('submit',function(e){
        const fd=new FormData(form),email=String(fd.get('email')||'').trim().toLowerCase();
        const db=loadDB(),staff=db.users.find(u=>String(u.email||'').toLowerCase()===email&&(u.role==='employee'||u.role==='admin'));
        if(staff&&staff.active&&staff.password===''){
          e.preventDefault();e.stopImmediatePropagation();setSession(staff);location.href=staff.role==='admin'?'admin-settings.html?firstLogin=1':'employee-settings.html?firstLogin=1';return;
        }
        const exists=(db.users||[]).some(u=>String(u.email||'').trim().toLowerCase()===email);
        if(!exists&&email!=='admin@fablab.local'){
          e.preventDefault();e.stopImmediatePropagation();
          const old=document.getElementById('loginAccountModal');if(old)old.remove();
          const modal=document.createElement('div');modal.id='loginAccountModal';
          modal.innerHTML='<div class="login-check-back"><div class="login-check-box"><button type="button" class="login-check-close">×</button><div class="login-check-icon">👤</div><h2>الحساب غير مسجل</h2><p>هذا البريد الإلكتروني غير مسجل في بوابة الطالب.</p><p>هل تريد إنشاء حساب جديد؟</p><div class="login-check-actions"><a href="register.html" class="btn primary">إنشاء حساب</a><button type="button" class="btn login-check-cancel">إلغاء</button></div></div></div>';
          document.body.appendChild(modal);modal.querySelector('.login-check-close').onclick=()=>modal.remove();modal.querySelector('.login-check-cancel').onclick=()=>modal.remove();modal.querySelector('.login-check-back').onclick=e=>{if(e.target===e.currentTarget)modal.remove()};
        }
      },true);
      let busy=false;form.addEventListener('submit',function(){
        if(busy)return;const email=String(new FormData(form).get('email')||'').trim().toLowerCase(),db=loadDB();const exists=(db.users||[]).some(u=>String(u.email||'').trim().toLowerCase()===email);
        if(email==='admin@fablab.local'||exists){busy=true;const btn=form.querySelector('button[type="submit"],button');if(btn){btn.disabled=true;btn.dataset.originalText=btn.textContent;btn.textContent='جاري فتح الحساب...'}}
      },false);
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,100);
})();
