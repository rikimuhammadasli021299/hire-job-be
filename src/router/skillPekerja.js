const express = require('express');
const { getSkillPekerjaByIdPekerja, postSkillPekerjaByIdPekerja, deleteSkillByIdSkillAndIdPekerja } = require('../controllers/skillPekerja');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/pekerja', verifyToken, getSkillPekerjaByIdPekerja);
router.post('/pekerja', verifyToken, postSkillPekerjaByIdPekerja);
router.delete('/pekerja/:id', verifyToken, deleteSkillByIdSkillAndIdPekerja);

module.exports = router;
