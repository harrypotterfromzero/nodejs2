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
  for(let i=0;i<20;i++){
    AccountModel.create({
        username:'Quangna_'+i,
        password:'thutrang'
    })
  }
  module.exports=AccountModel;