<?php
require_once __DIR__ . '/includes/layout.php';
requireEmployee();
renderHeader('لوحة الموظف','dashboard');
$students=(int)$conn->query("SELECT COUNT(*) n FROM students")->fetch_assoc()['n'];
$programs=(int)$conn->query("SELECT COUNT(*) n FROM programs WHERE status='active'")->fetch_assoc()['n'];
$today=date('Y-m-d');$present=(int)$conn->query("SELECT COUNT(*) n FROM attendance WHERE attendance_date='$today' AND status='present'")->fetch_assoc()['n'];
?>
<div class="page-head"><div><span class="eyebrow">EMPLOYEE WORKSPACE</span><h2>مرحبًا <?=htmlspecialchars(currentUser()['name'])?></h2><p>أدوات التشغيل اليومية للطلاب والحضور والبرامج.</p></div><span class="role-tag">موظف</span></div>
<div class="kpi-grid"><div class="kpi"><span>الطلاب</span><strong><?=$students?></strong></div><div class="kpi"><span>البرامج</span><strong><?=$programs?></strong></div><div class="kpi"><span>حاضر اليوم</span><strong><?=$present?></strong></div></div>
<div class="quick-grid"><a class="quick" href="students.php"><b>الطلاب</b><span>البحث والمراجعة</span></a><a class="quick" href="attendance.php"><b>الحضور</b><span>تسجيل الحضور</span></a><a class="quick" href="programs.php"><b>البرامج</b><span>مراجعة البرامج</span></a></div>
<?php renderFooter(); ?>
