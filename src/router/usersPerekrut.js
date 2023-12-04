const express = require('express');
const { getDetailPerekrutById, putPerekrutById, sendOtpByEmailPerekrut, changePasswordPerekrut, resetPasswordPerekrut } = require('../controllers/usersPerekrut');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/perekrut/:id', verifyToken, getDetailPerekrutById);
router.put('/perekrut', verifyToken, upload.single('photo'), putPerekrutById);
router.post('/perekrut/send-otp', sendOtpByEmailPerekrut);
router.post('/perekrut/change-password', changePasswordPerekrut);
router.post('/perekrut/reset-password', verifyToken, resetPasswordPerekrut);

module.exports = router;
