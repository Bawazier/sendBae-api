const { User } = require("../models");
const jwt = require("jsonwebtoken");
const schema = require("../helpers/validation");
const responseStandart = require("../helpers/response");

const phoneValidation = schema.phoneValidation;

module.exports = {
  signIn: async (req, res) => {
    try {
      const body = await phoneValidation.required().validateAsync(req.body);
      const dataUser = {countryId: body.countryId, phoneNumber: body.phoneNumber};
      const validate = await User.findAll({
        where: {
          countryId: body.countryId,
          phoneNumber: body.phoneNumber,
        },
      });
      if (validate.length) {
        jwt.sign(
          { id: validate[0].id },
          process.env.APP_KEY,
          { expiresIn: "2 days" },
          function (err, token) {
            if (!err) {
              return responseStandart(res, "Signin Success", {
                token: token
              });
            } else {
              return responseStandart(res, err, {}, 403, false);
            }
          }
        );
      } else {
        const results = await User.create(dataUser);
        if(results){
          jwt.sign(
            { id: results.dataValues.id },
            process.env.APP_KEY,
            { expiresIn: "2 days" },
            function (err, token) {
              if (!err) {
                return responseStandart(res, "Signup Success", {
                  tokenTemporary: token
                });
              } else {
                return responseStandart(res, err, {}, 403, false);
              }
            }
          );
        }else{
          return responseStandart(
            res,
            "Unfortunately this phone number has not supported sendBae yet",
            {},
            400,
            false
          );
        }
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },
};
