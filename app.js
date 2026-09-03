const KEY='fablab_demo_v1', SESSION='fablab_session_v1';

function seed(){
  return {
    users:[
      {id:1,name:'مدير النظام',email:'admin@fablab.local',password:'Admin@12345',role:'admin',status:'active'},
      {id:2,name:'موظف تجريبي',email:'employee@fablab.local',password:'Employee@12345',role:'employee',status:'active'}
    ],
    programs:[
      {id:1,name:'الروبوتات الذكية',category:'Robotics',max:20,status:'active',description:'تعلّم تصميم وبرمجة الروبوتات عمليًا.'},
      {id:2,name:'نبض الكهرباء',category:'Electronics',max:15,status:'active',description:'أساسيات الكهرباء والدارات وشرائط LED.'},
      {id:3,name:'صناع المستقبل',category:'Innovation',max:24,status:'active',description:'من الفكرة إلى النموذج الأولي بمشاريع عملية.'},
      {id:4,name:'هندسة الإبداع',category:'Engineering',max:18,status:'active',description:'حل المشكلات والهندسة الإبداعية والنمذجة.'},
      {id:5,name:'صناع الواقع',category:'Maker',max:20,status:'active',description:'تجارب تصنيع رقمي ومشاريع تطبيقية.'},
      {id:6,name:'VEX',category:'Robotics',max:20,status:'active',description:'الروبوتات التنافسية وتصميم الروبوت وبرمجته.'},
      {id:7,name:'SPIKE',category:'Robotics',max:20,status:'active',description:'برمجة وتصميم روبوتات LEGO SPIKE.'},
      {id:8,name:'معسكر المبتكر الإلكتروني',category:'Electronics',max:20,status:'active',description:'ابتكار إلكتروني وتصميم نماذج أولية.'}
    ],
    students:[],
    volunteers:[],
    trainers:[],
    attendance:[],
    logs:[],
    messages:[]
  };
}

function loadDB(){
  try{
    const raw=localStorage.getItem(KEY);
    if(!raw){
      const db=seed();
      localStorage.setItem(KEY,JSON.stringify(db));
      return db;
    }
    return JSON.parse(raw);
  }catch(e){
    const db=seed();
    localStorage.setItem(KEY,JSON.stringify(db));
    return db;
  }
}

function saveDB(db){
  localStorage.setItem(KEY,JSON.stringify(db));
}

function getSession(){
  try{
    return JSON.parse(localStorage.getItem(SESSION)||'null');
  }catch(e){
    return null;
  }
}

function setSession(user){
  localStorage.setItem(SESSION,JSON.stringify(user));
}

function clearSession(){
  localStorage.removeItem(SESSION);
}

function esc(v){
  return String(v??'')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

function shell(content,active,title){
  return `
    <header class="topbar">
      <div class="container nav">
        <a class="brand" href="index.html">
          <img src="assets/fablab-logo.png" alt="Fablab">
          <span>فاب لاب الأحساء</span>
        </a>

        <nav class="nav-links">
          <a class="${active==='home'?'active':''}" href="index.html">الرئيسية</a>
          <a class="${active==='programs'?'active':''}" href="programs.html">البرامج</a>
          <a class="${active==='about'?'active':''}" href="about.html">عن فاب لاب</a>
          <a class="${active==='contact'?'active':''}" href="contact.html">تواصل معنا</a>
          <a class="${active==='login'?'active':''}" href="login.html">تسجيل الدخول</a>
        </nav>
      </div>
    </header>

    <main class="container main">
      ${content}
    </main>

    <footer class="footer">
      <div class="container">
        <div>© 2026 فاب لاب الأحساء</div>
        <div>جميع الحقوق محفوظة</div>
      </div>
    </footer>
  `;
}

function write(html,active,title){
  document.title=title||'فاب لاب الأحساء';
  document.body.innerHTML=html;
}

function renderPublicHome(){
  const hero=`
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">FAB LAB AL-AHSA</span>
        <h1>من الفكرة إلى<br>نموذج ملموس.</h1>
        <p>
          مساحة ابتكار وتصنيع رقمي تتيح لك التعلم، التجربة،
          التصميم وصناعة أفكارك باستخدام أحدث التقنيات.
        </p>
        <div class="hero-actions">
          <a class="btn primary" href="programs.html">استكشف البرامج</a>
          <a class="btn ghost" href="register.html">إنشاء حساب طالب</a>
        </div>
      </div>

      <div class="hero-art">
        <img src="assets/fablab-logo-wide.png" alt="فاب لاب الأحساء">
      </div>
    </section>
  `;

  const section=`
    <section class="section">
      <div class="section-head">
        <div>
          <span class="eyebrow">PROGRAMS</span>
          <h2>اكتشف برامجنا</h2>
        </div>
        <a class="text-link" href="programs.html">عرض جميع البرامج ←</a>
      </div>

      <div class="program-grid">
        ${loadDB().programs.map(p=>`
          <article class="program-card">
            <span class="tag">${esc(p.category)}</span>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  const author=`
    <section class="author-credit">
      <div class="author-badge">
        <span class="author-avatar">م</span>
        <div class="author-meta">
          <strong>محمد الرمضان</strong>
          <span>مساعد إداري ومالي</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  `;

  write(
    shell(hero+section+author,'home','فاب لاب الأحساء | الرئيسية'),
    'home',
    'فاب لاب الأحساء | الرئيسية'
  );
}

function renderPrograms(){
  const db=loadDB();

  const rows=db.programs.map(p=>`
    <article class="program-row" id="p${p.id}">
      <div class="icon">✦</div>

      <div class="grow">
        <span class="tag">${esc(p.category)}</span>
        <h2>${esc(p.name)}</h2>
        <p>${esc(p.description)}</p>
      </div>
    </article>
  `).join('');

  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">PROGRAMS</span>
        <h1>برامج فاب لاب</h1>
        <p>استكشف البرامج والمسارات التدريبية المتاحة.</p>
      </section>

      <section class="section compact">
        ${rows || '<div class="empty">لا توجد برامج حاليًا.</div>'}
      </section>
    `,'programs','البرامج | فاب لاب'),
    'programs',
    'البرامج | فاب لاب'
  );
}

function renderLogin(){
  write(
    shell(`
      <section class="auth-wrap">
        <div class="auth-card">
          <span class="eyebrow">LOGIN</span>
          <h1>تسجيل الدخول</h1>

          <form id="loginForm">
            <label>
              البريد الإلكتروني
              <input type="email" name="email" required>
            </label>

            <label>
              كلمة المرور
              <input type="password" name="password" required>
            </label>

            <button class="btn primary" type="submit">دخول</button>

            <div id="loginMsg"></div>
          </form>

          <div class="auth-links">
            <a href="register.html">إنشاء حساب طالب</a>
          </div>
        </div>
      </section>
    `,'login','تسجيل الدخول | فاب لاب'),
    'login',
    'تسجيل الدخول | فاب لاب'
  );

  const form=document.getElementById('loginForm');

  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();

      const fd=new FormData(form);
      const email=String(fd.get('email')||'').trim().toLowerCase();
      const password=String(fd.get('password')||'');

      const db=loadDB();
      const user=db.users.find(
        u=>String(u.email).toLowerCase()===email &&
           u.password===password &&
           u.status!=='disabled'
      );

      const msg=document.getElementById('loginMsg');

      if(!user){
        msg.innerHTML='<div class="alert error">البريد الإلكتروني أو كلمة المرور غير صحيحة.</div>';
        return;
      }

      setSession({
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      });

      if(user.role==='admin'){
        location.href='admin.html';
      }else if(user.role==='employee'){
        location.href='employee.html';
      }else{
        location.href='student.html';
      }
    });
  }
}

function renderRegister(){
  write(
    shell(`
      <section class="auth-wrap">
        <div class="auth-card">
          <span class="eyebrow">STUDENT REGISTRATION</span>
          <h1>إنشاء حساب طالب</h1>
          <p>أنشئ حسابك أولًا، ويمكنك متابعة البرامج المتاحة بعد تسجيل الدخول.</p>

          <form id="registerForm">
            <label>
              الاسم الكامل
              <input type="text" name="name" required>
            </label>

            <label>
              البريد الإلكتروني
              <input type="email" name="email" required>
            </label>

            <label>
              كلمة المرور
              <input type="password" name="password" required minlength="6">
            </label>

            <label>
              تأكيد كلمة المرور
              <input type="password" name="password2" required minlength="6">
            </label>

            <button class="btn primary" type="submit">إنشاء الحساب</button>

            <div id="registerMsg"></div>
          </form>
        </div>
      </section>
    `,'login','إنشاء حساب طالب | فاب لاب'),
    'login',
    'إنشاء حساب طالب | فاب لاب'
  );

  const form=document.getElementById('registerForm');

  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();

      const fd=new FormData(form);

      const name=String(fd.get('name')||'').trim();
      const email=String(fd.get('email')||'').trim().toLowerCase();
      const password=String(fd.get('password')||'');
      const password2=String(fd.get('password2')||'');

      const msg=document.getElementById('registerMsg');
      const db=loadDB();

      if(password!==password2){
        msg.innerHTML='<div class="alert error">كلمتا المرور غير متطابقتين.</div>';
        return;
      }

      if(db.users.some(u=>String(u.email).toLowerCase()===email)){
        msg.innerHTML='<div class="alert error">البريد الإلكتروني مستخدم مسبقًا.</div>';
        return;
      }

      const id=Date.now();

      const user={
        id,
        name,
        email,
        password,
        role:'student',
        status:'active'
      };

      db.users.push(user);

      db.students.push({
        id,
        user_id:id,
        name,
        email,
        created_at:new Date().toISOString()
      });

      saveDB(db);

      setSession({
        id,
        name,
        email,
        role:'student'
      });

      location.href='student.html';
    });
  }
}

function renderAbout(){
  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">ABOUT</span>
        <h1>عن فاب لاب الأحساء</h1>
        <p>بيئة تعليمية وصناعية تساعد المبتكرين على تحويل الأفكار إلى نماذج ومشاريع واقعية.</p>
      </section>

      <section class="section">
        <div class="about-card">
          <h2>التعلم بالتجربة</h2>
          <p>
            يوفر فاب لاب مساحة للتعلم العملي والتصميم والتصنيع الرقمي
            من خلال مجموعة من البرامج والأنشطة التقنية.
          </p>
        </div>
      </section>
    `,'about','عن فاب لاب الأحساء'),
    'about',
    'عن فاب لاب الأحساء'
  );
}

function renderContact(){
  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">CONTACT</span>
        <h1>تواصل معنا</h1>
        <p>يسعدنا استقبال استفساراتكم ومقترحاتكم.</p>
      </section>

      <section class="section">
        <div class="contact-card">
          <h2>واتساب</h2>
          <a
            class="btn primary"
            href="https://wa.me/966566552942"
            target="_blank"
            rel="noopener"
          >
            واتساب · 0566552942
          </a>
        </div>
      </section>
    `,'contact','تواصل معنا | فاب لاب'),
    'contact',
    'تواصل معنا | فاب لاب'
  );
}

function renderStudent(){
  const session=getSession();

  if(!session){
    location.href='login.html';
    return;
  }

  const db=loadDB();

  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">STUDENT</span>
        <h1>مرحبًا ${esc(session.name)}</h1>
        <p>هذه صفحتك الخاصة كطالب.</p>
      </section>

      <section class="section">
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <span>الاسم</span>
            <strong>${esc(session.name)}</strong>
          </div>

          <div class="dashboard-card">
            <span>البريد الإلكتروني</span>
            <strong>${esc(session.email)}</strong>
          </div>

          <div class="dashboard-card">
            <span>البرامج</span>
            <strong>${db.programs.length}</strong>
          </div>
        </div>

        <div class="section-actions">
          <a class="btn ghost" href="programs.html">استعراض البرامج</a>
          <button class="btn primary" id="logoutBtn">تسجيل الخروج</button>
        </div>
      </section>
    `,'student','حساب الطالب | فاب لاب'),
    'student',
    'حساب الطالب | فاب لاب'
  );

  const logout=document.getElementById('logoutBtn');

  if(logout){
    logout.onclick=function(){
      clearSession();
      location.href='index.html';
    };
  }
}

function renderEmployee(){
  const session=getSession();

  if(!session){
    location.href='login.html';
    return;
  }

  if(session.role!=='employee' && session.role!=='admin'){
    location.href='student.html';
    return;
  }

  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">EMPLOYEE</span>
        <h1>لوحة الموظف</h1>
        <p>مرحبًا ${esc(session.name)}.</p>
      </section>

      <section class="section">
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <span>الدور</span>
            <strong>موظف</strong>
          </div>
        </div>

        <div class="section-actions">
          <button class="btn primary" id="logoutBtn">تسجيل الخروج</button>
        </div>
      </section>
    `,'employee','لوحة الموظف | فاب لاب'),
    'employee',
    'لوحة الموظف | فاب لاب'
  );

  const logout=document.getElementById('logoutBtn');

  if(logout){
    logout.onclick=function(){
      clearSession();
      location.href='index.html';
    };
  }
}

function renderAdmin(){
  const session=getSession();

  if(!session){
    location.href='login.html';
    return;
  }

  if(session.role!=='admin'){
    location.href=session.role==='employee'?'employee.html':'student.html';
    return;
  }

  const db=loadDB();

  write(
    shell(`
      <section class="page-head">
        <span class="eyebrow">ADMIN</span>
        <h1>لوحة المدير</h1>
        <p>مرحبًا ${esc(session.name)}.</p>
      </section>

      <section class="section">
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <span>المستخدمون</span>
            <strong>${db.users.length}</strong>
          </div>

          <div class="dashboard-card">
            <span>الطلاب</span>
            <strong>${db.students.length}</strong>
          </div>

          <div class="dashboard-card">
            <span>البرامج</span>
            <strong>${db.programs.length}</strong>
          </div>

          <div class="dashboard-card">
            <span>الرسائل</span>
            <strong>${db.messages.length}</strong>
          </div>
        </div>

        <div class="section-actions">
          <button class="btn primary" id="logoutBtn">تسجيل الخروج</button>
        </div>
      </section>
    `,'admin','لوحة المدير | فاب لاب'),
    'admin',
    'لوحة المدير | فاب لاب'
  );

  const logout=document.getElementById('logoutBtn');

  if(logout){
    logout.onclick=function(){
      clearSession();
      location.href='index.html';
    };
  }
}

document.addEventListener('DOMContentLoaded',function(){
  const page=document.body.dataset.page;

  if(page==='home'){
    renderPublicHome();
  }else if(page==='programs'){
    renderPrograms();
  }else if(page==='login'){
    renderLogin();
  }else if(page==='register'){
    renderRegister();
  }else if(page==='about'){
    renderAbout();
  }else if(page==='contact'){
    renderContact();
  }else if(page==='student'){
    renderStudent();
  }else if(page==='employee'){
    renderEmployee();
  }else if(page==='admin'){
    renderAdmin();
  }
});
