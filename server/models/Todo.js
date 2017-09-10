const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
  tugas: {
    type: String,
    required: [true, 'tugas gk boleh kosong']
  },
  desc: {
    type: String,
    required: [true, 'desc gk boleh kosong']
  },
  status: {type: Boolean, default: false},
  tags:[{ type: String }],
  author: { type: Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
