const { selectUserPekerjaById } = require('../models/usersPekerja');
const { insertSkillPekerja, selectSkillPekerjaByIdPekerja, selectSkillByIdSkill, deleteSkill } = require('../models/skillPekerja');
const cloudinary = require('../config/photo');

const usersPekerjaController = {
  getSkillPekerjaByIdPekerja: async (req, res) => {
    let id_pekerja = req.user.id_user;

    let data = await selectSkillPekerjaByIdPekerja(id_pekerja);
    let result = data.rows;

    if (!result) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }
    res.status(200).json({
      code: 200,
      message: 'Success get data!',
      id_pekerja: result[0].id_user_pekerja,
      data: result,
    });
  },

  postSkillPekerjaByIdPekerja: async (req, res) => {
    let id_pekerja = req.user.id_user;
    let { skill } = req.body;

    if (!id_pekerja || !skill) {
      return res.status(400).json({
        code: 400,
        message: 'id_pekerja and skill is required',
      });
    }

    let checkPekerja = await selectUserPekerjaById(id_pekerja);
    let checkPekerjaResult = checkPekerja.rows[0];

    if (!checkPekerjaResult) {
      return res.status(400).json({
        code: 400,
        message: 'Pekerja not found!',
      });
    }

    let addSkill = skill.map(async (items) => await insertSkillPekerja(id_pekerja, items));

    if (!addSkill) {
      return res.status(404).json({
        code: 404,
        message: 'Add skill failed!',
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Add skill success!',
    });
  },

  deleteSkillByIdSkillAndIdPekerja: async (req, res) => {
    let id_pekerja = req.user.id_user;
    let id_skill = req.params.id;

    //   check data skill
    let dataSkill = await selectSkillByIdSkill(id_skill);
    console.log('ini data skill', dataSkill);

    if (dataSkill.rowCount === 0) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }

    let result = await deleteSkill(id_pekerja, id_skill);

    if (!result) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }
    res.status(200).json({
      code: 200,
      message: 'Success delete skill!',
    });
  },
};

module.exports = usersPekerjaController;
