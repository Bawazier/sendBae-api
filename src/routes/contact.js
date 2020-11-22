const router = require("express").Router();
const contact = require("../controllers/contact");

router.get("/", contact.getContact);
router.post("/", contact.postContact);
router.get("/:id", contact.getContactId);
router.patch("/:id", contact.patchContact);

module.exports = router;
