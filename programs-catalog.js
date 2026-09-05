(function(){
  const SUPABASE_URL='https://nwlqroyagrfuzfrtikln.supabase.co';
  const SUPABASE_KEY='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
  const esc=s=>String(s??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  function today(){const d=new Date();d.setHours(0,0,0,0);return d}
  function state(p){
    const t=today(),s=p.starts_at?new Date(p.starts_at+'T00:00:00'):null,e=p.ends_at?new Date(p.ends_at+'T23:59:59'):s;
    if(e&&e<t)return 'finished';
    if(s&&s>t)return 'upcoming';
    if(s&&e&&s<=t&&e>=t)return 'current';
    return p.status==='available'?'upcoming':'finished';
  }
  function meta(p){const s=state(p);return s==='current'?['متاح الآن','status-current']:s==='upcoming'?['متاح للتسجيل','status-available']:['منتهي','status-finished']}
  function order(list){const rank={current:0,upcoming:1,finished:2};return [...list].sort((a,b)=>(rank[state(a)]-rank[state(b)])||String(a.starts_at||'').localeCompare(String(b.starts_at||'')))}
  async function load(){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/programs?select=id,name,description,image,starts_at,ends_at,time_text,price,status&order=starts_at.asc',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
      if(!r.ok)throw new Error('programs '+r.status);
      const programs=await r.json();window.__fablabPrograms=programs;
      const ordered=order(programs);
      const grid=document.querySelector('.program-grid');
      if(grid){
        const active=ordered.filter(p=>state(p)!=='finished').slice(0,4),shown=active.length?active:ordered.slice(0,4);
        grid.innerHTML=shown.map(p=>card(p,'home')).join('');
        if(!document.querySelector('.program-more-wrap')){const more=document.createElement('div');more.className='program-more-wrap';more.innerHTML='<a class="btn primary large program-more" href="programs.html">اكتشف المزيد من البرامج ←</a>';grid.parentNode.insertBefore(more,grid.nextSibling)}
      }
      const realGrid=document.querySelector('.real-grid');
      if(realGrid){addFilters(realGrid,ordered);renderFiltered(realGrid,ordered,'all')}
      const selects=document.querySelectorAll('select');selects.forEach(sel=>{const text=(sel.name+' '+sel.id+' '+sel.innerHTML).toLowerCase();if(text.includes('program')||text.includes('برنامج'))ordered.filter(p=>state(p)!=='finished').forEach(p=>{if(![...sel.options].some(o=>o.value===p.name||o.textContent.trim()===p.name)){const o=document.createElement('option');o.value=p.name;o.textContent=p.name;sel.appendChild(o)}})});
      if(document.body.dataset.page==='program-detail')renderDetail(programs);
    }catch(e){console.error('Program catalog error',e)}
  }
  function addFilters(grid,programs){
    if(document.querySelector('.program-filters'))return;
    const wrap=document.createElement('div');wrap.className='program-filters';
    const counts={all:programs.length,current:programs.filter(p=>state(p)==='current').length,upcoming:programs.filter(p=>state(p)==='upcoming').length,finished:programs.filter(p=>state(p)==='finished').length};
    wrap.innerHTML=[['all','الكل'],['current','الحالية'],['upcoming','القادمة'],['finished','المنتهية']].map(([k,l],i)=>'<button type="button" class="program-filter '+(i===0?'active':'')+'" data-filter="'+k+'">'+l+' <span>'+counts[k]+'</span></button>').join('');
    grid.parentNode.insertBefore(wrap,grid);
    wrap.addEventListener('click',e=>{const b=e.target.closest('.program-filter');if(!b)return;wrap.querySelectorAll('.program-filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderFiltered(grid,programs,b.dataset.filter)});
  }
  function renderFiltered(grid,programs,filter){const list=filter==='all'?programs:programs.filter(p=>state(p)===filter);grid.innerHTML=list.length?list.map(p=>card(p,'all')).join(''):'<div class="program-empty">لا توجد برامج في هذا التصنيف حاليًا.</div>'}
  function card(p,type){
    const [label,cls]=meta(p),dates=p.starts_at?new Date(p.starts_at+'T00:00:00').toLocaleDateString('ar-SA')+' – '+new Date((p.ends_at||p.starts_at)+'T00:00:00').toLocaleDateString('ar-SA'):'';
    return '<article class="'+(type==='home'?'program-card':'real-card')+'">'+(p.image?'<img class="'+(type==='home'?'program-image':'')+'" src="'+esc(p.image)+'" alt="'+esc(p.name)+'">':'')+'<div class="'+(type==='home'?'program-content':'real-body')+'"><span class="tag">برنامج</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.description)+'</p>'+(dates?'<small class="program-date">'+dates+'</small>':'')+'<span class="'+cls+'">'+label+'</span><a class="'+(type==='home'?'program-details':'details-btn')+'" href="program.html?name='+encodeURIComponent(p.name)+'">عرض تفاصيل البرنامج ←</a></div></article>';
  }
  function renderDetail(programs){
    const name=new URLSearchParams(location.search).get('name'),p=programs.find(x=>x.name===name);if(!p)return;const root=document.querySelector('.program-detail');if(!root)return;const [label]=meta(p),available=state(p)!=='finished';
    root.innerHTML='<a class="back-link" href="programs.html">→ العودة للبرامج</a><section class="detail-hero"><div><img class="detail-image" src="'+esc(p.image||'')+'" alt="'+esc(p.name)+'"></div><div class="detail-copy"><span class="'+(available?'available-badge':'finished-badge')+'">'+label+'</span><br><span class="detail-kicker">برنامج</span><h1>'+esc(p.name)+'</h1><p>'+esc(p.description)+'</p><div class="detail-actions">'+(available?'<a class="btn primary large" href="register.html">سجل الآن</a>':'')+'<a class="btn outline large" href="programs.html">كل البرامج</a></div></div></section><section class="meta-grid"><div class="meta-card"><span>📅 التاريخ</span><b>'+esc(p.starts_at?(new Date(p.starts_at+'T00:00:00').toLocaleDateString('ar-SA')+' – '+new Date((p.ends_at||p.starts_at)+'T00:00:00').toLocaleDateString('ar-SA')):'حسب الإعلان')+'</b></div><div class="meta-card"><span>🕐 الوقت</span><b>'+esc(p.time_text||'حسب الإعلان')+'</b></div><div class="meta-card"><span>💰 السعر</span><b>'+esc(p.price!=null?p.price+' ريال':'حسب الإعلان')+'</b></div><div class="meta-card"><span>📌 الحالة</span><b>'+label+'</b></div></section><section class="detail-section"><h2>عن البرنامج</h2><p>'+esc(p.description)+'</p></section>';
  }
  const style=document.createElement('style');style.textContent='.program-filters{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:0 auto 28px;max-width:1200px}.program-filter{border:1px solid #dce3ec;background:#fff;color:#344054;border-radius:999px;padding:11px 18px;font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;transition:.2s}.program-filter span{display:inline-flex;min-width:20px;justify-content:center;margin-right:4px}.program-filter.active{background:#173f6d;color:#fff;border-color:#173f6d}.status-current{display:inline-flex;margin-top:12px;margin-right:8px;padding:8px 13px;border-radius:999px;background:#eaf2ff;color:#1769aa;font-size:11px;font-weight:800}.status-available{display:inline-flex;margin-top:12px;margin-right:8px;padding:8px 13px;border-radius:999px;background:#e9f8ef;color:#16834b;font-size:11px;font-weight:800}.status-finished{display:inline-flex;margin-top:12px;margin-right:8px;padding:8px 13px;border-radius:999px;background:#fdecec;color:#c53030;font-size:11px;font-weight:800}.program-date{display:block;margin-top:10px;color:#7a8798;font-size:12px}.program-more-wrap{text-align:center;margin:28px 0 8px}.program-more{min-width:240px}.program-empty{grid-column:1/-1;text-align:center;padding:55px 20px;background:#fff;border:1px dashed #d6dde7;border-radius:20px;color:#7a8798}.real-grid .real-card .real-body h3{font-size:21px;margin:5px 0 8px}.real-grid .real-card .real-body p{font-size:12px;color:#768296;line-height:1.9;margin:0}.real-grid .real-card img{object-fit:cover}@media(max-width:650px){.program-filters{gap:7px}.program-filter{padding:10px 13px;font-size:12px}}';document.head.appendChild(style);
  document.addEventListener('DOMContentLoaded',load);
})();