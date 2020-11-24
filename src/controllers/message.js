const { Message, Image, User } = require("../models");
const responseStandart = require("../helpers/response");
const schema = require("../helpers/validation");
const { Op, Sequelize } = require("sequelize");
const multer = require("multer");
const qs = require("querystring");

const options = require("../helpers/upload");
const upload = options.single("image");

const messageSchema = schema.message;

module.exports = {
  postMessage: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        if(req.file){
          const body = await messageSchema.validateAsync(req.body.message);
          const dataMessage = {
            sender: req.user.id,
            recipient: req.params.id,
            read: 0,
            isLastest: 1,
            message: body || "photo",
          };
          await Message.update(
            { isLastest: 0 },
            {
              where: {
                recipient: {
                  [Op.or]: [req.user.id, req.params.id],
                },
                sender: {
                  [Op.or]: [req.user.id, req.params.id],
                },
              },
            }
          );
          const results = await Message.create(dataMessage);
          console.log(results);
          if (results.dataValues) {
            const dataImage = {
              messageId: results.dataValues.id,
              image: req.file === undefined ? undefined : req.file.path,
            };
            await Image.create(dataImage);
            return responseStandart(res, "success sender message", {});
          }else{
            return responseStandart(res, "message not found", {}, 404, false);
          }
        }else{
          const body = await messageSchema
            .required()
            .validateAsync(req.body.message);
          const dataMessage = {
            sender: req.user.id,
            recipient: req.params.id,
            read: 0,
            isLastest: 1,
            message: body,
          };
          await Message.update(
            { isLastest: 0 },
            {
              where: {
                recipient: {
                  [Op.or]: [req.user.id, req.params.id],
                },
                sender: {
                  [Op.or]: [req.user.id, req.params.id],
                },
              },
            }
          );
          const results = await Message.create(dataMessage);
          console.log(results);
          if (results.dataValues) {
            return responseStandart(res, "success sender message", {});
          } else {
            return responseStandart(res, "message not found", {}, 404, false);
          }
        }
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },

  patchMessage: async (req, res) => {
    try {
      const body = await messageSchema.validateAsync(req.body.message);
      const dataMessage = {
        message: body,
      };
      const results = await Message.update(dataMessage, {
        where: {
          id: req.params.id
        }
      });
      if (results) {
        return responseStandart(res, "success update message", {});
      } else {
        return responseStandart(res, "message not found", {}, 404, false);
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const results = await Message.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (results) {
        return responseStandart(res, "success delete message", {});
      } else {
        return responseStandart(res, "message not found", {}, 404, false);
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  clearHistory: async (req, res) => {
    try {
      const results = await Message.destroy({
        where: {
          sender: req.user.id,
          recipient: req.params.id,
        },
      });
      if (results) {
        return responseStandart(res, "success delete message", {});
      } else {
        return responseStandart(res, "message not found", {}, 404, false);
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  getList: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Message.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["username", "firstName", "lastName", "bio", "photo"],
          },
          Image,
        ],
        where: {
          [Op.or]: [
            {
              sender: req.user.id,
            },
            {
              recipient: req.user.id,
            },
          ],
          isLastest: true,
        },
        order: [["createdAt", "ASC"]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      });
      if (rows.length) {
        return responseStandart(res, "success to list your message", {
          pageInfo: [
            {
              count: count,
              pages: Math.ceil(count / limit),
              limit: parseInt(limit),
              nextLink:
                page <= Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `message/list/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) + 1 },
                    })}`
                  : null,
              prevLink:
                page > Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `message/list/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) - 1 },
                    })}`
                  : null,
            },
          ],
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display list message",
          {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                  page <= Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `message/list/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 },
                      })}`
                    : null,
                prevLink:
                  page > Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `message/list/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) - 1 },
                      })}`
                    : null,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  getMessage: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Message.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["username", "firstName", "lastName", "bio", "photo"],
          },
          Image,
        ],
        where: {
          recipient: {
            [Op.or]: [req.user.id, req.params.id]
          },
          sender: {
            [Op.or]: [req.user.id, req.params.id]
          },
          message: {
            [Op.startsWith]: search,
          },
        },
        order: [["createdAt", "ASC"]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      });
      if (rows.length) {
        await Message.update(
          { read: 1 },
          {
            where: {
              recipient: {
                [Op.or]: [req.user.id, req.params.id],
              },
              sender: {
                [Op.or]: [req.user.id, req.params.id],
              },
            },
          }
        );
        return responseStandart(res, "success display your message", {
          pageInfo: [
            {
              count: count,
              pages: Math.ceil(count / limit),
              limit: parseInt(limit),
              nextLink:
                page <= Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `message/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) + 1 },
                    })}`
                  : null,
              prevLink:
                page > Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `message/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) - 1 },
                    })}`
                  : null,
            },
          ],
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display message",
          {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                  page <= Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `message/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 },
                      })}`
                    : null,
                prevLink:
                  page > Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `message/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) - 1 },
                      })}`
                    : null,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  getMessageId: async (req, res) => {
    try {
      const results = await Message.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username", "firstName", "lastName", "bio", "photo"],
          },
        ],
      });
      if (results) {
        return responseStandart(res, "success to display message", { results });
      } else {
        return responseStandart(
          res,
          "unable to display message",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 500, false);
    }
  },

};
