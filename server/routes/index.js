var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ myAPI: 'My REST API Server' });
});

module.exports = router;
