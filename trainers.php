<?php
require_once __DIR__ . '/includes/layout.php';
requireAdmin();
renderHeader('المدربين','trainers');
if($_SERVER['REQUEST_METHOD']==='POST'){
  verifyCsrf($_POST['csrf']??'');
  $name=trim($_POST['name']??'');$phone=trim($_POST['phone']??'');$specialty=trim($_POST['specialty']??'');$program=(int)($_POST['program_id']??0);
  $st=$conn->prepare("INSERT INTO trainers(name,phone,specialty,program_id) VALUES(?,?,?,NULLIF(?,0))");$st->bind_param('sssi',$name,$phone,$specialty,$program);$st->execute();$st->close();flash('تمت إضافة المدرب.');header('Location: trainers.php');exit;
}
$programs=[];$r=$conn->query("SELECT id,name FROM programs ORDER BY name");while($r&&$x=$r->fetch_assoc())$programs[]=$x;
$r=$conn->query("SELECT t.*,p.name program_name FROM trainers t LEFT JOIN programs p ON p.id=t.program_id ORDER BY t.id DESC");
?>
<div class="page-head"><div><span class="eyebrow">TRAINERS</span><h2>المدربين</h2><p>إدارة بيانات المدربين والتخصصات.</p></div></div>
<div class="card"><form method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>"><div class="form-row"><label>الاسم<input name="name" required></label><label>الجوال<input name="phone"></label><label>التخصص<input name="specialty"></label><label>البرنامج<select name="program_id"><option value="0">غير محدد</option><?php foreach($programs as $p): ?><option value="<?=$p['id']?>"><?=htmlspecialchars($p['name'])?></option><?php endforeach; ?></select></label></div><button class="primary-btn">إضافة مدرب</button></form></div>
<div class="card table-card"><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>الجوال</th><th>التخصص</th><th>البرنامج</th></tr></thead><tbody><?php while($x=$r->fetch_assoc()): ?><tr><td><?=htmlspecialchars($x['name'])?></td><td><?=htmlspecialchars($x['phone']??'-')?></td><td><?=htmlspecialchars($x['specialty']??'-')?></td><td><?=htmlspecialchars($x['program_name']??'-')?></td></tr><?php endwhile; ?></tbody></table></div></div>
<?php renderFooter(); ?>
