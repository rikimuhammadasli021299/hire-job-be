const express = require('express');
const { getDetailPerekrutById } = require('../controllers/usersPerekrut');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/perekrut/:id', verifyToken, getDetailPerekrutById);

module.exports = router;
