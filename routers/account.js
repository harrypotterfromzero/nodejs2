const express = require('express')
var router = express.Router();
const AccountModel = require('../models/account')

//lay du lieu tat ca ban ghi
router.get('/', (req, res) => {
  AccountModel.find({})
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).json('Loi server');
  })
})

//lay du lieu 1 ban ghi
router.get('/:id', (req, res) => {
  var id = req.params.id;
  AccountModel.findById(id)
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).json('Loi server');
  })
})

//them moi du lieu
router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  AccountModel.create({
    username:username,
    password:password
  })
  .then(data=>{
    res.json('them account thanh cong')
  })
  .catch(err=>{
    res.status(500).json('Loi server');
  })
})

//update du lieu
router.put('/:id', (req, res) => {
  var id = req.params.id;
  var newPassword = req.body.newPassword;

  AccountModel.findByIdAndUpdate(id,{
    password:newPassword
  })
  .then(data=>{
    res.json('update thanh cong')
  })
  .catch(err=>{
    res.status(500).json('Loi sever')
  })
})

//xoa du lieu
router.delete('/:id', (req, res) => {
  var id =req.params.id;
  AccountModel.deleteOne({
    _id:id
  })
  .then(data=>{
      res.json('xoa thanh cong')
  })
  .catch(err=>{
    res.status(500).json('loi server')
  })
})
module.exports=router