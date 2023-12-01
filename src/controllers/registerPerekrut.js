const bcrypt = require('bcrypt');
// const { createUserPekerja, checkEmailRegisteredPekerja } = require('../models/registerPekerja');
const { createUserPerekrut, checkEmailRegisteredPerekrut } = require('../models/registerPerekrut');

const registerPerekrutController = {
  registerPerekrut: async (req, res) => {
    let { nama, email, perusahaan, jabatan, phone, password } = req.body;
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
    let data = { nama, email, perusahaan, jabatan, phone, passwordHashed };
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
//   login: async (req, res) => {
//     let { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         code: 400,
//         message: 'email and password is required!',
//       });
//     }

//     //   Check email is registered?
//     let checkEmail = await getUserByEmail(email);
//     console.log(checkEmail);
//     if (checkEmail.rows.length === 0) {
//       return res.status(400).json({
//         code: 400,
//         message: 'Email not registered',
//       });
//     }

//     //   Check password is match?
//     let isMatch = bcrypt.compareSync(password, checkEmail.rows[0].password);
//     if (!isMatch) {
//       return res.status(400).json({
//         code: 400,
//         message: 'Incorrect password, please enter the correct password',
//       });
//     }

//     // Check email is activated?
//     if (checkEmail.rows[0].is_active === false) {
//       return res.status(400).json({
//         code: 400,
//         message: 'Email not active, please check your email to activated',
//       });
//     }

//     // Generate token
//     const accessToken = jwt.sign(checkEmail.rows[0], process.env.JWT_SECRET, { expiresIn: '1d' });
//     const refreshToken = jwt.sign(checkEmail.rows[0], process.env.JWT_REFRESH_SECRET, { expiresIn: '1Y' });
//     res.status(200).json({
//       code: 200,
//       message: 'Login success!',
//       name: checkEmail.rows[0].name,
//       uuid: checkEmail.rows[0].uuid,
//       email: checkEmail.rows[0].email,
//       photo: checkEmail.rows[0].photo,
//       token: {
//         accessToken,
//         refreshToken,
//       },
//     });
//   },

module.exports = registerPerekrutController;
