const express = require('express');
const { getSkillPekerjaByIdPekerja, postSkillPekerjaByIdPekerja, deleteSkillByIdSkillAndIdPekerja, getAllSkillPekerja } = require('../controllers/skillPekerja');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/pekerja/:id', verifyToken, getSkillPekerjaByIdPekerja);
router.get('/pekerja', verifyToken, getAllSkillPekerja);
router.post('/pekerja', verifyToken, postSkillPekerjaByIdPekerja);
router.delete('/pekerja/:id', verifyToken, deleteSkillByIdSkillAndIdPekerja);

module.exports = router;
