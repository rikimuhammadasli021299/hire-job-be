const Pool = require('../config/db');

const getExperience = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM experience WHERE user_id = '${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postExperience = async (data, id_user) => {
  const { position, company_name, from_month, photo, to_month, description } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO experience(position,company_name,user_id, photo, from_month,to_month, description) VALUES('${position}','${company_name}','${id_user}','${photo}','${from_month}','${to_month}', '${description}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const putExperience = async (data, id) => {
  const { position, company_name, from_month, to_month, description, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`UPDATE experience SET position='${position}',company_name ='${company_name}', from_month = '${from_month}', to_month='${to_month}', description='${description}', photo='${photo}' WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getExperienceById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM experience WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteExperienceById = async (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM experience WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  getExperience,
  postExperience,
  putExperience,
  getExperienceById,
  deleteExperienceById,
};
