<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
require_once __DIR__ . '/../api/db.php';

function isLoggedIn(): bool {
    return !empty($_SESSION['user']['id']);
}

function currentUser(): ?array {
    global $conn;
    if (!isLoggedIn()) return null;

    $id = (int)$_SESSION['user']['id'];
    $st = $conn->prepare("SELECT id,name,email,role,status FROM users WHERE id=? LIMIT 1");
    $st->bind_param('i', $id);
    $st->execute();
    $u = $st->get_result()->fetch_assoc();
    $st->close();

    if (!$u || ($u['status'] ?? 'active') !== 'active') {
        unset($_SESSION['user']);
        return null;
    }

    $_SESSION['user'] = [
        'id' => (int)$u['id'],
        'name' => $u['name'],
        'email' => $u['email'],
        'role' => $u['role'],
        'status' => $u['status']
    ];
    return $_SESSION['user'];
}

function requireLogin(): void {
    if (!isLoggedIn() || !currentUser()) {
        header('Location: login.php');
        exit;
    }
}

function requireAdmin(): void {
    requireLogin();
    if ((currentUser()['role'] ?? '') !== 'admin') {
        header('Location: portal.php');
        exit;
    }
}

function requireEmployee(): void {
    requireLogin();
    if (!in_array(currentUser()['role'] ?? '', ['admin','employee'], true)) {
        header('Location: portal.php');
        exit;
    }
}

function csrfToken(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function verifyCsrf(string $token): void {
    if (empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $token)) {
        http_response_code(419);
        exit('طلب غير صالح.');
    }
}

function loginUser(array $user): void {
    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
        'status' => $user['status'] ?? 'active'
    ];
}
?>
