(function(){
  function init(){
    const form=document.getElementById('registerForm');
    if(!form||form.dataset.loadingReady)return;
    form.dataset.loadingReady='1';
    let overlay=null;
    const button=form.querySelector('button[type="submit"],button');
    function ensureOverlay(){
      if(overlay)return overlay;
      overlay=document.createElement('div');
      overlay.className='register-loading-overlay';
      overlay.setAttribute('role','status');
      overlay.setAttribute('aria-live','polite');
      overlay.innerHTML='<div class="register-loading-box"><span class="register-loading-spinner" aria-hidden="true"></span><strong>جاري إنشاء الحساب...</strong><small>يرجى الانتظار لحظات</small></div>';
      document.body.appendChild(overlay);
      return overlay;
    }
    function hide(){
      if(overlay){overlay.remove();overlay=null}
      if(button)button.disabled=false;
    }
    function show(){
      ensureOverlay();
      if(button)button.disabled=true;
    }
    const style=document.createElement('style');
    style.textContent='.register-loading-overlay{position:fixed;inset:0;z-index:100000;background:rgba(15,31,55,.28);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:20px}.register-loading-box{min-width:240px;max-width:90vw;background:#fff;border:1px solid #e2e8f0;border-radius:20px;box-shadow:0 20px 60px rgba(15,31,55,.18);padding:28px 30px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:9px;color:#14213d}.register-loading-box strong{font-size:19px}.register-loading-box small{font-size:13px;color:#718096}.register-loading-spinner{width:34px;height:34px;border:4px solid #dbe7ff;border-top-color:#2f6be5;border-radius:50%;animation:registerLoadingSpin .8s linear infinite}@keyframes registerLoadingSpin{to{transform:rotate(360deg)}}body.register-loading-active{overflow:hidden}';
    document.head.appendChild(style);
    document.addEventListener('submit',function(e){
      if(e.target!==form)return;
      setTimeout(function(){
        const invalid=form.querySelector('[aria-invalid="true"]');
        if(!invalid&&form.checkValidity()){
          show();
          document.body.classList.add('register-loading-active');
        }
      },0);
    },true);
    const originalToast=window.toast;
    if(typeof originalToast==='function'){
      window.toast=function(){
        hide();
        document.body.classList.remove('register-loading-active');
        return originalToast.apply(this,arguments);
      };
    }
    window.addEventListener('unhandledrejection',hide);
    window.addEventListener('error',hide);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,150);
})();
