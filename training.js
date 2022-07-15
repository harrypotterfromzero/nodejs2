var jwt = require('jsonwebtoken');
var data = {username:'quangna'};
var token=jwt.sign(data,'abcdf');
console.log(token);