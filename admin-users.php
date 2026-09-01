<?php
require_once __DIR__ . '/includes/layout.php';
requireAdmin();
renderHeader('المستخدمون','employees');
if($_SERVER['REQUEST_METHOD']==='POST'){
  verifyCsrf($_POST['csrf']??'');
  $name=trim($_POST['name']??'');
  $email=strtolower(trim($_POST['email']??''));
  $password=$_POST['password']??'';
  $role=$_POST['role']??'employee';
  $phone=trim($_POST['phone']??'');
  $program_id=(int)($_POST['program_id']??0);

  if(!in_array($role,['employee','student'],true))$role='employee';

  if(mb_strlen($name)<3||!filter_var($email,FILTER_VALIDATE_EMAIL)||strlen($password)<8){
    flash('تحقق من الاسم والبريد وكلمة المرور.','error');
    header('Location: admin-users.php');
    exit;
  }

  if($role==='student' && $program_id<=0){
    flash('اختر برنامجًا لحساب الطالب.','error');
    header('Location: admin-users.php');
    exit;
  }

  $chk=$conn->prepare("SELECT id FROM users WHERE email=? LIMIT 1");
  $chk->bind_param('s',$email);
  $chk->execute();
  $ex=$chk->get_result()->fetch_assoc();
  $chk->close();

  if($ex){
    flash('البريد مستخدم بالفعل.','error');
    header('Location: admin-users.php');
    exit;
  }

  $conn->begin_transaction();

  try{
    $hash=password_hash($password,PASSWORD_DEFAULT);
    $status='active';

    $st=$conn->prepare("INSERT INTO users(name,email,password_hash,role,status) VALUES(?,?,?,?,?)");
    $st->bind_param('sssss',$name,$email,$hash,$role,$status);
    $st->execute();
    $uid=$st->insert_id;
    $st->close();

    if($role==='student'){
      $date=date('Y-m-d');
      $st=$conn->prepare("INSERT INTO students(user_id,name,phone,program_id,registration_date,created_at) VALUES(?,?,?,?,?,CURRENT_TIMESTAMP)");
      $st->bind_param('issis',$uid,$name,$phone,$program_id,$date);
      $st->execute();
      $st->close();
    }

    $conn->commit();
    flash('تم إنشاء الحساب بنجاح.');
    header('Location: admin-users.php');
    exit;

  }catch(Throwable $e){
    $conn->rollback();
    flash('تعذر إنشاء الحساب.','error');
    header('Location: admin-users.php');
    exit;
  }
}
$r=$conn->query("SELECT id,name,email,role,status,created_at FROM users WHERE role<>'admin' ORDER BY id DESC");
?>
<div class="page-head"><div><span class="eyebrow">USER MANAGEMENT</span><h2>حسابات المستخدمين</h2><p>إنشاء حساب موظف أو حساب طالب من الإدارة.</p></div></div>
<div class="card form-card">
<h3>إنشاء حساب</h3>
<p class="muted">من هنا ينشئ المدير حساب موظف أو طالب. الحساب الطالب يُربط بملفه وبرنامجه مباشرة.</p>
<form method="post">
<input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>">
<div class="form-grid">
<label>الاسم<input name="name" required></label>
<label>البريد<input type="email" name="email" required></label>
<label>الجوال<input name="phone"></label>
<label>نوع الحساب<select name="role" id="accountRole"><option value="employee">موظف</option><option value="student">طالب</option></select></label>
<label id="programField" style="display:none">البرنامج<select name="program_id"><option value="0">اختر البرنامج</option><?php $pr=$conn->query("SELECT id,name FROM programs WHERE status='active' ORDER BY name"); while($pp=$pr->fetch_assoc()): ?><option value="<?=intval($pp['id'])?>"><?=htmlspecialchars($pp['name'])?></option><?php endwhile; ?></select></label>
<label>كلمة المرور<input name="password" minlength="8" required></label>
</div>
<button class="primary-btn">إنشاء الحساب</button>
</form>
</div>
<script>
const accountRole=document.getElementById('accountRole');
const programField=document.getElementById('programField');
function toggleProgramField(){if(programField)programField.style.display=accountRole.value==='student'?'block':'none';}
accountRole?.addEventListener('change',toggleProgramField);
toggleProgramField();
</script>
<div class="card table-card"><div class="table-wrap"><table><thead><tr><th>الاسم</th><th>البريد</th><th>النوع</th><th>الحالة</th><th>التاريخ</th></tr></thead><tbody><?php while($x=$r->fetch_assoc()): ?><tr><td><?=htmlspecialchars($x['name'])?></td><td><?=htmlspecialchars($x['email'])?></td><td><?=htmlspecialchars($x['role']==='employee'?'موظف':'طالب')?></td><td><?=htmlspecialchars($x['status'])?></td><td><?=htmlspecialchars($x['created_at'])?></td></tr><?php endwhile; ?></tbody></table></div></div>
<?php renderFooter(); ?>
