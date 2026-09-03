document.addEventListener('DOMContentLoaded',function(){
  var images={
    'عالم الروبوتات':{src:'assets/program-alam-robot.png',id:1},
    'برمج روبوتك':{src:'assets/program-barmej-robotak.png',id:2},
    'هندسة الإبداع':{src:'assets/program-hendassat-alibda.png',id:3},
    'معسكر المبتكر الإلكتروني':{src:'assets/program-mubtaker-electronic.png',id:4},
    'نبض الكهرباء':{src:'assets/program-nabd-electric.png',id:5}
  };
  var data=[
    ['عالم الروبوتات','Robotics','تعرف على عالم الروبوتات وصمّم حلولًا ذكية بطريقة عملية.'],
    ['برمج روبوتك','Robotics','تعلم أساسيات برمجة الروبوتات وتحويل الأفكار إلى مشاريع تفاعلية.'],
    ['هندسة الإبداع','Engineering','حل المشكلات والهندسة الإبداعية وبناء النماذج الأولية.'],
    ['معسكر المبتكر الإلكتروني','Electronics','تجارب إلكترونية وابتكار نماذج أولية من الفكرة إلى التنفيذ.'],
    ['نبض الكهرباء','Electronics','تعلم أساسيات الكهرباء والدارات واصنع مشروعك المضيء بنفسك.']
  ];
  var grid=document.querySelector('.program-grid');
  if(grid){
    grid.innerHTML=data.map(function(x){var im=images[x[0]];return '<article class="program-card"><img class="program-image" src="'+im.src+'" alt="'+x[0]+'"><div class="program-content"><div class="icon">✦</div><span class="tag">'+x[1]+'</span><h3>'+x[0]+'</h3><p>'+x[2]+'</p><a class="program-details" href="program.html?id='+im.id+'">عرض تفاصيل البرنامج ←</a></div></article>';}).join('');
  }
  var author=document.querySelector('.author-credit');
  if(author){
    var badge=author.querySelector('.author-badge');
    if(badge){
      badge.innerHTML='<b>محمد الرمضان</b><span>مصمم ومطور الموقع</span><a class="author-phone" href="https://wa.me/966566552942" target="_blank" rel="noopener">0566552942</a>';
    }
    var meta=author.querySelector('.author-meta');
    if(meta) meta.remove();
  }
  var roles=document.querySelector('.roles-band');
  if(roles) roles.remove();
  if(grid && !document.querySelector('.game-promo')){
    var game=document.createElement('section');
    game.className='game-promo';
    game.innerHTML='<div class="game-promo-icon">🎮</div><div class="game-promo-copy"><span class="eyebrow">FAB LAB CHALLENGE</span><h2>جرب لعبة فاب لاب</h2><p>اختبر سرعتك خلال 20 ثانية، واضغط على الأشكال بأسرع ما تقدر واجمع أكبر عدد من النقاط!</p></div><a class="btn primary large" href="game.html">ابدأ اللعب</a>';
    grid.parentNode.insertBefore(game,grid);
  }
  var style=document.createElement('style');
  style.textContent='.program-card{overflow:hidden;padding:0;position:relative}.program-card .program-image{width:100%;height:175px;display:block;object-fit:cover;object-position:center;background:#eef4ff}.program-card .program-content{padding:20px 23px 23px}.program-card .program-content .icon{margin-bottom:12px}.program-card h3{margin:10px 0 8px}.program-card:hover .program-image{transform:scale(1.03)}.program-card .program-image{transition:transform .25s ease}.program-card .program-details{display:inline-flex;margin-top:10px}.author-badge{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 24px;border:1px solid #d7eadf;border-radius:14px;background:#f2fbf5;min-width:190px}.author-phone{color:#176b3b;text-decoration:none;font-weight:700;font-size:16px;direction:ltr}.author-phone:hover{text-decoration:underline}.game-promo{display:flex;align-items:center;gap:18px;margin:0 0 30px;padding:22px 24px;border:1px solid #dce8f5;border-radius:20px;background:#f7fbff}.game-promo-icon{font-size:42px;flex:0 0 auto}.game-promo-copy{flex:1}.game-promo-copy h2{margin:4px 0 6px}.game-promo-copy p{margin:0}.game-promo .btn{flex:0 0 auto}@media(max-width:650px){.program-card .program-image{height:190px}.game-promo{flex-direction:column;align-items:stretch;text-align:center}.game-promo .btn{width:100%}}';
  document.head.appendChild(style);
});
