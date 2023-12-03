const {
  selectUserPekerjaById,
  selectAllPekerja,
  updatePekerjaById,
  selectUsersPekerjaBySkill,
  countAllUsersPekerja,
  countAllUsersPekerjaBySkill,
  updateOtpByUserPekerjaEmail,
  updatePasswordPekerjaByIdPekerja,
} = require('../models/usersPekerja');
const { selectPekerjaByEmail, createUserPekerja, selectPekerjaByOtp } = require('../models/registerPekerja');
const cloudinary = require('../config/photo');
const createPaginations = require('../utils/createPaginations');
const jwt = require('jsonwebtoken');
const { sendOtpToMail } = require('../utils/sendOtpToEmail');
const bcrypt = require('bcrypt');

const usersPekerjaController = {
  getPekerjaBySkill: async (req, res) => {
    let search = req.query.search;
    let sort = req.query.sort;

    // paginations
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 5;

    // check query search
    if (!search) {
      const getAllPekerja = async (req, res) => {
        let totalPekerja = await countAllUsersPekerja(sort);
        let paging = createPaginations(totalPekerja.rows[0].count, page, limit);

        let data = await selectAllPekerja(sort, paging);
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
          result,
          pagination: paging.response,
        });
      };
      return getAllPekerja(req, res);
    }

    let keyword = search.toLowerCase();
    let totalPekerjaBySkill = await countAllUsersPekerjaBySkill(keyword, sort);
    let paging = createPaginations(totalPekerjaBySkill.rows[0].count, page, limit);

    let data = await selectUsersPekerjaBySkill(keyword, sort, paging);
    let result = data.rows;

    console.log(data);
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
      pagination: paging.response,
    });
  },

  getAllPekerja: async function (req, res) {
    let sort = req.query.sort;

    // paginations
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 5;

    let totalPekerja = await countAllUsersPekerja(sort);
    let paging = createPaginations(totalPekerja.rows[0].count, page, limit);

    let data = await selectAllPekerja(sort, paging);
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
      result,
      pagination: paging.response,
    });
  },

  getDetailPekerjaById: async (req, res) => {
    let id_pekerja = req.params.id;

    let data = await selectUserPekerjaById(id_pekerja);
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

  putPekerjaById: async (req, res) => {
    let id_pekerja = req.user.id_user;
    let { nama, phone, job_desk, domisili, tempat_kerja, deskripsi_singkat } = req.body;

    //   Check user
    let pekerja = await selectUserPekerjaById(id_pekerja);

    if (pekerja.rowCount == 0) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }

    let data = pekerja.rows[0];
    let newData = {
      id_user: data.id_user,
      nama: nama || data.nama,
      phone: phone || data.phone,
      job_desk: job_desk || data.job_desk,
      domisili: domisili || data.domisili,
      tempat_kerja: tempat_kerja || data.tempat_kerja,
      deskripsi_singkat: deskripsi_singkat || data.deskripsi_singkat,
    };

    // check photo
    if (!req.file) {
      if (req.isFileValid === undefined || req.isFileValid) {
        newData.photo = data.photo;
        let result = await updatePekerjaById(newData);

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

      let result = await updatePekerjaById(newData);

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

  sendOtpByEmail: async (req, res) => {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: 400,
        message: 'Please insert your email!',
      });
    }

    //   Check email is registered?
    let checkEmail = await selectPekerjaByEmail(email);
    console.log(checkEmail);
    if (checkEmail.rows.length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email not registered',
      });
    }

    let otp = Math.floor(Math.random() * 90000) + 10000;
    let createOTP = await updateOtpByUserPekerjaEmail(email, otp);

    if (!createOTP) {
      return res.status(404).json({
        code: 404,
        message: 'Failed get otp!',
      });
    }

    const token = jwt.sign(email, process.env.JWT_SECRET);
    let sendEmailToUser = await sendOtpToMail(email, token, checkEmail.rows[0].nama, otp);

    if (!sendEmailToUser) {
      await createUserPekerja.rollback();
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

  changePasswordPekerja: async (req, res) => {
    let { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        code: 400,
        message: 'email and otp is required!',
      });
    }

    //   Check email is registered?
    let checkEmail = await selectPekerjaByEmail(email);
    if (checkEmail.rows.length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Email not registered!',
      });
    }

    //   Check otp
    let checkOtp = await selectPekerjaByOtp(otp);
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

  resetPassword: async (req, res) => {
    let { password, confirmPassword } = req.body;
    console.log(password, confirmPassword);
    let id_pekerja = req.user.id_user;

    if (!confirmPassword || !password) {
      return res.status(400).json({
        code: 400,
        message: 'Confirm password and new password is required',
      });
    }

    if (password === confirmPassword) {
      let checkPekerja = await selectUserPekerjaById(id_pekerja);
      if (checkPekerja.rows.length === 0) {
        return res.status(400).json({
          code: 400,
          message: 'Pekerja not found!',
        });
      }

      let passwordHashed = await bcrypt.hash(password, 10);

      let updatePassword = await updatePasswordPekerjaByIdPekerja(id_pekerja, passwordHashed);

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

module.exports = usersPekerjaController;
