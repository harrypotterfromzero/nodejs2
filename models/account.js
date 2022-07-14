const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hptadmin:hpthnadmin@cluster0.ubsce.mongodb.net/my_database",
);

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "Account",
  }
);
const AccountModel = mongoose.model("Account", AccountSchema);
AccountModel.find({
  username: "quangna",
})

  .then(function (data) {
    console.log("dataAccount", data);
  })
  .catch(function (err) {
    console.log("loi", err);
  });
module.exports = AccountModel;
