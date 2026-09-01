<?php
require_once __DIR__ . '/includes/layout.php';
if(isLoggedIn()){header('Location: portal.php');exit;}
$error='';$programs=[];
$r=$conn->query("SELECT id,name,period,capacity,(SELECT COUNT(*) FROM students s WHERE s.program_id=programs.id) student_count FROM programs WHERE status='active' ORDER BY name");
while($r && $x=$r->fetch_assoc())$programs[]=$x;

if($_SERVER['REQUEST_METHOD']==='POST'){
  verifyCsrf($_POST['csrf']??'');
  $name=trim($_POST['name']??'');$email=strtolower(trim($_POST['email']??''));$phone=trim($_POST['phone']??'');$password=$_POST['password']??'';$confirm=$_POST['confirm_password']??'';$program_id=(int)($_POST['program_id']??0);$age=(int)($_POST['age']??0);$gender=trim($_POST['gender']??'');
  if(mb_strlen($name)<3)$error='اكتب الاسم كاملًا.';
  elseif(!filter_var($email,FILTER_VALIDATE_EMAIL))$error='البريد الإلكتروني غير صحيح.';
  elseif(strlen($password)<8)$error='كلمة المرور يجب أن تكون 8 أحرف على الأقل.';
  elseif($password!==$confirm)$error='تأكيد كلمة المرور غير مطابق.';
  elseif($program_id<=0)$error='اختر برنامجًا.';
  else{
    $st=$conn->prepare("SELECT id FROM users WHERE email=? LIMIT 1");$st->bind_param('s',$email);$st->execute();$exists=$st->get_result()->fetch_assoc();$st->close();
    if($exists)$error='هذا البريد مستخدم بالفعل.';
    else{
      $p=$conn->prepare("SELECT id,name,capacity,(SELECT COUNT(*) FROM students s WHERE s.program_id=programs.id) student_count FROM programs WHERE id=? AND status='active' LIMIT 1");$p->bind_param('i',$program_id);$p->execute();$prog=$p->get_result()->fetch_assoc();$p->close();
      if(!$prog)$error='البرنامج غير متاح.';
      elseif((int)$prog['capacity']>0&&(int)$prog['student_count']>=(int)$prog['capacity'])$error='عذرًا، البرنامج مكتمل.';
      else{
        $conn->begin_transaction();
        try{
          $hash=password_hash($password,PASSWORD_DEFAULT);$role='student';$status='active';
          $u=$conn->prepare("INSERT INTO users(name,email,password_hash,role,status) VALUES(?,?,?,?,?)");$u->bind_param('sssss',$name,$email,$hash,$role,$status);$u->execute();$uid=$u->insert_id;$u->close();
          $date=date('Y-m-d');$s=$conn->prepare("INSERT INTO students(user_id,name,phone,gender,age,program_id,registration_date,created_at) VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)");$s->bind_param('isssiis',$uid,$name,$phone,$gender,$age,$program_id,$date);$s->execute();$s->close();
          $conn->commit();loginUser(['id'=>$uid,'name'=>$name,'email'=>$email,'role'=>'student','status'=>'active']);header('Location: student-portal.php?welcome=1');exit;
        }catch(Throwable $e){$conn->rollback();$error='تعذر إنشاء الحساب. تأكد من بيانات قاعدة البيانات وحاول مرة أخرى.';}
      }
    }
  }
}
?>
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>إنشاء حساب طالب | Fablab</title><link rel="stylesheet" href="assets/style.css"></head>
<body class="auth-body"><header class="public-nav auth-nav"><a class="brand" href="index.php"><img src="assets/fablab-logo-wide.png" alt="Fablab Al-Ahsa"></a><nav><a href="index.php">الرئيسية</a><a href="programs.php">البرامج</a><a href="about.php">عن فاب لاب</a><a href="contact.php">تواصل معنا</a></nav><div class="nav-actions"><a class="btn secondary" href="index.php">العودة للموقع</a></div></header><div class="auth-back"><a href="index.php">← العودة للموقع</a></div><div class="auth-card wide"><a class="auth-logo" href="index.php"><img src="assets/fablab-logo.png" alt="Fablab"><div><b>Fablab Al-Ahsa</b><small>إنشاء حساب طالب</small></div></a><h1>ابدأ رحلتك في فاب لاب</h1><p class="muted">أنشئ حسابك واختر البرنامج الذي ترغب بالمشاركة فيه.</p><?php if($error): ?><div class="flash error"><?=htmlspecialchars($error)?></div><?php endif; ?>
<form method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>">
<div class="form-grid"><label>الاسم الكامل<input name="name" required value="<?=htmlspecialchars($_POST['name']??'')?>"></label><label>البريد الإلكتروني<input type="email" name="email" required value="<?=htmlspecialchars($_POST['email']??'')?>"></label><label>رقم الجوال<input name="phone" required value="<?=htmlspecialchars($_POST['phone']??'')?>"></label><label>العمر<input type="number" name="age" min="7" max="80" required value="<?=htmlspecialchars($_POST['age']??'')?>"></label><label>الجنس<select name="gender" required><option value="">اختر</option><option>ذكر</option><option>أنثى</option></select></label><label>البرنامج<select name="program_id" required><option value="">اختر البرنامج</option><?php foreach($programs as $p): ?><option value="<?=$p['id']?>"><?=htmlspecialchars($p['name'])?></option><?php endforeach; ?></select></label><label>كلمة المرور<input type="password" name="password" minlength="8" required></label><label>تأكيد كلمة المرور<input type="password" name="confirm_password" minlength="8" required></label></div>
<button class="primary-btn full">إنشاء الحساب والتسجيل</button></form><div class="auth-links"><a href="login.php">لديك حساب؟ تسجيل الدخول</a><a href="index.php">العودة للموقع</a></div></div></body></html>
