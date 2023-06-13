const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  f_name: {
    type: 'string',
    required: true,
    minlength: 3,
    maxlength: 15
  },
  l_name: {
    type: 'string',
    required: true,
    minlength: 3,
    maxlength: 15
  },
  password: {
    type: 'string',
    minlength: 8
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  imageUrl: {
    type: 'string'
  },
  publicID: {
    type: 'string'
  },
  isAdmin: {
    type: Boolean, default: false
  },
  token: {type: 'string'}
})

const UserModel = mongoose.model("users", usersSchema);

module.exports = UserModel;