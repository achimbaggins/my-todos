const User = require('../models/User');
const salt = require('../helpers/salt');
const encryptme = require('../helpers/encryptme');

var regis = (req, res) => {
  garam = salt()
  pass = encryptme(req.body.password, garam)
  User.find({username: req.body.username})
  .then(result => {
    if(result.length == 0){
      User.create({
        username: req.body.username,
        password: pass,
        secret: garam
      })
      .then(result => res.send(result))
    } else {
      res.send(`${req.body.username} : tidak dapat dipakai`)
    }
  })
}

module.exports = {
  regis
};
