document.addEventListener('DOMContentLoaded',function(){
  if(document.body.dataset.page!=='home') return;
  var footer=document.querySelector('.site-footer');
  if(!footer) return;
  var old=document.querySelector('.home-social-follow');
  if(old) old.remove();
  var section=document.createElement('section');
  section.className='home-social-follow';
  section.innerHTML='<div class="social-follow-inner">'+
    '<span class="eyebrow">SOCIAL MEDIA</span>'+
    '<h2>تابعنا</h2>'+
    '<div class="social-follow-grid">'+
      '<a class="social-follow-card instagram" href="https://www.instagram.com/fablabahsa?stkn=Z29jNG1xYjN4aGJz" target="_blank" rel="noopener noreferrer" aria-label="Instagram فاب لاب الأحساء"><span class="social-icon">◎</span><span>Instagram</span></a>'+
      '<a class="social-follow-card x" href="https://x.com/fablabahsa?s=11&t=v0QLVoRjRImTeuuAMjQBVw" target="_blank" rel="noopener noreferrer" aria-label="X فاب لاب الأحساء"><span class="social-icon">𝕏</span><span>X</span></a>'+
      '<a class="social-follow-card tiktok" href="https://www.tiktok.com/@fablabahsa?_r=1&_t=ZS-99b69Y95MHg" target="_blank" rel="noopener noreferrer" aria-label="TikTok فاب لاب الأحساء"><span class="social-icon">♪</span><span>TikTok</span></a>'+
    '</div></div>';
  footer.parentNode.insertBefore(section,footer);
  var style=document.createElement('style');
  style.textContent='.home-social-follow{margin:42px auto 0;padding:34px 24px 38px;max-width:1050px;border:1px solid #294c67;border-radius:28px;background:linear-gradient(145deg,#193b55,#102d43);box-sizing:border-box;text-align:center;color:#fff}.social-follow-inner>.eyebrow{color:#7eb3ff}.social-follow-inner h2{margin:6px 0 26px;font-size:42px;color:#fff}.social-follow-grid{max-width:620px;margin:0 auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.social-follow-card{min-height:110px;border:1px solid rgba(255,255,255,.13);border-radius:20px;background:rgba(255,255,255,.055);display:flex;align-items:center;justify-content:center;gap:12px;color:#fff;text-decoration:none;font-weight:800;font-size:17px;transition:transform .18s ease,background .18s ease}.social-follow-card:hover{transform:translateY(-3px);background:rgba(255,255,255,.1)}.social-follow-card:nth-child(3){grid-column:1/-1;max-width:302px;width:100%;justify-self:center}.social-icon{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#5b8def,#27a99d);font-size:29px;font-weight:900;line-height:1}.instagram .social-icon{font-family:Arial,sans-serif}.tiktok .social-icon{font-size:34px}@media(max-width:650px){.home-social-follow{margin:30px 14px 0;padding:28px 16px 30px;border-radius:22px}.social-follow-inner h2{font-size:34px;margin-bottom:20px}.social-follow-grid{gap:10px}.social-follow-card{min-height:92px;font-size:14px;border-radius:16px;flex-direction:column;gap:7px}.social-icon{width:45px;height:45px;font-size:24px}.tiktok .social-icon{font-size:29px}}';
  document.head.appendChild(style);
});
