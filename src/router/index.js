const express = require('express');

const router = express.Router();

const registerPekerja = require('./registerPekerja');
const registerPerekrut = require('./registerPerekrut');
const loginPekerja = require('./loginPekerja');
const loginPerekrut = require('./loginPerekrut');

router.use('/register', registerPekerja);
router.use('/register', registerPerekrut);
router.use('/login', loginPekerja);
router.use('/login', loginPerekrut);

module.exports = router;
