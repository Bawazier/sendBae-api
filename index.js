
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {});
module.exports = io;
const { APP_PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Backend is running well",
  });
});

// REALTIME
io.on("connection", socket => {
  console.log(`App connect: ${socket}`);
});

server.listen(APP_PORT, () => {
  console.log(`app listen on port ${APP_PORT}`);
});

// provide static file
app.use("/assets/uploads/", express.static("assets/uploads"));


const auth = require("./src/routes/auth");
const country = require("./src/routes/country");
const profile = require("./src/routes/profile");
const contact = require("./src/routes/contact");
const message = require("./src/routes/message");

// attach member router
app.use("/auth", auth);
app.use("/country", country);

const customerAuth = require("./src/middlewares/auth");
app.use("/profile", customerAuth, profile);
app.use("/contact", customerAuth, contact);
app.use("/message", customerAuth, message);