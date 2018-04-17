var router = require('express').Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var bcrypt  = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
		var email = req.body.user.email
		var pass = req.body.user.password;
		User.create({
			email: email,
			passwordhash: bcrypt.hashSync(pass, 10)
		}).then(
			function createSuccess(user){
				var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
				res.json({
					user: user,
					message: 'created',
					sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;