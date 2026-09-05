(function(){
  'use strict';
  if(window.__fablabAIChatLoaded)return;
  window.__fablabAIChatLoaded=true;
  var FUNCTION_URL='https://nwlqroyagrfuzfrtikln.supabase.co/functions/v1/fablab-ai-chat';
  var FALLBACK_PHONE='0566552942';
  var history=[];
  var messages=null;
  var input=null;
  var send=null;
  var busy=false;
  var welcome=null;

  function cleanText(text){
    return String(text||'').replace(/\*\*/g,'').replace(/__/g,'').trim();
  }

  function escapeHtml(text){
    return String(text||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function renderBotText(text){
    var safe=cleanText(text);
    var phonePattern=/(?:\+966\s*56\s*655\s*2942|056\s*655\s*2942|0566552942)/g;
    var urlPattern=/(https?:\/\/[^\s<]+)/g;
    var html='';
    var last=0;
    var combined=/(?:\+966\s*56\s*655\s*2942|056\s*655\s*2942|0566552942|https?:\/\/[^\s<]+)/g;
    var m;
    while((m=combined.exec(safe))){
      html+=escapeHtml(safe.slice(last,m.index)).replace(/\n/g,'<br>');
      var value=m[0];
      if(phonePattern.test(value)){
        phonePattern.lastIndex=0;
        html+='<span class="ai-phone-number">'+escapeHtml(value)+'</span><span class="ai-phone-actions"><a href="tel:'+FALLBACK_PHONE+'">اتصال</a><a href="https://wa.me/966566552942" target="_blank" rel="noopener noreferrer">واتساب</a></span>';
      }else{
        var cleanUrl=value.replace(/[،,.;؛:!؟)\]}]+$/,'');
        var tail=value.slice(cleanUrl.length);
        html+='<a href="'+escapeHtml(cleanUrl)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(cleanUrl)+'</a>'+escapeHtml(tail);
      }
      last=m.index+value.length;
    }
    html+=escapeHtml(safe.slice(last)).replace(/\n/g,'<br>');
    return html;
  }

  function addStyles(){
    if(document.getElementById('fablab-ai-chat-style'))return;
    var s=document.createElement('style');s.id='fablab-ai-chat-style';
    s.textContent=''+'.ai-chat-launch{position:fixed;left:22px;bottom:86px;z-index:9990;border:0;border-radius:999px;background:#2865df;color:#fff;padding:13px 18px;display:flex;align-items:center;gap:9px;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 12px 30px #17233a2b;transition:transform .2s ease,background .2s ease;animation:aiChatFloat 2.8s ease-in-out infinite;transform-origin:center;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none}'+'.ai-chat-launch:hover{animation:none;transform:translateY(-2px);background:#2058c8}.ai-chat-launch:focus{outline:none}.ai-chat-launch span:first-child{font-size:19px}'+'.ai-chat-panel{position:fixed;left:22px;bottom:146px;width:min(390px,calc(100vw - 32px));height:min(570px,calc(100dvh - 180px));z-index:9991;background:#fff;border:1px solid #e1e7ef;border-radius:20px;box-shadow:0 25px 70px #17233a2b;display:none;overflow:hidden;grid-template-rows:auto minmax(0,1fr) auto auto}'+'.ai-chat-panel.open{display:grid}.ai-chat-head{background:#2865df;color:#fff;padding:16px 17px;display:flex;align-items:center;gap:11px;min-height:72px;z-index:3}.ai-chat-avatar{width:40px;height:40px;border-radius:12px;background:#fff2;display:grid;place-items:center;font-size:22px;flex:0 0 auto}.ai-chat-head-copy{flex:1}.ai-chat-head-copy b{display:block;font-size:14px}.ai-chat-head-copy span{display:block;font-size:10px;opacity:.82;margin-top:3px}.ai-chat-close{border:0;background:#fff1;color:#fff;width:34px;height:34px;border-radius:9px;cursor:pointer;font-size:21px}'+'.ai-chat-messages{min-height:0;overflow-y:auto;overflow-x:hidden;padding:15px;background:#f7f9fc;display:flex;flex-direction:column;justify-content:center;gap:10px;position:relative;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scroll-behavior:smooth}.ai-chat-messages:not(.has-conversation){overflow:hidden}.ai-chat-messages:not(.has-conversation) .ai-msg.bot{position:absolute;left:12px;right:12px;top:50%;transform:translateY(-50%);align-self:auto;max-width:none;margin:0}.ai-chat-messages.has-conversation{justify-content:flex-start}.ai-chat-messages.has-conversation .ai-msg.bot{position:static;transform:none;align-self:flex-start;max-width:85%}'+'.ai-msg{max-width:85%;padding:10px 12px;border-radius:14px;font-size:12px;line-height:1.8;overflow-wrap:anywhere;flex:0 0 auto}.ai-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e5eaf1;color:#253348;border-bottom-left-radius:5px}.ai-msg.user{align-self:flex-end;background:#2865df;color:#fff;border-bottom-right-radius:5px;white-space:pre-wrap}.ai-msg.typing{color:#7b8798}.ai-msg a{color:#2563eb;text-decoration:underline;font-weight:700;word-break:break-word}.ai-phone-number{display:block;margin-top:8px;font-weight:800;direction:ltr;text-align:right}.ai-phone-actions{display:flex;gap:7px;margin-top:7px;direction:rtl}.ai-phone-actions a{display:inline-flex!important;align-items:center;justify-content:center;text-decoration:none!important;border:1px solid #d8e2f0;border-radius:10px;padding:6px 12px;background:#f7faff;color:#2563eb!important;font-size:12px}'+'.ai-chat-suggestions{display:flex;gap:7px;overflow-x:auto;overflow-y:hidden;padding:9px 11px;background:#fff;border-top:1px solid #edf0f4;scrollbar-width:none;z-index:3;flex:0 0 auto}.ai-chat-suggestions::-webkit-scrollbar{display:none}.ai-suggest{border:1px solid #dfe6ef;background:#f8fafc;color:#536176;border-radius:999px;padding:7px 10px;font-size:10px;white-space:nowrap;cursor:pointer;flex:0 0 auto}.ai-suggest:hover{border-color:#2865df;color:#2865df}'+'.ai-chat-form{display:flex;gap:8px;padding:10px;background:#fff;border-top:1px solid #e8edf3;z-index:3;flex:0 0 auto}.ai-chat-input{flex:1;min-width:0;border:1px solid #dce3eb;border-radius:11px;padding:10px 12px;outline:none;font-size:16px;background:#fff}.ai-chat-input:focus{border-color:#2865df}.ai-chat-send{width:43px;flex:0 0 43px;border:0;border-radius:11px;background:#2865df;color:#fff;cursor:pointer;font-size:17px}.ai-chat-send:disabled{opacity:.55;cursor:not-allowed}'+'@keyframes aiChatFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'+'@media(max-width:650px){.ai-chat-launch{left:12px;bottom:14px;padding:11px 14px;font-size:12px}.ai-chat-launch span:first-child{font-size:18px}.ai-chat-panel{left:0;right:0;top:0;bottom:0;width:100%;height:100dvh;min-height:100svh;max-height:none;border:0;border-radius:0;box-shadow:none;grid-template-rows:auto minmax(0,1fr) auto auto}.ai-chat-head{padding:12px 14px;min-height:76px;position:relative}.ai-chat-head-copy b{font-size:18px}.ai-chat-head-copy span{font-size:12px}.ai-chat-close{width:44px;height:44px;font-size:27px}.ai-chat-messages{padding:12px;min-height:0}.ai-chat-messages:not(.has-conversation) .ai-msg.bot{left:12px;right:12px;top:50%}.ai-msg{max-width:90%;font-size:17px;padding:12px 15px}.ai-chat-messages.has-conversation .ai-msg.bot{max-width:90%}.ai-chat-suggestions{padding:8px}.ai-suggest{font-size:14px;padding:9px 13px}.ai-chat-form{padding:9px 10px calc(9px + env(safe-area-inset-bottom));gap:9px}.ai-chat-input{font-size:16px;min-height:44px;padding:10px 12px}.ai-chat-send{width:54px;flex-basis:54px;height:52px;font-size:23px}body.ai-chat-page-open{overflow:hidden;position:fixed;width:100%;height:100%;touch-action:none}}'+'@media(prefers-reduced-motion:reduce){.ai-chat-launch{animation:none}}';
    document.head.appendChild(s);
  }

  function addMessage(text,role,typing){if(!messages)return null;var el=document.createElement('div');el.className='ai-msg '+role+(typing?' typing':'');if(role==='bot'&&!typing)el.innerHTML=renderBotText(text);else el.textContent=String(text||'');messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
  function startConversation(){if(messages)messages.classList.add('has-conversation');}
  function sendMessage(text){text=String(text||'').trim();if(!text||busy||!input||!send)return;startConversation();busy=true;send.disabled=true;input.disabled=true;addMessage(text,'user');var typing=addMessage('جاري التفكير...','bot',true);fetch(FUNCTION_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history:history.slice(-8)})}).then(function(r){return r.json().then(function(data){return {ok:r.ok,data:data};});}).then(function(result){if(typing)typing.remove();if(!result.ok||!result.data.answer)throw new Error(result.data&&result.data.error||'تعذر الحصول على رد حاليًا.');var answer=cleanText(result.data.answer);addMessage(answer,'bot');history.push({role:'user',text:text},{role:'model',text:answer});history=history.slice(-8);if(messages)messages.scrollTop=messages.scrollHeight;}).catch(function(err){console.error('Fablab AI chat error:',err);if(typing)typing.remove();addMessage(err.message==='Failed to fetch'?'تعذر الاتصال بالمساعد حاليًا. حاول مرة أخرى.':(err.message||'تعذر الحصول على رد حاليًا.'),'bot');if(messages)messages.scrollTop=messages.scrollHeight;}).finally(function(){busy=false;if(send)send.disabled=false;if(input){input.disabled=false;input.focus();}});}
  function init(){if(document.querySelector('.ai-chat-launch'))return;addStyles();var launch=document.createElement('button');launch.className='ai-chat-launch';launch.type='button';launch.innerHTML='<span>🤖</span><span>فاب يساعدك</span>';var panel=document.createElement('section');panel.className='ai-chat-panel';panel.setAttribute('aria-label','المساعد الذكي لفاب لاب');panel.innerHTML='<div class="ai-chat-head"><div class="ai-chat-avatar">🤖</div><div class="ai-chat-head-copy"><b>مساعد فاب لاب</b><span>مساعد تجريبي للاستفسارات</span></div><button class="ai-chat-close" type="button" aria-label="إغلاق">×</button></div><div class="ai-chat-messages"></div><div class="ai-chat-suggestions"><button class="ai-suggest" type="button">وش البرامج الموجودة؟</button><button class="ai-suggest" type="button">كيف أسجل؟</button><button class="ai-suggest" type="button">كيف أتواصل معكم؟</button></div><form class="ai-chat-form"><input class="ai-chat-input" type="text" maxlength="1000" autocomplete="off" inputmode="text" placeholder="اكتب سؤالك هنا..."><button class="ai-chat-send" type="submit" aria-label="إرسال">➤</button></form>';document.body.appendChild(launch);document.body.appendChild(panel);messages=panel.querySelector('.ai-chat-messages');input=panel.querySelector('.ai-chat-input');send=panel.querySelector('.ai-chat-send');welcome=addMessage('هلا 👋 أنا مساعد فاب لاب. اسألني عن البرامج أو التسجيل أو التواصل، وبساعدك بالمعلومات المتاحة.','bot');panel.querySelector('.ai-chat-close').addEventListener('click',function(){panel.classList.remove('open');document.body.classList.remove('ai-chat-page-open');document.body.style.position='';document.body.style.width='';document.body.style.height='';document.body.style.touchAction='';});launch.addEventListener('click',function(){panel.classList.toggle('open');document.body.classList.toggle('ai-chat-page-open',panel.classList.contains('open'));if(panel.classList.contains('open')){setTimeout(function(){if(input)input.focus();},50);}});panel.querySelectorAll('.ai-suggest').forEach(function(btn){btn.addEventListener('click',function(){sendMessage(btn.textContent);});});panel.querySelector('.ai-chat-form').addEventListener('submit',function(e){e.preventDefault();var value=input.value;input.value='';sendMessage(value);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
