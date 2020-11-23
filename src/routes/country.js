const router = require("express").Router();
const country = require("../controllers/country");

router.get("/", country.getCountry);
router.get("/:id", country.getCountryId);

module.exports = router;