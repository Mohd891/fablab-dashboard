<?php
require_once __DIR__ . '/includes/auth.php';

$programs = [];
$r = $conn->query("SELECT id,name,period,description FROM programs WHERE status='active' ORDER BY id");
while ($r && $row = $r->fetch_assoc()) {
    $programs[] = $row;
}
?>
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>فاب لاب الأحساء | مركز الإبداع والابتكار</title>
<link rel="icon" href="assets/fablab-logo.png">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="public-nav">
  <a class="brand" href="index.php"><img src="assets/fablab-logo-wide.png" alt="Fablab Al-Ahsa"></a>
  <nav>
    <a href="index.php" class="active">الرئيسية</a>
    <a href="programs.php">البرامج</a>
    <a href="about.php">عن فاب لاب</a>
    <a href="contact.php">تواصل معنا</a>
  </nav>
  <div class="nav-actions">
    <?php if (isLoggedIn()): ?>
      <a class="btn secondary" href="portal.php">لوحتي</a>
    <?php else: ?>
      <a class="btn secondary" href="login.php">تسجيل الدخول</a>
      <a class="btn primary" href="register.php">إنشاء حساب طالب</a>
    <?php endif; ?>
  </div>
</header>

<main>
<section class="hero public-hero">
  <div class="hero-copy">
    <span class="eyebrow">FAB LAB AL-AHSA</span>
    <h1>من الفكرة<br><span>إلى الواقع.</span></h1>
    <p>منصة رقمية تعكس تجربة فاب لاب في التعلم العملي، التصنيع الرقمي، الروبوتات، الإلكترونيات والابتكار.</p>
    <div class="hero-actions">
      <a class="btn primary large" href="programs.php">استكشف البرامج</a>
      <a class="btn ghost large" href="about.php">تعرف علينا</a>
    </div>
    <div class="hero-points"><span>✦ تعلم عملي</span><span>✦ مشاريع واقعية</span><span>✦ مجتمع مبتكرين</span></div>
  </div>
  <div class="hero-art">
    <div class="floating one">🤖</div>
    <div class="floating two">⚡</div>
    <div class="floating three">🛠️</div>
    <img src="assets/fablab-logo.png" alt="Fablab">
    <div class="art-glow"></div>
  </div>
</section>

<section class="section">
  <div class="section-head">
    <div><span class="eyebrow">PROGRAMS</span><h2>برامج تصنع تجربة</h2></div>
    <a class="text-link" href="programs.php">مشاهدة الكل ←</a>
  </div>
  <div class="program-grid">
    <?php foreach (array_slice($programs, 0, 6) as $i => $p): ?>
      <article class="program-card reveal">
        <div class="program-top">
          <div class="program-icon"><?= ['🤖','⚡','🧠','🛠️','💡','🚀'][$i % 6] ?></div>
          <span class="pill"><?= htmlspecialchars($p['period'] ?? 'تدريب') ?></span>
        </div>
        <h3><?= htmlspecialchars($p['name']) ?></h3>
        <p><?= htmlspecialchars($p['description'] ?? 'برنامج تدريبي عملي.') ?></p>
        <a href="programs.php#program-<?= (int)$p['id'] ?>">التفاصيل</a>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<section class="showcase">
  <div class="showcase-copy">
    <span class="eyebrow">MAKE • LEARN • SHARE</span>
    <h2>بيئة تساعدك تصنع أكثر مما تتعلم.</h2>
    <p>المنصة تجمع رحلة المستخدم كاملة: اكتشاف البرامج، التسجيل، المتابعة، الحضور، وإدارة التشغيل.</p>
    <a class="btn light large" href="register.php">ابدأ كطالب</a>
  </div>
  <div class="showcase-collage"><div>🖨️</div><div>💡</div><div>🤖</div><div>⚙️</div></div>
</section>
</main>

<footer class="public-footer"><div>© <?= date('Y') ?> Fablab Al-Ahsa</div><div><a href="contact.php">تواصل معنا</a><span> · </span><a href="login.php">تسجيل الدخول</a></div></footer>
<script src="assets/app.js"></script>
</body>
</html>
