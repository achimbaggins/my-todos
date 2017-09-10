const Todo = require('../models/Todo')
const ObjectId = require('mongodb').ObjectId;

const jwt = require('jsonwebtoken');

var findAll = (req, res) => {
  Todo.find({author: req.headers.id}).sort('-updatedAt')
  .populate('author', 'username')
  .then(result => res.send(result))
  .catch(err => res.send(err))
}

var createData = (req, res) => {
  var tagar = req.body.tags.split(', ')
  Todo.create({
    tugas: req.body.tugas,
    desc: req.body.desc,
    status: false,
    tags: tagar,
    author: req.body.authorid
  })
  .then(result => res.send(result))
  .catch(err => res.send(err))
}

var findById = (req, res) => {
  Todo.find({_id: req.params.id})
  .populate('author', 'username')
  .then(result => res.send(result))
  .catch(err => res.send(err))
}

var put = (req, res) => {
  // console.log(req.body);
  // var tagar = req.body.tags.split(',')
  // var data = {
  //   tugas: req.body.tugas,
  //   desc: req.body.desc,
  //   tags: tagar,
  // }
  // console.log('=======',data);
  // Todo.update({_id: req.params.id},{ $set: data})
  // .then(result => res.send(result))
  // .catch(err => res.send(err))
  Todo.findById(req.params.id, (err, todo) => {
    var tagar = req.body.tags.toString().split(',')
    if(err) {
      res.send(err)
    } else {
      todo.tugas = req.body.tugas;
      todo.desc = req.body.desc;
      todo.tags = tagar;
      todo.save((err, ok) => {
        if(err) {
          res.send(err)
        } else {
          res.send(ok)
        }
      })
    }
  })
}

var status = (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if(err) {
      res.send(err)
    } else {
      todo.status = req.body.status;
      todo.save((err, newStatus) => {
        if(err) {
          res.send(err.errors)
        } else {
          res.send(newStatus)
        }
      })
    }
  })
}

var destroy = (req, res) => {
  // if(req.jwtLogin.role == 'admin'){
    Todo.remove({_id: req.params.id})
    .then(dataUser => res.send(`data id ${req.params.id} sudah dihapus`))
    .catch(err => res.send(err))
  // } else {
  //   res.send('anda tidak memiliki hak akses')
  // }
}

module.exports = {
  findAll, findById, createData, put, status, destroy
}
