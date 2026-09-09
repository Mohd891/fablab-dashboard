(()=>{
  const INSTAGRAM='https://www.instagram.com/fablabahsa?stkn=Z29jNG1xYjN4aGJz';
  const X='https://x.com/fablabahsa?s=11&t=v0QLVoRjRImTeuuAMjQBVw';
  function add(){
    if(document.body.dataset.page!=='home'||document.getElementById('homeSocialLinks')) return;
    const main=document.querySelector('main');
    if(!main) return;
    const section=document.createElement('section');
    section.id='homeSocialLinks';
    section.className='home-social-links';
    section.innerHTML=`<div class="home-social-inner"><span class="eyebrow">SOCIAL MEDIA</span><h2>تابع أخبار فاب لاب الأحساء</h2><p>تابعنا على حساباتنا الرسمية لمعرفة آخر الأخبار والبرامج والفعاليات.</p><div class="home-social-grid"><a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span class="social-icon instagram-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></span><span><b>Instagram</b><small>@fablabahsa</small></span><em>↗</em></a><a href="${X}" target="_blank" rel="noopener noreferrer" aria-label="X"><span class="social-icon x-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4l14 16M19 4L5 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></span><span><b>X</b><small>@fablabahsa</small></span><em>↗</em></a></div></div>`;
    main.appendChild(section);
    const style=document.createElement('style');
    style.textContent=`.home-social-links{margin:18px 0 28px;padding:34px 20px;border:1px solid #e0e7ef;border-radius:24px;background:#fff}.home-social-inner{max-width:900px;margin:auto;text-align:center}.home-social-links h2{margin:5px 0 8px;font-size:26px;color:#14243a}.home-social-links p{margin:0 auto 22px;color:#7b899a;font-size:13px;line-height:1.8}.home-social-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:720px;margin:auto}.home-social-grid a{display:flex;align-items:center;gap:12px;text-align:right;text-decoration:none;color:#14243a;background:#f7f9fc;border:1px solid #e0e7ef;border-radius:16px;padding:14px 16px;transition:.18s}.home-social-grid a:hover{border-color:#2867df;transform:translateY(-2px)}.social-icon{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:#fff;border:1px solid #e0e7ef;flex:none}.social-icon svg{width:23px;height:23px}.home-social-grid a>span:nth-child(2){flex:1}.home-social-grid b{display:block;font-size:15px}.home-social-grid small{display:block;color:#7d8b9c;font-size:11px;margin-top:3px;direction:ltr;text-align:right}.home-social-grid em{font-style:normal;color:#2867df;font-size:20px}@media(max-width:650px){.home-social-links{padding:28px 14px}.home-social-links h2{font-size:22px}.home-social-grid{grid-template-columns:1fr}}`;
    document.head.appendChild(style);
  }
  const observer=new MutationObserver(add);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',add);
  window.addEventListener('load',add);
})();
