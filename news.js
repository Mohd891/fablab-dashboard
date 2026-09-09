const NEWS_SUPABASE_URL='https://nwlqroyagrfuzfrtikln.supabase.co';
const NEWS_SUPABASE_KEY='sb_publishable_AqI5cuM8pFcrc2UsiC-1zA_Sullikq7';
const NEWS_API=`${NEWS_SUPABASE_URL}/rest/v1/news_posts`;
function newsEsc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function newsDate(v){try{return new Intl.DateTimeFormat('ar-SA',{day:'numeric',month:'long',year:'numeric'}).format(new Date(v))}catch{return ''}}
function sourceLabel(s){return s==='instagram'?'Instagram':s==='x'?'X':'فاب لاب'}
function renderNews(posts){
 const grid=document.getElementById('newsGrid');
 if(!posts.length){grid.innerHTML='<div class="news-empty"><strong>الأخبار بتوصلك هنا أول بأول</strong><span>ما تم استيراد منشورات حتى الآن. تابع حسابات فاب لاب الرسمية، وسيتم عرض المنشورات الجديدة هنا عند تفعيل المزامنة.</span></div>';return}
 grid.innerHTML=posts.map(p=>`<article class="news-card">${p.media_url?`<img class="news-media" src="${newsEsc(p.media_url)}" alt="${newsEsc(p.title||'خبر من فاب لاب')}" loading="lazy">`:'<div class="news-placeholder">📣</div>'}<div class="news-body"><div class="news-meta"><span class="news-source">${sourceLabel(p.source)}</span><time>${newsDate(p.published_at)}</time></div><h2>${newsEsc(p.title||'منشور جديد من فاب لاب الأحساء')}</h2><p>${newsEsc(p.content||'منشور جديد من حساب فاب لاب الأحساء.')}</p><a class="btn light" href="${newsEsc(p.permalink)}" target="_blank" rel="noopener">مشاهدة المنشور الأصلي ↗</a></div></article>`).join('');
}
async function loadNews(limit=30){
 const status=document.getElementById('newsStatus');
 try{
  const url=`${NEWS_API}?select=id,source,title,content,media_url,permalink,published_at,pinned&is_published=eq.true&order=pinned.desc,published_at.desc&limit=${limit}`;
  const r=await fetch(url,{headers:{apikey:NEWS_SUPABASE_KEY,Authorization:`Bearer ${NEWS_SUPABASE_KEY}`}});
  if(!r.ok) throw new Error('news fetch failed');
  const posts=await r.json();renderNews(posts);status.textContent=`آخر تحديث: ${new Date().toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'})}`;
 }catch(e){renderNews([]);status.textContent='تعذر تحميل الأخبار الآن، جرّب تحديث الصفحة.';console.error(e)}
}
document.addEventListener('DOMContentLoaded',()=>loadNews());
