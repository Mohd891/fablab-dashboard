(function(){
  if(document.body.dataset.page!=='portal') return;
  const S='https://nwlqroyagrfuzfrtikln.supabase.co';
  const K='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  let sb;
  function init(){
    if(!window.supabase?.createClient) return setTimeout(init,250);
    sb=window.supabase.createClient(S,K);
    inject();
  }
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function getStudent(){
    try{
      const u=typeof user==='function'?user():null;
      const db=typeof loadDB==='function'?loadDB():null;
      const s=u&&db?.students?.find(x=>x.userId===u.id);
      return u&&s?{name:s.name||u.name,email:u.email,phone:s.phone||''}:null;
    }catch(_){return null}
  }
  function inject(){
    if(document.getElementById('studentBookingCard')) return;
    const host=document.querySelector('main')||document.body;
    const style=document.createElement('style');
    style.textContent=`
      #studentBookingCard{margin:24px auto;max-width:1100px;background:#fff;border:1px solid #e6ebf2;border-radius:20px;padding:22px;box-shadow:0 10px 30px rgba(19,32,51,.07)}
      #studentBookingCard h2{margin:0 0 6px}.sb-muted{color:#718096}.sb-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}.sb-form label{display:flex;flex-direction:column;gap:6px;font-weight:700}.sb-form input,.sb-form select,.sb-form textarea{font:inherit;border:1px solid #d8e0ea;border-radius:10px;padding:11px;background:#fff}.sb-form textarea{min-height:80px}.sb-full{grid-column:1/-1}.sb-msg{margin-top:10px;font-weight:700}.sb-table{width:100%;border-collapse:collapse;margin-top:16px;min-width:700px}.sb-table th,.sb-table td{padding:10px;border-bottom:1px solid #edf0f4;text-align:right}.sb-scroll{overflow-x:auto}.sb-badge{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:12px;font-weight:800}.sb-pending{background:#fff7df;color:#8a5b00}.sb-approved{background:#e8f7ee;color:#137a42}.sb-rejected{background:#fff0f0;color:#b42318}@media(max-width:700px){.sb-form{grid-template-columns:1fr}.sb-full{grid-column:auto}#studentBookingCard{margin:18px 10px;padding:16px}}
    `;
    document.head.appendChild(style);
    const card=document.createElement('section');card.id='studentBookingCard';
    card.innerHTML=`<h2>📅 حجز موعد</h2><p class="sb-muted">اختر القسم واليوم والوقت، ثم أرسل طلبك. ستظهر حالة الطلب هنا بعد مراجعته.</p>
      <form id="studentBookingForm" class="sb-form">
        <label>القسم<select name="department" required><option value="">اختر القسم</option><option>القص بالليزر</option><option>الروبوتات</option><option>الإلكترونيات</option><option>الطباعة ثلاثية الأبعاد</option><option>الخشب</option></select></label>
        <label>التاريخ<input type="date" name="date" required></label>
        <label>الوقت<input type="time" name="time" required></label>
        <label class="sb-full">ملاحظات (اختياري)<textarea name="notes" maxlength="1000" placeholder="اكتب سبب الموعد أو أي ملاحظة..." ></textarea></label>
        <div class="sb-full"><button class="btn primary" id="studentBookingSubmit">إرسال طلب الحجز</button><div id="studentBookingMsg" class="sb-msg"></div></div>
      </form>
      <div id="studentBookingsList"></div>`;
    host.appendChild(card);
    const d=card.querySelector('[name="date"]');d.min=new Date().toISOString().slice(0,10);
    card.querySelector('#studentBookingForm').addEventListener('submit',submit);
    loadBookings();
  }
  async function submit(e){
    e.preventDefault();
    const student=getStudent();const form=e.currentTarget;const msg=document.getElementById('studentBookingMsg');const btn=document.getElementById('studentBookingSubmit');
    if(!student){msg.textContent='تعذر قراءة بيانات حساب الطالب.';msg.style.color='#b42318';return}
    const fd=new FormData(form);const payload={p_student_name:student.name,p_student_email:student.email,p_student_phone:student.phone,p_department:String(fd.get('department')||''),p_appointment_date:String(fd.get('date')||''),p_appointment_time:String(fd.get('time')||''),p_notes:String(fd.get('notes')||'')};
    btn.disabled=true;msg.textContent='جاري إرسال طلب الحجز...';msg.style.color='';
    const {data,error}=await sb.rpc('create_student_appointment',payload);
    if(error){msg.textContent=error.message?.includes('محجوز')?'هذا الموعد محجوز بالفعل لهذا القسم. اختر وقتًا آخر.':'تعذر إرسال طلب الحجز. حاول مرة أخرى.';msg.style.color='#b42318';btn.disabled=false;return}
    const a=data;
    try{await fetch(`${S}/functions/v1/send-appointment-email`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student_name:a.student_name,student_email:a.student_email,student_phone:a.student_phone,department:a.department,appointment_date:a.appointment_date,appointment_time:String(a.appointment_time).slice(0,5),notes:a.notes||''})})}catch(_){ }
    form.reset();document.querySelector('[name="date"]').min=new Date().toISOString().slice(0,10);msg.textContent='تم إرسال طلب الحجز بنجاح. بانتظار موافقة الإدارة.';msg.style.color='#137a42';btn.disabled=false;loadBookings();
  }
  async function loadBookings(){
    const student=getStudent();const el=document.getElementById('studentBookingsList');if(!student||!el)return;
    const {data,error}=await sb.rpc('get_student_appointments',{p_email:student.email,p_phone:student.phone});
    if(error){el.innerHTML='<p class="sb-muted">تعذر تحميل حالة الحجوزات حاليًا.</p>';return}
    if(!data?.length){el.innerHTML='<div style="margin-top:18px" class="sb-muted">لا توجد حجوزات حتى الآن.</div>';return}
    const label=s=>s==='approved'?'تمت الموافقة':s==='rejected'?'تم الرفض':'بانتظار المراجعة',cls=s=>s==='approved'?'sb-approved':s==='rejected'?'sb-rejected':'sb-pending';
    el.innerHTML=`<h3 style="margin:24px 0 8px">حجوزاتي</h3><div class="sb-scroll"><table class="sb-table"><thead><tr><th>القسم</th><th>التاريخ</th><th>الوقت</th><th>الحالة</th><th>ملاحظة الإدارة</th></tr></thead><tbody>${data.map(a=>`<tr><td>${esc(a.department)}</td><td>${esc(a.appointment_date)}</td><td>${esc(String(a.appointment_time||'').slice(0,5))}</td><td><span class="sb-badge ${cls(a.status)}">${label(a.status)}</span></td><td>${esc(a.admin_note||'—')}</td></tr>`).join('')}</tbody></table></div>`;
  }
  init();
})();
