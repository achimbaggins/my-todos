const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
  fullname: {type: String, required:[true, 'fullname gak boleh kosong']},
  username: {type: String, required:[true, 'username gak boleh kosong']},
  password: {type: String, required:[true, 'password gak boleh kosong']},
  email: {type: String, required:[true, 'email gak boleh kosong']},
  secret: String
},{
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User;
