(function(){
  'use strict';
  if(window.__fablabAIChatLoaded)return;
  window.__fablabAIChatLoaded=true;
  var FUNCTION_URL='https://nwlqroyagrfuzfrtikln.supabase.co/functions/v1/fablab-ai-chat';
  var history=[];
  var messages=null;
  var input=null;
  var send=null;
  var busy=false;
  function addStyles(){
    if(document.getElementById('fablab-ai-chat-style'))return;
    var s=document.createElement('style');s.id='fablab-ai-chat-style';
    s.textContent=''
      +'.ai-chat-launch{position:fixed;left:22px;bottom:86px;z-index:9990;border:0;border-radius:999px;background:#2865df;color:#fff;padding:13px 18px;display:flex;align-items:center;gap:9px;font-weight:800;font-size:13px;cursor:pointer;box-shadow:0 12px 30px #17233a2b;transition:transform .2s ease,background .2s ease;animation:aiChatFloat 2.8s ease-in-out infinite;transform-origin:center;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none}.ai-chat-launch:hover{animation:none;transform:translateY(-2px);background:#2058c8}.ai-chat-launch:focus{outline:none}.ai-chat-launch:focus-visible{box-shadow:0 0 0 4px #2865df2b,0 12px 30px #17233a2b}.ai-chat-launch span:first-child{font-size:19px}.ai-chat-panel{position:fixed;left:22px;bottom:146px;width:min(390px,calc(100vw - 32px));height:min(570px,calc(100dvh - 180px));z-index:9991;background:#fff;border:1px solid #e1e7ef;border-radius:20px;box-shadow:0 25px 70px #17233a2b;display:none;overflow:hidden;flex-direction:column}.ai-chat-panel.open{display:flex}.ai-chat-head{background:#2865df;color:#fff;padding:16px 17px;display:flex;align-items:center;gap:11px}.ai-chat-avatar{width:40px;height:40px;border-radius:12px;background:#fff2;display:grid;place-items:center;font-size:22px;flex:0 0 auto}.ai-chat-head-copy{flex:1}.ai-chat-head-copy b{display:block;font-size:14px}.ai-chat-head-copy span{display:block;font-size:10px;opacity:.82;margin-top:3px}.ai-chat-close{border:0;background:#fff1;color:#fff;width:34px;height:34px;border-radius:9px;cursor:pointer;font-size:21px}.ai-chat-messages{flex:1;overflow:auto;padding:15px;background:#f7f9fc;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch}.ai-msg{max-width:85%;padding:10px 12px;border-radius:14px;font-size:12px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere}.ai-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e5eaf1;color:#253348;border-bottom-left-radius:5px}.ai-msg.user{align-self:flex-end;background:#2865df;color:#fff;border-bottom-right-radius:5px}.ai-msg.typing{color:#7b8798}.ai-chat-suggestions{display:flex;gap:7px;overflow:auto;padding:9px 11px;background:#fff;border-top:1px solid #edf0f4;scrollbar-width:none}.ai-chat-suggestions::-webkit-scrollbar{display:none}.ai-suggest{border:1px solid #dfe6ef;background:#f8fafc;color:#536176;border-radius:999px;padding:7px 10px;font-size:10px;white-space:nowrap;cursor:pointer}.ai-suggest:hover{border-color:#2865df;color:#2865df}.ai-chat-form{display:flex;gap:8px;padding:10px;background:#fff;border-top:1px solid #e8edf3}.ai-chat-input{flex:1;min-width:0;border:1px solid #dce3eb;border-radius:11px;padding:10px 12px;outline:none;font-size:16px;background:#fff}.ai-chat-input:focus{border-color:#2865df}.ai-chat-send{width:43px;flex:0 0 43px;border:0;border-radius:11px;background:#2865df;color:#fff;cursor:pointer;font-size:17px}.ai-chat-send:disabled{opacity:.55;cursor:not-allowed}@keyframes aiChatFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@media(max-width:650px){.ai-chat-launch{left:12px;bottom:74px;padding:11px 14px;font-size:12px}.ai-chat-launch span:first-child{font-size:18px}.ai-chat-panel{left:8px;right:8px;bottom:8px;width:auto;height:min(560px,calc(100dvh - 16px));border-radius:18px}.ai-chat-head{padding:13px 14px}.ai-chat-messages{padding:12px}.ai-chat-suggestions{padding:8px}.ai-chat-form{padding:9px}.ai-chat-input{font-size:16px;min-height:42px}.ai-chat-send{height:42px}}@media(prefers-reduced-motion:reduce){.ai-chat-launch{animation:none}}';
    document.head.appendChild(s);
  }
  function escapeText(text){return String(text||'');}
  function addMessage(text,role,typing){if(!messages)return null;var el=document.createElement('div');el.className='ai-msg '+role+(typing?' typing':'');el.textContent=escapeText(text);messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
  function sendMessage(text){
    text=String(text||'').trim();
    if(!text||busy||!input||!send)return;
    busy=true;send.disabled=true;input.disabled=true;addMessage(text,'user');var typing=addMessage('جاري التفكير...','bot',true);
    fetch(FUNCTION_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history:history.slice(-8)})})
      .then(function(r){return r.json().then(function(data){return {ok:r.ok,data:data};});})
      .then(function(result){if(typing)typing.remove();if(!result.ok||!result.data.answer)throw new Error(result.data&&result.data.error||'تعذر الحصول على رد حاليًا.');addMessage(result.data.answer,'bot');history.push({role:'user',text:text},{role:'model',text:result.data.answer});history=history.slice(-8);})
      .catch(function(err){console.error('Fablab AI chat error:',err);if(typing)typing.remove();addMessage(err.message==='Failed to fetch'?'تعذر الاتصال بالمساعد حاليًا. حاول مرة أخرى.':(err.message||'تعذر الحصول على رد حاليًا.'),'bot');})
      .finally(function(){busy=false;if(send)send.disabled=false;if(input){input.disabled=false;input.focus();}});
  }
  function init(){
    if(document.querySelector('.ai-chat-launch'))return;
    addStyles();
    var launch=document.createElement('button');launch.className='ai-chat-launch';launch.type='button';launch.innerHTML='<span>🤖</span><span>اسأل فاب لاب</span>';
    var panel=document.createElement('section');panel.className='ai-chat-panel';panel.setAttribute('aria-label','المساعد الذكي لفاب لاب');
    panel.innerHTML='<div class="ai-chat-head"><div class="ai-chat-avatar">🤖</div><div class="ai-chat-head-copy"><b>مساعد فاب لاب</b><span>مساعد تجريبي للاستفسارات</span></div><button class="ai-chat-close" type="button" aria-label="إغلاق">×</button></div><div class="ai-chat-messages"></div><div class="ai-chat-suggestions"><button class="ai-suggest" type="button">وش البرامج الموجودة؟</button><button class="ai-suggest" type="button">كيف أسجل؟</button><button class="ai-suggest" type="button">كيف أتواصل معكم؟</button></div><form class="ai-chat-form"><input class="ai-chat-input" type="text" maxlength="1000" autocomplete="off" inputmode="text" placeholder="اكتب سؤالك هنا..."><button class="ai-chat-send" type="submit" aria-label="إرسال">➤</button></form>';
    document.body.appendChild(launch);document.body.appendChild(panel);
    messages=panel.querySelector('.ai-chat-messages');input=panel.querySelector('.ai-chat-input');send=panel.querySelector('.ai-chat-send');
    panel.querySelector('.ai-chat-close').addEventListener('click',function(){panel.classList.remove('open');});
    launch.addEventListener('click',function(){panel.classList.toggle('open');if(panel.classList.contains('open'))input.focus();});
    panel.querySelectorAll('.ai-suggest').forEach(function(btn){btn.addEventListener('click',function(){sendMessage(btn.textContent);});});
    panel.querySelector('.ai-chat-form').addEventListener('submit',function(e){e.preventDefault();var value=input.value;input.value='';sendMessage(value);});
    addMessage('هلا 👋 أنا مساعد فاب لاب. اسألني عن البرامج أو التسجيل أو التواصل، وبساعدك بالمعلومات المتاحة.','bot');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
