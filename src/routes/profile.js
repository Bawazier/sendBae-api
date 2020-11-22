const router = require("express").Router();
const profile = require("../controllers/profile");

router.get("/", profile.getUser);
router.patch("/", profile.patchUser);
router.put("/", profile.putUser);

router.put("/phone", profile.changePhoneNumber);

module.exports = router;
