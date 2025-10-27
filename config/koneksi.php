<?php
date_default_timezone_set('Asia/Jakarta');

// Konfigurasi database
// Otomatis detect environment (Docker vs Local)
$host = getenv('DB_HOST') ?: "localhost"; // Gunakan mysql untuk Docker, localhost untuk local
$user = getenv('DB_USER') ?: "reip"; // Ganti dengan username database Anda
$password = getenv('DB_PASSWORD') ?: "bcst2526"; // Ganti dengan password database Anda
$database = getenv('DB_NAME') ?: "db_pemilos"; // Ganti dengan nama database Anda

// Buat koneksi menggunakan mysqli (mode OOP)
$koneksi = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($koneksi->connect_error) {
    // Tampilkan pesan error yang lebih deskriptif
    die("Koneksi gagal: " . htmlspecialchars($koneksi->connect_error));
}

// Set charset untuk mencegah masalah encoding
$koneksi->set_charset("utf8mb4");

// Jika perlu, tambahkan logging error ke file atau sistem lain
// Misalnya, untuk debugging:
// error_log("Database connected successfully", 3, "/path/to/your/error.log");

// Kembalikan objek koneksi agar dapat digunakan di file lain
return $koneksi;
?>