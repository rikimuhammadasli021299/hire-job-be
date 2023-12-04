const express = require('express');
const { registerPekerja } = require('../controllers/registerPekerja');

const router = express.Router();

router.post('/pekerja', registerPekerja);

module.exports = router;
