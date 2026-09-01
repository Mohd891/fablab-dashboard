<?php
require_once __DIR__ . '/includes/layout.php';
if(isLoggedIn()){header('Location: portal.php');exit;}
$error='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  verifyCsrf($_POST['csrf']??'');
  $email=strtolower(trim($_POST['email']??''));$password=$_POST['password']??'';
  $st=$conn->prepare("SELECT id,name,email,password_hash,role,status FROM users WHERE email=? LIMIT 1");
  $st->bind_param('s',$email);$st->execute();$u=$st->get_result()->fetch_assoc();$st->close();
  if($u && $u['status']==='active' && password_verify($password,$u['password_hash'])){
    loginUser($u); header('Location: portal.php');exit;
  }
  $error='البريد الإلكتروني أو كلمة المرور غير صحيحة.';
}
?>
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>تسجيل الدخول | Fablab</title><link rel="stylesheet" href="assets/style.css"></head>
<body class="auth-body"><header class="public-nav auth-nav"><a class="brand" href="index.php"><img src="assets/fablab-logo-wide.png" alt="Fablab Al-Ahsa"></a><nav><a href="index.php">الرئيسية</a><a href="programs.php">البرامج</a><a href="about.php">عن فاب لاب</a><a href="contact.php">تواصل معنا</a></nav><div class="nav-actions"><a class="btn secondary" href="index.php">العودة للموقع</a></div></header><div class="auth-back"><a href="index.php">← العودة للموقع</a></div><div class="auth-card"><a class="auth-logo" href="index.php"><img src="assets/fablab-logo.png" alt="Fablab"><div><b>Fablab Al-Ahsa</b><small>Management System</small></div></a><h1>تسجيل الدخول</h1><p class="muted">ادخل إلى البوابة الخاصة بحسابك.</p><?php if($error): ?><div class="flash error"><?=htmlspecialchars($error)?></div><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?=htmlspecialchars(csrfToken())?>"><label>البريد الإلكتروني<input type="email" name="email" required autocomplete="email"></label><label>كلمة المرور<input type="password" name="password" required autocomplete="current-password"></label><button class="primary-btn full">دخول</button></form><div class="auth-links"><a href="register.php">إنشاء حساب طالب</a><a href="index.php">العودة للموقع</a></div></div></body></html>
