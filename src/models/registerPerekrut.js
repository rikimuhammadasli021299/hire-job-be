const Pool = require('../config/db');

const createUserPerekrut = async (data) => {
  const { nama, email, perusahaan, jabatan, phone, passwordHashed } = data;
  return new Promise((resolve, reject) => {
    Pool.query(`INSERT INTO users_perekrut (nama, email, perusahaan, jabatan, phone, password) VALUES ('${nama}', '${email}', '${perusahaan}', '${jabatan}', '${phone}', '${passwordHashed}')`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
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
