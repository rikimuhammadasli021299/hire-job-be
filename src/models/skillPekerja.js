const Pool = require('../config/db');

const insertSkillPekerja = async (id_pekerja, skill) => {
  return new Promise((resolve, reject) => {
    Pool.query(`INSERT INTO skill (id_user_pekerja, nama_skill) VALUES ('${id_pekerja}', '${skill}')`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectSkillPekerjaByIdPekerja = async (id_pekerja) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM skill WHERE id_user_pekerja='${id_pekerja}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectAllSkillPekerja = async () => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM skill`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectSkillByIdSkill = async (id_skill) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT * FROM skill WHERE id_skill=${id_skill}`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const deleteSkill = async (id_user_pekerja, id_skill) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM skill WHERE id_skill=${id_skill} AND id_user_pekerja='${id_user_pekerja}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

module.exports = { insertSkillPekerja, selectSkillPekerjaByIdPekerja, selectSkillByIdSkill, deleteSkill, selectAllSkillPekerja };
