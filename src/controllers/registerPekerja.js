const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { createUserPekerja, checkEmailRegisteredPekerja } = require('../models/registerPekerja');

const registerPekerjaController = {
  registerPekerja: async (req, res) => {
    let { nama, email, phone, password, photo, job_desk, domisili, tempat_kerja, deskripsi_singkat } = req.body;

    if (!nama || !email || !phone || !password) {
      return res.status(400).json({
        code: 400,
        message: 'name, email, phone and password is required!',
      });
    }

    let checkEmail = await checkEmailRegisteredPekerja(email);
    let checkEmailResult = checkEmail.rows[0].count;

    if (checkEmailResult > 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email has been registered!',
      });
    }

    //   hash password
    let passwordHashed = await bcrypt.hash(password, 10);
    let data = { nama, email, phone, passwordHashed, photo, job_desk, domisili, tempat_kerja, deskripsi_singkat, id_user: uuidv4() };
    await createUserPekerja(data);

    if (!data) {
      return res.status(404).json({
        code: 404,
        message: 'Register Failed!',
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Register success!',
    });
  },
};

module.exports = registerPekerjaController;
