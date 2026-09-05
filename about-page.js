document.addEventListener('DOMContentLoaded',function(){
  const content=`
  <section class="page-head about-hero">
    <span class="eyebrow">ABOUT FAB LAB</span>
    <h1>عن فاب لاب الأحساء</h1>
    <p>مساحة للابتكار والتصنيع الرقمي وتحويل الأفكار إلى واقع.</p>
  </section>

  <section class="about-stack">
    <article class="about-block about-intro">
      <span class="about-number">01</span>
      <div>
        <span class="eyebrow">من نحن</span>
        <h2>فاب لاب الأحساء</h2>
        <p>أول مصنع تصنيع رقمي متكامل في محافظة الأحساء يتيح لجميع أفراد المجتمع الفرصة لتنمية أفكارهم وتحويلها إلى واقع عن طريق أحدث آلات التصنيع الرقمي. يوفر فاب لاب الأحساء المساحة الإبداعية والبيئة المناسبة لتبادل الأفكار والتحديث مع الخبراء في هذا المجال، وكذلك منصة للمساعدة في تسجيل براءات اختراع التي تنتج من عمل أفراد المجتمع على تقنيات التصنيع الرقمي الحديثة. وهو إحدى مبادرات مؤسسة عبد المنعم الراشد الإنسانية.</p>
      </div>
    </article>

    <article class="about-block mission-block">
      <span class="about-number">02</span>
      <div>
        <h2>الرسالة</h2>
        <p>نشر ثقافة الإبداع والاختراع ومساعدة المجتمع في تحويل أفكارهم إلى منتجات عبر أحدث تقنيات التصنيع الرقمي المتواجدة في الفاب لاب.</p>
      </div>
    </article>

    <article class="about-block vision-block">
      <span class="about-number">03</span>
      <div>
        <h2>الرؤية</h2>
        <p>أن نكون أفضل مصنع رقمي متميز حول العالم يساهم في تنمية الإبداع والابتكار.</p>
      </div>
    </article>

    <section class="about-values">
      <div class="about-section-title"><h2>قيمنا ومحاورنا</h2></div>
      <div class="about-values-grid">
        <article><div class="value-icon">💡</div><h3>الإبداع اللامحدود</h3><p>نوفر البيئة والأدوات التي تساعد على تحويل الأفكار الإبداعية إلى تجارب ومشاريع حقيقية.</p></article>
        <article><div class="value-icon">📘</div><h3>التعليم المستمر</h3><p>نؤمن بالتعلم بالممارسة وتطوير المهارات باستمرار في مجالات التقنية والتصنيع الرقمي.</p></article>
        <article><div class="value-icon">🌐</div><h3>الشراكات العالمية</h3><p>نسعى إلى بناء علاقات وشراكات تفتح آفاقًا جديدة للتعلم والابتكار وتبادل الخبرات.</p></article>
      </div>
    </section>
  </section>`;
  const nav=typeof publicNav==='function'?publicNav('about'):'';
  document.body.innerHTML=nav+'<main>'+content+'</main><footer class="site-footer"><span>© 2026 Fablab Al-Ahsa</span><span>تصميم وتطوير الموقع: محمد الرمضان</span><a href="contact.html">تواصل معنا</a></footer><div id="toast" class="toast"></div>';
  document.title='فاب لاب';

  const style=document.createElement('style');
  style.textContent=`
  .about-hero{text-align:center;padding-bottom:34px}.about-hero h1{margin-bottom:10px}.about-hero p{max-width:700px;margin:auto;color:#697586}
  .about-stack{max-width:1120px;margin:0 auto 80px;display:flex;flex-direction:column;gap:24px}
  .about-block{position:relative;display:grid;grid-template-columns:72px 1fr;gap:24px;padding:42px 46px;background:linear-gradient(145deg,#fff,#f7faff);border:1px solid #e2e8f0;border-radius:28px;box-shadow:0 16px 45px rgba(26,52,85,.08);overflow:hidden}
  .about-block::before{content:"";position:absolute;inset:0 auto 0 0;width:5px;background:#2d68d8}.mission-block::before{background:#20a464}.vision-block::before{background:#9b2bb7}
  .about-number{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;background:#edf3ff;color:#2d68d8;font-weight:900;font-size:14px}.mission-block .about-number{background:#eaf8f0;color:#17834c}.vision-block .about-number{background:#f7edfb;color:#9b2bb7}
  .about-block h2{font-size:30px;margin:8px 0 14px;color:#14233a}.about-block p{font-size:19px;line-height:2;color:#4b5565;margin:0;max-width:950px}
  .about-values{padding-top:22px}.about-section-title{text-align:center;margin-bottom:24px}.about-section-title h2{font-size:30px;margin:7px 0;color:#14233a}
  .about-values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.about-values-grid article{background:#fff;border:1px solid #e3e8ef;border-radius:24px;padding:30px 26px;text-align:center;box-shadow:0 12px 35px rgba(26,52,85,.06)}.value-icon{font-size:38px;margin-bottom:14px}.about-values-grid h3{font-size:22px;margin:0 0 10px;color:#14233a}.about-values-grid p{margin:0;color:#697586;line-height:1.9;font-size:16px}
  @media(max-width:700px){.about-stack{margin-bottom:45px;gap:16px}.about-block{grid-template-columns:1fr;padding:28px 22px;gap:15px;border-radius:22px}.about-number{width:46px;height:46px}.about-block h2{font-size:25px}.about-block p{font-size:16px;line-height:1.9}.about-values-grid{grid-template-columns:1fr}.about-hero{padding-bottom:22px}}
  `;
  document.head.appendChild(style);
});
