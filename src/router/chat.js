const express = require('express');
const { postChat, getListChatByIdPekerja, getListChatByIdPerekrut, getDetailChat } = require('../controllers/chat.js');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, postChat);
router.get('/list-pekerja', verifyToken, getListChatByIdPekerja);
router.get('/list-perekrut', verifyToken, getListChatByIdPerekrut);
router.get('/detail', verifyToken, getDetailChat);

module.exports = router;
