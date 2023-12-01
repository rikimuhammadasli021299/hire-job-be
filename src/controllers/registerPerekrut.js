const bcrypt = require('bcrypt');
const { createUserPerekrut, checkEmailRegisteredPerekrut } = require('../models/registerPerekrut');

const registerPerekrutController = {
  registerPerekrut: async (req, res) => {
    let { nama, email, perusahaan, jabatan, phone, password, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in } = req.body;
    console.log(nama, email, perusahaan, jabatan, phone, password);

    if (!nama || !email || !perusahaan || !phone || !jabatan || !password) {
      return res.status(400).json({
        code: 400,
        message: 'name, email, perusahaan, jabatan, phone and password is required!',
      });
    }

    let checkEmail = await checkEmailRegisteredPerekrut(email);
    let checkEmailResult = checkEmail.rows[0].count;

    if (checkEmailResult > 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email has been registered!',
      });
    }

    //   hash password
    let passwordHashed = await bcrypt.hash(password, 10);
    let data = { nama, email, perusahaan, jabatan, phone, passwordHashed, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in };
    await createUserPerekrut(data);

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

module.exports = registerPerekrutController;
