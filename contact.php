<?php
require_once __DIR__ . '/includes/layout.php';
$sent=false; $error='';
if($_SERVER['REQUEST_METHOD']==='POST'){
    verifyCsrf($_POST['csrf']??'');
    $name=trim($_POST['name']??''); $email=trim($_POST['email']??''); $phone=trim($_POST['phone']??'');
    $subject=trim($_POST['subject']??''); $message=trim($_POST['message']??'');
    if(mb_strlen($name)<2 || !filter_var($email,FILTER_VALIDATE_EMAIL) || mb_strlen($message)<5) $error='تأكد من تعبئة البيانات بشكل صحيح.';
    else{
        $st=$conn->prepare("INSERT INTO contact_messages(name,email,phone,subject,message) VALUES(?,?,?,?,?)");
        $st->bind_param('sssss',$name,$email,$phone,$subject,$message);$sent=$st->execute();$st->close();
    }
}
renderHeader('تواصل معنا','contact'); showFlash();
?>
<div class="page-head"><div><span class="eyebrow">CONTACT</span><h2>تواصل معنا</h2><p>للاستفسارات والبرامج والشراكات.</p></div></div>
<?php if($error): ?><div class="flash error"><?=htmlspecialchars($error)?></div><?php endif; ?>
<?php if($sent): ?><div class="flash success">تم إرسال رسالتك بنجاح.</div><?php endif; ?>
<form class="card form-card" method="post">
<input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>">
<div class="form-row"><label>الاسم<input name="name" required></label><label>البريد الإلكتروني<input type="email" name="email" required></label></div>
<div class="form-row"><label>الجوال<input name="phone"></label><label>الموضوع<input name="subject"></label></div>
<label>الرسالة<textarea name="message" required></textarea></label>
<button class="primary-btn" type="submit">إرسال الرسالة</button>
</form>
<?php renderFooter(); ?>
