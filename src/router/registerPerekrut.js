const express = require('express');
const { registerPerekrut } = require('../controllers/registerPerekrut');

const router = express.Router();

router.post('/perekrut', registerPerekrut);

module.exports = router;
