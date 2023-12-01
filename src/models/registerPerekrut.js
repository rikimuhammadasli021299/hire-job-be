const Pool = require('../config/db');

const createUserPerekrut = async (data) => {
  const { nama, email, nama_perusahaan, jabatan, phone, passwordHashed, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO users_perekrut (nama, email, nama_perusahaan, jabatan, phone, password, bidang, provinsi, kota, deskripsi_singkat, email_perusahaan, linked_in) VALUES ('${nama}', '${email}', '${nama_perusahaan}', '${jabatan}', '${phone}', '${passwordHashed}', '${bidang}', '${provinsi}', '${kota}', '${deskripsi_singkat}', '${email_perusahaan}', '${linked_in}')`,
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

const checkEmailRegisteredPerekrut = async (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT COUNT(*) FROM users_perekrut WHERE email='${email}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectPerekrutByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM users_perekrut WHERE email='${email}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

module.exports = { createUserPerekrut, checkEmailRegisteredPerekrut, selectPerekrutByEmail };
