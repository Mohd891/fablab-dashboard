(async function(){
  const S='https://nwlqroyagrfuzfrtikln.supabase.co';
  const K='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  const sb=supabase.createClient(S,K);
  const session=(await sb.auth.getSession()).data.session;
  if(!session||session.user.email!=='admin@fablab.local'){location.href='login.html';return}
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  let editingId=null;
  let all=[];

  function state(p){
    const t=new Date(); t.setHours(0,0,0,0);
    const s=p.starts_at?new Date(p.starts_at+'T00:00:00'):null;
    const e=p.ends_at?new Date(p.ends_at+'T23:59:59'):s;
    if(e&&e<t)return ['منتهي','finished'];
    if(s&&s>t)return ['قادم','upcoming'];
    return ['متاح الآن','available'];
  }
  function resetForm(){
    $('programForm').reset(); editingId=null;
    $('formTitle').textContent='➕ إضافة برنامج جديد';
    $('submitBtn').textContent='نشر البرنامج';
    $('cancelEdit').style.display='none';
    $('currentImageWrap').style.display='none';
    $('image').required=true;
    $('formStatus').textContent='';
  }
  function fillForm(p){
    editingId=p.id;
    $('formTitle').textContent='✏️ تعديل البرنامج';
    $('submitBtn').textContent='حفظ التعديلات';
    $('cancelEdit').style.display='inline-flex';
    $('image').required=false;
    $('name').value=p.name||''; $('starts_at').value=p.starts_at||''; $('ends_at').value=p.ends_at||'';
    $('time_text').value=p.time_text||''; $('price').value=p.price??''; $('age_text').value=p.age_text||'';
    $('duration_text').value=p.duration_text||''; $('location_text').value=p.location_text||''; $('registration_url').value=p.registration_url||'';
    $('description').value=p.description||'';
    if(p.image){$('currentImage').src=p.image;$('currentImageWrap').style.display='block'}else $('currentImageWrap').style.display='none';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function card(p,archived){
    const [label,cls]=state(p);
    return '<article class="admin-card '+(archived?'archived-card':'')+'">'+
      (p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':'')+
      '<div class="admin-body"><span class="'+cls+'">'+(archived?'مؤرشف':label)+'</span><h2>'+esc(p.name)+'</h2>'+
      '<p>'+esc(p.description)+'</p><div class="admin-status">📅 '+esc(p.starts_at||'')+' – '+esc(p.ends_at||'')+'<br>🕐 '+esc(p.time_text||'حسب الإعلان')+'<br>💰 '+(p.price==null?'حسب الإعلان':esc(p.price)+' ريال')+'</div>'+ 
      '<div class="card-actions">'+(archived?'<button class="btn light restore-btn" data-id="'+esc(p.id)+'">↩️ استعادة</button><button class="btn danger delete-btn" data-id="'+esc(p.id)+'">حذف نهائي</button>':'<button class="btn light edit-btn" data-id="'+esc(p.id)+'">✏️ تعديل</button><button class="btn danger archive-btn" data-id="'+esc(p.id)+'">🗑️ حذف / أرشفة</button>')+'</div></div></article>';
  }
  async function load(){
    $('adminGrid').innerHTML='<p>جاري تحميل البرامج...</p>';
    $('archiveGrid').innerHTML='<p>جاري تحميل الأرشيف...</p>';
    const {data,error}=await sb.from('programs').select('*').order('starts_at',{ascending:false});
    if(error){$('adminGrid').innerHTML='<p>تعذر تحميل البرامج.</p>';$('archiveGrid').innerHTML='<p>تعذر تحميل الأرشيف.</p>';return}
    all=data||[];
    const active=all.filter(p=>!p.archived_at), archived=all.filter(p=>p.archived_at);
    $('adminGrid').innerHTML=active.length?active.map(p=>card(p,false)).join(''):'<p>لا توجد برامج منشورة.</p>';
    $('archiveGrid').innerHTML=archived.length?archived.map(p=>card(p,true)).join(''):'<p class="empty-archive">الأرشيف فارغ حاليًا.</p>';
    $('archiveCount').textContent=archived.length;
  }
  document.addEventListener('click',async e=>{
    const edit=e.target.closest('.edit-btn');
    if(edit){const p=all.find(x=>x.id===edit.dataset.id);if(p)fillForm(p);return}
    const archive=e.target.closest('.archive-btn');
    if(archive){
      const p=all.find(x=>x.id===archive.dataset.id);if(!p)return;
      if(!confirm('هل تريد حذف البرنامج؟ سيتم نقله إلى الأرشيف ولن يظهر للزوار.'))return;
      archive.disabled=true;
      const {error}=await sb.from('programs').update({archived_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq('id',p.id);
      if(error){alert('تعذر أرشفة البرنامج: '+error.message);archive.disabled=false;return}
      await load(); return;
    }
    const restore=e.target.closest('.restore-btn');
    if(restore){
      restore.disabled=true;
      const {error}=await sb.from('programs').update({archived_at:null,updated_at:new Date().toISOString()}).eq('id',restore.dataset.id);
      if(error){alert('تعذر استعادة البرنامج: '+error.message);restore.disabled=false;return}
      await load(); return;
    }
    const del=e.target.closest('.delete-btn');
    if(del){
      if(!confirm('حذف نهائي؟ لا يمكن استرجاع البرنامج بعد ذلك.'))return;
      del.disabled=true;
      const {error}=await sb.from('programs').delete().eq('id',del.dataset.id);
      if(error){alert('تعذر الحذف النهائي: '+error.message);del.disabled=false;return}
      await load();
    }
  });
  $('cancelEdit').addEventListener('click',resetForm);
  $('programForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const form=e.currentTarget,btn=$('submitBtn');btn.disabled=true;$('formStatus').textContent=editingId?'جاري حفظ التعديلات...':'جاري نشر البرنامج...';
    try{
      const name=$('name').value.trim(),description=$('description').value.trim(),starts_at=$('starts_at').value,ends_at=$('ends_at').value,time_text=$('time_text').value.trim(),price=$('price').value,age_text=$('age_text').value.trim(),duration_text=$('duration_text').value.trim(),location_text=$('location_text').value.trim(),registrationInput=$('registration_url').value.trim(),registration_url=registrationInput||null,file=$('image').files[0];
      if(!name||!description||!starts_at||!ends_at||!time_text)throw Error('أكمل الحقول المطلوبة.');
      if(ends_at<starts_at)throw Error('تاريخ النهاية يجب أن يكون بعد أو مساويًا لتاريخ البداية.');
      const duplicate=await sb.from('programs').select('id').eq('name',name).neq('id',editingId||'00000000-0000-0000-0000-000000000000').is('archived_at',null).limit(1);
      if(duplicate.error)throw duplicate.error;
      if(duplicate.data?.length)throw Error('هذا الاسم مستخدم في برنامج آخر.');
      let image;
      if(editingId){
        const old=all.find(x=>x.id===editingId); image=old?.image||null;
      }
      if(file){
        const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
        const path=Date.now()+'-'+Math.random().toString(36).slice(2)+'.'+ext;
        const up=await sb.storage.from('program-images').upload(path,file,{upsert:false,contentType:file.type});
        if(up.error)throw up.error;
        image=sb.storage.from('program-images').getPublicUrl(path).data.publicUrl;
      }
      const payload={name,description,image,starts_at,ends_at,time_text,price:price===''?null:Number(price),age_text,duration_text,location_text,registration_url,updated_at:new Date().toISOString()};
      if(editingId){
        const {error}=await sb.from('programs').update(payload).eq('id',editingId);if(error)throw error;
        $('formStatus').textContent='تم تحديث البرنامج بنجاح.';
      }else{
        payload.status='available';payload.archived_at=null;
        const {error}=await sb.from('programs').insert(payload);if(error)throw error;
        $('formStatus').textContent='تم نشر البرنامج بنجاح.';
      }
      resetForm(); await load();
    }catch(err){console.error(err);$('formStatus').textContent=err.message||'تعذر حفظ البرنامج.'}
    finally{btn.disabled=false}
  });
  await load();
})().catch(err=>{console.error(err);location.href='login.html'});
