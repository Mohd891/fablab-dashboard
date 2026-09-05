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

  /* Homepage hero: Fab Lab departments and services */
  var heroArt=document.querySelector('.hero-art');
  if(heroArt){
    heroArt.innerHTML='<div class="orb"></div><img class="hero-fablab-logo" src="assets/fablab-logo-wide.png" alt="فاب لاب الأحساء">'+
      '<div class="fab-departments">'+
      '<a class="fab-dept fab-dept-a" href="about.html"><span>🤖</span><b>روبوتات</b></a>'+ 
      '<a class="fab-dept fab-dept-b" href="about.html"><span>⚡</span><b>إلكترونيات</b></a>'+ 
      '<a class="fab-dept fab-dept-c" href="about.html"><span>🖨️</span><b>الطباعة ثلاثية الأبعاد</b></a>'+ 
      '<a class="fab-dept fab-dept-d" href="about.html"><span>⚙️</span><b>التصنيع الرقمي</b></a>'+ 
      '<a class="fab-dept fab-dept-e" href="about.html"><span>🪵</span><b>الخشب و CNC</b></a>'+ 
      '<a class="fab-dept fab-dept-f" href="about.html"><span>🔴</span><b>القص بالليزر</b></a>'+ 
      '<a class="fab-dept fab-dept-g" href="about.html"><span>✂️</span><b>القص والملصقات</b></a>'+ 
      '<a class="fab-dept fab-dept-h" href="about.html"><span>🎨</span><b>التصميم والجرافيك</b></a>'+ 
      '<a class="fab-dept fab-dept-i" href="about.html"><span>🛠️</span><b>الأدوات والمعدات</b></a>'+ 
      '</div>'+
      '<div class="hero-dept-caption">أقسام وخدمات فاب لاب الأحساء</div>';
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
  style.textContent='.program-card{overflow:hidden;padding:0;position:relative}.program-card .program-image{width:100%;height:175px;display:block;object-fit:cover;object-position:center;background:#eef4ff}.program-card .program-content{padding:20px 23px 23px}.program-card .program-content .icon{margin-bottom:12px}.program-card h3{margin:10px 0 8px}.program-card:hover .program-image{transform:scale(1.03)}.program-card .program-image{transition:transform .25s ease}.author-badge{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 24px;border:1px solid #d7eadf;border-radius:14px;background:#f2fbf5;min-width:190px}.author-phone{color:#176b3b;text-decoration:none;font-weight:700;font-size:16px;direction:ltr}.author-phone:hover{text-decoration:underline}.game-promo{display:flex;align-items:center;gap:18px;margin:0 0 30px;padding:22px 24px;border:1px solid #dce8f5;border-radius:20px;background:#f7fbff}.game-promo-icon{font-size:42px;flex:0 0 auto}.game-promo-copy{flex:1}.game-promo-copy h2{margin:4px 0 6px}.game-promo-copy p{margin:0}.game-promo .btn{flex:0 0 auto}.hero-art{position:relative;min-height:520px!important;display:flex;align-items:center;justify-content:center}.hero-fablab-logo{position:relative;z-index:2;width:min(410px,58%);height:auto;filter:drop-shadow(0 18px 35px rgba(28,60,98,.12))}.fab-departments{position:absolute;inset:0;z-index:3}.fab-dept{position:absolute;display:flex;align-items:center;gap:9px;padding:13px 18px;background:#fff;border:1px solid #e4eaf2;border-radius:18px;box-shadow:0 14px 35px rgba(25,50,85,.12);color:#173b63;text-decoration:none;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease}.fab-dept:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(25,50,85,.18)}.fab-dept span{font-size:25px;line-height:1}.fab-dept b{font-size:15px;font-weight:700}.fab-dept-a{top:7%;right:3%}.fab-dept-b{top:30%;left:0}.fab-dept-c{bottom:25%;left:0}.fab-dept-d{bottom:5%;left:12%}.fab-dept-e{top:7%;left:4%}.fab-dept-f{top:30%;right:0}.fab-dept-g{bottom:25%;right:0}.fab-dept-h{bottom:5%;right:8%}.fab-dept-i{top:51%;right:3%}.hero-dept-caption{position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);z-index:4;background:#fff;padding:9px 16px;border-radius:999px;box-shadow:0 8px 25px rgba(25,50,85,.1);font-size:13px;color:#49627d;white-space:nowrap}@media(max-width:900px){.hero-art{min-height:460px!important}.hero-fablab-logo{width:min(360px,55%)}.fab-dept{padding:10px 13px}.fab-dept b{font-size:13px}.fab-dept-a{right:0}.fab-dept-e{left:0}.fab-dept-b,.fab-dept-f{top:25%}.fab-dept-c,.fab-dept-g{bottom:27%}}@media(max-width:650px){.program-card .program-image{height:190px}.game-promo{flex-direction:column;align-items:stretch;text-align:center}.game-promo .btn{width:100%}.hero-art{min-height:590px!important;margin-top:10px}.hero-fablab-logo{width:72%;max-width:330px}.fab-dept{padding:9px 11px;border-radius:14px;gap:6px}.fab-dept span{font-size:19px}.fab-dept b{font-size:11px}.fab-dept-a{top:1%;right:0}.fab-dept-e{top:1%;left:0}.fab-dept-b{top:22%;left:0}.fab-dept-f{top:22%;right:0}.fab-dept-c{bottom:27%;left:0}.fab-dept-g{bottom:27%;right:0}.fab-dept-d{bottom:10%;left:0}.fab-dept-h{bottom:10%;right:0}.fab-dept-i{top:43%;right:50%;transform:translateX(50%)}.fab-dept-i:hover{transform:translateX(50%) translateY(-4px)}.hero-dept-caption{bottom:-5px;font-size:11px}.hero .hero-copy{z-index:5}}
  document.head.appendChild(style);
});
