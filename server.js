const express = require('express');
const cors = require('cors');
require('dotenv').config();

const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (required by GCP)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Notes App Backend - Tugas 3 Cloud Computing',
    nim: '123230189',
    nama: 'Rona Kassatya H.',
    endpoints: {
      'GET /api/notes': 'Ambil semua catatan',
      'GET /api/notes/:id': 'Ambil satu catatan',
      'POST /api/notes': 'Tambah catatan',
      'PUT /api/notes/:id': 'Update catatan',
      'DELETE /api/notes/:id': 'Hapus catatan'
    }
  });
});

// API Routes
app.use('/api/notes', notesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;
