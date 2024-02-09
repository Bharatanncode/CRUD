const mongoose = require('mongoose');

const curdSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  about:String


});

module.exports = mongoose.model('curd', curdSchema);