const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
  tugas: {
    type: String,
    required: [true, 'tugas gk boleh kosong']
  },
  tglTugas: Date,
  status: Boolean,
  tags:[{ type: String }],
  createdBy: {
    type: Schema.Types.ObjectId, ref: "User"
  }
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
