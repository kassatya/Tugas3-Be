-- Jalankan di phpMyAdmin setelah membuat database notes_123230189
-- Buat database
CREATE DATABASE IF NOT EXISTS notes_123230189;
USE notes_123230189;

-- Buat tabel notes
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  isi TEXT NOT NULL,
  tanggal_dibuat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tanggal_diperbarui TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Data contoh (opsional)
INSERT INTO notes (judul, isi) VALUES 
  ('Belajar Cloud Computing', 'GCP menyediakan layanan App Engine dan Cloud Run untuk deployment aplikasi.'),
  ('Catatan Pertama', 'Ini adalah catatan pertama di aplikasi Notes Tugas 3.');
