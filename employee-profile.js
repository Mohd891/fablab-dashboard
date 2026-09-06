(function(){
 function init(){
  if(document.body.dataset.page!=='employee-settings'||typeof user!=='function')return;
  const u=user();if(!u)return;
  const main=document.querySelector('.portal-main');if(!main)return;
  const first=new URLSearchParams(location.search).get('firstLogin')==='1'||!u.password;
  main.querySelectorAll('.portal-card').forEach(x=>x.remove());
  const email=esc(u.email||'');
  main.insertAdjacentHTML('beforeend',`<section class="portal-card"><h2>${first?'أكمل بيانات حسابك':'إعدادات الحساب'}</h2><p class="muted">القسم: <strong>${esc(u.department||'غير محدد')}</strong></p><form id="employeeProfileForm"><div class="form-row"><label>الاسم<input name="name" value="${esc(u.name)}" required></label><label>القسم<input value="${esc(u.department||'')}" readonly></label></div><div class="form-row"><label>البريد للتسجيل<input value="${email}" readonly class="booking-readonly"></label><label>البريد الإلكتروني الشخصي<input type="email" name="contactEmail" value="${esc(u.contactEmail||'')}" placeholder="اتركه فارغًا حاليًا إذا ما عندك"></label></div><div class="form-row"><label>رقم الجوال<input name="phone" value="${esc(u.phone||'')}" placeholder="أدخل رقم الجوال"></label><label>كلمة مرور جديدة<input type="password" name="password" minlength="6" ${first?'required':''} placeholder="${first?'مطلوبة لأول دخول':'اتركها فارغة للإبقاء على الحالية'}"></label></div><button class="btn primary">${first?'حفظ وتفعيل الحساب':'حفظ التغييرات'}</button></form></section>`);
  document.getElementById('employeeProfileForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget),d=loadDB(),i=d.users.findIndex(x=>x.id===u.id),p=String(fd.get('password')||'').trim();if(first&&!p){toast('لازم تحط كلمة مرور لأول دخول','error');return}d.users[i].name=String(fd.get('name')).trim();d.users[i].contactEmail=String(fd.get('contactEmail')||'').trim().toLowerCase();d.users[i].phone=String(fd.get('phone')||'').trim();if(p)d.users[i].password=p;saveDB(d);setSession(d.users[i]);toast('تم حفظ بيانات الحساب');setTimeout(()=>location.href='employee.html',400)});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));else setTimeout(init,0);
})();
