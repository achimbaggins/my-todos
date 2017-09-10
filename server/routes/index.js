var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res) {
  res.send({ myAPI: 'My REST API Server' });
});
router.post('/signup', registerController.regis)
router.post('/signin', loginController.signIn)

module.exports = router;
