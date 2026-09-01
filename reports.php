<?php
require_once __DIR__ . '/includes/layout.php';
requireAdmin();
renderHeader('التقارير','reports');
$students=(int)$conn->query("SELECT COUNT(*) n FROM students")->fetch_assoc()['n'];
$programs=(int)$conn->query("SELECT COUNT(*) n FROM programs")->fetch_assoc()['n'];
$activePrograms=(int)$conn->query("SELECT COUNT(*) n FROM programs WHERE status='active'")->fetch_assoc()['n'];
$volunteers=(int)$conn->query("SELECT COUNT(*) n FROM volunteers")->fetch_assoc()['n'];
$trainers=(int)$conn->query("SELECT COUNT(*) n FROM trainers")->fetch_assoc()['n'];
$employees=(int)$conn->query("SELECT COUNT(*) n FROM users WHERE role='employee'")->fetch_assoc()['n'];
?>
<div class="page-head"><div><span class="eyebrow">REPORTING</span><h2>التقارير والإحصائيات</h2><p>ملخص إداري شامل.</p></div><button class="secondary-btn" onclick="window.print()">طباعة</button></div>
<div class="kpi-grid"><div class="kpi"><span>الطلاب</span><strong><?=$students?></strong></div><div class="kpi"><span>إجمالي البرامج</span><strong><?=$programs?></strong></div><div class="kpi"><span>البرامج النشطة</span><strong><?=$activePrograms?></strong></div><div class="kpi"><span>الموظفون</span><strong><?=$employees?></strong></div><div class="kpi"><span>المتطوعون</span><strong><?=$volunteers?></strong></div><div class="kpi"><span>المدربون</span><strong><?=$trainers?></strong></div></div>
<div class="card"><h3>ملاحظة خصوصية</h3><p>الأعداد التشغيلية التفصيلية ومؤشرات السعة والمسجلين تظهر للمدير فقط.</p></div>
<?php renderFooter(); ?>
