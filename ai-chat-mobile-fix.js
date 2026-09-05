(function(){
  'use strict';
  function fix(){
    var panel=document.querySelector('.ai-chat-panel');
    var messages=document.querySelector('.ai-chat-messages');
    if(!panel||!messages)return false;
    if(!document.getElementById('fablab-ai-mobile-fix')){
      var s=document.createElement('style');
      s.id='fablab-ai-mobile-fix';
      s.textContent='@media(max-width:650px){html.ai-chat-lock,html.ai-chat-lock body{overflow:hidden!important;height:100%!important}body.ai-chat-page-open{overflow:hidden!important;position:fixed!important;left:0!important;right:0!important;width:100%!important}.ai-chat-panel{min-height:0!important;height:100dvh!important;max-height:100dvh!important}.ai-chat-messages{min-height:0!important;height:auto!important;flex:1 1 auto!important;overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior:contain!important}.ai-chat-form{flex:0 0 auto!important}.ai-chat-suggestions{flex:0 0 auto!important}}';
      document.head.appendChild(s);
    }
    var observer=new MutationObserver(function(){
      if(panel.classList.contains('open')){
        requestAnimationFrame(function(){messages.scrollTop=messages.scrollHeight;});
        setTimeout(function(){messages.scrollTop=messages.scrollHeight;},80);
        setTimeout(function(){messages.scrollTop=messages.scrollHeight;},250);
      }
    });
    observer.observe(messages,{childList:true,subtree:true});
    return true;
  }
  if(!fix()){
    var timer=setInterval(function(){if(fix())clearInterval(timer);},100);
    setTimeout(function(){clearInterval(timer);},10000);
  }
})();
