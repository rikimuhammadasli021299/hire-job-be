const Pool = require('../config/db');

const selectAllPekerja = async () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users_pekerja `;
    Pool.query(query, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectUserPekerjaById = async (id_pekerja) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id_user, nama, email, phone, photo, job_desk, domisili, tempat_kerja, deskripsi_singkat FROM users_pekerja WHERE id_user='${id_pekerja}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const updatePekerjaById = async (data) => {
  const { id_user, nama, phone, job_desk, domisili, tempat_kerja, deskripsi_singkat, photo } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE users_pekerja SET nama='${nama}', phone='${phone}', photo='${photo}', job_desk='${job_desk}', domisili='${domisili}', tempat_kerja='${tempat_kerja}', deskripsi_singkat='${deskripsi_singkat}' WHERE id_user='${id_user}'`,
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
  selectAllPekerja,
  selectUserPekerjaById,
  updatePekerjaById,
};
