(function(){
  function forceTitle(){ document.title='فاب لاب'; }
  function loadAssistant(){
    if(document.getElementById('fablab-ai-chat-script')) return;
    var path=(location.pathname||'').toLowerCase();
    var file=path.split('/').pop() || 'index.html';
    if(file !== 'index.html' && file !== '') return;
    var script=document.createElement('script');
    script.id='fablab-ai-chat-script';
    script.src='ai-chat.js?v=20260905';
    script.async=true;
    document.body.appendChild(script);
  }
  forceTitle();
  document.addEventListener('DOMContentLoaded',function(){ forceTitle(); loadAssistant(); });
  window.addEventListener('load',forceTitle);
})();
