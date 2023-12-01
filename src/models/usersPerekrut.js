const Pool = require('../config/db');

const selectUserPerekrutById = async (id_perekrut) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id_user, nama, email, nama_perusahaan, jabatan, phone, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in, photo FROM users_perekrut WHERE id_user='${id_perekrut}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const updatePerekrutById = async (data) => {
  const { id_user, nama, nama_perusahaan, jabatan, phone, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in, photo } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE users_perekrut SET nama='${nama}', nama_perusahaan='${nama_perusahaan}', jabatan='${jabatan}', phone='${phone}', bidang='${bidang}', provinsi='${provinsi}', kota='${kota}', email_perusahaan='${email_perusahaan}', linked_in='${linked_in}', photo='${photo}', deskripsi_singkat='${deskripsi_singkat}' WHERE id_user='${id_user}'`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          return reject(err);
        }
      }
    );
  });
};

module.exports = {
  selectUserPerekrutById,
  updatePerekrutById,
};
