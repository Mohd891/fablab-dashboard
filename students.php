<?php
require_once __DIR__ . '/includes/layout.php';
requireEmployee();
renderHeader('الطلاب','students');showFlash();
$q=trim($_GET['q']??'');
if($q!==''){
  $like="%$q%";$st=$conn->prepare("SELECT s.*,p.name program_name FROM students s LEFT JOIN programs p ON p.id=s.program_id WHERE s.name LIKE ? OR s.phone LIKE ? ORDER BY s.id DESC");$st->bind_param('ss',$like,$like);$st->execute();$r=$st->get_result();
}else $r=$conn->query("SELECT s.*,p.name program_name FROM students s LEFT JOIN programs p ON p.id=s.program_id ORDER BY s.id DESC");
?>
<div class="page-head"><div><span class="eyebrow">STUDENTS</span><h2>الطلاب</h2><p>بيانات الطلاب المسجلة عبر المنصة.</p></div><span class="role-tag"><?=currentUser()['role']==='admin'?'وضع الإدارة':'وضع الموظف'?></span></div>
<div class="card"><form class="toolbar"><input name="q" value="<?=htmlspecialchars($q)?>" placeholder="ابحث بالاسم أو الجوال..."><button class="secondary-btn">بحث</button></form></div>
<div class="card table-card"><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>الجوال</th><th>البرنامج</th><th>العمر</th><th>الجنس</th><th>تاريخ التسجيل</th></tr></thead><tbody>
<?php while($x=$r->fetch_assoc()): ?><tr><td><b><?=htmlspecialchars($x['name'])?></b></td><td><?=htmlspecialchars($x['phone']??'-')?></td><td><?=htmlspecialchars($x['program_name']??'-')?></td><td><?=intval($x['age']??0)?></td><td><?=htmlspecialchars($x['gender']??'-')?></td><td><?=htmlspecialchars($x['registration_date']??'-')?></td></tr><?php endwhile; ?>
</tbody></table></div></div>
<?php renderFooter(); ?>
