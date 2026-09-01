<?php
require_once __DIR__ . '/includes/layout.php';
requireEmployee();
$u=currentUser();$error='';$success='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  verifyCsrf($_POST['csrf']??'');
  $name=trim($_POST['name']??'');$email=strtolower(trim($_POST['email']??''));$newPassword=$_POST['new_password']??'';$confirm=$_POST['confirm_password']??'';
  if(mb_strlen($name)<3)$error='الاسم غير صحيح.';
  elseif(!filter_var($email,FILTER_VALIDATE_EMAIL))$error='البريد غير صحيح.';
  elseif($newPassword!==''&&strlen($newPassword)<8)$error='كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل.';
  elseif($newPassword!==$confirm)$error='تأكيد كلمة المرور غير مطابق.';
  else{
    $q=$conn->prepare("SELECT id FROM users WHERE email=? AND id<>? LIMIT 1");$q->bind_param('si',$email,$u['id']);$q->execute();$exists=$q->get_result()->fetch_assoc();$q->close();
    if($exists)$error='البريد مستخدم بالفعل.';
    else{
      if($newPassword!==''){$hash=password_hash($newPassword,PASSWORD_DEFAULT);$q=$conn->prepare("UPDATE users SET name=?,email=?,password_hash=? WHERE id=?");$q->bind_param('sssi',$name,$email,$hash,$u['id']);}
      else{$q=$conn->prepare("UPDATE users SET name=?,email=? WHERE id=?");$q->bind_param('ssi',$name,$email,$u['id']);}
      $q->execute();$q->close();$_SESSION['user']['name']=$name;$_SESSION['user']['email']=$email;$success='تم تحديث الحساب.';$u=currentUser();
    }
  }
}
renderHeader('الإعدادات','settings');
?>
<div class="page-head"><div><span class="eyebrow">ACCOUNT</span><h2>إعدادات الموظف</h2><p>يمكنك تغيير الاسم والبريد وكلمة المرور.</p></div></div>
<?php if($error): ?><div class="flash error"><?=htmlspecialchars($error)?></div><?php endif; ?><?php if($success): ?><div class="flash success"><?=htmlspecialchars($success)?></div><?php endif; ?>
<form class="card form-card" method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>"><div class="form-grid"><label>الاسم<input name="name" value="<?=htmlspecialchars($u['name'])?>" required></label><label>البريد<input type="email" name="email" value="<?=htmlspecialchars($u['email'])?>" required></label><label>كلمة المرور الجديدة<input type="password" name="new_password" minlength="8"></label><label>تأكيد كلمة المرور<input type="password" name="confirm_password" minlength="8"></label></div><button class="primary-btn">حفظ التغييرات</button></form>
<?php renderFooter(); ?>
