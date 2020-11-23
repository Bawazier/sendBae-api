const { Country } = require("../models");
const responseStandart = require("../helpers/response");

module.exports = {
  getCountry: async (req, res) => {
    try{
      const results = await Country.findAll();
      if (results) {
        return responseStandart(res, "success to display country", { results });
      } else {
        return responseStandart(
          res,
          "unable to display country",
          {},
          400,
          false
        );
      }
    }catch(e){
      return responseStandart(res, e, {}, 500, false);
    }
  },
  getCountryId: async (req, res) => {
    try {
      const results = await Country.findByPk(req.params.id);
      if (results) {
        return responseStandart(res, "success to display country", { results });
      } else {
        return responseStandart(
          res,
          "unable to display country",
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