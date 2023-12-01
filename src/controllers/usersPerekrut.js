const { selectUserPerekrutById, updatePerekrutById } = require('../models/usersPerekrut');
const cloudinary = require('../config/photo');

const usersPerekrutController = {
  getDetailPerekrutById: async (req, res) => {
    let id_perekrut = req.user.id_user;

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
};

module.exports = usersPerekrutController;
