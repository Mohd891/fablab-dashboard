/* Supabase cloud integration for Fablab Al-Ahsa demo */
(function(){
  if(!window.supabase || !window.supabase.createClient){
    console.error('Supabase JS client is not loaded.');
    return;
  }

  const SUPABASE_URL = 'https://nwlqroyagrfuzfrtikln.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  const ADMIN_EMAIL = 'admin@fablab.local';
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  window.fablabSupabase = sb;

  const originalRegister = window.renderRegister;
  const originalAdminStudents = window.renderAdminStudents;
  const originalAdmin = window.renderAdmin;

  window.renderRegister = function(){
    const db = loadDB();
    const opts = db.programs.filter(p=>p.status==='active').map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('');
    write(`<div class="auth-wrap"><div class="auth-card wide"><a class="brand center" href="index.html"><img src="assets/fablab-logo.png" alt="Fablab"><span>فاب لاب الأحساء</span></a><h1>إنشاء حساب طالب</h1><p class="muted">سجل بنفسك وادخل إلى بوابتك الشخصية.</p><form id="registerForm"><div class="form-row"><label>الاسم الكامل<input name="name" required></label><label>رقم الجوال<input name="phone" required></label></div><div class="form-row"><label>البريد الإلكتروني<input type="email" name="email" required></label><label>العمر<input type="number" name="age" min="7" max="80" required></label></div><div class="form-row"><label>الجنس<select name="gender" required><option value="">اختر</option><option>ذكر</option><option>أنثى</option></select></label><label>البرنامج<select name="program" required><option value="">اختر البرنامج</option>${opts}</select></label></div><label>كلمة المرور<input type="password" name="password" minlength="6" required></label><button class="btn primary full">إنشاء الحساب</button></form><div class="auth-links"><a href="login.html">لديك حساب؟ تسجيل الدخول</a><a href="index.html">العودة للموقع</a></div></div></div>`);

    document.getElementById('registerForm').addEventListener('submit',async e=>{
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const dbNow = loadDB();
      const name = String(fd.get('name')).trim();
      const phone = String(fd.get('phone')).trim();
      const email = String(fd.get('email')).trim().toLowerCase();
      const age = Number(fd.get('age'));
      const gender = String(fd.get('gender'));
      const programId = Number(fd.get('program'));
      const password = String(fd.get('password'));
      const program = dbNow.programs.find(p=>p.id===programId);

      if(dbNow.users.some(u=>u.email.toLowerCase()===email)){
        toast('البريد الإلكتروني مستخدم مسبقًا','error'); return;
      }
      const used = dbNow.students.filter(s=>s.programId===programId).length;
      if(program && used>=program.max){
        toast('البرنامج مكتمل حاليًا','error'); return;
      }

      const {error: cloudError} = await sb.from('registrations').insert({
        full_name:name,
        phone,
        email,
        age,
        gender,
        program:program?.name || ''
      });

      if(cloudError){
        console.error(cloudError);
        toast('تعذر حفظ التسجيل على قاعدة البيانات','error');
        return;
      }

      const uid=Date.now(), studentId=uid+1;
      dbNow.users.push({id:uid,name,email,password,role:'student',active:true});
      dbNow.students.push({id:studentId,userId:uid,name,phone,age,gender,programId,createdAt:new Date().toISOString()});
      logActivity(dbNow,'إنشاء حساب طالب',name,program?.name||'');
      setSession(dbNow.users[dbNow.users.length-1]);
      toast('تم إنشاء الحساب وحفظ التسجيل بنجاح');
      setTimeout(()=>location.href='portal.html',500);
    });
  };

  window.renderAdminStudents = function(){
    const u = guard(['admin','employee']);
    if(!u) return;
    if(u.role !== 'admin'){
      return originalAdminStudents();
    }

    document.body.innerHTML = portalShell(`<section class="portal-card"><div class="toolbar"><input id="studentSearch" placeholder="بحث بالاسم أو البريد أو الجوال..."></div><div id="cloudStatus" class="muted" style="margin:0 0 14px">جاري تحميل التسجيلات من قاعدة البيانات...</div><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>البريد</th><th>الجوال</th><th>العمر</th><th>الجنس</th><th>البرنامج</th><th>تاريخ التسجيل</th></tr></thead><tbody id="studentRows"></tbody></table></div></section>`,'الطلاب','admin');

    const rowsEl = document.getElementById('studentRows');
    const statusEl = document.getElementById('cloudStatus');
    let rows=[];

    function draw(){
      const q=(document.getElementById('studentSearch').value||'').toLowerCase().trim();
      const filtered=rows.filter(r=>Object.values(r).join(' ').toLowerCase().includes(q));
      rowsEl.innerHTML=filtered.length ? filtered.map(r=>`<tr><td>${esc(r.full_name)}</td><td>${esc(r.email)}</td><td>${esc(r.phone)}</td><td>${esc(r.age)}</td><td>${esc(r.gender)}</td><td>${esc(r.program)}</td><td>${esc(new Date(r.created_at).toLocaleString('ar-SA'))}</td></tr>`).join('') : '<tr><td colspan="7" class="empty">لا توجد تسجيلات.</td></tr>';
    }

    document.getElementById('studentSearch').addEventListener('input',draw);
    sb.from('registrations').select('*').order('created_at',{ascending:false}).then(({data,error})=>{
      if(error){
        console.error(error);
        statusEl.textContent='تعذر قراءة التسجيلات من قاعدة البيانات. تأكد من إعداد صلاحية المدير في Supabase.';
        statusEl.className='muted';
        return;
      }
      rows=data||[];
      statusEl.textContent=`تم تحميل ${rows.length} تسجيل من قاعدة البيانات السحابية.`;
      draw();
    });

    setupLogout();
  };

  window.setupLogout = function(){
    document.getElementById('logoutLink')?.addEventListener('click',async e=>{
      e.preventDefault();
      await sb.auth.signOut();
      clearSession();
      location.href='index.html';
    });
  };

  window.renderLogin = function(){
    write(`<div class="auth-wrap"><div class="auth-card"><a class="brand center" href="index.html"><img src="assets/fablab-logo.png" alt="Fablab"><span>فاب لاب الأحساء</span></a><h1>تسجيل الدخول</h1><p class="muted">ادخل إلى بوابتك حسب نوع حسابك.</p><form id="loginForm"><label>البريد الإلكتروني<input type="email" name="email" required></label><label>كلمة المرور<input type="password" name="password" required></label><button class="btn primary full">دخول</button></form><div class="demo-box"><b>حساب المدير السحابي</b><span>${ADMIN_EMAIL}</span><span>أنشئه مرة واحدة من Supabase Authentication</span></div><div class="auth-links"><a href="register.html">إنشاء حساب طالب</a><a href="index.html">العودة للموقع</a></div></div></div>`);

    document.getElementById('loginForm').addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(e.currentTarget);
      const email=String(fd.get('email')).trim().toLowerCase();
      const password=String(fd.get('password'));

      if(email===ADMIN_EMAIL){
        const {data,error}=await sb.auth.signInWithPassword({email,password});
        if(error || !data.user){
          console.error(error);
          toast('تعذر تسجيل دخول المدير. تأكد من إنشاء حساب المدير في Supabase.','error');
          return;
        }
        const db=loadDB();
        const localAdmin=db.users.find(x=>x.role==='admin') || {id:1,name:'مدير النظام',email:ADMIN_EMAIL,role:'admin',active:true};
        setSession(localAdmin);
        location.href='admin.html';
        return;
      }

      const db=loadDB();
      const u=db.users.find(x=>x.email.toLowerCase()===email&&x.password===password&&x.active);
      if(!u){toast('البريد أو كلمة المرور غير صحيحة','error');return;}
      setSession(u);location.href='portal.html';
    });
  };

  window.renderAdmin = function(){
    originalAdmin();
    if(user()?.role!=='admin') return;
    sb.from('registrations').select('id',{count:'exact',head:true}).then(({count,error})=>{
      if(!error){
        const firstKpi=document.querySelector('.kpi strong');
        if(firstKpi) firstKpi.textContent=String(count||0);
        const firstLabel=document.querySelector('.kpi span');
        if(firstLabel) firstLabel.textContent='التسجيلات السحابية';
      }
    });
  };
})();
