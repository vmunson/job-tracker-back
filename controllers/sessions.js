var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var constants = require('../config/constants');
var db = require('../models/index');
var User = db.sequelize.import('../models/user');

router.post('/', function(req, res) {
    User.findOne({ where: { email: req.body.user.email} }).then(
        function(user) {
            if (user) {
              bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                  if (matches) {
                    var sessionToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn:  24*60*60 });
                    res.json({
                      user: user,
                      message: 'succesfully authed',
                      sessionToken: sessionToken
                    });
                  } else {
                    console.log(user)
                    res.status(500).send({ error: "failed to authenticate"});
                  }
              });
            } else {
              res.status(300).send({ error: "failed to authenticate"});
            }
        },
        function(err) {
          // could not find user
          res.json(err);
        }
    );
});

module.exports = router;