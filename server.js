const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const AccountModel = require("./models/account");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.findOne({
    username: username,
  }).then((data) => {
    if (data) {
      res.json("Tai khoan da ton tai");
    } else {
      AccountModel.create({
        username: username,
        password: password,
      })
        .then((data) => {
          res.json("Tao tai khoan thanh cong");
        })
        .catch((err) => {
          res.status(500).json("Tao tai khoan that bai");
        });
    }
  });
});

app.post("/login", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) res.json("Dang nhap thanh cong");
      else res.status(300).json("Dang nhap that bai");
    })
    .catch((err) => {
      res.status(500).json("Co loi ben server");
    });
});

//phan trang
const PAGE_SIZE = 2;
app.get("/user", (req, res) => {
  var page = req.query.page;

  if (page) {
    page = parseInt(page);
    // res.json(page);
    var soLuongBoQua = (page - 1) * PAGE_SIZE;

    AccountModel.find({})
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Loi server 1");
      });
  } else {
    AccountModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Loi server");
        console.log(err);
      });
  }
});

var accountRouter = require("./routers/account");
app.use("/api/account/", accountRouter);

app.post("/", function (req, res, next) {
  res.send("POST request to the homepage");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
