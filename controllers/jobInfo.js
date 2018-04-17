var router = require('express').Router();
var db = require('../models/index');
var User = db.sequelize.import('../models/user');
var JobInfo = db.sequelize.import('../models/jobInfo.js');

router.post('/', function(req, res) {
    var date = req.body.jobinfo.date
    var title = req.body.jobinfo.title
    var company = req.body.jobinfo.company
    var status = req.body.jobinfo.status
    var user = req.user 

    JobInfo 
	    .create({ 
            date: date,
            title: title,
            company: company,
            status: status,
            owner: user.id    
		})
	    .then(
	    	function createSuccess(jobInfo) {
	    		res.json(jobInfo);
	    	}, 
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

router.get('/', function(req, res) {
	var userid = req.user.id;
	JobInfo
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});
router.get('/:id', function(req,res){
	let data = req.params.id
	JobInfo
		.findOne({
			where:{id: data}
		}).then(
			function getSuccess(updateData){
				res.json(updateData)
			},
			function getError(err){
				res.send(500, err.message)
			}
		)

})
router.put('/', function(req, res){
	var user = req.user;
    var date = req.body.jobinfo.date
    var title = req.body.jobinfo.title
    var company = req.body.jobinfo.company
    var status = req.body.jobinfo.status
	let data = req.body.jobinfo.id
	JobInfo
		.update({
			owner: user.id,
            date: date,
            title: title,
            company: company,
            status: status,
		},
		{where: {id: data}}
	).then(
		function updateSuccess(updatedPlayer){
			res.json(updatedPlayer)
		},
		function updateError(err){
			res.send(500, err.message)
		}
	)
})
router.delete('/', function(req, res){
	let data = req.body.jobinfo.id
	JobInfo
	.destroy({
		where: {id: data}
	}).then(
		function deleteLogSuccess(data){
			res.send('you removed a player')
		},
		function deleteLogError(err){
			res.send(500, err.message)
		}
	)
})
module.exports = router;