const express = require("express");
var router = express.Router();
const AccountModel = require("../models/account");
const PAGE_SIZE = 2;
//phan trang

router.get("/user/", (req, res, next) => {
  // var page = req.query.page;
  // if (page) {
  //   page = parseInt(page);
  //   var skip = (page - 1) * PAGE_SIZE;
  //   AccountModel.find()
  //     .skip(skip)
  //     .limit(PAGE_SIZE)
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).json("Loi server pagging");
  //     });
  // } else {
  //   AccountModel.find()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).json("Loi server");
  //     });
  // }
  let perPage = 5;
  let page = req.params.page || 1;



  AccountModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

module.exports = router;
