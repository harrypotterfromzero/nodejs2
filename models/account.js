const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hptadmin:hpthnadmin@cluster0.ubsce.mongodb.net/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
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
for(let i=0;i<20;i++)
{
  AccountModel.create({
    username: 'QuangNA _'+i,
    password: '123456'
  })
}
module.exports = AccountModel;
