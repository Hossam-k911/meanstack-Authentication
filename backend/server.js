var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var uuid = require("uuid/v4");
var mongoose = require("mongoose");
var CreateUserAPIS = require("./UserAPIS");
mongoose.connect("mongodb://localhost:27017/userdb");

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false
  })
);
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);

function Authenticate(req, resp, next) {
  if (req.url === "/signup" || req.url === "/signin") {
    next();
  } else {
    if (req.session.user && req.cookies["connect.sid"]) {
      next();
    } else {
      resp.json({ message: "authentication failed" });
    }
  }
}

app.use(Authenticate);

CreateUserAPIS(app);

app.get("/", async (req, res) => {
  res.send("server is running ");
});

app.listen(8085);
