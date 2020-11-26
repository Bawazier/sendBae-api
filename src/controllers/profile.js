const { User, Country } = require("../models");
const responseStandart = require("../helpers/response");
const schema = require("../helpers/validation");

const multer = require("multer");
const options = require("../helpers/upload");
const upload = options.single("photo");

const userSchema = schema.user;
const phoneValidation = schema.phoneValidation;

module.exports = {
  getUser: async (req, res) => {
    try {
      const data = await User.findAll({
        include: [Country],
        where: {
          id: req.user.id,
        },
      });
      const results = data.map((item) => {
        const photo = { URL_photo: process.env.APP_URL + item.photo };
        return Object.assign({}, item.dataValues, photo);
      });
      return responseStandart(res, "success display user data", {
        results,
      });
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  getUserId: async (req, res) => {
    try {
      const data = await User.findByPk(req.params.id, {
        include: [Country],
      });
      const results = data.map((item) => {
        const photo = { URL_photo: process.env.APP_URL + item.photo };
        return Object.assign({}, item.dataValues, photo);
      });
      return responseStandart(res, "success display user data", {
        results,
      });
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  changePhoneNumber: async (req, res) => {
    try {
      const body = await phoneValidation.required().validateAsync(req.body);
      const dataUser = {
        countryId: body.countryId,
        phoneNumber: body.phoneNumber,
      };
      const validate = await User.findAll({
        where: {
          countryId: body.countryId,
          phoneNumber: body.phoneNumber,
        },
      });
      if (!validate.length) {
        await User.update(dataUser, {
          where: {
            id: req.user.id,
          },
        });
        return responseStandart(res, "success update user data", {});
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

  patchUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        const result = await userSchema.validateAsync(req.body);
        const user = {
          username: result.username,
          firstName: result.firstName,
          lastName: result.lastName,
          bio: result.bio,
          photo: req.file === undefined ? undefined : req.file.path,
        };
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key];
          return results;
        }, {});
        await User.update(filteredObject, {
          where: {
            id: req.user.id,
          },
        });
        return responseStandart(res, "success update user data", {});
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },

  putUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        const result = await userSchema.required().validateAsync(req.body);
        const user = {
          username: result.username,
          firstName: result.firstName,
          lastName: result.lastName,
          bio: result.bio,
          photo: req.file === undefined ? undefined : req.file.path,
        };
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key];
          return results;
        }, {});
        await User.update(filteredObject, {
          where: {
            id: req.user.id,
          },
        });
        return responseStandart(res, "success update user data", {});
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },
};
