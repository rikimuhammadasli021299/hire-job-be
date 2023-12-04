const express = require('express');
const { loginPekerja } = require('../controllers/loginPekerja');

const router = express.Router();

router.post('/pekerja', loginPekerja);

module.exports = router;
