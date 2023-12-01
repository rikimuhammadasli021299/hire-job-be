const Pool = require('../config/db');

const createUserPekerja = async (data) => {
  const { nama, email, passwordHashed, phone } = data;
  return new Promise((resolve, reject) => {
    Pool.query(`INSERT INTO users_pekerja (nama, email, phone, password) VALUES ('${nama}', '${email}', '${phone}', '${passwordHashed}')`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
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
