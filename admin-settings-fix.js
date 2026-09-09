(()=>{
  function apply(){
    if(document.body.dataset.page!=='admin-settings') return;
    const form=document.querySelector('input[type="password"]')?.closest('label') || document.querySelector('input[type="password"]')?.parentElement;
    if(!form || document.getElementById('changePasswordBtn')){
      document.querySelectorAll('input[type="password"]').forEach(i=>{i.removeAttribute('autofocus');i.setAttribute('autocomplete','new-password')});
      if(document.activeElement?.matches?.('input[type="password"]')) document.activeElement.blur();
      return;
    }
    const input=form.querySelector('input[type="password"]');
    if(!input) return;
    input.removeAttribute('autofocus');
    input.setAttribute('autocomplete','new-password');
    input.value='';
    form.style.display='none';
    const btn=document.createElement('button');
    btn.id='changePasswordBtn';
    btn.type='button';
    btn.className='btn outline';
    btn.textContent='تغيير كلمة المرور';
    btn.style.cssText='margin:8px 0 18px;';
    btn.addEventListener('click',()=>{
      form.style.display='block';
      btn.style.display='none';
      input.focus({preventScroll:true});
    });
    form.parentNode.insertBefore(btn,form);
    const style=document.createElement('style');
    style.id='adminSettingsFixStyle';
    style.textContent=`#changePasswordBtn{font-size:13px;font-weight:800}#changePasswordBtn:hover{border-color:#2867df;color:#2867df}@media(max-width:700px){#changePasswordBtn{width:100%;min-height:48px}}`;
    document.head.appendChild(style);
    setTimeout(()=>{if(document.activeElement?.matches?.('input,textarea,select'))document.activeElement.blur()},50);
  }
  document.addEventListener('DOMContentLoaded',apply);
  window.addEventListener('load',apply);
  const observer=new MutationObserver(()=>apply());
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();
