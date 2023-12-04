const { selectUserPerekrutById, updatePerekrutById, updateOtpByUserPerekrutEmail, updatePasswordPerekrutByIdPerekrut } = require('../models/usersPerekrut');
const { selectPerekrutByEmail, createUserPerekrut, selectPerekrutByOtp } = require('../models/registerPerekrut');
const cloudinary = require('../config/photo');
const jwt = require('jsonwebtoken');
const { sendOtpToMail } = require('../utils/sendOtpToEmail');
const bcrypt = require('bcrypt');

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

  putPerekrutById: async (req, res) => {
    let id_perekrut = req.user.id_user;
    let { nama, nama_perusahaan, jabatan, phone, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in, photo } = req.body;

    //   Check user
    let perekrut = await selectUserPerekrutById(id_perekrut);

    if (perekrut.rowCount == 0) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }

    let data = perekrut.rows[0];
    let newData = {
      id_user: data.id_user,
      nama: nama || data.nama,
      nama_perusahaan: nama_perusahaan || data.nama_perusahaan,
      jabatan: jabatan || data.jabatan,
      phone: phone || data.phone,
      bidang: bidang || data.bidang,
      provinsi: provinsi || data.provinsi,
      kota: kota || data.kota,
      deskripsi_singkat: deskripsi_singkat || data.deskripsi_singkat,
      email_perusahaan: email_perusahaan || data.email_perusahaan,
      linked_in: linked_in || data.linked_in,
    };

    // check photo
    if (!req.file) {
      if (req.isFileValid === undefined || req.isFileValid) {
        newData.photo = data.photo;
        let result = await updatePerekrutById(newData);

        if (!result) {
          return res.status(404).json({
            code: 404,
            message: 'Failed update data!',
          });
        }

        return res.status(200).json({
          code: 200,
          message: 'Success update data!',
        });
      } else {
        return res.status(404).json({
          messsage: 'failed update data, photo must be image file',
        });
      }
    }

    if (req.file) {
      if (!req.isFileValid) {
        return res.status(404).json({
          messsage: 'failed update data, photo must be image file',
        });
      }

      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: 'hire-job',
      });

      if (!imageUpload) {
        return res.status(400).json({ messsage: 'upload photo failed' });
      }
      newData.photo = imageUpload.secure_url;

      let result = await updatePerekrutById(newData);

      if (!result) {
        return res.status(404).json({
          code: 404,
          message: 'Failed update data!',
        });
      }

      res.status(200).json({
        code: 200,
        message: 'Success update data!',
      });
    }
  },

  sendOtpByEmailPerekrut: async (req, res) => {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: 400,
        message: 'Please insert your email!',
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

    let otp = Math.floor(Math.random() * 90000) + 10000;
    let createOTP = await updateOtpByUserPerekrutEmail(email, otp);

    if (!createOTP) {
      return res.status(404).json({
        code: 404,
        message: 'Failed get otp!',
      });
    }

    const token = jwt.sign(email, process.env.JWT_SECRET);
    let sendEmailToUser = await sendOtpToMail(email, token, checkEmail.rows[0].nama, otp);

    if (!sendEmailToUser) {
      await createUserPerekrut.rollback();
      return res.status(500).json({
        code: 500,
        error: 'Send email failed!',
        message: 'Send otp failed!',
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Otp has been send to your email, please check your email',
    });
  },

  changePasswordPerekrut: async (req, res) => {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        code: 400,
        message: 'email and otp is required!',
      });
    }

    //   Check email is registered?
    let checkEmail = await selectPerekrutByEmail(email);
    if (checkEmail.rows.length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email not registered!',
      });
    }

    //   Check otp
    let checkOtp = await selectPerekrutByOtp(otp);
    if (checkOtp.rows.length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Code OTP invalid!',
      });
    }

    // Generate token
    const token = jwt.sign(checkEmail.rows[0], process.env.JWT_SECRET);
    res.status(200).json({
      code: 200,
      message: 'Email and otp is match!',
      id_user: checkEmail.rows[0].id_user,
      nama: checkEmail.rows[0].nama,
      email: checkEmail.rows[0].email,
      tokenResetPassword: token,
    });
  },

  resetPasswordPerekrut: async (req, res) => {
    let { password, confirmPassword } = req.body;
    console.log(password, confirmPassword);
    let id_perekrut = req.user.id_user;

    if (!confirmPassword || !password) {
      return res.status(400).json({
        code: 400,
        message: 'Confirm password and new password is required',
      });
    }

    if (password === confirmPassword) {
      let checkPerekrut = await selectUserPerekrutById(id_perekrut);
      if (checkPerekrut.rows.length === 0) {
        return res.status(400).json({
          code: 400,
          message: 'Perekrut not found!',
        });
      }

      let passwordHashed = await bcrypt.hash(password, 10);

      let updatePassword = await updatePasswordPerekrutByIdPerekrut(id_perekrut, passwordHashed);

      if (!updatePassword) {
        return res.status(404).json({
          code: 404,
          message: 'Failed reset password!',
        });
      }

      return res.status(200).json({
        code: 200,
        message: 'Password has been reset, please login with new password!',
      });
    }

    return res.status(400).json({
      code: 400,
      message: 'Password and confirm password not match!',
    });
  },
};

module.exports = usersPerekrutController;
