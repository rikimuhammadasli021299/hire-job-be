const express = require('express');
const { getDetailPekerjaById, getAllPekerja, putPekerjaById } = require('../controllers/usersPekerja');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/pekerja', verifyToken, getAllPekerja);
router.get('/pekerja', verifyToken, getDetailPekerjaById);
router.put('/pekerja', verifyToken, upload.single('photo'), putPekerjaById);

module.exports = router;
