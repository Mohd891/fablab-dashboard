<?php
require_once __DIR__ . '/includes/layout.php';
requireAdmin();
renderHeader('الرئيسية','dashboard');showFlash();

$students=(int)$conn->query("SELECT COUNT(*) n FROM students")->fetch_assoc()['n'];
$programs=(int)$conn->query("SELECT COUNT(*) n FROM programs WHERE status='active'")->fetch_assoc()['n'];
$employees=(int)$conn->query("SELECT COUNT(*) n FROM users WHERE role='employee'")->fetch_assoc()['n'];
$volunteers=(int)$conn->query("SELECT COUNT(*) n FROM volunteers")->fetch_assoc()['n'];
$today=date('Y-m-d');
$present=(int)$conn->query("SELECT COUNT(*) n FROM attendance WHERE attendance_date='$today' AND status='present'")->fetch_assoc()['n'];
$totalMarked=(int)$conn->query("SELECT COUNT(*) n FROM attendance WHERE attendance_date='$today'")->fetch_assoc()['n'];
$rate=$totalMarked?round($present/$totalMarked*100):0;
?>
<div class="page-head"><div><span class="eyebrow">ADMIN CONTROL CENTER</span><h2>نظرة شاملة على النظام</h2><p>البيانات التشغيلية الحساسة تظهر هنا فقط.</p></div></div>
<div class="kpi-grid"><div class="kpi"><span>إجمالي الطلاب</span><strong><?=$students?></strong></div><div class="kpi"><span>البرامج النشطة</span><strong><?=$programs?></strong></div><div class="kpi"><span>الموظفون</span><strong><?=$employees?></strong></div><div class="kpi"><span>المتطوعون</span><strong><?=$volunteers?></strong></div></div>
<section class="grid-2"><div class="card"><h3>حضور اليوم</h3><div class="big-number"><?=$rate?>%</div><p class="muted"><?=$present?> حاضر من <?=$totalMarked?> سجل حضور.</p></div><div class="card"><h3>إجراءات سريعة</h3><div class="quick-grid"><a class="quick" href="students.php"><b>إدارة الطلاب</b><span>بحث ومراجعة</span></a><a class="quick" href="attendance.php"><b>الحضور</b><span>تسجيل اليوم</span></a><a class="quick" href="employee-dashboard.php"><b>الموظفون</b><span>الحسابات والصلاحيات</span></a><a class="quick" href="reports.php"><b>التقارير</b><span>ملخص تشغيلي</span></a></div></div></section>
<?php renderFooter(); ?>
