var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
const authority = require('../helpers/authority');


/* GET users listing. */
router.get('/', todoController.findAll);
router.post('/', todoController.createData)
router.get('/:id', todoController.findById)
router.put('/:id', todoController.put)
router.put('/:id/status', todoController.status)
router.delete('/:id', todoController.destroy)


module.exports = router;
