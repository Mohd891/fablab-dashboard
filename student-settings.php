<?php
require_once __DIR__ . '/includes/layout.php';
requireLogin();
if((currentUser()['role']??'')!=='student'){header('Location: portal.php');exit;}
$u=currentUser();$error='';$success='';
$st=$conn->prepare("SELECT s.name,s.phone,s.age,s.gender,s.registration_date,p.name AS program_name FROM students s LEFT JOIN programs p ON p.id=s.program_id WHERE s.user_id=? LIMIT 1");$st->bind_param('i',$u['id']);$st->execute();$student=$st->get_result()->fetch_assoc();$st->close();

if($_SERVER['REQUEST_METHOD']==='POST'){
    verifyCsrf($_POST['csrf']??'');
    $name=trim($_POST['name']??'');$phone=trim($_POST['phone']??'');$email=strtolower(trim($_POST['email']??''));$newPassword=$_POST['new_password']??'';$confirm=$_POST['confirm_password']??'';
    if(mb_strlen($name)<3)$error='الاسم غير صحيح.';
    elseif(!filter_var($email,FILTER_VALIDATE_EMAIL))$error='البريد الإلكتروني غير صحيح.';
    elseif($newPassword!=='' && strlen($newPassword)<8)$error='كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل.';
    elseif($newPassword!==$confirm)$error='تأكيد كلمة المرور غير مطابق.';
    else{
        $chk=$conn->prepare("SELECT id FROM users WHERE email=? AND id<>? LIMIT 1");$chk->bind_param('si',$email,$u['id']);$chk->execute();$exists=$chk->get_result()->fetch_assoc();$chk->close();
        if($exists)$error='البريد مستخدم من حساب آخر.';
        else{
            $conn->begin_transaction();
            try{
                if($newPassword!==''){
                    $hash=password_hash($newPassword,PASSWORD_DEFAULT);
                    $q=$conn->prepare("UPDATE users SET name=?,email=?,password_hash=? WHERE id=?");$q->bind_param('sssi',$name,$email,$hash,$u['id']);
                }else{
                    $q=$conn->prepare("UPDATE users SET name=?,email=? WHERE id=?");$q->bind_param('ssi',$name,$email,$u['id']);
                }
                $q->execute();$q->close();
                $q=$conn->prepare("UPDATE students SET name=?,phone=? WHERE user_id=?");$q->bind_param('ssi',$name,$phone,$u['id']);$q->execute();$q->close();
                $conn->commit();$_SESSION['user']['name']=$name;$_SESSION['user']['email']=$email;$u=currentUser();$success='تم تحديث الحساب بنجاح.';$student['name']=$name;$student['phone']=$phone;
            }catch(Throwable $e){$conn->rollback();$error='تعذر حفظ التعديلات.';}
        }
    }
}
renderHeader('الإعدادات','settings');showFlash();
?>
<div class="page-head"><div><span class="eyebrow">ACCOUNT</span><h2>إعدادات الحساب</h2><p>غيّر بياناتك أو البريد الإلكتروني أو كلمة المرور.</p></div></div>
<?php if($error): ?><div class="flash error"><?=htmlspecialchars($error)?></div><?php endif; ?><?php if($success): ?><div class="flash success"><?=htmlspecialchars($success)?></div><?php endif; ?>
<form class="card form-card" method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>">
<div class="form-grid"><label>الاسم<input name="name" value="<?=htmlspecialchars($student['name']??$u['name'])?>" required></label><label>الجوال<input name="phone" value="<?=htmlspecialchars($student['phone']??'')?>"></label><label>البريد الإلكتروني<input name="email" type="email" value="<?=htmlspecialchars($u['email'])?>" required></label><label>كلمة المرور الجديدة<input name="new_password" type="password" minlength="8"></label><label>تأكيد كلمة المرور<input name="confirm_password" type="password" minlength="8"></label></div>
<button class="primary-btn">حفظ التغييرات</button></form>
<?php renderFooter(); ?>
