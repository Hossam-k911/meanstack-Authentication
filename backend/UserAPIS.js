var UserModel = require("./UserModel");
var mongoose = require("mongoose");

function CreateUserAPIS(app) {
  app.post("/signup", async (req, resp) => {
    try {
      const { username, password, phone, address } = req.body;

      let user = new UserModel({
        _id: mongoose.Types.ObjectId(),
        username,
        password,
        address,
        phone
      });
      await user.save();
      resp.json({ message: "success" });
    } catch (err) {
      resp.json({ message: "error" });
    }
  });

  app.post("/signin", async (req, resp) => {
    const { username, password } = req.body;
    let user = await UserModel.findOne({ username, password });
    if (user) {
      req.session.user = user;
      resp.json({ message: "success", user });
    } else {
      resp.json({ message: "error" });
    }
  });

  app.post("/getuserdata", async (req, resp) => {
    const { id } = req.body;
    let user = await UserModel.findOne({ _id: id });
    resp.json({ message: "success", user });
  });

  app.get("/signout", async (req, resp) => {
    await req.session.destroy();
    resp.json({ message: "success" });
  });
}

module.exports = CreateUserAPIS;
