const router = require("express").Router();
const message = require("../controllers/message");

router.post("/:id", message.postMessage);
router.patch("/:id", message.patchMessage);
router.delete("/:id", message.deleteMessage);
router.get("/:id", message.getMessageId);
router.get("/list/:id", message.getMessage);
router.get("/list", message.getList);
router.delete("/list/:id", message.clearHistory);

module.exports = router;
