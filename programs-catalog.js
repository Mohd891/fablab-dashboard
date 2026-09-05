(function(){
  const SUPABASE_URL='https://nwlqroyagrfuzfrtikln.supabase.co';
  const SUPABASE_KEY='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  const esc=s=>String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  async function load(){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/programs?select=id,name,description,image,starts_at,ends_at,time_text,price,status&order=status.desc,starts_at.asc,updated_at.desc',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
      if(!r.ok) throw new Error('programs '+r.status);
      const programs=await r.json();
      const available=programs.filter(p=>p.status==='available');
      const ordered=[...available,...programs.filter(p=>p.status!=='available')];
      const grid=document.querySelector('.program-grid');
      if(grid){
        const shown=ordered.slice(0,4);
        grid.innerHTML=shown.map(p=>card(p,'home')).join('');
        if(!document.querySelector('.program-more-wrap')){const more=document.createElement('div');more.className='program-more-wrap';more.innerHTML='<a class="btn primary large program-more" href="programs.html">اكتشف المزيد من البرامج ←</a>';grid.parentNode.insertBefore(more,grid.nextSibling)}
      }
      const realGrid=document.querySelector('.real-grid');
      if(realGrid) realGrid.innerHTML=ordered.map(p=>card(p,'all')).join('');
      const selects=document.querySelectorAll('select');
      selects.forEach(sel=>{const text=(sel.name+' '+sel.id+' '+sel.innerHTML).toLowerCase();if(text.includes('program')||text.includes('برنامج')){available.forEach(p=>{if(![...sel.options].some(o=>o.value===p.name||o.textContent.trim()===p.name)){const o=document.createElement('option');o.value=p.name;o.textContent=p.name;sel.appendChild(o)}})}});
      if(document.body.dataset.page==='program-detail') renderDetail(programs);
    }catch(e){console.error('Program catalog error',e);}
  }
  function card(p,type){
    const status=p.status==='available';
    const badge=status?'<span class="status-available">متاح للتسجيل</span>':'<span class="status-finished">منتهي</span>';
    const dates=p.starts_at?new Date(p.starts_at+'T00:00:00').toLocaleDateString('ar-SA')+' – '+new Date((p.ends_at||p.starts_at)+'T00:00:00').toLocaleDateString('ar-SA'):'';
    return '<article class="'+(type==='home'?'program-card':'real-card')+'">'+(p.image?'<img class="'+(type==='home'?'program-image':'')+'" src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':'')+'<div class="'+(type==='home'?'program-content':'real-body')+'"><span class="tag">برنامج</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.description)+'</p>'+(dates?'<small class="program-date">'+dates+'</small>':'')+badge+'<a class="'+(type==='home'?'program-details':'details-btn')+'" href="program.html?name='+encodeURIComponent(p.name)+'">عرض تفاصيل البرنامج ←</a></div></article>';
  }
  function renderDetail(programs){
    const name=new URLSearchParams(location.search).get('name');const p=programs.find(x=>x.name===name);if(!p)return;const root=document.querySelector('.program-detail');if(!root)return;const available=p.status==='available';
    root.innerHTML='<a class="back-link" href="programs.html">→ العودة للبرامج</a><section class="detail-hero"><div><img class="detail-image" src="'+esc(p.image||'')+'" alt="'+esc(p.name)+'"></div><div class="detail-copy"><span class="'+(available?'available-badge':'finished-badge')+'">'+(available?'متاح للتسجيل':'البرنامج منتهي')+'</span><br><span class="detail-kicker">برنامج</span><h1>'+esc(p.name)+'</h1><p>'+esc(p.description)+'</p><div class="detail-actions">'+(available?'<a class="btn primary large" href="register.html">سجل الآن</a>':'')+'<a class="btn outline large" href="programs.html">كل البرامج</a></div></div></section><section class="meta-grid"><div class="meta-card"><span>📅 التاريخ</span><b>'+esc(p.starts_at?(new Date(p.starts_at+'T00:00:00').toLocaleDateString('ar-SA')+' – '+new Date((p.ends_at||p.starts_at)+'T00:00:00').toLocaleDateString('ar-SA')):'حسب الإعلان')+'</b></div><div class="meta-card"><span>🕐 الوقت</span><b>'+esc(p.time_text||'حسب الإعلان')+'</b></div><div class="meta-card"><span>💰 السعر</span><b>'+esc(p.price!=null?p.price+' ريال':'حسب الإعلان')+'</b></div><div class="meta-card"><span>📌 الحالة</span><b>'+(available?'متاح للتسجيل':'منتهي')+'</b></div></section><section class="detail-section"><h2>عن البرنامج</h2><p>'+esc(p.description)+'</p></section>';
  }
  const style=document.createElement('style');style.textContent='.status-available{display:inline-flex;margin-top:12px;margin-right:8px;padding:8px 13px;border-radius:999px;background:#e9f8ef;color:#16834b;font-size:11px;font-weight:800}.status-finished{display:inline-flex;margin-top:12px;margin-right:8px;padding:8px 13px;border-radius:999px;background:#feecec;color:#c62828;font-size:11px;font-weight:800}.available-badge{display:inline-flex;padding:8px 14px;border-radius:999px;background:#e9f8ef;color:#16834b;font-weight:800;font-size:13px;margin-bottom:12px}.program-date{display:block;margin-top:10px;color:#7a8798}.program-more-wrap{text-align:center;margin:28px 0 8px}.program-more{min-width:240px}.real-grid .real-card .real-body h3{font-size:21px;margin:5px 0 8px}.real-grid .real-card .real-body p{font-size:12px;color:#768296;line-height:1.9;margin:0}.real-grid .real-card img{object-fit:cover}';document.head.appendChild(style);
  document.addEventListener('DOMContentLoaded',load);
})();