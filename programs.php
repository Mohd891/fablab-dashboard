<?php
require_once __DIR__ . '/includes/layout.php';
$u=currentUser();
if($u && in_array($u['role'],['admin','employee'],true)){
  requireLogin();
}
renderHeader('البرامج','programs');

$programs=[];
$r=$conn->query("SELECT p.*, (SELECT COUNT(*) FROM students s WHERE s.program_id=p.id) student_count FROM programs p ORDER BY p.status='active' DESC,p.id DESC");
while($r && $x=$r->fetch_assoc())$programs[]=$x;
?>
<div class="page-head"><div><span class="eyebrow"><?=($u&&$u['role']==='admin')?'PROGRAM MANAGEMENT':'PROGRAMS'?></span><h2>البرامج</h2><p><?=($u&&$u['role']==='admin')?'إدارة البرامج والسعات والتفاصيل التشغيلية.':'تصفح البرامج التدريبية المتاحة.'?></p></div><?php if($u&&$u['role']==='admin'): ?><button class="primary-btn" id="addProgramBtn">+ إضافة برنامج</button><?php endif; ?></div>

<div class="program-grid page-program-grid">
<?php foreach($programs as $i=>$p): ?>
<article class="program-card" id="program-<?=intval($p['id'])?>">
<div class="program-top"><div class="program-icon"><?=['🤖','⚡','🧠','🛠️','💡','🚀'][$i%6]?></div><span class="pill"><?=htmlspecialchars($p['period']??'برنامج')?></span></div>
<h3><?=htmlspecialchars($p['name'])?></h3>
<p><?=htmlspecialchars($p['description']??'برنامج تدريبي عملي.')?></p>
<?php if($u&&$u['role']==='admin'): ?><div class="private-stats"><span><?=$p['student_count']?> مسجل</span><span>السعة <?=$p['capacity']?></span></div><button class="small-danger" onclick="deleteProgram(<?=intval($p['id'])?>)">حذف</button><?php endif; ?>
<?php if(!$u): ?><a class="btn primary" href="register.php">تسجيل كطالب</a><?php elseif($u['role']==='student'): ?><a class="btn secondary" href="student-portal.php">بوابتي</a><?php endif; ?>
</article>
<?php endforeach; ?>
</div>

<?php if($u&&$u['role']==='admin'): ?>
<div class="modal" id="programModal"><div class="modal-box"><button class="modal-close" id="programModalClose">×</button><h2>إضافة برنامج</h2><form id="programForm"><label>اسم البرنامج<input name="name" required></label><label>الفترة<input name="period" placeholder="صباحي / مسائي"></label><label>السعة<input type="number" name="capacity" min="0" value="20"></label><label>الوصف<textarea name="description"></textarea></label><label>الحالة<select name="status"><option value="active">نشط</option><option value="upcoming">قادم</option><option value="completed">مكتمل</option></select></label><button class="primary-btn full">حفظ البرنامج</button></form></div></div>
<script>
const pm=document.getElementById('programModal');
document.getElementById('addProgramBtn')?.addEventListener('click',()=>pm.classList.add('open'));
document.getElementById('programModalClose')?.addEventListener('click',()=>pm.classList.remove('open'));
document.getElementById('programForm')?.addEventListener('submit',async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch('admin-programs-actions.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const d=await r.json();if(d.success)location.reload();else alert('تعذر إضافة البرنامج')});
async function deleteProgram(id){if(!confirm('حذف البرنامج؟'))return;const r=await fetch('admin-programs-actions.php?id='+id,{method:'DELETE'});const d=await r.json();if(d.success)location.reload()}
</script>
<?php endif; ?>
<?php renderFooter(); ?>
