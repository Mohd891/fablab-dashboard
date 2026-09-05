document.addEventListener('DOMContentLoaded',function(){
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
  var grid=document.querySelector('.program-grid');
  if(grid && !document.querySelector('.game-promo')){
    var game=document.createElement('section');game.className='game-promo';
    game.innerHTML='<div class="game-promo-icon">🎮</div><div class="game-promo-copy"><span class="eyebrow">FAB LAB CHALLENGE</span><h2>جرب لعبة فاب لاب</h2><p>اختبر سرعتك خلال 20 ثانية، واضغط على الأشكال بأسرع ما تقدر واجمع أكبر عدد من النقاط!</p></div><a class="btn primary large" href="game.html">ابدأ اللعب</a>';
    grid.parentNode.insertBefore(game,grid);
  }
  var style=document.createElement('style');
  style.textContent='.program-card{overflow:hidden;padding:0;position:relative}.program-card .program-image{width:100%;height:175px;display:block;object-fit:cover;object-position:center;background:#eef4ff;transition:transform .25s ease}.program-card .program-content{padding:20px 23px 23px}.program-card .program-content .icon{margin-bottom:12px}.program-card h3{margin:10px 0 8px}.program-card:hover .program-image{transform:scale(1.03)}.program-card .program-details{display:inline-flex;margin-top:10px}.author-badge{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:16px 24px;border:1px solid #d7eadf;border-radius:14px;background:#f2fbf5;min-width:190px}.author-phone{color:#176b3b;text-decoration:none;font-weight:700;font-size:16px;direction:ltr}.game-promo{display:flex;align-items:center;gap:18px;margin:0 0 30px;padding:22px 24px;border:1px solid #dce8f5;border-radius:20px;background:#f7fbff}.game-promo-icon{font-size:42px;flex:0 0 auto}.game-promo-copy{flex:1}.game-promo-copy h2{margin:4px 0 6px}.game-promo-copy p{margin:0}.game-promo .btn{flex:0 0 auto}.hero-art{position:relative;min-height:570px!important;display:flex;align-items:center;justify-content:center}.hero-fablab-logo{position:relative;z-index:2;width:min(430px,55%);height:auto;filter:drop-shadow(0 18px 35px rgba(28,60,98,.12))}.fab-departments{position:absolute;inset:0;z-index:3}.fab-dept{position:absolute;width:150px;min-height:54px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:7px;padding:9px 12px;background:#fff;border:1px solid #e4eaf2;border-radius:18px;box-shadow:0 10px 25px rgba(25,50,85,.11);color:#173b63;text-decoration:none;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease}.fab-dept:hover{box-shadow:0 14px 30px rgba(25,50,85,.16)}.fab-dept span{font-size:22px;line-height:1}.fab-dept b{font-size:14px;font-weight:700}.fab-dept-a{top:3%;left:50%;transform:translateX(-50%)}.fab-dept-b{top:29%;left:4%}.fab-dept-c{bottom:25%;right:4%}.fab-dept-d{bottom:3%;left:50%;transform:translateX(-50%)}.fab-dept-e{bottom:25%;left:4%}.fab-dept-f{top:29%;right:4%}.fab-dept-a:hover,.fab-dept-d:hover{transform:translateX(-50%) translateY(-4px)}.fab-dept-b:hover,.fab-dept-c:hover,.fab-dept-e:hover,.fab-dept-f:hover{transform:translateY(-4px)}@media(max-width:900px){.hero-art{min-height:520px!important}.hero-fablab-logo{width:min(370px,53%)}.fab-dept{width:140px;min-height:52px;padding:8px 10px}.fab-dept b{font-size:13px}.fab-dept-a{top:2%}.fab-dept-b,.fab-dept-f{top:27%}.fab-dept-c,.fab-dept-e{bottom:24%}.fab-dept-d{bottom:2%}}@media(max-width:650px){.program-card .program-image{height:190px}.game-promo{flex-direction:column;align-items:stretch;text-align:center}.game-promo .btn{width:100%}.hero-art{min-height:520px!important;margin-top:10px}.hero-fablab-logo{width:62%;max-width:300px}.fab-dept{width:132px;min-height:50px;padding:7px 9px;border-radius:16px;gap:4px}.fab-dept span{font-size:18px}.fab-dept b{font-size:10px}.fab-dept-a{top:1%}.fab-dept-b,.fab-dept-f{top:25%}.fab-dept-c,.fab-dept-e{bottom:23%}.fab-dept-d{bottom:1%}.hero .hero-copy{z-index:5}}';
  document.head.appendChild(style);
});
