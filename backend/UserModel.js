var mongoose = require("mongoose");

var UserModel = new mongoose.model(
  "Users",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: true }
  })
);


module.exports = UserModel