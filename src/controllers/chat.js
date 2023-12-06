const { insertChat, selectChatByIdPekerja, selectChatByIdPerekrut, selectDetailChatByIdPengirim } = require('../models/chat');
const { selectUserPekerjaById } = require('../models/usersPekerja');
const { selectUserPerekrutById } = require('../models/usersPerekrut');

const chatController = {
  postChat: async (req, res) => {
    let id_pengirim = req.user.id_user;
    let { id_perekrut, id_pekerja, posisi, message_detail } = req.body;

    if (!id_perekrut || !id_pekerja || !message_detail || !posisi) {
      return res.status(400).json({
        code: 400,
        message: 'id_perekrut, id_pekerja, posisi and message detail is required!',
      });
    }

    let checkPekerja = await selectUserPekerjaById(id_pekerja);
    let checkPekerjaResult = checkPekerja.rows[0];

    if (!checkPekerjaResult) {
      return res.status(400).json({
        code: 400,
        message: 'Pekerja not found!',
      });
    }

    let perekrut = await selectUserPerekrutById(id_perekrut);

    if (perekrut.rowCount == 0) {
      return res.status(200).json({
        code: 200,
        message: 'Perekrut not found!',
      });
    }

    let data = { id_pengirim, id_perekrut, id_pekerja, posisi, message_detail };
    await insertChat(data);

    if (!data) {
      return res.status(404).json({
        code: 404,
        message: 'Send message Failed!',
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Send message success!',
    });
  },

  getListChatByIdPekerja: async (req, res) => {
    let id_pekerja = req.user.id_user;

    let data = await selectChatByIdPekerja(id_pekerja);
    if (data.rows.length === 0) {
      return res.status(200).json({
        code: 200,
        message: 'No message yet',
        data: [],
      });
    }

    let listChat = data.rows;

    let result = listChat.filter((item, index) => {
      return (
        index ===
        listChat.findIndex((obj) => {
          return JSON.stringify(item) === JSON.stringify(obj);
        })
      );
    });

    res.status(200).json({
      code: 200,
      message: 'Get list chat success!',
      data: result,
    });
  },

  getListChatByIdPerekrut: async (req, res) => {
    let id_perekrut = req.user.id_user;

    let data = await selectChatByIdPerekrut(id_perekrut);
    if (data.rows.length === 0) {
      return res.status(200).json({
        code: 200,
        message: 'No message yet',
        data: [],
      });
    }

    let listChat = data.rows;

    let result = listChat.filter((item, index) => {
      return (
        index ===
        listChat.findIndex((obj) => {
          return JSON.stringify(item) === JSON.stringify(obj);
        })
      );
    });

    res.status(200).json({
      code: 200,
      message: 'Get list chat success!',
      data: result,
    });
  },

  getDetailChat: async (req, res) => {
    let { id_pekerja, id_perekrut, posisi } = req.body;

    let data = await selectDetailChatByIdPengirim(id_pekerja, id_perekrut, posisi);
    if (data.rows.length === 0) {
      return res.status(200).json({
        code: 200,
        message: 'No message yet',
        data: [],
      });
    }

    let listChat = data.rows;

    res.status(200).json({
      code: 200,
      message: 'Get list chat success!',
      data: listChat,
    });
  },
};

module.exports = chatController;
