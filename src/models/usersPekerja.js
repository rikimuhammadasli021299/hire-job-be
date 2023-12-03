const Pool = require('../config/db');

const selectAllPekerja = async (sort, paging) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users_pekerja `;

    if (sort == 'fulltime') {
      query += ` WHERE LOWER(tempat_kerja) LIKE '%fulltime%' ORDER BY users_pekerja.nama`;
    } else if (sort == 'freelancer') {
      query += ` WHERE LOWER(tempat_kerja) LIKE '%freelancer%' ORDER BY users_pekerja.nama`;
    } else if (sort == 'domisili') {
      query += ` ORDER BY users_pekerja.domisili`;
    } else {
      query += ` ORDER BY users_pekerja.nama`;
    }

    query += ` LIMIT ${paging.limit} OFFSET ${paging.offset}`;

    Pool.query(query, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const countAllUsersPekerja = async (sort) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) FROM users_pekerja `;

    if (sort == 'fulltime') {
      query += ` WHERE LOWER(tempat_kerja) LIKE '%fulltime%'`;
    } else if (sort == 'freelancer') {
      query += ` WHERE LOWER(tempat_kerja) LIKE '%freelancer%'`;
    }

    Pool.query(query, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectUsersPekerjaBySkill = async (keyword, sort, paging) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT users_pekerja.id_user, users_pekerja.nama, users_pekerja.email, users_pekerja.phone, users_pekerja.photo, users_pekerja.job_desk, users_pekerja.domisili, users_pekerja.tempat_kerja, users_pekerja.deskripsi_singkat, skill.id_skill, skill.nama_skill FROM users_pekerja JOIN skill ON users_pekerja.id_user=skill.id_user_pekerja WHERE LOWER(nama_skill) LIKE '%${keyword}%'`;

    if (sort == 'fulltime') {
      query += ` AND LOWER(tempat_kerja) LIKE '%fulltime%' ORDER BY users_pekerja.nama`;
    } else if (sort == 'freelancer') {
      query += ` AND LOWER(tempat_kerja) LIKE '%freelancer%' ORDER BY users_pekerja.nama`;
    } else if (sort == 'domisili') {
      query += ` ORDER BY users_pekerja.domisili`;
    } else {
      query += ` ORDER BY users_pekerja.nama`;
    }

    query += ` LIMIT ${paging.limit} OFFSET ${paging.offset}`;

    Pool.query(query, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const countAllUsersPekerjaBySkill = async (keyword, sort) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) FROM users_pekerja JOIN skill ON users_pekerja.id_user=skill.id_user_pekerja WHERE LOWER(nama_skill) LIKE '%${keyword}%'`;

    if (sort == 'fulltime') {
      query += ` AND LOWER(tempat_kerja) LIKE '%fulltime%'`;
    } else if (sort == 'freelancer') {
      query += ` AND LOWER(tempat_kerja) LIKE '%freelancer%'`;
    }

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
  selectUsersPekerjaBySkill,
  countAllUsersPekerja,
  countAllUsersPekerjaBySkill,
};
