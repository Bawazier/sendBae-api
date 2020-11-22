const Joi = require("joi");

module.exports = {
  phoneValidation: Joi.object({
    countryId: Joi.number().integer().positive(),
    phoneNumber: Joi.number().integer().min(1000000000).max(99999999999),
  }),
  user: Joi.object({
    username: Joi.string().pattern(new RegExp("^[a-z0-9]{3,30}$")).min(5),
    firstName: Joi.string().max(80),
    lastName: Joi.string().max(80),
    bio: Joi.string().max(70),
  }),
  contact: Joi.object({
    firstName: Joi.string().max(80),
    lastName: Joi.string().max(80),
    countryId: Joi.number().integer().positive(),
    phoneNumber: Joi.number().integer().min(1000000000).max(99999999999),
  }),
  message: Joi.string(),
};