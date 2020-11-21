const Joi = require("joi");

module.exports = {
  phoneValidation: Joi.object({
    countryId: Joi.number().integer().positive(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required(),
  }),
  user: Joi.object({
    username: Joi.string().pattern(new RegExp("^[a-z0-9]{3,30}$")).min(5),
    firstName: Joi.string().min(3).max(80),
    lastName: Joi.string().min(3).max(80),
    countryId: Joi.number().integer().positive(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required(),
    bio: Joi.string().max(70),
  }),
  contact: Joi.object({
    firstName: Joi.string().min(3).max(80),
    lastName: Joi.string().min(3).max(80),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required(),
  }),
  message: Joi.string(),
};