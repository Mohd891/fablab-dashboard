(function(){
  function ensureDemoEmployee(){
    if(typeof loadDB!=='function'||typeof saveDB!=='function')return;
    const db=loadDB();db.users=db.users||[];
    const u=db.users.find(x=>x.id===2||String(x.email||'').toLowerCase()==='employee@fablab.local');
    if(!u)return;
    let changed=false;
    const patch={id:2,name:'موظف تجريبي',email:'employee@fablab.local',department:'الإلكترونيات',role:'employee',active:true,contactEmail:u.contactEmail??'',phone:u.phone??''};
    Object.keys(patch).forEach(k=>{if(u[k]!==patch[k]){u[k]=patch[k];changed=true}});
    if(changed)saveDB(db);
  }
  ensureDemoEmployee();
})();
