<?php
require_once __DIR__ . '/includes/layout.php';
requireEmployee();
renderHeader('الحضور','attendance');
$date=$_GET['date']??date('Y-m-d');
$st=$conn->prepare("SELECT s.id,s.name,p.name program_name,COALESCE(a.status,'absent') status FROM students s LEFT JOIN programs p ON p.id=s.program_id LEFT JOIN attendance a ON a.student_id=s.id AND a.attendance_date=? ORDER BY s.name");
$st->bind_param('s',$date);$st->execute();$r=$st->get_result();
?>
<div class="page-head"><div><span class="eyebrow">ATTENDANCE</span><h2>الحضور</h2><p>تسجيل ومراجعة حضور الطلاب.</p></div><div class="inline"><input id="attendanceDate" type="date" value="<?=htmlspecialchars($date)?>"><button class="primary-btn" id="saveAttendance">حفظ الحضور</button></div></div>
<div class="card table-card"><div class="table-wrap"><table><thead><tr><th>الطالب</th><th>البرنامج</th><th>الحالة</th></tr></thead><tbody id="attendanceBody">
<?php while($x=$r->fetch_assoc()): ?><tr><td><b><?=htmlspecialchars($x['name'])?></b></td><td><?=htmlspecialchars($x['program_name']??'-')?></td><td><label class="switch"><input type="checkbox" data-id="<?=$x['id']?>" <?=$x['status']==='present'?'checked':''?>><span></span></label><span class="attendance-label"><?=$x['status']==='present'?'حاضر':'غائب'?></span></td></tr><?php endwhile; ?>
</tbody></table></div></div>
<script>
document.getElementById('attendanceDate')?.addEventListener('change',e=>location.href='attendance.php?date='+encodeURIComponent(e.target.value));
document.getElementById('saveAttendance')?.addEventListener('click',async()=>{
 const records=[...document.querySelectorAll('#attendanceBody input[data-id]')].map(x=>({student_id:+x.dataset.id,status:x.checked?'present':'absent'}));
 const r=await fetch('api/attendance.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:document.getElementById('attendanceDate').value,records})});
 const d=await r.json(); alert(d.success?'تم حفظ الحضور':'تعذر حفظ الحضور'); if(d.success)location.reload();
});
</script>
<?php renderFooter(); ?>
