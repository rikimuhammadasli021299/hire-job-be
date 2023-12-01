const bcrypt = require('bcrypt');
const { selectUserPerekrutById } = require('../models/usersPerekrut');

const usersPerekrutController = {
  getDetailPerekrutById: async (req, res) => {
    let id_perekrut = req.params.id;

    let data = await selectUserPerekrutById(id_perekrut);
    let result = data.rows[0];

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
      result,
    });
  },
};

module.exports = usersPerekrutController;
