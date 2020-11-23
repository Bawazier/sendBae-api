const router = require("express").Router();
const message = require("../controllers/message");

router.post("/chat/:id", message.postMessage);
router.patch("/chat/:id", message.patchMessage);
router.delete("/chat/:id", message.deleteMessage);
router.get("/chat/:id", message.getMessageId);
router.get("/list/:id", message.getMessage);
router.get("/list", message.getList);
router.delete("/list/:id", message.clearHistory);

module.exports = router;
