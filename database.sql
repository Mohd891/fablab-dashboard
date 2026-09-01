CREATE DATABASE IF NOT EXISTS fablab_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fablab_db;

-- This schema is safe to import for a fresh installation.
-- If you already have the project database, api/db.php performs non-destructive setup.
CREATE TABLE IF NOT EXISTS users (
 id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150) NOT NULL, email VARCHAR(190) NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL, role ENUM('admin','student') NOT NULL DEFAULT 'student',
 status ENUM('active','blocked') NOT NULL DEFAULT 'active', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS programs (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL,period VARCHAR(100),capacity INT DEFAULT 0,start_date DATE,end_date DATE,status ENUM('active','completed','upcoming') DEFAULT 'active',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS volunteers (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL,phone VARCHAR(30),role VARCHAR(100),program_id INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS trainers (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL,phone VARCHAR(30),specialty VARCHAR(150),program_id INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS attendance (id INT AUTO_INCREMENT PRIMARY KEY,student_id INT NOT NULL,volunteer_id INT,attendance_date DATE NOT NULL,check_in TIME,check_out TIME,status VARCHAR(30) DEFAULT 'present',notes TEXT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,UNIQUE KEY uq_attendance(student_id,attendance_date)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS activity_logs(id INT AUTO_INCREMENT PRIMARY KEY,activity VARCHAR(255) NOT NULL,program VARCHAR(255),username VARCHAR(150),status VARCHAR(50) DEFAULT 'مكتمل',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;