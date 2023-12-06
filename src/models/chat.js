const Pool = require('../config/db');

const insertChat = async (data) => {
  const { id_pengirim, id_perekrut, id_pekerja, posisi, message_detail } = data;
  return new Promise((resolve, reject) => {
    Pool.query(`INSERT INTO messages (id_pengirim, id_perekrut, id_pekerja, posisi, message_detail) VALUES ('${id_pengirim}', '${id_perekrut}', '${id_pekerja}', '${posisi}', '${message_detail}')`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectChatByIdPekerja = async (id_pekerja) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id_perekrut, users_perekrut.photo, users_perekrut.nama_perusahaan, messages.posisi FROM messages JOIN users_perekrut ON messages.id_perekrut=users_perekrut.id_user WHERE id_pekerja='${id_pekerja}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectChatByIdPerekrut = async (id_perekrut) => {
  return new Promise((resolve, reject) => {
    Pool.query(`SELECT id_pekerja, users_pekerja.photo, users_pekerja.nama, messages.posisi FROM messages JOIN users_pekerja ON messages.id_pekerja=users_pekerja.id_user WHERE id_perekrut='${id_perekrut}'`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        return reject(err);
      }
    });
  });
};

const selectDetailChatByIdPengirim = async (id_pekerja, id_perekrut) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT id_message, id_pengirim, message_detail, posisi, id_pekerja, id_perekrut, created_at, updated_at, users_pekerja.nama AS nama_pekerja, users_pekerja.photo AS photo_pekerja, users_perekrut.nama_perusahaan, users_perekrut.photo AS photo_perusahaan FROM messages JOIN users_pekerja ON messages.id_pekerja=users_pekerja.id_user JOIN users_perekrut ON messages.id_perekrut=users_perekrut.id_user WHERE id_pengirim='${id_perekrut}' OR id_pengirim='${id_pekerja}' ORDER BY messages.created_at`,
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

module.exports = { insertChat, selectChatByIdPekerja, selectChatByIdPerekrut, selectDetailChatByIdPengirim };
