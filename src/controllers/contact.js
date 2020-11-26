const { Contact, User } = require("../models");
const { Op } = require("sequelize");
const responseStandart = require("../helpers/response");
const schema = require("../helpers/validation");
const qs = require("querystring");

const contactSchema = schema.contact;

module.exports = {
  postContact: async (req, res) => {
    try {
      const body = await contactSchema.required().validateAsync(req.body);
      const validate = await User.findAll({
        where: {
          countryId: body.countryId,
          phoneNumber: body.phoneNumber,
        },
      });
      if (validate.length) {
        const dataContact = {
          userId: req.user.id,
          friendId: validate[0].id,
          firstName: body.firstName,
          lastName: body.lastName,
        };
        await Contact.create(dataContact);
        return responseStandart(res, "success create contact data", {});
      } else {
        return responseStandart(
          res,
          "Unfortunately this phone number has not supported sendBae yet",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  patchContact: async (req, res) => {
    try {
      const result = await contactSchema.validateAsync(req.body);
      const dataContact = {
        firstName: result.firstName,
        lastName: result.lastName,
      };
      await Contact.update(dataContact, {
        where: {
          id: req.params.id,
        },
      });
      return responseStandart(res, "success update contact data", {});
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  getContactId: async (req, res) => {
    try {
      const results = await Contact.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["id", "username", "firstName", "lastName", "bio", "photo"],
          },
        ],
      });
      if (results) {
        return responseStandart(res, "success to display contact", { results });
      } else {
        return responseStandart(
          res,
          "unable to display contact",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 500, false);
    }
  },

  getContact: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Contact.findAndCountAll({
        include: [
          {
            model: User,
            attributes: [
              "id",
              "username",
              "firstName",
              "lastName",
              "bio",
              "photo",
            ],
          },
        ],
        where: {
          userId: req.user.id,
          firstName: {
            [Op.startsWith]: search,
          },
        },
        order: [["firstName", "DESC"]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit),
      });
      if (rows.length) {
        return responseStandart(res, "success to display contact", {
          pageInfo: [
            {
              count: count,
              pages: Math.ceil(count / limit),
              limit: parseInt(limit),
              nextLink:
                page <= Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `contact/?${qs.stringify({
                      ...req.query,
                      ...{ page: parseInt(page) + 1 },
                    })}`
                  : null,
              prevLink:
                page > Math.ceil(count / limit)
                  ? process.env.APP_URL +
                    `contact/?${qs.stringify({
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
          "unable to display contact",
          {
            pageInfo: [
              {
                count: count,
                pages: Math.ceil(count / limit),
                limit: parseInt(limit),
                nextLink:
                  page <= Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `contact/?${qs.stringify({
                        ...req.query,
                        ...{ page: parseInt(page) + 1 },
                      })}`
                    : null,
                prevLink:
                  page > Math.ceil(count / limit)
                    ? process.env.APP_URL +
                      `contact/?${qs.stringify({
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
};
