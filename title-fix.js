(function(){
  function forceTitle(){ document.title='فاب لاب'; }
  function loadAssistant(){
    if(document.getElementById('fablab-ai-chat-script')) return;
    var path=(location.pathname||'').toLowerCase();
    if(/^\/(admin(?:-[^/]+)?|employee(?:-[^/]+)?|student(?:-[^/]+)?|portal)(\.html)?$/.test(path.replace(/^.*\/([^/]+)$/,'/$1'))) return;
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
