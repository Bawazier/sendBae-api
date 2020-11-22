const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/", auth.signIn);

module.exports = router;