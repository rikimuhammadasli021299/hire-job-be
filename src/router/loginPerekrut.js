const express = require('express');
const { loginPerekrut } = require('../controllers/loginPerekrut');

const router = express.Router();

router.post('/perekrut', loginPerekrut);

module.exports = router;
