<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
switch(currentUser()['role'] ?? ''){
    case 'admin': header('Location: admin-dashboard.php'); break;
    case 'employee': header('Location: employee-dashboard.php'); break;
    default: header('Location: student-portal.php'); break;
}
exit;
?>
