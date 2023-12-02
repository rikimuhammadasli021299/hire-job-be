const Pool = require('../config/db');

const createUserPekerja = async (data) => {
  const { nama, email, passwordHashed, phone, photo, job_desk, domisili, tempat_kerja, deskripsi_singkat, id_user } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users_pekerja (id_user, nama, email, phone, password, photo, job_desk, domisili, tempat_kerja, deskripsi_singkat) VALUES ('${id_user}', '${nama}', '${email}', '${phone}', '${passwordHashed}', '${photo}', '${job_desk}', '${domisili}', '${tempat_kerja}', '${deskripsi_singkat}')`,
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

const checkEmailRegisteredPekerja = async (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT COUNT(*) FROM users_pekerja WHERE email='${email}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectPekerjaByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users_pekerja WHERE email='${email}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

module.exports = { createUserPekerja, checkEmailRegisteredPekerja, selectPekerjaByEmail };