document.addEventListener('DOMContentLoaded',function(){
  var images={
    'صناع المستقبل':{src:'assets/ChatGPT Image Sep 5, 2026, 01_50_29 PM.png',id:6},
    'صناع الواقع':{src:'assets/ChatGPT Image Sep 5, 2026, 01_50_19 PM.png',id:7},
    'الروبوتات الذكية':{src:'assets/ChatGPT Image Sep 5, 2026, 01_50_11 PM.png',id:8},
    'روبوتات VEX العالمية':{src:'assets/ChatGPT Image Sep 5, 2026, 01_50_06 PM.png',id:9}
  };
  var data=[
    ['صناع المستقبل','Innovation','معسكر إثرائي تفاعلي يعزز مهارات المشاركين في العلوم والتقنية والابتكار من خلال مشاريع عملية وتطبيقات هندسية.'],
    ['صناع الواقع','Digital Fabrication','حوّل أفكارك إلى منتجات حقيقية باستخدام القص بالليزر والطباعة ثلاثية الأبعاد والإلكترونيات.'],
    ['الروبوتات الذكية','Smart Robotics','تعرّف على الزراعة الذكية والأنظمة الآلية للري والمراقبة من خلال مشاريع عملية.'],
    ['روبوتات VEX العالمية','VEX Robotics','صمّم وابنِ وبرمج روبوتات VEX وفق معايير المسابقات العالمية وعزّز مهاراتك في حل المشكلات والعمل الجماعي.']
  ];
  var grid=document.querySelector('.program-grid');
  if(grid){
    grid.innerHTML=data.map(function(x){var im=images[x[0]];return '<article class="program-card"><img class="program-image" src="'+im.src+'" alt="'+x[0]+'"><div class="program-content"><div class="icon">✦</div><span class="tag">'+x[1]+'</span><h3>'+x[0]+'</h3><p>'+x[2]+'</p><a class="program-details" href="program.html?id='+im.id+'">عرض تفاصيل البرنامج ←</a><span class="home-finished">منتهي</span></div></article>';}).join('');
    if(!document.querySelector('.more-programs-wrap')){
      var more=document.createElement('div');
      more.className='more-programs-wrap';
      more.innerHTML='<a class="more-programs-btn" href="programs.html">اكتشف المزيد من البرامج <span>←</span></a>';
      grid.parentNode.insertBefore(more,grid.nextSibling);
    }
  }
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
      '</div>';
  }
  var author=document.querySelector('.author-credit');
  if(author){
    var badge=author.querySelector('.author-badge');
    if(badge){badge.innerHTML='<b>محمد الرمضان</b><span>مصمم ومطور الموقع</span><a class="author-phone" href="https://wa.me/966566552942" target="_blank" rel="noopener">0566552942</a>';}
    var meta=author.querySelector('.author-meta');
    if(meta) meta.remove();
  }
  var roles=document.querySelector('.roles-band');
  if(roles) roles.remove();
  if(grid && !document.querySelector('.game-promo')){
    var game=document.createElement('section');game.className='game-promo';
    game.innerHTML='<div class="game-promo-icon">🎮</div><div class="game-promo-copy"><span class="eyebrow">FAB LAB CHALLENGE</span><h2>جرب لعبة فاب لاب</h2><p>اختبر سرعتك خلال 20 ثانية، واضغط على الأشكال بأسرع ما تقدر واجمع أكبر عدد من النقاط!</p></div><a class="btn primary large" href="game.html">ابدأ اللعب</a>';
    grid.parentNode.insertBefore(game,grid);
  }
  var style=document.createElement('style');
  style.textContent='.program-card{overflow:hidden;padding:0;position:relative}.program-card .program-image{width:100%;height:175px;display:block;object-fit:cover;object-position:center;background:#eef4ff;transition:transform .25s ease}.program-card .program-content{padding:18px 18px 20px}.program-card .program-content .icon{margin-bottom:10px}.program-card h3{margin:8px 0 7px;font-size:18px}.program-card p{font-size:12px;line-height:1.8;margin-bottom:0}.program-card:hover .program-image{transform:scale(1.03)}.program-card .program-details{display:inline-flex;margin-top:11px}.home-finished{display:inline-flex;margin:11px 0 0 8px;padding:6px 10px;border-radius:999px;background:#f1f3f5;color:#687385;font-size:10px;font-weight:700}.more-programs-wrap{display:flex;justify-content:center;margin:30px 0 10px}.more-programs-btn{display:inline-flex;align-items:center;gap:12px;padding:13px 24px;border-radius:12px;background:#101828;color:#fff;text-decoration:none;font-size:13px;font-weight:700;transition:.2s}.more-programs-btn:hover{transform:translateY(-2px);opacity:.92}.author-badge{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 24px;border:1px solid #d7eadf;border-radius:14px;background:#f2fbf5;min-width:190px}.author-phone{color:#176b3b;text-decoration:none;font-weight:700;font-size:16px;direction:ltr}.game-promo{display:flex;align-items:center;gap:18px;margin:0 0 30px;padding:22px 24px;border:1px solid #dce8f5;border-radius:20px;background:#f7fbff}.game-promo-icon{font-size:42px;flex:0 0 auto}.game-promo-copy{flex:1}.game-promo-copy h2{margin:4px 0 6px}.game-promo-copy p{margin:0}.game-promo .btn{flex:0 0 auto}.hero-art{position:relative;min-height:570px!important;display:flex;align-items:center;justify-content:center}.hero-fablab-logo{position:relative;z-index:2;width:min(430px,55%);height:auto;filter:drop-shadow(0 18px 35px rgba(28,60,98,.12))}.fab-departments{position:absolute;inset:0;z-index:3}.fab-dept{position:absolute;width:190px;min-height:72px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:9px;padding:13px 16px;background:#fff;border:1px solid #e4eaf2;border-radius:22px;box-shadow:0 14px 35px rgba(25,50,85,.12);color:#173b63;text-decoration:none;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease}.fab-dept:hover{box-shadow:0 18px 40px rgba(25,50,85,.18)}.fab-dept span{font-size:25px;line-height:1}.fab-dept b{font-size:15px;font-weight:700}.fab-dept-a{top:2%;left:50%;transform:translateX(-50%)}.fab-dept-b{top:27%;left:2%}.fab-dept-c{bottom:24%;right:2%}.fab-dept-d{bottom:2%;left:50%;transform:translateX(-50%)}.fab-dept-e{bottom:24%;left:2%}.fab-dept-f{top:27%;right:2%}.fab-dept-a:hover,.fab-dept-d:hover{transform:translateX(-50%) translateY(-4px)}.fab-dept-b:hover,.fab-dept-c:hover,.fab-dept-e:hover,.fab-dept-f:hover{transform:translateY(-4px)}@media(min-width:901px){.program-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}@media(max-width:900px){.hero-art{min-height:520px!important}.hero-fablab-logo{width:min(370px,53%)}.fab-dept{width:175px;min-height:66px;padding:10px 13px}.fab-dept b{font-size:13px}.fab-dept-a{top:1%}.fab-dept-b,.fab-dept-f{top:25%}.fab-dept-c,.fab-dept-e{bottom:23%}.fab-dept-d{bottom:1%}}@media(max-width:650px){.program-grid{grid-template-columns:1fr}.program-card .program-image{height:220px}.game-promo{flex-direction:column;align-items:stretch;text-align:center}.game-promo .btn{width:100%}.hero-art{min-height:520px!important;margin-top:10px}.hero-fablab-logo{width:62%;max-width:300px}.fab-dept{width:145px;min-height:58px;padding:8px 10px;border-radius:17px;gap:5px}.fab-dept span{font-size:19px}.fab-dept b{font-size:11px}.fab-dept-a{top:1%}.fab-dept-b,.fab-dept-f{top:25%}.fab-dept-c,.fab-dept-e{bottom:23%}.fab-dept-d{bottom:1%}.hero .hero-copy{z-index:5}}';
  document.head.appendChild(style);
});
