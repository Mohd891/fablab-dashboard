(function(){
  const DB='fablab_demo_v1',SESSION='fablab_session_v1';
  function sync(){
    try{
      const raw=localStorage.getItem(DB); if(!raw)return;
      const data=JSON.parse(raw),u=(data.users||[]).find(x=>x.id===2||String(x.email||'').toLowerCase()==='employee@fablab.local');
      if(!u)return;
      u.id=2;u.name='موظف تجريبي';u.email='employee@fablab.local';u.department='الإلكترونيات';u.role='employee';u.active=true;
      if(u.contactEmail==null)u.contactEmail=''; if(u.phone==null)u.phone='';
      localStorage.setItem(DB,JSON.stringify(data));
      localStorage.setItem(SESSION,JSON.stringify({id:2,name:u.name,email:u.email,role:u.role}));
    }catch(e){}
  }
  sync();
})();
