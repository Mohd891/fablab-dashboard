<?php
declare(strict_types=1);

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'fablab_db';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    die('Database connection failed.');
}

$conn->set_charset('utf8mb4');

function ensureColumn(mysqli $conn, string $table, string $column, string $definition): void
{
    $t = $conn->real_escape_string($table);
    $c = $conn->real_escape_string($column);

    $q = $conn->query("
        SELECT COUNT(*) AS n
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = '$t'
          AND COLUMN_NAME = '$c'
    ");

    if ($q && (int)$q->fetch_assoc()['n'] === 0) {
        $conn->query("ALTER TABLE `$table` ADD COLUMN `$column` $definition");
    }
}

/* Users */
$conn->query("
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','employee','student') NOT NULL DEFAULT 'student',
    status ENUM('active','blocked') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
$conn->query("ALTER TABLE users MODIFY role ENUM('admin','employee','student') NOT NULL DEFAULT 'student'");
ensureColumn($conn, 'users', 'status', "ENUM('active','blocked') NOT NULL DEFAULT 'active'");

/* Existing students table compatibility */
if (!($conn->query("SHOW TABLES LIKE 'students'")->num_rows)) {
    $conn->query("
    CREATE TABLE students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(30) NULL,
        gender VARCHAR(20) NULL,
        age INT NULL,
        program_id INT NULL,
        registration_date DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}
ensureColumn($conn, 'students', 'user_id', 'INT NULL');
ensureColumn($conn, 'students', 'phone', 'VARCHAR(30) NULL');
ensureColumn($conn, 'students', 'gender', 'VARCHAR(20) NULL');
ensureColumn($conn, 'students', 'age', 'INT NULL');
ensureColumn($conn, 'students', 'program_id', 'INT NULL');
ensureColumn($conn, 'students', 'registration_date', 'DATE NULL');

/* Programs: preserve existing table if present */
if (!($conn->query("SHOW TABLES LIKE 'programs'")->num_rows)) {
    $conn->query("
    CREATE TABLE programs(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        period VARCHAR(100) NULL,
        capacity INT DEFAULT 0,
        start_date DATE NULL,
        end_date DATE NULL,
        status ENUM('active','completed','upcoming') DEFAULT 'active',
        description TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}
ensureColumn($conn, 'programs', 'description', 'TEXT NULL');
ensureColumn($conn, 'programs', 'period', 'VARCHAR(100) NULL');
ensureColumn($conn, 'programs', 'capacity', 'INT DEFAULT 0');
ensureColumn($conn, 'programs', 'start_date', 'DATE NULL');
ensureColumn($conn, 'programs', 'end_date', 'DATE NULL');
ensureColumn($conn, 'programs', 'status', "ENUM('active','completed','upcoming') DEFAULT 'active'");

/* Volunteers */
if (!($conn->query("SHOW TABLES LIKE 'volunteers'")->num_rows)) {
    $conn->query("
    CREATE TABLE volunteers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(30) NULL,
        role VARCHAR(100) NULL,
        program_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}

/* Trainers */
if (!($conn->query("SHOW TABLES LIKE 'trainers'")->num_rows)) {
    $conn->query("
    CREATE TABLE trainers(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(30) NULL,
        specialty VARCHAR(150) NULL,
        program_id INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}

/* Attendance */
if (!($conn->query("SHOW TABLES LIKE 'attendance'")->num_rows)) {
    $conn->query("
    CREATE TABLE attendance(
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        volunteer_id INT NULL,
        attendance_date DATE NOT NULL,
        check_in TIME NULL,
        check_out TIME NULL,
        status VARCHAR(30) DEFAULT 'present',
        notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_attendance(student_id,attendance_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
}

/* Activity logs */
$conn->query("
CREATE TABLE IF NOT EXISTS activity_logs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    activity VARCHAR(255) NOT NULL,
    program VARCHAR(255) NULL,
    username VARCHAR(150) NULL,
    status VARCHAR(50) DEFAULT 'مكتمل',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

/* Contact messages */
$conn->query("
CREATE TABLE IF NOT EXISTS contact_messages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(30) NULL,
    subject VARCHAR(190) NULL,
    message TEXT NOT NULL,
    status ENUM('new','read','closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
ensureColumn($conn, 'contact_messages', 'subject', 'VARCHAR(190) NULL');

/* Seed programs only if there are no programs. */
$pc = $conn->query("SELECT COUNT(*) AS n FROM programs");
if ($pc && (int)$pc->fetch_assoc()['n'] === 0) {
    $seed = [
        ['معسكر المبتكر الإلكتروني','صباحي',20,'تعلم أساسيات الابتكار والإلكترونيات وصناعة النماذج الأولية.'],
        ['صيفك روبوت - برمج روبوتك','مسائي',20,'برمجة الروبوت وتصميم حلول عملية باستخدام الحساسات والتحكم.'],
        ['معسكر هندسة الإبداع','صباحي',18,'رحلة تطبيقية من الفكرة إلى التصميم ثم النموذج الأولي.'],
        ['معسكر VEX','مسائي',20,'روبوتات تنافسية وتحديات هندسية وبرمجية باستخدام VEX.'],
        ['معسكر تكوين','صباحي',20,'تصميم وصناعة وتجارب عملية تجمع التقنية والإبداع.'],
        ['Make It Real - صناع الواقع','صباحي',20,'تحويل الأفكار إلى نماذج ومشاريع واقعية.'],
        ['Smart Maker Camp - سمارت ميكير','مسائي',20,'مشاريع ميكر تجمع البرمجة والإلكترونيات والتصنيع.'],
        ['صناع المستقبل','مسائي',24,'مهارات مستقبلية عبر مشاريع تقنية ومهام تطبيقية.'],
        ['الروبوتات الذكية','مسائي',20,'روبوتات ذكية وبرمجة وحساسات وتحديات عملية.'],
        ['صناع الواقع','صباحي',20,'تجارب تصنيع رقمي ومشروعات تطبيقية.'],
        ['نبض الكهرباء','صباحي',15,'أساسيات الكهرباء، تصميم مصباح، LED والطباعة ثلاثية الأبعاد.'],
        ['عالم الروبوتات','صباحي',20,'مدخل عملي لعالم الروبوتات والبرمجة والتصميم.'],
        ['من هنا تبدأ عالمية الروبوت + SPIKE','صباحي',20,'برمجة بلوكات، تصميم الروبوت، الحساسات والاستعداد لتحديات FLL.']
    ];
    $st = $conn->prepare("INSERT INTO programs(name,period,capacity,description,status) VALUES(?,?,?,?, 'active')");
    foreach ($seed as $p) {
        $st->bind_param('ssis', $p[0], $p[1], $p[2], $p[3]);
        $st->execute();
    }
    $st->close();
}

/* Admin seed */
$ac = $conn->query("SELECT COUNT(*) AS n FROM users WHERE role='admin'");
if ($ac && (int)$ac->fetch_assoc()['n'] === 0) {
    $hash = password_hash('Admin@12345', PASSWORD_DEFAULT);
    $st = $conn->prepare("
        INSERT INTO users(name,email,password_hash,role,status)
        VALUES('مدير النظام','admin@fablab.local',?,'admin','active')
    ");
    $st->bind_param('s', $hash);
    $st->execute();
    $st->close();
}
?>
