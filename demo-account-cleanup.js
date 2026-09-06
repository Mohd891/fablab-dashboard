(function(){
  const DB_KEY='fablab_demo_v1';
  const SESSION_KEY='fablab_session_v1';
  try{
    const raw=localStorage.getItem(DB_KEY);
    if(raw){
      const db=JSON.parse(raw);
      if(Array.isArray(db.users)){
        db.users=db.users.filter(u=>u.id!==2 && u.email!=='employee@fablab.local' && u.name!=='موظف تجريبي');
        localStorage.setItem(DB_KEY,JSON.stringify(db));
      }
    }
    const session=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
    if(session && (session.id===2 || session.email==='employee@fablab.local' || session.name==='موظف تجريبي')){
      localStorage.removeItem(SESSION_KEY);
      if(document.body?.dataset?.page==='portal') location.href='login.html';
    }
  }catch(e){}
})();
