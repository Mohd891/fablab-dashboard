(function(){
  'use strict';
  if(window.__fablabAIChatVoiceLoaded)return;
  window.__fablabAIChatVoiceLoaded=true;

  var recognition=null;
  var listening=false;
  var speaking=false;
  var mic=null;
  var speakEnabled=true;
  var lastSpoken='';

  function speak(text){
    if(!speakEnabled||!('speechSynthesis' in window))return;
    text=String(text||'').replace(/https?:\/\/\S+/g,'').replace(/\s+/g,' ').trim();
    if(!text||text===lastSpoken)return;
    lastSpoken=text;
    window.speechSynthesis.cancel();
    var utter=new SpeechSynthesisUtterance(text);
    utter.lang='ar-SA';
    utter.rate=.92;
    utter.pitch=1;
    var voices=window.speechSynthesis.getVoices();
    var arabic=voices.find(function(v){return /^ar(-|_)/i.test(v.lang||'')})||voices.find(function(v){return /arabic|ar-SA/i.test((v.name||'')+' '+(v.lang||''))});
    if(arabic)utter.voice=arabic;
    utter.onstart=function(){speaking=true;updateSpeakButtons()};
    utter.onend=utter.onerror=function(){speaking=false;updateSpeakButtons()};
    window.speechSynthesis.speak(utter);
  }

  function updateMic(){
    if(!mic)return;
    mic.textContent=listening?'⏹️':'🎤';
    mic.title=listening?'إيقاف الاستماع':'تحدث مع المساعد';
    mic.setAttribute('aria-label',listening?'إيقاف الاستماع':'تحدث مع المساعد');
    mic.classList.toggle('listening',listening);
  }

  function updateSpeakButtons(){
    document.querySelectorAll('.ai-speak-btn').forEach(function(btn){
      btn.textContent=(speaking&&btn.dataset.speaking==='1')?'⏹️':'🔊';
      btn.title=speaking&&btn.dataset.speaking==='1'?'إيقاف الصوت':'استمع للرد';
    });
  }

  function stopSpeaking(){if('speechSynthesis' in window){window.speechSynthesis.cancel();speaking=false;updateSpeakButtons()}}

  function addStyles(){
    if(document.getElementById('fablab-ai-voice-style'))return;
    var s=document.createElement('style');s.id='fablab-ai-voice-style';
    s.textContent='.ai-chat-form{align-items:center}.ai-chat-mic,.ai-speak-btn{border:1px solid #dce3eb;background:#fff;color:#2865df;border-radius:11px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.ai-chat-mic{width:43px;height:43px;flex:0 0 43px;font-size:18px}.ai-chat-mic.listening{background:#fff0f0;border-color:#f2b5b5}.ai-speak-btn{width:32px;height:30px;margin:6px 0 0 0;font-size:15px;vertical-align:middle}.ai-speak-btn:hover,.ai-chat-mic:hover{border-color:#2865df;background:#f5f8ff}.ai-voice-status{font-size:10px;color:#2865df;margin:0 10px 7px;min-height:16px;text-align:right}.ai-msg.bot .ai-speak-btn{display:inline-flex}@media(max-width:650px){.ai-chat-mic{width:52px;height:52px;flex-basis:52px;font-size:22px}.ai-speak-btn{width:38px;height:36px;font-size:17px}.ai-voice-status{font-size:13px;margin:0 12px 7px}}';
    document.head.appendChild(s);
  }

  function setupRecognition(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR)return false;
    recognition=new SR();
    recognition.lang='ar-SA';
    recognition.continuous=false;
    recognition.interimResults=false;
    recognition.maxAlternatives=1;
    recognition.onstart=function(){listening=true;updateMic();setStatus('جاري الاستماع... تكلم الآن 🎙️')};
    recognition.onresult=function(e){
      var text=e.results&&e.results[0]&&e.results[0][0]?e.results[0][0].transcript:'';
      if(inputElement()&&text){inputElement().value=text;var form=document.querySelector('.ai-chat-form');if(form)form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));}
    };
    recognition.onerror=function(e){
      var msg=e&&e.error==='not-allowed'?'اسمح للموقع باستخدام الميكروفون من إعدادات المتصفح.':e&&e.error==='no-speech'?'ما سمعت كلام واضح، حاول مرة ثانية.':'تعذر استخدام الميكروفون حاليًا.';
      setStatus(msg);
    };
    recognition.onend=function(){listening=false;updateMic();setTimeout(function(){setStatus('')},1800)};
    return true;
  }

  function inputElement(){return document.querySelector('.ai-chat-input')}
  function setStatus(text){var el=document.querySelector('.ai-voice-status');if(el)el.textContent=text||''}

  function addVoiceUI(){
    var form=document.querySelector('.ai-chat-form');
    if(!form||form.dataset.voiceReady==='1')return !!form;
    form.dataset.voiceReady='1';
    addStyles();
    var status=document.createElement('div');status.className='ai-voice-status';status.setAttribute('aria-live','polite');
    var wrap=document.createElement('div');wrap.style.display='contents';
    mic=document.createElement('button');mic.type='button';mic.className='ai-chat-mic';mic.textContent='🎤';mic.title='تحدث مع المساعد';mic.setAttribute('aria-label','تحدث مع المساعد');
    mic.addEventListener('click',function(){
      if(!recognition){setStatus('المتصفح الحالي لا يدعم الإدخال الصوتي. جرّب Safari أو Chrome.');return;}
      if(listening){recognition.stop();return;}
      try{stopSpeaking();recognition.start()}catch(e){console.warn(e)}
    });
    form.insertBefore(mic,form.querySelector('.ai-chat-send'));
    form.parentNode.insertBefore(status,form);
    setupRecognition();
  }

  function addSpeakButton(msg){
    if(!msg||msg.classList.contains('typing')||msg.querySelector('.ai-speak-btn'))return;
    var text=msg.textContent.trim();if(!text)return;
    var btn=document.createElement('button');btn.type='button';btn.className='ai-speak-btn';btn.textContent='🔊';btn.title='استمع للرد';btn.setAttribute('aria-label','استمع للرد');
    btn.addEventListener('click',function(){
      if(speaking){btn.dataset.speaking='0';stopSpeaking();return}
      document.querySelectorAll('.ai-speak-btn').forEach(function(b){b.dataset.speaking='0'});
      btn.dataset.speaking='1';speak(text);
    });
    msg.appendChild(btn);
    if(msg.dataset.autoSpoken!=='1'){msg.dataset.autoSpoken='1';speak(text)}
  }

  function scan(){
    var form=document.querySelector('.ai-chat-form');
    if(form)addVoiceUI();
    document.querySelectorAll('.ai-msg.bot:not(.typing)').forEach(addSpeakButton);
  }

  function init(){
    addStyles();
    var observer=new MutationObserver(function(){scan()});
    observer.observe(document.body,{childList:true,subtree:true});
    scan();
    if('speechSynthesis' in window)window.speechSynthesis.onvoiceschanged=function(){};
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
