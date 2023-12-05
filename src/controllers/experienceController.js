const { getExperience, postExperience, putExperience, getExperienceById, deleteExperienceById } = require('../models/experienceModel');
const cloudinary = require('../config/photo');

const getMyExperience = async (req, res) => {
  const id = req.user.id_user;
  const dataExperience = await getExperience(id);
  if (dataExperience.rows.length != 0) {
    res.status(200).json({ message: 'success', data: dataExperience.rows });
  } else {
    return res.status(404).json({ message: 'data not found!' });
  }
};

const postMyExperience = async (req, res) => {
  let { position, company_name, from_month, to_month, description } = req.body;
  let id_user = req.user.id_user;
  console.log(position, company_name, from_month, to_month, description);

  if (!req.file) {
    return res.status(400).json({ messsage: 'photo is required and must be image file' });
  }

  if (!req.isFileValid) {
    return res.status(400).json({ messsage: isFileValidMessage });
  }

  if (!position || !company_name || !from_month || !to_month || !description) {
    return res.status(400).json({
      code: 400,
      message: 'position, company_name, from_month, to_month, description is required',
    });
  }

  const imageUpload = await cloudinary.uploader.upload(req.file.path, {
    folder: 'hire-job',
  });

  if (!imageUpload) {
    return res.status(400).json({ messsage: 'upload photo failed' });
  }

  let data = { photo: imageUpload.secure_url, position, company_name, from_month, to_month, description };
  let result = await postExperience(data, id_user);

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
};

const getMyExperienceById = async (req, res) => {
  const id = req.params.id;
  let data = await getExperienceById(id);
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
    data: result,
  });
};

const putMyExperience = async (req, res) => {
  let id = req.params.id;
  let id_user = req.user.id_user;
  let { position, company_name, from_month, to_month, description } = req.body;

  let experience_data = await getExperienceById(id);

  if (experience_data.rowCount == 0) {
    return res.status(200).json({
      code: 200,
      message: 'Data not found!',
      data: [],
    });
  }

  let data = experience_data.rows[0];

  let newData = {
    id: data.id,
    position: position || data.position,
    company_name: company_name || data.company_name,
    from_month: from_month || data.from_month,
    to_month: to_month || data.to_month,
    description: description || data.description,
  };

  // check photo
  if (!req.file) {
    if (req.isFileValid === undefined || req.isFileValid) {
      newData.photo = data.photo;
      let result = await putExperience(newData, id);

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

    let result = await putExperience(newData, id);

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

const deleteMyExperienceById = async (req, res) => {
  const id = req.params.id;
  let data = await getExperienceById(id);
  let result = data.rows[0];

  if (!result) {
    return res.status(200).json({
      code: 200,
      message: 'Data not found!',
      data: [],
    });
  }

  await deleteExperienceById(id);
  res.status(200).json({
    code: 200,
    message: 'Success delete data!',
  });
};

module.exports = {
  getMyExperience,
  postMyExperience,
  putMyExperience,
  getMyExperienceById,
  deleteMyExperienceById,
};
