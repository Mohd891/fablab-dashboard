<?php
require_once __DIR__ . '/includes/layout.php';
requireLogin();
if((currentUser()['role']??'')!=='student'){header('Location: portal.php');exit;}
renderHeader('حسابي','portal');showFlash();
$u=currentUser();
$st=$conn->prepare("SELECT s.*,p.name program_name,p.capacity,(SELECT COUNT(*) FROM attendance a WHERE a.student_id=s.id AND a.status='present') present_days,(SELECT COUNT(*) FROM attendance a WHERE a.student_id=s.id) total_days FROM students s LEFT JOIN programs p ON p.id=s.program_id WHERE s.user_id=? LIMIT 1");
$st->bind_param('i',$u['id']);$st->execute();$student=$st->get_result()->fetch_assoc();$st->close();
$rate=((int)($student['total_days']??0)>0)?round(((int)$student['present_days']/(int)$student['total_days'])*100):0;
?>
<section class="hero-card"><div><span class="pill">حساب طالب</span><h2>مرحبًا <?=htmlspecialchars($u['name'])?> 👋</h2><p>من هنا تتابع بياناتك وبرنامجك وحضورك.</p></div><a class="primary-btn" href="programs.php">استعراض البرامج</a></section>
<section class="kpi-grid"><div class="kpi"><span>برنامجي</span><strong class="small-value"><?=htmlspecialchars($student['program_name']??'غير محدد')?></strong></div><div class="kpi"><span>نسبة حضوري</span><strong><?=$rate?>%</strong></div><div class="kpi"><span>أيام الحضور</span><strong><?=intval($student['present_days']??0)?></strong></div><div class="kpi"><span>الحساب</span><strong>طالب</strong></div></section>
<section class="grid-2"><div class="card"><h3>بياناتي</h3><div class="detail-list"><div><span>الاسم</span><b><?=htmlspecialchars($student['name']??$u['name'])?></b></div><div><span>البريد</span><b><?=htmlspecialchars($u['email'])?></b></div><div><span>الجوال</span><b><?=htmlspecialchars($student['phone']??'-')?></b></div><div><span>العمر</span><b><?=htmlspecialchars((string)($student['age']??'-'))?></b></div><div><span>الجنس</span><b><?=htmlspecialchars($student['gender']??'-')?></b></div><div><span>تاريخ التسجيل</span><b><?=htmlspecialchars($student['registration_date']??'-')?></b></div></div></div>
<div class="card"><h3>برنامجي</h3><div class="program-feature"><div class="feature-icon">🤖</div><div><h4><?=htmlspecialchars($student['program_name']??'غير محدد')?></h4><p>برنامجك الحالي في فاب لاب.</p></div></div><div class="mini-stats"><div><b><?=$rate?>%</b><small>نسبة الحضور</small></div><div><b><?=intval($student['present_days']??0)?></b><small>أيام الحضور</small></div></div></div></section>
<?php renderFooter(); ?>
