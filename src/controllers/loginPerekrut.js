const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { selectPerekrutByEmail } = require('../models/registerPerekrut');

const loginPerekrutController = {
  loginPerekrut: async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        message: 'email and password is required!',
      });
    }

    //   Check email is registered?
    let checkEmail = await selectPerekrutByEmail(email);
    console.log(checkEmail);
    if (checkEmail.rows.length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email not registered',
      });
    }

    //   Check password is match?
    let isMatch = bcrypt.compareSync(password, checkEmail.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        message: 'Incorrect password, please enter the correct password',
      });
    }

    // Generate token
    const token = jwt.sign(checkEmail.rows[0], process.env.JWT_SECRET);
    res.status(200).json({
      code: 200,
      message: 'Login success!',
      id_user: checkEmail.rows[0].id_user,
      nama: checkEmail.rows[0].nama,
      email: checkEmail.rows[0].email,
      perusahaan: checkEmail.rows[0].perusahaan,
      jabatan: checkEmail.rows[0].jabatan,
      phone: checkEmail.rows[0].phone,
      photo: checkEmail.rows[0].photo,
      token,
    });
  },
};

module.exports = loginPerekrutController;
