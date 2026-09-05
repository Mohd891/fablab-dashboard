/* Keep the student's editable name synchronized with the cloud registrations table. */
(function(){
  if(document.body.dataset.page!=='portal') return;
  if(!window.supabase || !window.supabase.createClient) return;

  const SUPABASE_URL='https://nwlqroyagrfuzfrtikln.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
  let syncingForm=false;

  function validFullName(value){
    const parts=String(value||'').trim().replace(/\s+/g,' ').split(' ').filter(Boolean);
    return parts.length>=2 && parts.every(part=>part.length>=2);
  }

  document.addEventListener('submit',async function(e){
    if(syncingForm){syncingForm=false;return;}
    const form=e.target;
    if(!(form instanceof HTMLFormElement)) return;
    const nameInput=form.querySelector('input[name="name"],input[name="full_name"],input[data-profile-name]');
    if(!nameInput) return;

    let localUser=null;
    try{localUser=typeof user==='function'?user():null}catch(_){localUser=null}
    if(!localUser || localUser.role!=='student') return;

    const newName=String(nameInput.value||'').trim().replace(/\s+/g,' ');
    if(!validFullName(newName)) return;

    let db=null,student=null;
    try{
      db=typeof loadDB==='function'?loadDB():null;
      student=db?.students?.find(s=>s.userId===localUser.id)||null;
    }catch(_){return}
    if(!student || !student.phone || !localUser.email) return;
    if(String(student.name||'').trim().replace(/\s+/g,' ')===newName) return;

    e.preventDefault();
    const {error}=await sb.rpc('update_student_full_name',{p_email:localUser.email,p_phone:student.phone,p_full_name:newName});
    if(error){
      console.error('Student name cloud sync error',error);
      if(typeof toast==='function') toast('تعذر تحديث الاسم في حساب المدير. حاول مرة أخرى.','error');
      return;
    }

    /* Keep the local account/session in sync before allowing the original save handler to run. */
    try{
      const fresh=loadDB();
      const u=fresh.users?.find(x=>x.id===localUser.id);
      const s=fresh.students?.find(x=>x.userId===localUser.id);
      if(u) u.name=newName;
      if(s) s.name=newName;
      saveDB(fresh);
      if(typeof setSession==='function') setSession(u||localUser);
    }catch(_){ }

    syncingForm=true;
    if(typeof toast==='function') toast('تم تحديث الاسم بنجاح');
    form.requestSubmit();
  },true);
})();
