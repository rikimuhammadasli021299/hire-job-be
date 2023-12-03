const Pool = require("../config/db");

const getPortfolio = async (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM portfolio WHERE user_id = '${id}'`, (err, result) => {
            if(!err) {
                resolve(result);
            }else{
                reject(err);
            }
        })
    );
};

const postPortfolio = async (data, id_user) => {
    const {link_repo, type,photo} = data;
    return new Promise((resolve, reject) =>
      Pool.query(`INSERT INTO portfolio(user_id, type, photo, link_repo) VALUES('${id_user}','${type}','${photo}','${link_repo}')`, (err, result) => {
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    })
  );
};

const putPortfolio = async (data,id) => {
    const {link_repo, type, photo,} = data;
    return new Promise((resolve, reject) =>
      Pool.query(`UPDATE portfolio SET link_repo ='${link_repo}', type='${type}', photo = '${photo}' WHERE id='${id}'`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };
  



const deletePortfolioById = async (id) => {
    return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM portfolio WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const  selectPortfolioById = async (id) => {
    return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM portfolio WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};


module.exports = { 
    getPortfolio, 
    postPortfolio,
    putPortfolio,
    deletePortfolioById,
    selectPortfolioById
};