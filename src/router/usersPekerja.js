const express = require('express');
const { getDetailPekerjaById, getAllPekerja, putPekerjaById, getPekerjaBySkill, sendOtpByEmail, changePasswordPekerja, resetPassword } = require('../controllers/usersPekerja');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/pekerja', verifyToken, getAllPekerja);
router.get('/pekerja/by-skill', verifyToken, getPekerjaBySkill);
router.get('/pekerja/:id', verifyToken, getDetailPekerjaById);
router.put('/pekerja', verifyToken, upload.single('photo'), putPekerjaById);
router.post('/pekerja/send-otp', sendOtpByEmail);
router.post('/pekerja/change-password', changePasswordPekerja);
router.post('/pekerja/reset-password', verifyToken, resetPassword);

module.exports = router;
