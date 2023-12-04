const {getPortfolio, postPortfolio, putPortfolio,deletePortfolioById,selectPortfolioById} = require("../models/portfolioModel")
const cloudinary = require = require("../config/photo");

// const {StatusCodes} = require("http-status-codes")
const getPorto = async (req, res) => {
    const id = req.user.id_user;
    const dataPorto = await getPortfolio(id);
    if(dataPorto.rows.length != 0){
        res.status(200)
        .json({
            message:"success",
            data: dataPorto.rows
        })
    }else{
        return res.status(404)
        .json({
            message: "data not found"
        })
    }
}



const postPorto = async (req, res) => {
    let { link_repo, type } = req.body;
    let id_user = req.user.id_user;

    if (!req.file) {
      return res.status(400).json({ messsage: 'photo is required and must be image file' });
    }

    if (!req.isFileValid) {
      return res.status(400).json({ messsage: isFileValidMessage });
    }

    if (!link_repo || !type) {
      return res.status(400).json({
        code: 400,
        message: 'link repo and type is required',
      });
    }

    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hire-job',
    });

    if (!imageUpload) {
      return res.status(400).json({ messsage: 'upload photo failed' });
    }


    let data = { photo: imageUpload.secure_url, link_repo, type};
    let result = await postPortfolio(data, id_user);

    if (!result) {
      return res.status(404).json({
        code: 404,
        message: 'Failed input data!',
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Success input data!',
      data,
    });
} 

const putPorto = async (req, res) => {
    let id = req.params.id;
    let id_user = req.user.id_user;
    let { link_repo, type } = req.body;

    let portfolio_data = await selectPortfolioById(id);

    if (portfolio_data.rowCount == 0) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }

    let data = portfolio_data.rows[0];
    
    let newData = {
      id: data.id,
      link_repo: link_repo || data.link_repo,
      type: type || data.type
    };

    // check photo
    if (!req.file) {
      if (req.isFileValid === undefined || req.isFileValid) {
        newData.photo = data.photo;
        let result = await putPortfolio(newData,id);

        if (!result) {
          return res.status(404).json({
            code: 404,
            message: 'Failed update data!',
          });
        }

        return res.status(200).json({
          code: 200,
          message: 'Success update data!',
        });
      } else {
        return res.status(404).json({
          messsage: 'failed update data, photo must be image file',
        });
      }
    }

    if (req.file) {
      if (req.isFileValid === false) {
        return res.status(404).json({
          messsage: 'failed update data, photo must be image file',
        });
      }

      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: 'hire-job',
      });

      if (!imageUpload) {
        return res.status(400).json({ messsage: 'upload photo failed' });
      }
      newData.photo = imageUpload.secure_url;

      let result = await putPortfolio(newData,id);

      if (!result) {
        return res.status(404).json({
          code: 404,
          message: 'Failed update data!',
        });
      }

      res.status(200).json({
        code: 200,
        message: 'Success update data!',
      });
    }
  };
  

const deletePorto = async (req, res) => {
    const id = req.params.id;
    let data = await selectPortfolioById(id);
    let result = data.rows[0];

    if (!result) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }

    await deletePortfolioById(id);
    res.status(200).json({
      code: 200,
      message: 'Success delete data!',
    });
}

const detailPortofolioById = async (req, res) => {
    const id = req.params.id;
    let data = await selectPortfolioById(id);
    let result = data.rows[0];

    if (!result) {
      return res.status(200).json({
        code: 200,
        message: 'Data not found!',
        data: [],
      });
    }
    res.status(200).json({
      code: 200,
      message: 'Success get data by id!',
      data: result
    });
}


module.exports = {
    getPorto,
    postPorto,
    putPorto,
    deletePorto,
    detailPortofolioById
}