const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const AccountModel = require("./models/account");
const path = require("path");
var duongDanPublic = path.join(__dirname, "public");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser')
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

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

//dang nhap
app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        var token = jwt.sign(
          {
            _id: data._id,
          },
          "mk"
        );
        return res.json({
          message: "thanh cong",
          token: token,
        });
      } else {
        return res.json("that bai");
      }
    })
    .catch((err) => {
      res.status(500).json("Co loi ben server");
    });
});

var accountRouter = require("./routers/account");
const { db } = require("./models/account");
app.use("/api/account", accountRouter);

// var paggingRouter = require("./routers/pagging");
// app.use("/api/pagging", paggingRouter);

app.post("/", function (req, res, next) {
  res.send("POST request to the homepage");
});
const PAGE_SIZE = 5;
app.get("/user", (req, res, next) => {
  var page = req.query.page;
  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    var skip = (page - 1) * PAGE_SIZE;
    AccountModel.find()
      .skip(skip)
      .limit(PAGE_SIZE)
      .then((data) => {
        AccountModel.countDocuments().then((total) => {
          var tongSoPage = Math.ceil(total / PAGE_SIZE);
          res.json({
            tongSoPage: tongSoPage,
            data: data,
          });
        });
      })
      .catch((err) => {
        res.status(500).json("Loi server pagging");
      });
  } else {
    //get all
    AccountModel.find()
      .then((data) => {
        AccountModel.countDocuments().then((err, total) => {
          var tongSoPage = Math.ceil(total / PAGE_SIZE);
          res.json({
            tongSoPage: tongSoPage,
            data: data,
          });
        });
      })
      .catch((err) => {
        res.status(500).json("Loi server");
      });
  }
});

app.get("/home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//middleware
app.get(
  "/private",
  (req, res, next) => {
    try {
      var token = req.cookies.token;
      var ketqua = jwt.verify(token, "mk");
      var user =db.find(token.id);
      res.data =user
      if (ketqua) next();
    } catch (error) {
       return res.redirect('/login');
   
    }
  },
  (req, res, next) => {
    res.json("dang nhap thanh cong");
  }
);
app.get(
  "/private/:token",
  (req, res, next) => {
    try {
      var token = req.cookies.token;
      console.log(token);
      var ketqua = jwt.verify(token, "mk");
      if (ketqua) next();
    } catch (error) {
       return res.redirect('/login');
   
    }
  },
  (req, res, next) => {
    res.json("dang nhap thanh cong");
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
