<?php
require_once __DIR__ . '/auth.php';

function renderHeader(string $title, string $page=''): void {
    $u = currentUser();

    echo '<!doctype html><html lang="ar" dir="rtl"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>'.htmlspecialchars($title).' | Fablab Al-Ahsa</title>
    <link rel="icon" href="assets/fablab-logo.png">
    <link rel="stylesheet" href="assets/style.css">
    </head><body>';

    /* Public pages: the same website header appears on every public page. */
    if (!$u) {
        $publicItems = [
            ['index.php','home','الرئيسية'],
            ['programs.php','programs','البرامج'],
            ['about.php','about','عن فاب لاب'],
            ['contact.php','contact','تواصل معنا']
        ];

        echo '<header class="public-nav">';
        echo '<a class="brand" href="index.php"><img src="assets/fablab-logo-wide.png" alt="Fablab Al-Ahsa"></a>';
        echo '<nav>';
        foreach ($publicItems as $item) {
            $active = $page === $item[1] ? ' class="active"' : '';
            echo '<a href="'.$item[0].'"'.$active.'>'.$item[2].'</a>';
        }
        echo '</nav>';
        echo '<div class="nav-actions"><a class="btn secondary" href="login.php">تسجيل الدخول</a><a class="btn primary" href="register.php">إنشاء حساب طالب</a></div>';
        echo '</header>';

        echo '<main class="main public-main">';
        echo '<div class="public-back"><a class="back-link" href="index.php">← العودة للرئيسية</a></div>';
        return;
    }

    /* Authenticated application shell. */
    echo '<div class="app">';

    echo '<aside class="sidebar">';
    echo '<a class="brand" href="portal.php">
        <img src="assets/fablab-logo.png" alt="Fablab">
        <div><b>Fablab</b><small>Al-Ahsa</small></div>
    </a>';

    echo '<nav class="nav">';

    if ($u['role'] === 'admin') {
        $items = [
            ['admin-dashboard.php','dashboard','الرئيسية','⌂'],
            ['students.php','students','الطلاب','♙'],
            ['programs.php','programs','البرامج','▣'],
            ['attendance.php','attendance','الحضور','✓'],
            ['volunteers.php','volunteers','المتطوعين','♧'],
            ['trainers.php','trainers','المدربين','♙'],
            ['reports.php','reports','التقارير','▤'],
            ['admin-users.php','employees','الموظفون','◉']
        ];
        $settings='settings.php';
        $roleLabel='مدير النظام';
    } elseif ($u['role'] === 'employee') {
        $items = [
            ['employee-dashboard.php','dashboard','الرئيسية','⌂'],
            ['students.php','students','الطلاب','♙'],
            ['attendance.php','attendance','الحضور','✓'],
            ['programs.php','programs','البرامج','▣']
        ];
        $settings='employee-settings.php';
        $roleLabel='موظف';
    } else {
        $items = [
            ['student-portal.php','portal','حسابي','♙'],
            ['programs.php','programs','البرامج','▣']
        ];
        $settings='student-settings.php';
        $roleLabel='طالب';
    }

    foreach ($items as $it) {
        $active=$page===$it[1]?' active':'';
        echo '<a class="nav-item'.$active.'" href="'.$it[0].'"><span>'.$it[3].'</span><span>'.$it[2].'</span></a>';
    }

    echo '<a class="nav-item'.($page==='settings'?' active':''). '" href="'.$settings.'"><span>⚙</span><span>الإعدادات</span></a>';
    echo '</nav>';
    echo '<div class="sidebar-bottom"><a class="nav-item logout" href="logout.php"><span>↩</span><span>تسجيل الخروج</span></a></div>';
    echo '</aside>';

    echo '<main class="main">';
    echo '<header class="topbar">';
    echo '<div class="topbar-title">';
    echo '<div><div class="eyebrow">Fablab Management System</div><h1>'.htmlspecialchars($title).'</h1></div>';
    if ($page !== 'dashboard' && $page !== 'portal') {
        echo '<button type="button" class="icon-btn back-btn" onclick="history.back()" title="العودة">←</button>';
    }
    echo '</div>';
    echo '<div class="top-actions">';

    $initial=mb_substr($u['name'],0,1);
    echo '<div class="user-chip"><div class="avatar">'.htmlspecialchars($initial).'</div><div><b>'.htmlspecialchars($u['name']).'</b><small>'.htmlspecialchars($roleLabel).'</small></div></div>';
    echo '<a class="icon-btn" href="logout.php" title="تسجيل الخروج">↩</a>';

    echo '</div></header>';
}

function renderFooter(): void {
    if (isLoggedIn()) {
        echo '</main></div>';
    } else {
        echo '<footer class="public-footer"><span>© '.date('Y').' Fablab Al-Ahsa</span><a href="contact.php">تواصل معنا</a></footer></main>';
    }
    echo '<div id="toast" class="toast"></div><script src="assets/app.js"></script></body></html>';
}

function flash(string $message,string $type='success'): void {
    $_SESSION['flash']=['message'=>$message,'type'=>$type];
}

function showFlash(): void {
    if (!empty($_SESSION['flash'])) {
        $f=$_SESSION['flash'];
        unset($_SESSION['flash']);
        echo '<div class="flash '.htmlspecialchars($f['type']).'">'.htmlspecialchars($f['message']).'</div>';
    }
}
?>
