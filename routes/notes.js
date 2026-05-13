const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notes ORDER BY tanggal_dibuat DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data', error: err.message });
  }
});

// GET single note
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data', error: err.message });
  }
});

// POST create note
router.post('/', async (req, res) => {
  try {
    const { judul, isi } = req.body;
    if (!judul || !isi) {
      return res.status(400).json({ success: false, message: 'Judul dan isi wajib diisi' });
    }
    const [result] = await db.query(
      'INSERT INTO notes (judul, isi) VALUES (?, ?)',
      [judul, isi]
    );
    const [newNote] = await db.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Catatan berhasil ditambahkan', data: newNote[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan catatan', error: err.message });
  }
});

// PUT update note
router.put('/:id', async (req, res) => {
  try {
    const { judul, isi } = req.body;
    if (!judul || !isi) {
      return res.status(400).json({ success: false, message: 'Judul dan isi wajib diisi' });
    }
    const [result] = await db.query(
      'UPDATE notes SET judul = ?, isi = ? WHERE id = ?',
      [judul, isi, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan' });
    }
    const [updated] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Catatan berhasil diperbarui', data: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui catatan', error: err.message });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan' });
    }
    res.json({ success: true, message: 'Catatan berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus catatan', error: err.message });
  }
});

module.exports = router;
