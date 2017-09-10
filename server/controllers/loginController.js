const User = require('../models/User');
const salt = require('../helpers/salt');
const encryptme = require('../helpers/encryptme');
const jwt = require('jsonwebtoken');

var signIn = (req, res) => {
  //cek usernmae
  User.find({
        username: req.body.username
  })
  .then(dataUser => {
    console.log('hasil : ', dataUser);
    // cek password
    if(dataUser.length > 0){
      let pass = encryptme(req.body.password, dataUser[0].secret)
      if(dataUser[0].password == pass){
        var makeToken = {
          id: `${dataUser[0].id}`,
          username: `${dataUser[0].username}`,
        }
        var token = jwt.sign(makeToken, 'thesecret');

        res.send({token: token, id: dataUser[0]._id, username: dataUser[0].username})
      } else {
        res.send('password salah')
      }
    } else {
      res.send('username tidak ditemukan')
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  signIn
}
