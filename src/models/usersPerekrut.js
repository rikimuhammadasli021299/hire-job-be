const Pool = require('../config/db');

const selectUserPerekrutById = async (id_perekrut) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id_user, nama, email, nama_perusahaan, jabatan, phone, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan FROM users_perekrut WHERE id_user=${id_perekrut}`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

module.exports = {
  selectUserPerekrutById,
};
